import { Chip } from '@material-ui/core';
import {
    FeatureMetricsChips,
    FeatureMetricsChipsItem,
} from './FeatureMetricsChips';

interface IFeatureMetricsEnvironmentProps {
    environments: Set<string>;
    environment?: string;
    setEnvironment: (value: string) => void;
}

export const FeatureMetricsEnvironment = ({
    environments,
    environment,
    setEnvironment,
}: IFeatureMetricsEnvironmentProps) => {
    const onClick = (environment: string) => () => {
        if (environments.has(environment)) {
            setEnvironment(environment);
        }
    };

    return (
        <FeatureMetricsChips>
            {Array.from(environments).map(e => (
                <FeatureMetricsChipsItem key={e}>
                    <Chip
                        label={e}
                        onClick={onClick(e)}
                        aria-pressed={e === environment}
                    />
                </FeatureMetricsChipsItem>
            ))}
        </FeatureMetricsChips>
    );
};
