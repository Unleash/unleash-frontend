import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
} from '@material-ui/core';
import { Cloud, ExpandMore } from '@material-ui/icons';
import { useParams } from 'react-router';
import useFeature from '../../../../../../hooks/api/getters/useFeature/useFeature';
import useFeatureMetrics from '../../../../../../hooks/api/getters/useFeatureMetrics/useFeatureMetrics';
import { IFeatureEnvironment } from '../../../../../../interfaces/featureToggle';
import { IFeatureViewParams } from '../../../../../../interfaces/params';
import { calculatePercentage } from '../../../../../../utils/calculate-percentage';
import { getFeatureMetrics } from '../../../../../../utils/get-feature-metrics';
import FeatureEnvironmentMetrics from '../../FeatureEnvironmentMetrics/FeatureEnvironmentMetrics';

import { useStyles } from './FeatureOverviewEnvironment.styles';
import FeatureOverviewEnvironmentMetrics from './FeatureOverviewEnvironmentMetrics/FeatureOverviewEnvironmentMetrics';
import FeatureOverviewEnvironmentStrategies from './FeatureOverviewEnvironmentStrategies/FeatureOverviewEnvironmentStrategies';

interface IFeatureOverviewEnvironmentProps {
    env: IFeatureEnvironment;
}

const FeatureOverviewEnvironment = ({
    env,
}: IFeatureOverviewEnvironmentProps) => {
    const styles = useStyles();
    const { projectId, featureId } = useParams<IFeatureViewParams>();
    const { metrics } = useFeatureMetrics(projectId, featureId);
    const { feature } = useFeature(projectId, featureId);

    const featureMetrics = getFeatureMetrics(feature?.environments, metrics);
    const environmentMetric = featureMetrics.find(
        featureMetric => featureMetric.environment === env.name
    );
    const featureEnvironment = feature?.environments.find(
        featureEnvironment => featureEnvironment.name === env.name
    );

    const getOverviewText = () => {
        if (env.enabled) {
            return `${environmentMetric?.yes} received this feature
                                because the following strategies are executing`;
        }
        return `This environment is disabled, which means that none of your strategies are executing`;
    };

    const totalTraffic = environmentMetric.yes + environmentMetric.no;

    return (
        <div className={styles.featureOverviewEnvironment}>
            <Accordion style={{ boxShadow: 'none' }}>
                <AccordionSummary
                    className={styles.accordionHeader}
                    expandIcon={<ExpandMore />}
                >
                    <div className={styles.headerTitle}>
                        <div className={styles.iconContainer}>
                            <Cloud className={styles.icon} />
                        </div>
                        Toggle execution for {env.name}
                    </div>

                    <FeatureOverviewEnvironmentMetrics
                        environmentMetric={environmentMetric}
                    />
                </AccordionSummary>

                <AccordionDetails>
                    <div className={styles.accordionContainer}>
                        <div className={styles.accordionBody}>
                            <div className={styles.accordionBodyInnerContainer}>
                                <div className={styles.resultInfo}>
                                    {getOverviewText()}
                                </div>
                                <FeatureOverviewEnvironmentStrategies
                                    strategies={featureEnvironment.strategies}
                                    environmentName={env.name}
                                />
                            </div>
                        </div>
                        <div className={styles.accordionBodyFooter}>
                            <div className={styles.resultInfo}>Result</div>
                            <FeatureEnvironmentMetrics
                                metric={environmentMetric}
                            />
                            <div className={styles.requestContainer}>
                                Total requests {totalTraffic}
                                <div className={styles.percentageContainer}>
                                    {calculatePercentage(
                                        totalTraffic,
                                        environmentMetric.yes
                                    )}
                                    %
                                </div>
                                <p className={styles.requestText}>
                                    Received enabled for this feature in this
                                    environment in the last hour.
                                </p>
                            </div>
                        </div>
                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
    );
};

export default FeatureOverviewEnvironment;
