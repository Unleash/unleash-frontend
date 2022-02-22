import { Typography } from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import useFeature from '../../../../../hooks/api/getters/useFeature/useFeature';
import PermissionIconButton from '../../../../common/PermissionIconButton/PermissionIconButton';
import { UPDATE_FEATURE } from '../../../../providers/AccessProvider/permissions';

interface IFeatureSettingsInformationProps {
    projectId: string;
    featureId: string;
}

export const FeatureSettingsInformation = ({
    projectId,
    featureId,
}: IFeatureSettingsInformationProps) => {
    const { feature } = useFeature(projectId, featureId);
    const history = useHistory();

    const onEdit = () => {
        history.push(`/projects/${projectId}/features/${featureId}/edit`);
    };

    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h5" component="div">
                    Feature information
                </Typography>
                <PermissionIconButton
                    permission={UPDATE_FEATURE}
                    tooltip={'Edit feature'}
                    projectId={projectId}
                    data-loading
                    onClick={onEdit}
                >
                    <Edit titleAccess="Edit" />
                </PermissionIconButton>
            </div>
            <Typography>
                Name:&nbsp;<strong>{feature?.name}</strong>
            </Typography>
            <Typography>
                Description:&nbsp;
                <strong>
                    {feature?.description.length === 0
                        ? 'no description'
                        : feature?.description}
                </strong>
            </Typography>
            <Typography>
                Type:&nbsp;<strong>{feature?.type}</strong>
            </Typography>
            <Typography>
                Impression Data:&nbsp;
                <strong>
                    {feature?.impressionData ? 'enabled' : 'disabled'}
                </strong>
            </Typography>
        </>
    );
};
