import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
import { StrategySeparator } from 'component/common/StrategySeparator/StrategySeparator';
import { MoveListItem, useDragItem } from 'hooks/useDragItem';
import { IFeatureEnvironment } from 'interfaces/featureToggle';
import { IFeatureStrategy } from 'interfaces/strategy';
import { StrategyItem } from './StrategyItem/StrategyItem';

interface IStrategyDraggableItemProps {
    strategy: IFeatureStrategy;
    environmentName: string;
    index: number;
    otherEnvironments?: IFeatureEnvironment['name'][];
    onDragAndDrop: MoveListItem;
}

export const StrategyDraggableItem = ({
    strategy,
    index,
    environmentName,
    otherEnvironments,
    onDragAndDrop,
}: IStrategyDraggableItemProps) => {
    const ref = useDragItem(index, onDragAndDrop);

    return (
        <div key={strategy.id} ref={ref}>
            <ConditionallyRender
                condition={index > 0}
                show={<StrategySeparator text="OR" />}
            />
            <StrategyItem
                strategy={strategy}
                environmentId={environmentName}
                otherEnvironments={otherEnvironments}
                isDraggable
            />
        </div>
    );
};
