import { Add } from '@material-ui/icons';
import { Link, useParams } from 'react-router-dom';
import useFeature from '../../../../../hooks/api/getters/useFeature/useFeature';
import { IFeatureViewParams } from '../../../../../interfaces/params';
import ResponsiveButton from '../../../../common/ResponsiveButton/ResponsiveButton';
import { UPDATE_FEATURE } from '../../../../providers/AccessProvider/permissions';
import FeatureOverviewEnvironment from './FeatureOverviewEnvironment/FeatureOverviewEnvironment';

const FeatureOverviewEnvironments = () => {
    const { projectId, featureId } = useParams<IFeatureViewParams>();
    const { feature } = useFeature(projectId, featureId);

    if (!feature) return null;

    const { environments } = feature;

    const renderEnvironments = () => {
        return environments?.map(env => {
            return <FeatureOverviewEnvironment env={env} key={env.name} />;
        });
    };

    return <div>{renderEnvironments()}</div>;
};

export default FeatureOverviewEnvironments;
