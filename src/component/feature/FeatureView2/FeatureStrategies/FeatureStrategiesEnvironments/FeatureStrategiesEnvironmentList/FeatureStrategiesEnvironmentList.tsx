import { IStrategy } from '../../../../../../interfaces/strategy';
import { FEATURE_STRATEGIES_DRAG_TYPE } from '../../FeatureStrategiesList/FeatureStrategyCard/FeatureStrategyCard';
import FeatureStrategyAccordion from '../../FeatureStrategyAccordion/FeatureStrategyAccordion';
import { useDrop, DropTargetMonitor } from 'react-dnd';
import { useContext, useState } from 'react';
import { resolveDefaultParamValue } from '../../../../strategy/AddStrategy/utils';
import { useParams } from 'react-router-dom';
import useStrategies from '../../../../../../hooks/api/getters/useStrategies/useStrategies';
import { mutate } from 'swr';
import useFeature from '../../../../../../hooks/api/getters/useFeature/useFeature';
import { useStyles } from './FeatureStrategiesEnvironmentList.styles';
import classnames from 'classnames';
import { GetApp } from '@material-ui/icons';
import FeatureStrategiesUIContext from '../../../../../../contexts/FeatureStrategiesUIContext';
import cloneDeep from 'lodash.clonedeep';
import ConditionallyRender from '../../../../../common/ConditionallyRender';
import AnimateOnMount from '../../../../../common/AnimateOnMount/AnimateOnMount';

interface IFeatureStrategiesEnvironmentListProps {
    strategies: IStrategy[];
    env: string;
}

interface IFeatureDragItem {
    name: string;
}

const FeatureStrategiesEnvironmentList = ({
    strategies,
    env,
}: IFeatureStrategiesEnvironmentListProps) => {
    const styles = useStyles();
    const { strategies: selectableStrategies } = useStrategies();
    const { projectId, featureId } = useParams();
    const { setConfigureNewStrategy, configureNewStrategy } = useContext(
        FeatureStrategiesUIContext
    );

    const [strategyParams, setStrategyParams] = useState({});

    const { FEATURE_CACHE_KEY, feature } = useFeature(projectId, featureId);

    const addNewStrategy = async (strategy: IStrategy) => {
        // Consider a deepclone tool or write a utility function
        // use cloneDeep to avoid mutating the original object
        const newFeature = cloneDeep(feature);

        const environment = newFeature.environments.find(
            environment => environment.name === env
        );

        environment?.strategies.push(strategy);

        // mutate(FEATURE_CACHE_KEY, { ...newFeature }, false);
    };

    const selectStrategy = (name: string) => {
        const selectedStrategy = selectableStrategies.find(
            strategy => strategy.name === name
        );
        const parameters = {};

        selectedStrategy?.parameters.forEach(({ name }) => {
            parameters[name] = resolveDefaultParamValue(name, featureId);
        });

        return { name, parameters, constraints: [] };
    };

    const [{ isOver }, drop] = useDrop({
        accept: FEATURE_STRATEGIES_DRAG_TYPE,
        collect(monitor) {
            return {
                isOver: monitor.isOver(),
            };
        },
        drop(item: IFeatureDragItem, monitor: DropTargetMonitor) {
            //  const dragIndex = item.index;
            //  const hoverIndex = index;

            const strategy = selectStrategy(item.name);
            if (!strategy) return;
            //addNewStrategy(strategy);
            setConfigureNewStrategy(strategy);
        },
    });

    const renderStrategies = () => {
        return strategies.map((strategy, index) => {
            return (
                <FeatureStrategyAccordion
                    strategy={strategy}
                    setStrategyParams={() => {}}
                    index={index}
                />
            );
        });
    };

    const classes = classnames(styles.container, {
        [styles.isOver]: isOver,
    });

    const dropboxClasses = classnames(styles.dropbox, {
        [styles.dropboxActive]: isOver,
    });

    const iconClasses = classnames(styles.dropIcon, {
        [styles.dropIconActive]: isOver,
    });

    return (
        <ConditionallyRender
            condition={!configureNewStrategy}
            show={
                <div className={classes} ref={drop}>
                    {renderStrategies()}
                    <div className={dropboxClasses}>
                        <p>Drag and drop strategies from the left side menu</p>
                        <GetApp className={iconClasses} />
                    </div>
                </div>
            }
        />
    );
};

export default FeatureStrategiesEnvironmentList;
