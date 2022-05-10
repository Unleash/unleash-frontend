import { Box } from '@mui/material';
import PermissionSwitch from 'component/common/PermissionSwitch/PermissionSwitch';
import { UPDATE_FEATURE_ENVIRONMENT } from 'component/providers/AccessProvider/permissions';
import { VFC } from 'react';
import { useOptimisticUpdate } from './hooks/useOptimisticUpdate';

interface IFeatureToggleSwitchProps {
    featureName: string;
    environmentName: string;
    projectId: string;
    value: boolean;
    onToggle: (
        projectId: string,
        feature: string,
        env: string,
        state: boolean
    ) => Promise<void>;
}

// TODO: check React.memo peformance
export const FeatureToggleSwitch: VFC<IFeatureToggleSwitchProps> = ({
    projectId,
    featureName,
    environmentName,
    value,
    onToggle,
}) => {
    const [isChecked, setIsChecked, rollbackIsChecked] =
        useOptimisticUpdate<boolean>(value);

    const onClick = () => {
        setIsChecked(!isChecked);
        onToggle(projectId, featureName, environmentName, !isChecked).catch(
            rollbackIsChecked
        );
    };

    return (
        <Box sx={{ mx: 'auto', display: 'flex', justifyContent: 'center' }}>
            {/* TODO: move sx to className for performance reasons */}
            <PermissionSwitch
                checked={isChecked}
                environmentId={environmentName}
                projectId={projectId}
                permission={UPDATE_FEATURE_ENVIRONMENT}
                inputProps={{ 'aria-label': environmentName }}
                onClick={onClick}
            />
        </Box>
    );
};
