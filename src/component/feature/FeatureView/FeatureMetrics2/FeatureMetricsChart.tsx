import { IFeatureMetricsRaw } from '../../../../interfaces/featureToggle';
import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import {
    CategoryScale,
    Chart as ChartJS,
    ChartData,
    ChartOptions,
    defaults,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    TimeScale,
    Tooltip,
} from 'chart.js';
import {
    ILocationSettings,
    useLocationSettings,
} from '../../../../hooks/useLocationSettings';
import theme from '../../../../themes/main-theme';
import { FEATURE_METRICS_TABLE_ID } from './FeatureMetricsTable';
import 'chartjs-adapter-date-fns';
import { formatTimeWithLocale } from '../../../common/util';

interface IPoint {
    x: string;
    y: number;
}

interface IFeatureMetricsChartProps {
    metrics: IFeatureMetricsRaw[];
}

export const FeatureMetricsChart = (props: IFeatureMetricsChartProps) => {
    const { locationSettings } = useLocationSettings();

    const sortedMetrics = useMemo(() => {
        return [...props.metrics].sort((a, b) => {
            return a.timestamp.localeCompare(b.timestamp);
        });
    }, [props.metrics]);

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

const createChartData = (
    metrics: IFeatureMetricsRaw[],
    locationSettings: ILocationSettings
): ChartData<'line', IPoint[], string> => {
    const requestsSeries = {
        label: 'Requests',
        borderColor: theme.palette.primary.light,
        backgroundColor: theme.palette.primary.light,
        data: createChartPoints(metrics, locationSettings, m => m.yes + m.no),
    };

    const yesSeries = {
        label: 'Exposed',
        borderColor: theme.palette.success.light,
        backgroundColor: theme.palette.success.light,
        data: createChartPoints(metrics, locationSettings, m => m.yes),
    };

    const noSeries = {
        label: 'Not exposed',
        borderColor: theme.palette.error.light,
        backgroundColor: theme.palette.error.light,
        data: createChartPoints(metrics, locationSettings, m => m.no),
    };

    return { datasets: [yesSeries, noSeries, requestsSeries] };
};

const createChartPoints = (
    metrics: IFeatureMetricsRaw[],
    locationSettings: ILocationSettings,
    y: (m: IFeatureMetricsRaw) => number
): IPoint[] => {
    const points = metrics.map(m => ({
        x: m.timestamp,
        y: y(m),
    }));

    return points.filter(p => p.y > 0);
};

const createChartOptions = (
    locationSettings: ILocationSettings
): ChartOptions<'line'> => {
    const formatTimestamp = (value: string | number) => {
        return formatTimeWithLocale(value, locationSettings.locale);
    };

    return {
        locale: locationSettings.locale,
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            tooltip: {
                mode: 'index',
                intersect: false,
                callbacks: {
                    title: items => formatTimestamp(items[0].parsed.x),
                },
            },
            legend: {
                position: 'bottom',
                align: 'end',
            },
        },
        scales: {
            y: {
                type: 'linear',
                ticks: {
                    precision: 0,
                },
            },
            x: {
                type: 'time',
                time: {
                    unit: 'hour',
                },
                grid: {
                    display: false,
                },
                ticks: {
                    callback: (_, i, data) => formatTimestamp(data[i].value),
                },
            },
        },
    };
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

// Set the default font for ticks, legends, tooltips, etc.
defaults.font = {
    ...defaults.font,
    family: 'Sen',
    size: 13,
    weight: '400',
};
