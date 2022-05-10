import { VFC } from 'react';
import useToggleFeatureByEnv from 'hooks/api/actions/useToggleFeatureByEnv/useToggleFeatureByEnv';
import { IFeatureToggleListItem } from 'interfaces/featureToggle';
import useToast from 'hooks/useToast';
import useProject from 'hooks/api/getters/useProject/useProject';
import { ENVIRONMENT_STRATEGY_ERROR } from 'constants/apiErrors';
import PermissionSwitch from 'component/common/PermissionSwitch/PermissionSwitch';
import { UPDATE_FEATURE_ENVIRONMENT } from 'component/providers/AccessProvider/permissions';
import { Box } from '@mui/material';

export const createToggle =
    (
        projectId: string,
        envName: string
    ): VFC<{ row: { original: IFeatureToggleListItem } }> =>
    ({ row: { original: feature } }) => {
        const { setToastData, setToastApiError } = useToast();
        const { toggleFeatureByEnvironment } = useToggleFeatureByEnv(
            projectId,
            feature.name
        );
        const { refetch } = useProject(projectId);

        const env = feature.environments.find(env => env.name === envName)!;

        const handleToggle = () => {
            // TODO: optimistic UI
            toggleFeatureByEnvironment(env.name, env.enabled)
                .then(() => {
                    setToastData({
                        type: 'success',
                        title: 'Updated toggle status',
                        text: 'Successfully updated toggle status.',
                    });
                    refetch();
                })
                .catch(e => {
                    if (e.message === ENVIRONMENT_STRATEGY_ERROR) {
                        console.log('edit stragegy');
                        // FIXME: add implementation
                    } else {
                        setToastApiError(e.message);
                    }
                });
        };

        return (
            <Box sx={{ mx: 'auto', display: 'flex', justifyContent: 'center' }}>
                {/* TODO: move to className */}
                <PermissionSwitch
                    checked={env.enabled}
                    environmentId={env.name}
                    projectId={projectId}
                    permission={UPDATE_FEATURE_ENVIRONMENT}
                    inputProps={{ 'aria-label': env.name }}
                    // ref={ref}
                    onClick={() => {
                        console.log('toggle');
                        // handleToggle(env);
                        handleToggle();
                        // setEnvironmentName(env.name);
                    }}
                />
            </Box>
        );
    };
