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

export const FeatureMetricsContent = ({
    metrics,
    hoursBack,
}: IFeatureMetricsContentProps) => {
    if (metrics.length === 0) {
        return <FeatureMetricsEmpty />;
    }

    return (
        <>
            <Box>
                <FeatureMetricsChart metrics={metrics} />
            </Box>
            <Box mt={4}>
                <FeatureMetricsStatsRaw
                    metrics={metrics}
                    hoursBack={hoursBack}
                />
            </Box>
            <Box mt={4}>
                <FeatureMetricsTable metrics={metrics} />
            </Box>
        </>
    );
};
