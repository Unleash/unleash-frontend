import { Chip } from '@material-ui/core';
import { FeatureMetricsChips } from '../FeatureMetricsChips/FeatureMetricsChips';
import { FeatureMetricsChipsItem } from '../FeatureMetricsChips/FeatureMetricsChipsItem';

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
        <FeatureMetricsChips title="Environments">
            {Array.from(environments).map(env => (
                <FeatureMetricsChipsItem key={env}>
                    <Chip
                        label={env}
                        onClick={onClick(env)}
                        aria-pressed={env === environment}
                    />
                </FeatureMetricsChipsItem>
            ))}
        </FeatureMetricsChips>
    );
};
