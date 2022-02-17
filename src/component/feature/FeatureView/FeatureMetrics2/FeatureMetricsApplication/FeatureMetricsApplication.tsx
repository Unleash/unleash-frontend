import { FeatureMetricsChips } from '../FeatureMetricsChips/FeatureMetricsChips';
import { Chip } from '@material-ui/core';
import { FeatureMetricsChipsItem } from '../FeatureMetricsChips/FeatureMetricsChipsItem';

interface IFeatureMetricsApplicationProps {
    applications: Set<string>;
    application?: string;
    setApplication: (value: string) => void;
}

export const FeatureMetricsApplication = ({
    applications,
    application,
    setApplication,
}: IFeatureMetricsApplicationProps) => {
    const onClick = (application: string) => () => {
        if (applications.has(application)) {
            setApplication(application);
        }
    };

    return (
        <FeatureMetricsChips title="Applications">
            {Array.from(applications).map(app => (
                <FeatureMetricsChipsItem key={app}>
                    <Chip
                        label={app}
                        onClick={onClick(app)}
                        aria-pressed={app === application}
                    />
                </FeatureMetricsChipsItem>
            ))}
        </FeatureMetricsChips>
    );
};
