import { FeatureMetricsTable } from './FeatureMetricsTable';
import { IFeatureMetricsRaw } from '../../../../interfaces/featureToggle';
import { FeatureMetricsStatsRaw } from './FeatureMetricsStats';
import { FeatureMetricsChart } from './FeatureMetricsChart';
import { FeatureMetricsEmpty } from './FeatureMetricsEmpty';
import { Box } from '@material-ui/core';

interface IFeatureMetricsContentProps {
    metrics: IFeatureMetricsRaw[];
    hoursBack: number;
}

export const FeatureMetricsContent = (props: IFeatureMetricsContentProps) => {
    if (props.metrics.length === 0) {
        return <FeatureMetricsEmpty />;
    }

    return (
        <>
            <Box>
                <FeatureMetricsChart metrics={props.metrics} />
            </Box>
            <Box mt={4}>
                <FeatureMetricsStatsRaw
                    metrics={props.metrics}
                    hoursBack={props.hoursBack}
                />
            </Box>
            <Box mt={4}>
                <FeatureMetricsTable metrics={props.metrics} />
            </Box>
        </>
    );
};
