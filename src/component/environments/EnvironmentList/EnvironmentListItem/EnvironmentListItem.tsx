import {
    ListItem,
    ListItemIcon,
    ListItemText,
    Tooltip,
    IconButton,
} from '@mui/material';
import {
    CloudCircle,
    Delete,
    DragIndicator,
    Edit,
    OfflineBolt,
} from '@mui/icons-material';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
import { IEnvironment } from 'interfaces/environments';
import React, { useContext } from 'react';
import AccessContext from 'contexts/AccessContext';
import {
    DELETE_ENVIRONMENT,
    UPDATE_ENVIRONMENT,
} from 'component/providers/AccessProvider/permissions';
import { StatusBadge } from 'component/common/StatusBadge/StatusBadge';
import StringTruncator from 'component/common/StringTruncator/StringTruncator';
import { useNavigate } from 'react-router-dom';
import { useDragItem, MoveListItem } from 'hooks/useDragItem';

interface IEnvironmentListItemProps {
    env: IEnvironment;
    setSelectedEnv: React.Dispatch<React.SetStateAction<IEnvironment>>;
    setDeldialogue: React.Dispatch<React.SetStateAction<boolean>>;
    setToggleDialog: React.Dispatch<React.SetStateAction<boolean>>;
    moveListItem: MoveListItem;
    index: number;
}

const EnvironmentListItem = ({
    env,
    setSelectedEnv,
    setDeldialogue,
    index,
    moveListItem,
    setToggleDialog,
}: IEnvironmentListItemProps) => {
    const navigate = useNavigate();
    const { hasAccess } = useContext(AccessContext);
    const updatePermission = hasAccess(UPDATE_ENVIRONMENT);
    const tooltipText = env.enabled ? 'Disable' : 'Enable';
    const dragItemRef = useDragItem(index, moveListItem);

    return (
        <ListItem ref={updatePermission ? dragItemRef : undefined}>
            <ListItemIcon>
                <CloudCircle />
            </ListItemIcon>
            <ListItemText
                primary={
                    <>
                        <strong>
                            <StringTruncator
                                text={env.name}
                                maxWidth={'125'}
                                maxLength={25}
                            />
                        </strong>
                        <ConditionallyRender
                            condition={!env.enabled}
                            show={
                                <StatusBadge severity="warning">
                                    Disabled
                                </StatusBadge>
                            }
                        />
                    </>
                }
            />
            <ConditionallyRender
                condition={updatePermission}
                show={
                    <IconButton size="large">
                        <DragIndicator titleAccess="Drag" cursor="grab" />
                    </IconButton>
                }
            />
            <ConditionallyRender
                condition={updatePermission}
                show={
                    <Tooltip title={`${tooltipText} environment`} arrow>
                        <IconButton
                            onClick={() => {
                                setSelectedEnv(env);
                                setToggleDialog(prev => !prev);
                            }}
                            size="large"
                        >
                            <OfflineBolt />
                        </IconButton>
                    </Tooltip>
                }
            />
            <ConditionallyRender
                condition={updatePermission}
                show={
                    <Tooltip title="Edit environment" arrow>
                        <IconButton
                            disabled={env.protected}
                            onClick={() => {
                                navigate(`/environments/${env.name}`);
                            }}
                            size="large"
                        >
                            <Edit />
                        </IconButton>
                    </Tooltip>
                }
            />
            <ConditionallyRender
                condition={hasAccess(DELETE_ENVIRONMENT)}
                show={
                    <Tooltip title="Delete environment" arrow>
                        <IconButton
                            disabled={env.protected}
                            onClick={() => {
                                setDeldialogue(true);
                                setSelectedEnv(env);
                            }}
                            size="large"
                        >
                            <Delete />
                        </IconButton>
                    </Tooltip>
                }
            />
        </ListItem>
    );
};

export default EnvironmentListItem;
