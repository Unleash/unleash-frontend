import { Chip } from '@material-ui/core';
import {
    FeatureMetricsChips,
    FeatureMetricsChipsItem,
} from './FeatureMetricsChips';

export const FeatureMetricsEnvironment = (props: {
    environments: Set<string>;
    environment?: string;
    setEnvironment: (value: string) => void;
}) => {
    const onClick = (environment: string) => () => {
        if (props.environments.has(environment)) {
            props.setEnvironment(environment);
        }
    };

    return (
        <FeatureMetricsChips>
            {Array.from(props.environments).map(e => (
                <FeatureMetricsChipsItem key={e}>
                    <Chip
                        label={e}
                        onClick={onClick(e)}
                        aria-pressed={e === props.environment}
                    />
                </FeatureMetricsChipsItem>
            ))}
        </FeatureMetricsChips>
    );
};
