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
import { getFeatureMetrics } from '../../../../../../utils/get-feature-metrics';

import { useStyles } from './FeatureOverviewEnvironment.styles';
import FeatureOverviewEnvironmentMetrics from './FeatureOverviewEnvironmentMetrics/FeatureOverviewEnvironmentMetrics';

interface IFeatureOverviewEnvironmentProps {
    env: IFeatureEnvironment;
}

const emptyMetric = (environment: string) => ({
    yes: 0,
    no: 0,
    environment,
    timestamp: '',
});

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

                <AccordionDetails>Hello world</AccordionDetails>
            </Accordion>
        </div>
    );
};

export default FeatureOverviewEnvironment;
