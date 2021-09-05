import {
    ListItem,
    ListItemIcon,
    ListItemText,
    Tooltip,
    IconButton,
} from '@material-ui/core';
import { CloudCircle, Delete, Edit } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import ConditionallyRender from '../../../common/ConditionallyRender';
import OutsideClickHandler from 'react-outside-click-handler';

import { IEnvironment } from '../../../../interfaces/environments';
import React, { useContext, useState } from 'react';
import AccessContext from '../../../../contexts/AccessContext';
import {
    DELETE_ENVIRONMENT,
    UPDATE_ENVIRONMENT,
} from '../../../AccessProvider/permissions';
import EditEnvironment from '../../EditEnvironment/EditEnvironment';
import useToast from '../../../../hooks/useToast';

interface IEnvironmentListItemProps {
    env: IEnvironment;
    setSelectedEnv: React.Dispatch<React.SetStateAction<IEnvironment>>;
    setDeldialogue: React.Dispatch<React.SetStateAction<boolean>>;
}

const EnvironmentListItem = ({
    env,
    setSelectedEnv,
    setDeldialogue,
}: IEnvironmentListItemProps) => {
    const [editEnvironment, setEditEnvironment] = useState(false);
    const { toast, setToastData } = useToast();

    const { hasAccess } = useContext(AccessContext);

    return (
        <ListItem style={{ position: 'relative' }}>
            <ListItemIcon>
                <CloudCircle />
            </ListItemIcon>
            <ListItemText
                primary={<strong>{env.name}</strong>}
                secondary={env.displayName}
            />
            <OutsideClickHandler
                onOutsideClick={() => setEditEnvironment(false)}
            >
                <ConditionallyRender
                    condition={hasAccess(UPDATE_ENVIRONMENT)}
                    show={
                        <Tooltip title="Update environment">
                            <IconButton
                                aria-label="update"
                                onClick={() => {
                                    setEditEnvironment(prev => !prev);
                                }}
                            >
                                <Edit />
                            </IconButton>
                        </Tooltip>
                    }
                />

                <EditEnvironment
                    env={env}
                    setEditEnvironment={setEditEnvironment}
                    editEnvironment={editEnvironment}
                    setToastData={setToastData}
                />
            </OutsideClickHandler>
            <ConditionallyRender
                condition={hasAccess(DELETE_ENVIRONMENT)}
                show={
                    <Tooltip title="Delete environment">
                        <IconButton
                            aria-label="delete"
                            onClick={() => {
                                setDeldialogue(true);
                                setSelectedEnv(env);
                            }}
                        >
                            <Delete />
                        </IconButton>
                    </Tooltip>
                }
            />
            {toast}
        </ListItem>
    );
};

export default EnvironmentListItem;
