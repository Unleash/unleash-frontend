import { IFeatureMetricsRaw } from '../../../../../interfaces/featureToggle';
import { ChartData } from 'chart.js';
import { ILocationSettings } from '../../../../../hooks/useLocationSettings';
import theme from '../../../../../themes/main-theme';
import 'chartjs-adapter-date-fns';

interface IPoint {
    x: string;
    y: number;
}

export const createChartData = (
    metrics: IFeatureMetricsRaw[],
    locationSettings: ILocationSettings
): ChartData<'line', IPoint[], string> => {
    const requestsSeries = {
        label: 'Total requests',
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
    const points = metrics.map(metric => ({
        x: metric.timestamp,
        y: y(metric),
    }));

    return points.filter(point => point.y > 0);
};
