import { DragEventHandler, RefObject, useEffect, useState } from 'react';
import { Alert } from '@mui/material';
import useFeatureStrategyApi from 'hooks/api/actions/useFeatureStrategyApi/useFeatureStrategyApi';
import { formatUnknownError } from 'utils/formatUnknownError';
import useToast from 'hooks/useToast';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
import { StrategyDraggableItem } from './StrategyDraggableItem/StrategyDraggableItem';
import { IFeatureEnvironment } from 'interfaces/featureToggle';
import { FeatureStrategyEmpty } from 'component/feature/FeatureStrategy/FeatureStrategyEmpty/FeatureStrategyEmpty';
import { useRequiredPathParam } from 'hooks/useRequiredPathParam';
import { useStyles } from './EnvironmentAccordionBody.styles';
import { useFeature } from 'hooks/api/getters/useFeature/useFeature';

interface IEnvironmentAccordionBodyProps {
    isDisabled: boolean;
    featureEnvironment?: IFeatureEnvironment;
    otherEnvironments?: IFeatureEnvironment['name'][];
}

const EnvironmentAccordionBody = ({
    featureEnvironment,
    isDisabled,
    otherEnvironments,
}: IEnvironmentAccordionBodyProps) => {
    const projectId = useRequiredPathParam('projectId');
    const featureId = useRequiredPathParam('featureId');
    const { setStrategiesSortOrder } = useFeatureStrategyApi();
    const { setToastData, setToastApiError } = useToast();
    const { refetchFeature } = useFeature(projectId, featureId);
    const [strategies, setStrategies] = useState(
        featureEnvironment?.strategies || []
    );
    const [dragId, setDragId] = useState<string | null>(null);
    const { classes: styles } = useStyles();
    useEffect(() => {
        // Use state to enable drag and drop, but switch to API output when it arrives
        setStrategies(featureEnvironment?.strategies || []);
    }, [featureEnvironment?.strategies]);

    if (!featureEnvironment) {
        return null;
    }

    // FIXME: API
    // const onDragAndDrop = async (
    //     from: number,
    //     to: number,
    //     dropped?: boolean
    // ) => {
    //     if (from !== to && dropped) {
    //         const newStrategies = [...strategies];
    //         const movedStrategy = newStrategies.splice(from, 1)[0];
    //         newStrategies.splice(to, 0, movedStrategy);
    //         setStrategies(newStrategies);
    //         try {
    //             await setStrategiesSortOrder(
    //                 projectId,
    //                 featureId,
    //                 featureEnvironment.name,
    //                 [...newStrategies].map((strategy, sortOrder) => ({
    //                     id: strategy.id,
    //                     sortOrder,
    //                 }))
    //             );
    //             refetchFeature();
    //             setToastData({
    //                 title: 'Order of strategies updated',
    //                 type: 'success',
    //             });
    //         } catch (error: unknown) {
    //             setToastApiError(formatUnknownError(error));
    //         }
    //     }
    // };

    const onDragStartRef =
        (
            ref: RefObject<HTMLDivElement>,
            index: number
        ): DragEventHandler<HTMLButtonElement> =>
        event => {
            setDragId(strategies[index].id);

            if (ref?.current) {
                event.dataTransfer.effectAllowed = 'move';
                event.dataTransfer.setData('text/html', ref.current.outerHTML);
                event.dataTransfer.setDragImage(ref.current, 20, 20);
            }
        };

    const onDragOver = (id: string) => {
        if (dragId === null) return;
        const from = strategies.findIndex(strategy => strategy.id === dragId);
        const to = strategies.findIndex(strategy => strategy.id === id);
        const newStrategies = [...strategies];
        const movedStrategy = newStrategies.splice(from, 1)[0];
        newStrategies.splice(to, 0, movedStrategy);
        if (movedStrategy.id !== id) {
            setStrategies(newStrategies);
        }
    };

    const onDragEnd = () => {
        setDragId(null);
    };

    return (
        <div className={styles.accordionBody}>
            <div className={styles.accordionBodyInnerContainer}>
                <ConditionallyRender
                    condition={strategies.length > 0 && isDisabled}
                    show={() => (
                        <Alert severity="warning" sx={{ mb: 2 }}>
                            This environment is disabled, which means that none
                            of your strategies are executing.
                        </Alert>
                    )}
                />
                <ConditionallyRender
                    condition={strategies.length > 0}
                    show={
                        <>
                            {strategies.map((strategy, index) => (
                                <StrategyDraggableItem
                                    key={strategy.id}
                                    strategy={strategy}
                                    index={index}
                                    environmentName={featureEnvironment.name}
                                    otherEnvironments={otherEnvironments}
                                    isDragging={dragId === strategy.id}
                                    onDragStartRef={onDragStartRef}
                                    onDragOver={() => onDragOver(strategy.id)}
                                    onDragEnd={onDragEnd}
                                />
                            ))}
                        </>
                    }
                    elseShow={
                        <FeatureStrategyEmpty
                            projectId={projectId}
                            featureId={featureId}
                            environmentId={featureEnvironment.name}
                        />
                    }
                />
            </div>
        </div>
    );
};

export default EnvironmentAccordionBody;
