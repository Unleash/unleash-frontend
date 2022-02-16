import {
    FeatureMetricsChips,
    FeatureMetricsChipsItem,
} from './FeatureMetricsChips';
import { Chip } from '@material-ui/core';

export const FeatureMetricsApplication = (props: {
    applications: Set<string>;
    application?: string;
    setApplication: (value: string) => void;
}) => {
    const onClick = (application: string) => () => {
        if (props.applications.has(application)) {
            props.setApplication(application);
        }
    };

    return (
        <FeatureMetricsChips>
            {Array.from(props.applications).map(a => (
                <FeatureMetricsChipsItem key={a}>
                    <Chip
                        label={a}
                        onClick={onClick(a)}
                        aria-pressed={a === props.application}
                    />
                </FeatureMetricsChipsItem>
            ))}
        </FeatureMetricsChips>
    );
};
