import { useState, VFC } from 'react';
import { ActionCell } from 'component/common/Table/cells/ActionCell/ActionCell';
import { Delete, Undo } from '@mui/icons-material';
import PermissionIconButton from 'component/common/PermissionIconButton/PermissionIconButton';
import {
    DELETE_ADDON,
    DELETE_FEATURE,
    UPDATE_FEATURE,
} from 'component/providers/AccessProvider/permissions';
import EnvironmentDeleteConfirm from '../../../environments/EnvironmentDeleteConfirm/EnvironmentDeleteConfirm';
import ArchivedFeatureDeleteConfirm from './ArchivedFeatureDeleteConfirm/ArchivedFeatureDeleteConfirm';
import { IAddon } from '../../../../interfaces/addons';

interface IReviveArchivedFeatureCell {
    onRevive: () => void;
    onDelete: () => void;
    project: string;
}

export const ArchivedFeatureActionCell: VFC<IReviveArchivedFeatureCell> = ({
    onRevive,
    onDelete,
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
            <PermissionIconButton
                permission={DELETE_FEATURE}
                tooltipProps={{ title: 'Delete feature toggle' }}
                onClick={onDelete}
            >
                <Delete />
            </PermissionIconButton>
        </ActionCell>
    );
};
