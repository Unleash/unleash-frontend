import {
    IParameter,
    IStrategy,
    IStrategyPayload,
} from '../../../../../../interfaces/strategy';
import { FEATURE_STRATEGIES_DRAG_TYPE } from '../../FeatureStrategiesList/FeatureStrategyCard/FeatureStrategyCard';
import FeatureStrategyAccordion from '../../FeatureStrategyAccordion/FeatureStrategyAccordion';
import { useDrop, DropTargetMonitor } from 'react-dnd';
import { Fragment, useEffect } from 'react';
import { resolveDefaultParamValue } from '../../../../strategy/AddStrategy/utils';
import useStrategies from '../../../../../../hooks/api/getters/useStrategies/useStrategies';
import { useStyles } from './FeatureStrategiesEnvironmentList.styles';
import classnames from 'classnames';
import ConditionallyRender from '../../../../../common/ConditionallyRender';

import FeatureStrategiesSeparator from '../FeatureStrategiesSeparator/FeatureStrategiesSeparator';
import useFeatureStrategiesEnvironmentList from './useFeatureStrategiesEnvironmentList';
import useDropboxMarkup from './useDropboxMarkup';
import useDeleteStrategyMarkup from './useDeleteStrategyMarkup';
import useProductionGuardMarkup from './useProductionGuardMarkup';
import useFeatureStrategy from '../../../../../../hooks/api/getters/useFeatureStrategy/useFeatureStrategy';
import FeatureStrategyEditable from '../FeatureStrategyEditable/FeatureStrategyEditable';

interface IFeatureStrategiesEnvironmentListProps {
    strategies: IStrategy[];
}

interface IFeatureDragItem {
    name: string;
}

const FeatureStrategiesEnvironmentList = ({
    strategies,
}: IFeatureStrategiesEnvironmentListProps) => {
    const styles = useStyles();
    const { strategies: selectableStrategies } = useStrategies();

    const {
        strategyParams,
        activeEnvironmentsRef,
        toast,
        onSetStrategyParams,
        onSetStrategyConstraints,
        deleteStrategy,
        updateStrategy,
        delDialog,
        setDelDialog,
        setProductionGuard,
        productionGuard,
        setConfigureNewStrategy,
        originalParams,
        configureNewStrategy,
        setExpandedSidebar,
        expandedSidebar,
        discardChanges,
        featureId,
    } = useFeatureStrategiesEnvironmentList(strategies);

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

    const dropboxMarkup = useDropboxMarkup(isOver, expandedSidebar);
    const delDialogueMarkup = useDeleteStrategyMarkup({
        show: delDialog.show,
        onClick: () => deleteStrategy(delDialog.strategyId),
        onClose: () => setDelDialog({ show: false, strategyId: '' }),
    });
    const productionGuardMarkup = useProductionGuardMarkup({
        show: productionGuard.show,
        onClick: () => {
            updateStrategy(productionGuard.strategy);
            setProductionGuard({
                show: false,
                strategy: null,
            });
        },
        onClose: () => setProductionGuard({ show: false, strategy: null }),
    });

    const resolveUpdateStrategy = (strategy: IStrategy) => {
        if (activeEnvironmentsRef?.current?.type === 'production') {
            setProductionGuard({ show: true, strategy });
            return;
        }

        updateStrategy(strategy);
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

    const renderStrategies = () => {
        return strategies.map((strategy, index) => {
            if (index !== strategies.length - 1) {
                return (
                    <Fragment key={strategy.id}>
                        <FeatureStrategyEditable
                            currentStrategy={strategy}
                            updateStrategy={resolveUpdateStrategy}
                        />
                        {/* <FeatureStrategyAccordion
                            strategy={strategy}
                            setStrategyParams={onSetStrategyParams(strategy.id)}
                            index={index}
                            originalParams={originalParams[strategy.id]}
                            setDelDialog={setDelDialog}
                            edit
                            dirty={strategyParams[strategy.id]?.dirty}
                            updateStrategy={resolveUpdateStrategy}
                            discardChanges={discardChanges}
                            setStrategyConstraints={onSetStrategyConstraints(
                                strategy.id
                            )}
                        /> */}
                        <FeatureStrategiesSeparator text="OR" />
                    </Fragment>
                );
            } else {
                return (
                    <FeatureStrategyEditable
                        key={strategy.id}
                        currentStrategy={strategy}
                        updateStrategy={resolveUpdateStrategy}
                    />

                    // <FeatureStrategyAccordion
                    //     strategy={strategy}
                    //     originalParams={originalParams[strategy.id]}
                    //     setStrategyParams={onSetStrategyParams(strategy.id)}
                    //     index={index}
                    //     key={strategy.id}
                    //     setDelDialog={setDelDialog}
                    //     edit
                    //     discardChanges={discardChanges}
                    //     dirty={strategyParams[strategy.id]?.dirty}
                    //     updateStrategy={resolveUpdateStrategy}
                    //     setStrategyConstraints={onSetStrategyConstraints(
                    //         strategy.id
                    //     )}
                    // />
                );
            }
        });
    };

    const classes = classnames(styles.container, {
        [styles.isOver]: isOver,
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
                    {dropboxMarkup}
                    {toast}
                    {delDialogueMarkup}
                    {productionGuardMarkup}
                </div>
            }
        />
    );
};

export default FeatureStrategiesEnvironmentList;
