import { useParams } from 'react-router';
import useFeature from '../../../../hooks/api/getters/useFeature/useFeature';
import MetricComponent from '../../view/metric-container';
import { useStyles } from './FeatureMetrics.styles';
import { IFeatureViewParams } from '../../../../interfaces/params';
import FeatureOverviewMetrics from '../FeatureOverview/FeatureOverviewMetrics/FeatureOverviewMetrics';
import FeatureSeenApplications from '../FeatureSeenApplications/FeatureSeenApplications';
import useUiConfig from '../../../../hooks/api/getters/useUiConfig/useUiConfig';
import ConditionallyRender from '../../../common/ConditionallyRender';

const FeatureMetrics = () => {
    const styles = useStyles();
    const { projectId, featureId } = useParams<IFeatureViewParams>();
    const { feature } = useFeature(projectId, featureId);
    const { uiConfig } = useUiConfig();
    const isEnterprise = uiConfig.flags.E;

    const environmentMetric = (<>
        <FeatureSeenApplications />
        <FeatureOverviewMetrics />
    </>);

    return (
        <div className={styles.container}>
            <ConditionallyRender condition={isEnterprise}
                                 show={environmentMetric}
                                 elseShow={<MetricComponent featureToggle={feature} />}
            />
        </div>
    );
};

export default FeatureMetrics;
