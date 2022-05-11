import {
    IFeatureEnvironment,
    IFeatureMetrics,
} from '../interfaces/featureToggle';

export const getFeatureMetrics = (
    environments: IFeatureEnvironment[] | undefined,
    metrics: IFeatureMetrics
) => {
    return environments?.map(env => {
        const envMetric = metrics.lastHourUsage.find(
            metric => metric.environment === env.name
        );
        return envMetric || emptyMetric(env.name);
    });
};

const emptyMetric = (environment: string) => ({
    yes: 0,
    no: 0,
    environment,
    timestamp: '',
});
