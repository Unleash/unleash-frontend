import FeatureOverviewMetaData from './FeatureOverviewMetaData/FeatureOverviewMetaData';
import FeatureOverviewTags from './FeatureOverviewTags/FeatureOverviewTags';
import FeatureViewStale from './FeatureOverviewStale/FeatureOverviewStale';

import { useStyles } from './FeatureOverview.styles';
import FeatureOverviewEnvironments from './FeatureOverviewEnvironments/FeatureOverviewEnvironments';

const FeatureOverview = () => {
    const styles = useStyles();

    return (
        <div className={styles.container}>
            <div>
                <FeatureOverviewMetaData />
                <FeatureViewStale />
                <FeatureOverviewTags />
            </div>
            <div className={styles.mainContent}>
                <FeatureOverviewEnvironments />
                {/* <div className={styles.trafficContainer}>
                    <FeatureOverviewMetrics data-loading />
                </div>
                <FeatureOverviewStrategies data-loading /> */}
            </div>
        </div>
    );
};

export default FeatureOverview;
