import FeatureViewMetaData from './FeatureViewMetaData/FeatureViewMetaData';
import FeatureOverviewStrategies from './FeatureOverviewStrategies/FeatureOverviewStrategies';
import { useStyles } from './FeatureOverview.styles';
import FeatureOverviewTags from './FeatureOverviewTags/FeatureOverviewTags';
import FeatureEnvironmentMetrics from './FeatureEnvironmentMetrics/FeatureEnvironmentMetrics';

const FeatureOverview = () => {
    const styles = useStyles();
    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <FeatureViewMetaData />
                <FeatureOverviewTags />
            </div>
            <div className={styles.mainContent}>
                <div className={styles.trafficContainer}>
                    <FeatureEnvironmentMetrics />
                    <FeatureEnvironmentMetrics />
                </div>
                <FeatureOverviewStrategies />
            </div>
        </div>
    );
};

export default FeatureOverview;
