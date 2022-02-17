import { ILocationSettings } from '../../../../../hooks/useLocationSettings';
import 'chartjs-adapter-date-fns';
import { ChartOptions, defaults } from 'chart.js';
import { formatTimeWithLocale } from '../../../../common/util';

export const createChartOptions = (
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

// Set the default font for ticks, legends, tooltips, etc.
defaults.font = {
    ...defaults.font,
    family: 'Sen',
    size: 13,
    weight: '400',
};
