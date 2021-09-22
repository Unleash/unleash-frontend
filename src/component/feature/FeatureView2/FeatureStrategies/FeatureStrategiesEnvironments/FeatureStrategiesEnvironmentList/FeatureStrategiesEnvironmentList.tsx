import {
    IParameter,
    IStrategy,
    IStrategyPayload,
} from '../../../../../../interfaces/strategy';
import { FEATURE_STRATEGIES_DRAG_TYPE } from '../../FeatureStrategiesList/FeatureStrategyCard/FeatureStrategyCard';
import FeatureStrategyAccordion from '../../FeatureStrategyAccordion/FeatureStrategyAccordion';
import { useDrop, DropTargetMonitor } from 'react-dnd';
import { Fragment, useContext, useEffect, useRef, useState } from 'react';
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
import FeatureStrategiesProductionGuard from '../FeatureStrategiesProductionGuard/FeatureStrategiesProductionGuard';
import useFeatureStrategiesEnvironmentList from './useFeatureStrategiesEnvironmentList';

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

    const {
        strategyParams,
        activeEnvironmentsRef,
        toast,
        onSetStrategyParams,
        deleteStrategy,
        updateStrategy,
        delDialog,
        setDelDialog,
        setProductionGuard,
        productionGuard,
        setConfigureNewStrategy,
        configureNewStrategy,
        setExpandedSidebar,
        expandedSidebar,
        featureId,
    } = useFeatureStrategiesEnvironmentList(strategies);

    const resolveUpdateStrategy = (strategyId: string) => {
        if (activeEnvironmentsRef?.current?.type === 'production') {
            setProductionGuard({ show: true, strategyId });
            return;
        }

        updateStrategy(strategyId);
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
                        <FeatureStrategyAccordion
                            strategy={strategy}
                            setStrategyParams={onSetStrategyParams}
                            index={index}
                            setDelDialog={setDelDialog}
                            edit
                            dirty={strategyParams[strategy.id]?.dirty}
                            updateStrategy={resolveUpdateStrategy}
                        />
                        <FeatureStrategiesSeparator text="OR" />
                    </Fragment>
                );
            } else {
                return (
                    <FeatureStrategyAccordion
                        strategy={strategy}
                        setStrategyParams={onSetStrategyParams}
                        index={index}
                        key={strategy.id}
                        setDelDialog={setDelDialog}
                        edit
                        dirty={strategyParams[strategy.id]?.dirty}
                        updateStrategy={resolveUpdateStrategy}
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
                    <FeatureStrategiesProductionGuard
                        primaryButtonText="Update strategy"
                        show={productionGuard.show}
                        onClick={() => {
                            updateStrategy(productionGuard.strategyId);
                            setProductionGuard({
                                show: false,
                                strategyId: '',
                            });
                        }}
                        onClose={() =>
                            setProductionGuard({ show: false, strategyId: '' })
                        }
                    />
                </div>
            }
        />
    );
};

export default FeatureStrategiesEnvironmentList;
