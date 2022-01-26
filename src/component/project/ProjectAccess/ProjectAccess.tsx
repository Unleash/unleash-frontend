/* eslint-disable react/jsx-no-target-blank */
import React, { useState } from 'react';
import {
    Avatar,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    MenuItem,
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';

import ProjectAccessAddUser from './ProjectAccessAddUser/ProjectAccessAddUser';

import PageContent from '../../common/PageContent';
import useUiConfig from '../../../hooks/api/getters/useUiConfig/useUiConfig';
import { useStyles } from './ProjectAccess.styles';
import PermissionIconButton from '../../common/PermissionIconButton/PermissionIconButton';
import { useParams } from 'react-router-dom';
import { IProjectViewParams } from '../../../interfaces/params';
import ProjectRoleSelect from './ProjectRoleSelect/ProjectRoleSelect';
import usePagination from '../../../hooks/usePagination';
import PaginateUI from '../../common/PaginateUI/PaginateUI';
import useToast from '../../../hooks/useToast';
import ConfirmDialogue from '../../common/Dialogue';
import useProjectAccess from '../../../hooks/api/getters/useProjectAccess/useProjectAccess';
import useProjectApi from '../../../hooks/api/actions/useProjectApi/useProjectApi';
import HeaderTitle from '../../common/HeaderTitle';

const ProjectAccess = () => {
    const { id: projectId } = useParams<IProjectViewParams>();
    const styles = useStyles();
    const [error, setError] = useState();
    const { access, refetchProjectAccess } = useProjectAccess(projectId);
    const { setToastData } = useToast();
    const { isOss } = useUiConfig();
    const { page, pages, nextPage, prevPage, setPageIndex, pageIndex } =
        usePagination(access.users, 10);
    const { removeUserFromRole, addUserToRole } = useProjectApi();
    const [showDelDialogue, setShowDelDialogue] = useState(false);
    const [user, setUser] = useState({});

    if (isOss()) {
        return (
            <PageContent headerContent={<HeaderTitle title="Project Access" />}>
                <Alert severity="error">
                    Controlling access to projects requires a paid version of
                    Unleash. Check out{' '}
                    <a href="https://www.getunleash.io" target="_blank">
                        getunleash.io
                    </a>{' '}
                    to find out more.
                </Alert>
            </PageContent>
        );
    }

    const handleRoleChange =
        (userId: string, currRoleId: string) => async (evt: React.ChangeEvent<HTMLInputElement>) => {
            const roleId = evt.currentTarget.value;
            try {
                await removeUserFromRole(projectId, currRoleId, userId);
                await addUserToRole(projectId, roleId, userId);
                refetchProjectAccess();

                setToastData({
                    type: 'success',
                    title: 'User role changed successfully',
                });
            } catch (err: any) {
                setToastData({
                    type: 'error',
                    title: err.message || 'Server problems when adding users.',
                });
            }
        };

    const removeAccess = (userId: string, roleId: string) => async () => {
        try {
            await removeUserFromRole(projectId, roleId, userId);
            refetchProjectAccess();
            setToastData({
                type: 'success',
                title: 'The user has been removed from project',
            });
        } catch (err: any) {
            setToastData({
                type: 'error',
                title: err.message || 'Server problems when adding users.',
            });
        }
        setShowDelDialogue(false);
    };

    const handleCloseError = () => {
        setError(undefined);
    };

    return (
        <PageContent
            headerContent={<HeaderTitle title="Project Roles"></HeaderTitle>}
            className={styles.pageContent}
        >
            <ProjectAccessAddUser roles={access.roles} />
            <Dialog
                open={!!error}
                onClose={handleCloseError}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{'Error'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {error}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleCloseError}
                        color="secondary"
                        autoFocus
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
            <div className={styles.divider}></div>
            <List>
                {page.map(user => {
                    const labelId = `checkbox-list-secondary-label-${user.id}`;
                    return (
                        <ListItem key={user.id} button>
                            <ListItemAvatar>
                                <Avatar alt={user.name} src={user.imageUrl} />
                            </ListItemAvatar>
                            <ListItemText
                                id={labelId}
                                primary={user.name}
                                secondary={user.email || user.username}
                            />
                            <ListItemSecondaryAction
                                className={styles.actionList}
                            >
                                <ProjectRoleSelect
                                    labelId={`role-${user.id}-select-label`}
                                    id={`role-${user.id}-select`}
                                    key={user.id}
                                    placeholder="Choose role"
                                    onChange={handleRoleChange(
                                        user.id,
                                        user.roleId
                                    )}
                                    roles={access.roles}
                                    value={user.roleId || ''}
                                >
                                    <MenuItem value="" disabled>
                                        Choose role
                                    </MenuItem>
                                </ProjectRoleSelect>

                                <PermissionIconButton
                                    className={styles.iconButton}
                                    edge="end"
                                    aria-label="delete"
                                    title="Remove access"
                                    onClick={() => {
                                        setUser(user);
                                        setShowDelDialogue(true);
                                    }}
                                    disabled={access.users.length === 1}
                                    tooltip={
                                        access.users.length === 1
                                            ? 'A project must have at least one owner'
                                            : 'Remove access'
                                    }
                                >
                                    <Delete />
                                </PermissionIconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    );
                })}
                <PaginateUI
                    pages={pages}
                    pageIndex={pageIndex}
                    setPageIndex={setPageIndex}
                    nextPage={nextPage}
                    prevPage={prevPage}
                    style={{ bottom: '-21px' }}
                />
            </List>
            <ConfirmDialogue
                open={showDelDialogue}
                onClick={removeAccess(user.id, user.roleId)}
                onClose={() => {
                    setUser({});
                    setShowDelDialogue(false);
                }}
                title="Really remove user from this project"
            />
        </PageContent>
    );
};

export default ProjectAccess;
