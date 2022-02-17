import { FeatureMetricsHour } from './FeatureMetricsHours';

export const parseFeatureMetricsHour = (value: unknown): FeatureMetricsHour => {
    switch (value) {
        case '1':
            return 1;
        case '24':
            return 24;
        default:
            return 48;
    }
};
