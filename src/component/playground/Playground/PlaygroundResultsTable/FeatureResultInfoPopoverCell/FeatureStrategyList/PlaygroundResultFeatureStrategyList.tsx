import {
    PlaygroundResultStrategyLists,
    WrappedPlaygroundResultStrategyList,
} from './StrategyList/playgroundResultStrategyLists';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
import {
    PlaygroundFeatureSchema,
    PlaygroundRequestSchema,
} from 'component/playground/Playground/interfaces/playground.model';

interface PlaygroundResultFeatureStrategyListProps {
    feature: PlaygroundFeatureSchema;
    input?: PlaygroundRequestSchema;
}

export const PlaygroundResultFeatureStrategyList = ({
    feature,
    input,
}: PlaygroundResultFeatureStrategyListProps) => {
    return (
        <>
            <ConditionallyRender
                condition={
                    !feature.isEnabledInCurrentEnvironment &&
                    Boolean(feature?.strategies?.data)
                }
                elseShow={
                    <PlaygroundResultStrategyLists
                        strategies={feature?.strategies?.data || []}
                        input={input}
                    />
                }
                show={
                    <WrappedPlaygroundResultStrategyList
                        strategies={feature?.strategies}
                        input={input}
                    />
                }
            />
        </>
    );
};
