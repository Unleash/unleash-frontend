import { VFC } from 'react';
import { ActionCell } from 'component/common/Table/cells/ActionCell/ActionCell';
import { Undo } from '@mui/icons-material';
import PermissionIconButton from 'component/common/PermissionIconButton/PermissionIconButton';
import { UPDATE_FEATURE } from 'component/providers/AccessProvider/permissions';

interface IReviveArchivedFeatureCell {
    onRevive: () => void;
    project: string;
}

export const ReviveArchivedFeatureCell: VFC<IReviveArchivedFeatureCell> = ({
    onRevive,
    project,
}) => {
    return (
        <ActionCell>
            <PermissionIconButton
                onClick={onRevive}
                projectId={project}
                permission={UPDATE_FEATURE}
                tooltipProps={{ title: 'Revive feature toggle' }}
            >
                <Undo />
            </PermissionIconButton>
        </ActionCell>
    );
};
