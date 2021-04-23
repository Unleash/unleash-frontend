/* eslint-disable no-alert */
import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import {
    Button,
<<<<<<< HEAD
=======
    Icon,
    IconButton,
>>>>>>> feat: user profile
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
<<<<<<< HEAD
} from '@material-ui/core';
import AddUser from '../AddUser/AddUser';
=======
    Avatar,
} from '@material-ui/core';
import { formatDateWithLocale } from '../../../../component/common/util';
import AddUser from '../add-user-component';
>>>>>>> feat: user profile
import ChangePassword from '../change-password-component';
import UpdateUser from '../update-user-component';
import DelUser from '../del-user-component';
import ConditionallyRender from '../../../../component/common/ConditionallyRender/ConditionallyRender';
import AccessContext from '../../../../contexts/AccessContext';
import { ADMIN } from '../../../../component/AccessProvider/permissions';
import ConfirmUserAdded from '../ConfirmUserAdded/ConfirmUserAdded';
import useUsers from '../../../../hooks/useUsers';
import useAdminUsersApi from '../../../../hooks/useAdminUsersApi';
import UserListItem from './UserListItem/UserListItem';
import loadingData from './loadingData';
import useLoading from '../../../../hooks/useLoading';

function UsersList({ location }) {
    const { users, roles, refetch, loading } = useUsers();
    const {
        addUser,
        removeUser,
        updateUser,
        changePassword,
        validatePassword,
        userLoading,
        userApiErrors,
    } = useAdminUsersApi();
    const { hasAccess } = useContext(AccessContext);
    const [showDialog, setDialog] = useState(false);
    const [pwDialog, setPwDialog] = useState({ open: false });
    const [delDialog, setDelDialog] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const [inviteLink, setInviteLink] = useState('');
    const [delUser, setDelUser] = useState();
    const [updateDialog, setUpdateDialog] = useState({ open: false });
    const ref = useLoading(loading);

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
        addUser(data)
            .then(res => res.json())
            .then(user => {
                setEmailSent(user.emailSent);
                setInviteLink(user.inviteLink);
                closeDialog();
                refetch();
                setShowConfirm(true);
            })
            .catch(handleCatch);
    };

    const onDeleteUser = () => {
        removeUser(delUser)
            .then(() => {
                refetch();
                closeDelDialog();
            })
            .catch(handleCatch);
    };

    const onUpdateUser = data => {
        updateUser(data)
            .then(() => {
                refetch();
                closeUpdateDialog();
            })
            .catch(handleCatch);
    };

    const handleCatch = () =>
        console.log('An exception was thrown and handled.');

    const closeConfirm = () => {
        setShowConfirm(false);
        setEmailSent(false);
        setInviteLink('');
    };

    const renderRole = roleId => {
        const role = roles.find(r => r.id === roleId);
        return role ? role.name : '';
    };
<<<<<<< HEAD

    const renderUsers = () => {
        if (loading) {
            return loadingData.map(user => (
                <UserListItem
                    key={user.id}
                    user={user}
                    openUpdateDialog={openUpdateDialog}
                    openPwDialog={openPwDialog}
                    openDelDialog={openDelDialog}
                    location={location}
                    renderRole={renderRole}
                />
            ));
        }

        return users.map(user => {
            return (
                <UserListItem
                    key={user.id}
                    user={user}
                    openUpdateDialog={openUpdateDialog}
                    openPwDialog={openPwDialog}
                    openDelDialog={openDelDialog}
                    location={location}
                    renderRole={renderRole}
                />
            );
        });
    };

    if (!users) return null;
=======
>>>>>>> feat: user profile

    return (
        <div ref={ref}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>Created</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Username</TableCell>
                        <TableCell align="center">Role</TableCell>
                        <TableCell align="right">
<<<<<<< HEAD
                            {hasAccess(ADMIN) ? 'Action' : ''}
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>{renderUsers()}</TableBody>
=======
                            {hasAccess('ADMIN') ? 'Action' : ''}
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map(item => (
                        <TableRow key={item.id}>
                            <TableCell>
                                <Avatar
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
>>>>>>> feat: user profile
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
                inviteLink={inviteLink}
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
<<<<<<< HEAD

            <UpdateUser
                showDialog={updateDialog.open}
                closeDialog={closeUpdateDialog}
                updateUser={onUpdateUser}
                userLoading={userLoading}
                userApiErrors={userApiErrors}
                user={updateDialog.user}
                roles={roles}
            />

=======
            {updateDialog.open && (
                <UpdateUser
                    showDialog={updateDialog.open}
                    closeDialog={closeUpdateDialog}
                    updateUser={updateUser}
                    user={updateDialog.user}
                    roles={roles}
                />
            )}
>>>>>>> feat: user profile
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
                    userLoading={userLoading}
                    userApiErrors={userApiErrors}
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
