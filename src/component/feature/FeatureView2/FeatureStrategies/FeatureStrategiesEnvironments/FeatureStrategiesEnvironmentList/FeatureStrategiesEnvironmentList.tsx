import {
    IParameter,
    IStrategy,
    IStrategyPayload,
} from '../../../../../../interfaces/strategy';
import { FEATURE_STRATEGIES_DRAG_TYPE } from '../../FeatureStrategiesList/FeatureStrategyCard/FeatureStrategyCard';
import FeatureStrategyAccordion from '../../FeatureStrategyAccordion/FeatureStrategyAccordion';
import { useDrop, DropTargetMonitor } from 'react-dnd';
import { Fragment, useContext, useEffect, useState } from 'react';
import { resolveDefaultParamValue } from '../../../../strategy/AddStrategy/utils';
import { useParams } from 'react-router-dom';
import useStrategies from '../../../../../../hooks/api/getters/useStrategies/useStrategies';
import { mutate } from 'swr';
import useFeature from '../../../../../../hooks/api/getters/useFeature/useFeature';
import { useStyles } from './FeatureStrategiesEnvironmentList.styles';
import classnames from 'classnames';
import { GetApp } from '@material-ui/icons';
import FeatureStrategiesUIContext from '../../../../../../contexts/FeatureStrategiesUIContext';
import ConditionallyRender from '../../../../../common/ConditionallyRender';
import useFeatureStrategyApi from '../../../../../../hooks/api/actions/useFeatureStrategyApi/useFeatureStrategyApi';
import useToast from '../../../../../../hooks/useToast';
import Dialogue from '../../../../../common/Dialogue';
import { Alert } from '@material-ui/lab';
import FeatureStrategiesSeparator from '../FeatureStrategiesSeparator/FeatureStrategiesSeparator';
import FeatureStrategiesEnvironmentListItem from './FeatureStrategiesEnvironmentListItem/FeatureStrategiesEnvironmentListItem';

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
    const {
        setConfigureNewStrategy,
        configureNewStrategy,
        activeEnvironment,
        setExpandedSidebar,
    } = useContext(FeatureStrategiesUIContext);

    const { deleteStrategyFromFeature } = useFeatureStrategyApi();
    const { toast, setToastData } = useToast();
    const [delDialog, setDelDialog] = useState({ strategyId: '', show: false });
    const { FEATURE_CACHE_KEY, feature } = useFeature(projectId, featureId);

    const { expandedSidebar } = useContext(FeatureStrategiesUIContext);

    const deleteStrategy = async (strategyId: string) => {
        try {
            const environmentId = activeEnvironment.name;
            await deleteStrategyFromFeature(
                projectId,
                featureId,
                environmentId,
                strategyId
            );
            mutate(FEATURE_CACHE_KEY);
            setDelDialog({ strategyId: '', show: false });
            setToastData({
                show: true,
                type: 'success',
                text: `Successfully deleted strategy from ${featureId}`,
            });
        } catch (e) {
            setToastData({
                show: true,
                type: 'error',
                text: e.toString(),
            });
        }
    };

    const onSetStrategyParams = (
        parameters: IParameter,
        strategyId: string
    ) => {
        setStrategyParams(prev => ({ ...prev, [strategyId]: parameters }));
    };

    const selectStrategy = (name: string) => {
        const selectedStrategy = selectableStrategies.find(
            strategy => strategy.name === name
        );
        const parameters = {} as IParameter;

        selectedStrategy?.parameters.forEach(({ name }: IParameter) => {
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
            setExpandedSidebar(false);
        },
    });

    const renderStrategies = () => {
        return strategies.map((strategy, index) => {
            if (index !== strategies.length - 1) {
                return (
                    <Fragment key={strategy.id}>
                        <FeatureStrategiesEnvironmentListItem
                            strategy={strategy}
                            index={index}
                            setDelDialog={setDelDialog}
                            setToastData={setToastData}
                        />
                        <FeatureStrategiesSeparator text="OR" />
                    </Fragment>
                );
            } else {
                return (
                    <FeatureStrategiesEnvironmentListItem
                        strategy={strategy}
                        index={index}
                        key={strategy.id}
                        setDelDialog={setDelDialog}
                        setToastData={setToastData}
                    />
                );
            }
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

    const strategiesContainerClasses = classnames({
        [styles.strategiesContainer]: !expandedSidebar,
    });

    return (
        <ConditionallyRender
            condition={!configureNewStrategy}
            show={
                <div className={classes} ref={drop}>
                    <div className={strategiesContainerClasses}>
                        {renderStrategies()}
                    </div>
                    <ConditionallyRender
                        condition={expandedSidebar}
                        show={
                            <div className={dropboxClasses}>
                                <p>
                                    Drag and drop strategies from the left side
                                    menu
                                </p>
                                <GetApp className={iconClasses} />
                            </div>
                        }
                    />

                    {toast}
                    <Dialogue
                        title="Are you sure you want to delete this strategy?"
                        open={delDialog.show}
                        primaryButtonText="Delete strategy"
                        secondaryButtonText="Cancel"
                        onClick={() => deleteStrategy(delDialog.strategyId)}
                        onClose={() =>
                            setDelDialog({ show: false, strategyId: '' })
                        }
                    >
                        <Alert severity="error">
                            Deleting the strategy will affect which users
                            receive access to the feature.
                        </Alert>
                    </Dialogue>
                </div>
            }
        />
    );
};

export default FeatureStrategiesEnvironmentList;
