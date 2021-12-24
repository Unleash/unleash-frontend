/* eslint-disable react/jsx-no-target-blank */
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
    Avatar,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    InputLabel,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    MenuItem,
    Select,
    FormControl,
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';

import AddUserComponent from './access-add-user';

import projectApi from '../../store/project/api';
import PageContent from '../common/PageContent';
import useUiConfig from '../../hooks/api/getters/useUiConfig/useUiConfig';
import { useStyles } from './access-component.style';
import PermissionIconButton from '../common/PermissionIconButton/PermissionIconButton';
function AccessComponent({ projectId }) {
    const styles = useStyles();
    const [roles, setRoles] = useState([]);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState();
    const { isOss } = useUiConfig();

    useEffect(() => {
        fetchAccess();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [projectId]);

    const fetchAccess = async () => {
        try {
            const access = await projectApi.fetchAccess(projectId);
            setRoles(access.roles);
            setUsers(
                access.users.map(u => ({ ...u, name: u.name || '(No name)' }))
            );
        } catch (e) {
            console.log(e);
        }
    };

    if (isOss()) {
        return (
            <PageContent>
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

    const handleRoleChange = (userId, currRoleId) => async evt => {
        const roleId = evt.target.value;
        try {
            await projectApi.removeUserFromRole(projectId, currRoleId, userId);
            await projectApi.addUserToRole(projectId, roleId, userId);
            const newUsers = users.map(u => {
                if (u.id === userId) {
                    return { ...u, roleId };
                } else return u;
            });
            setUsers(newUsers);
        } catch (err) {
            setError(err.message || 'Server problems when adding users.');
        }
    };

    const addUser = async (userId, roleId) => {
        try {
            await projectApi.addUserToRole(projectId, roleId, userId);
            await fetchAccess();
        } catch (err) {
            setError(err.message || 'Server problems when adding users.');
        }
    };

    const removeAccess = (userId, roleId) => async () => {
        try {
            await projectApi.removeUserFromRole(projectId, roleId, userId);
            const newUsers = users.filter(u => u.id !== userId);
            setUsers(newUsers);
        } catch (err) {
            setError(err.message || 'Server problems when adding users.');
        }
    };

    const handleCloseError = () => {
        setError(undefined);
    };

    return (
        <PageContent className={styles.pageContent}>
            <AddUserComponent roles={roles} addUserToRole={addUser} />
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
                {users.map(user => {
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
                                <FormControl variant="outlined" size="small">
                                    <InputLabel
                                        className={styles.inputLabel}
                                        for="add-user-select-role-label"
                                    >
                                        Role
                                    </InputLabel>
                                    <Select
                                        labelId={`role-${user.id}-select-label`}
                                        id={`role-${user.id}-select`}
                                        key={user.id}
                                        placeholder="Choose role"
                                        value={user.roleId || ''}
                                        onChange={handleRoleChange(
                                            user.id,
                                            user.roleId
                                        )}
                                        renderValue={roleId => {
                                            return roles.find(role => {
                                                return role.id === roleId;
                                            }).name;
                                        }}
                                        MenuProps={{
                                            anchorOrigin: {
                                                vertical: 'left',
                                                horizontal: 'left',
                                            },
                                            getContentAnchorEl: null,
                                        }}
                                    >
                                        <MenuItem value="" disabled>
                                            Choose role
                                        </MenuItem>
                                        {roles.map(role => (
                                            <MenuItem
                                                key={`${user.id}:${role.id}`}
                                                value={role.id}
                                                classes={{
                                                    root: [styles.menuItem],
                                                }}
                                            >
                                                <div>
                                                    <span>{role.name}</span>
                                                    <p>{role.description}</p>
                                                </div>
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <PermissionIconButton
                                    className={styles.iconButton}
                                    edge="end"
                                    aria-label="delete"
                                    title="Remove access"
                                    onClick={removeAccess(user.id, user.roleId)}
                                    disabled={users.length === 1}
                                >
                                    <Delete />
                                </PermissionIconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    );
                })}
            </List>
        </PageContent>
    );
}

AccessComponent.propTypes = {
    projectId: PropTypes.string.isRequired,
    project: PropTypes.object,
};

export default AccessComponent;
