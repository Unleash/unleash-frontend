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

    const handleEdit = () => {
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
                    onClick={handleEdit}
                >
                    <Edit />
                </PermissionIconButton>
            </div>
            <Typography>
                Name:&nbsp;<b>{feature?.name}</b>
            </Typography>
            <Typography>
                Description:&nbsp;
                <b>
                    {feature?.description.length === 0
                        ? 'No description'
                        : feature?.description}
                </b>
            </Typography>
            <Typography>
                Type:&nbsp;<b>{feature?.type}</b>
            </Typography>
            <Typography>
                Impression Data:&nbsp;
                <b>{String(feature?.impressionData)}</b>
            </Typography>
        </>
    );
};
