import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import useFeature from '../../../../../hooks/api/getters/useFeature/useFeature';
import { IFeatureViewParams } from '../../../../../interfaces/params';
import FeatureEnvironmentMetrics from '../FeatureEnvironmentMetrics/FeatureEnvironmentMetrics';
import { useStyles } from './FeatureOverviewMetrics.styles';
import useFeatureMetrics from '../../../../../hooks/api/getters/useFeatureMetrics/useFeatureMetrics';
import { IFeatureEnvironmentMetrics } from '../../../../../interfaces/featureToggle';

const FeatureOverviewMetrics = () => {
    const styles = useStyles();
    const { projectId, featureId } = useParams<IFeatureViewParams>();
    const { feature } = useFeature(projectId, featureId);
    const { metrics } = useFeatureMetrics(projectId, featureId);
    const [featureMetrics, setFeatureMetrics] = useState<IFeatureEnvironmentMetrics[]>(
        []
    );

    useEffect(() => {
        const featureMetricList = feature?.environments.map(env => {
            const metric = metrics.lastHourUsage.find(
                metric => metric.environment === env.name
            );

            if (!metric) {
                return {
                    environment: env.name,
                    yes: 0,
                    no: 0,
                    timestamp: '',
                };
            }

            return metric;
        });

        setFeatureMetrics(featureMetricList);
        /* Update on useSWR metrics change */
        /* eslint-disable-next-line */
    }, [metrics]);

    const renderFeatureMetrics = () => {
        if (featureMetrics.length === 0) {
            return null;
        }

        if (featureMetrics.length === 1) {
            return (
                <FeatureEnvironmentMetrics
                    primaryMetric
                    metric={featureMetrics[0]}
                />
            );
        }

        if (featureMetrics.length === 2) {
            return featureMetrics.map((metric, index) => {
                if (index === 0) {
                    return (
                        <FeatureEnvironmentMetrics
                            className={styles.firstContainer}
                            key={metric.name}
                            metric={metric}
                        />
                    );
                }
                return (
                    <FeatureEnvironmentMetrics
                        key={metric.name}
                        metric={metric}
                    />
                );
            });
        }

        /* We display maxium three environments metrics */
        if (featureMetrics.length >= 3) {
            return featureMetrics.slice(0, 3).map((metric, index) => {
                if (index === 0) {
                    return (
                        <FeatureEnvironmentMetrics
                            primaryMetric
                            key={metric.name}
                            metric={metric}
                        />
                    );
                }

                if (index === 1) {
                    return (
                        <FeatureEnvironmentMetrics
                            className={styles.firstContainer}
                            key={metric.name}
                            metric={metric}
                        />
                    );
                }

                return (
                    <FeatureEnvironmentMetrics
                        key={metric.name}
                        metric={metric}
                    />
                );
            });
        }
    };

    return renderFeatureMetrics();
};

export default FeatureOverviewMetrics;
