import { IFeatureMetricsRaw } from '../../../../../interfaces/featureToggle';
import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    TimeScale,
    Tooltip,
} from 'chart.js';
import { useLocationSettings } from '../../../../../hooks/useLocationSettings';
import { FEATURE_METRICS_TABLE_ID } from '../FeatureMetricsTable/FeatureMetricsTable';
import 'chartjs-adapter-date-fns';
import { createChartData } from './createChartData';
import { createChartOptions } from './createChartOptions';

interface IFeatureMetricsChartProps {
    metrics: IFeatureMetricsRaw[];
}

export const FeatureMetricsChart = ({ metrics }: IFeatureMetricsChartProps) => {
    const { locationSettings } = useLocationSettings();

    const sortedMetrics = useMemo(() => {
        return [...metrics].sort((metricA, metricB) => {
            return metricA.timestamp.localeCompare(metricB.timestamp);
        });
    }, [metrics]);

    const options = useMemo(() => {
        return createChartOptions(locationSettings);
    }, [locationSettings]);

    const data = useMemo(() => {
        return createChartData(sortedMetrics, locationSettings);
    }, [sortedMetrics, locationSettings]);

    return (
        <div style={{ height: 300 }}>
            <Line
                options={options}
                data={data}
                aria-label="Metrics chart"
                aria-describedby={FEATURE_METRICS_TABLE_ID}
            />
        </div>
    );
};

// Register dependencies that we need to draw the chart.
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    TimeScale,
    Legend,
    Tooltip
);
