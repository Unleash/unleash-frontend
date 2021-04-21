/* eslint-disable no-alert */
import { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Icon,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Avatar,
} from '@material-ui/core';
import { formatDateWithLocale } from '../../../../component/common/util';
import AddUser from '../AddUser/AddUser';
import ChangePassword from '../change-password-component';
import UpdateUser from '../update-user-component';
import DelUser from '../del-user-component';
import ConditionallyRender from '../../../../component/common/ConditionallyRender/ConditionallyRender';
import AccessContext from '../../../../contexts/AccessContext';
import { ADMIN } from '../../../../component/AccessProvider/permissions';
import ConfirmUserAdded from '../ConfirmUserAdded/ConfirmUserAdded';
import useUsers from '../../../../hooks/useUsers';
import useRequest from '../../../../hooks/useRequest';
import useAdminUsersApi from '../../../../hooks/useAdminUsersApi';

function UsersList({ location, validatePassword }) {
    const { users, roles, error, loading, refetch } = useUsers();
    const {
        addUser,
        removeUser,
        updateUser,
        changePassword,
        userLoading,
        userApiErrors,
    } = useAdminUsersApi();
    const { hasAccess } = useContext(AccessContext);
    const [showDialog, setDialog] = useState(false);
    const [pwDialog, setPwDialog] = useState({ open: false });
    const [delDialog, setDelDialog] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [addedUser, setAddedUser] = useState(0);
    const [emailSent, setEmailSent] = useState(false);
    const [delUser, setDelUser] = useState();
    const [updateDialog, setUpdateDialog] = useState({ open: false });
    const openDialog = e => {
        e.preventDefault();
        setDialog(true);
    };

    const closeDialog = () => {
        setDialog(false);
    };

    const closeDelDialog = () => {
        setDelDialog(false);
        setDelUser(undefined);
    };

    const openDelDialog = user => e => {
        e.preventDefault();
        setDelDialog(true);
        setDelUser(user);
    };
    const openPwDialog = user => e => {
        e.preventDefault();
        setPwDialog({ open: true, user });
    };

    const closePwDialog = () => {
        setPwDialog({ open: false });
    };

    const openUpdateDialog = user => e => {
        e.preventDefault();
        setUpdateDialog({ open: true, user });
    };

    const closeUpdateDialog = () => {
        setUpdateDialog({ open: false });
    };

    const onAddUser = data => {
        setAddedUser(data);
        addUser(data)
            .then(res => res.json())
            .then(user => {
                setEmailSent(user.emailSent);
                closeDialog();
                refetch();
                setShowConfirm(true);
            })
            .catch(e => console.log(e));
    };

    const onDeleteUser = () => {
        removeUser(delUser).then(() => {
            refetch();
            closeDelDialog();
        });
    };

    const onUpdateUser = data => {
        updateUser(data).then(() => {
            refetch();
        });
    };

    const closeConfirm = () => {
        setShowConfirm(false);
        setEmailSent(false);
        setAddedUser(null);
    };

    const renderRole = roleId => {
        const role = roles.find(r => r.id === roleId);
        return role ? role.name : '';
    };

    let currentAddedUser;
    if (addedUser) {
        currentAddedUser = users.find(user => user.email === addedUser.email);
    }

    if (!users) return null;

    return (
        <div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>Created</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Username</TableCell>
                        <TableCell align="center">Role</TableCell>
                        <TableCell align="right">
                            {hasAccess(ADMIN) ? 'Action' : ''}
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map(item => (
                        <TableRow key={item.id}>
                            <TableCell>
                                <Avatar
                                    variant="rounded"
                                    alt={item.name}
                                    src={item.imageUrl}
                                    title={`${
                                        item.name || item.email || item.username
                                    } (id: ${item.id})`}
                                />
                            </TableCell>
                            <TableCell>
                                {formatDateWithLocale(
                                    item.createdAt,
                                    location.locale
                                )}
                            </TableCell>
                            <TableCell style={{ textAlign: 'left' }}>
                                {item.name}
                            </TableCell>
                            <TableCell style={{ textAlign: 'left' }}>
                                {item.username || item.email}
                            </TableCell>
                            <TableCell align="center">
                                {renderRole(item.rootRole)}
                            </TableCell>
                            <ConditionallyRender
                                condition={hasAccess(ADMIN)}
                                show={
                                    <TableCell align="right">
                                        <IconButton
                                            aria-label="Edit"
                                            title="Edit"
                                            onClick={openUpdateDialog(item)}
                                        >
                                            <Icon>edit</Icon>
                                        </IconButton>
                                        <IconButton
                                            aria-label="Change password"
                                            title="Change password"
                                            onClick={openPwDialog(item)}
                                        >
                                            <Icon>lock</Icon>
                                        </IconButton>
                                        <IconButton
                                            aria-label="Remove user"
                                            title="Remove user"
                                            onClick={openDelDialog(item)}
                                        >
                                            <Icon>delete</Icon>
                                        </IconButton>
                                    </TableCell>
                                }
                                elseShow={<TableCell />}
                            />
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <br />
            <ConditionallyRender
                condition={hasAccess(ADMIN)}
                show={
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={openDialog}
                    >
                        Add new user
                    </Button>
                }
                elseShow={<small>PS! Only admins can add/remove users.</small>}
            />

            <ConfirmUserAdded
                open={showConfirm}
                closeConfirm={closeConfirm}
                emailSent={emailSent}
                addedUser={currentAddedUser}
            />

            <AddUser
                showDialog={showDialog}
                closeDialog={closeDialog}
                addUser={onAddUser}
                userLoading={userLoading}
                validatePassword={validatePassword}
                userApiErrors={userApiErrors}
                roles={roles}
            />
            {updateDialog.open && (
                <UpdateUser
                    showDialog={updateDialog.open}
                    closeDialog={closeUpdateDialog}
                    updateUser={onUpdateUser}
                    user={updateDialog.user}
                    roles={roles}
                />
            )}
            <ChangePassword
                showDialog={pwDialog.open}
                closeDialog={closePwDialog}
                changePassword={changePassword}
                validatePassword={validatePassword}
                user={pwDialog.user}
            />
            {delUser && (
                <DelUser
                    showDialog={delDialog}
                    closeDialog={closeDelDialog}
                    user={delUser}
                    removeUser={onDeleteUser}
                />
            )}
        </div>
    );
}

UsersList.propTypes = {
    roles: PropTypes.array.isRequired,
    users: PropTypes.array.isRequired,
    fetchUsers: PropTypes.func.isRequired,
    removeUser: PropTypes.func.isRequired,
    addUser: PropTypes.func.isRequired,
    validatePassword: PropTypes.func.isRequired,
    updateUser: PropTypes.func.isRequired,
    changePassword: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
};

export default UsersList;
