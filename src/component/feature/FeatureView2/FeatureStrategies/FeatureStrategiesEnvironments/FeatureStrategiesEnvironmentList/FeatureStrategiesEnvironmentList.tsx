import { IFeatureStrategy } from '../../../../../../interfaces/strategy';
import { FEATURE_STRATEGIES_DRAG_TYPE } from '../../FeatureStrategiesList/FeatureStrategyCard/FeatureStrategyCard';
import { DropTargetMonitor, useDrop } from 'react-dnd';
import { Fragment } from 'react';
import useStrategies from '../../../../../../hooks/api/getters/useStrategies/useStrategies';
import { useStyles } from './FeatureStrategiesEnvironmentList.styles';
import classnames from 'classnames';
import ConditionallyRender from '../../../../../common/ConditionallyRender';

import FeatureStrategiesSeparator from '../FeatureStrategiesSeparator/FeatureStrategiesSeparator';
import useFeatureStrategiesEnvironmentList from './useFeatureStrategiesEnvironmentList';
import useDropboxMarkup from './useDropboxMarkup';
import useDeleteStrategyMarkup from './useDeleteStrategyMarkup';
import useProductionGuardMarkup from './useProductionGuardMarkup';
import FeatureStrategyEditable from '../FeatureStrategyEditable/FeatureStrategyEditable';
import { PRODUCTION } from '../../../../../../constants/environmentTypes';
import { getStrategyObject } from '../../../../../../utils/get-strategy-object';

interface IFeatureStrategiesEnvironmentListProps {
    strategies: IFeatureStrategy[];
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
        activeEnvironmentsRef,
        toast,
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

    const [{ isOver }, drop] = useDrop({
        accept: FEATURE_STRATEGIES_DRAG_TYPE,
        collect(monitor) {
            return {
                isOver: monitor.isOver(),
            };
        },
        drop(item: IFeatureDragItem, monitor: DropTargetMonitor) {
            const strategy = getStrategyObject(
                selectableStrategies,
                item.name,
                featureId
            );
            if (!strategy) return;
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
            productionGuard.callback();
            setProductionGuard({
                show: false,
                strategy: null,
            });
        },
        onClose: () =>
            setProductionGuard({ show: false, strategy: null, callback: null }),
    });

    const resolveUpdateStrategy = (strategy: IFeatureStrategy, callback) => {
        if (activeEnvironmentsRef?.current?.type === PRODUCTION) {
            setProductionGuard({ show: true, strategy, callback });
            return;
        }

        updateStrategy(strategy);
    };

    const renderStrategies = () => {
        return strategies.map((strategy, index) => {
            if (index !== strategies.length - 1) {
                return (
                    <Fragment key={strategy.id}>
                        <FeatureStrategyEditable
                            currentStrategy={strategy}
                            setDelDialog={setDelDialog}
                            updateStrategy={resolveUpdateStrategy}
                            index={index}
                        />

                        <FeatureStrategiesSeparator text="OR" />
                    </Fragment>
                );
            } else {
                return (
                    <FeatureStrategyEditable
                        key={strategy.id}
                        setDelDialog={setDelDialog}
                        currentStrategy={strategy}
                        updateStrategy={resolveUpdateStrategy}
                        index={index}
                    />
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
