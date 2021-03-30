/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Icon, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { formatFullDateTimeWithLocale } from '../../../component/common/util';
import AddUser from './add-user-component';
import ChangePassword from './change-password-component';
import UpdateUser from './update-user-component';
import { showPermissions } from './util';
import ConditionallyRender from '../../../component/common/conditionally-render';
import DelUser from './del-user-component';

function UsersList({
    fetchUsers,
    removeUser,
    addUser,
    updateUser,
    changePassword,
    users,
    location,
    hasPermission,
    validatePassword,
}) {
    const [showDialog, setDialog] = useState(false);
    const [pwDialog, setPwDialog] = useState({ open: false });
    const [delDialog, setDelDialog] = useState(false);
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

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div>
            <Table className="mdl-data-table mdl-shadow--2dp">
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Created</TableCell>
                        <TableCell>Username</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Access</TableCell>
                        <TableCell>{hasPermission('ADMIN') ? 'Action' : ''}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map(item => (
                        <TableRow key={item.id}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{formatFullDateTimeWithLocale(item.createdAt, location.locale)}</TableCell>
                            <TableCell style={{ textAlign: 'left' }}>{item.username || item.email}</TableCell>
                            <TableCell style={{ textAlign: 'left' }}>{item.name}</TableCell>
                            <TableCell>{showPermissions(item.permissions)}</TableCell>
                            <ConditionallyRender
                                condition={hasPermission('ADMIN')}
                                show={
                                    <TableCell>
                                        <a href="" title="Edit" onClick={openUpdateDialog(item)}>
                                            <Icon>edit</Icon>
                                        </a>
                                        <a href="" title="Change password" onClick={openPwDialog(item)}>
                                            <Icon>lock</Icon>
                                        </a>
                                        <a href="" title="Remove user" onClick={openDelDialog(item)}>
                                            <Icon>delete</Icon>
                                        </a>
                                    </TableCell>
                                }
                                elseShow={
                                    <TableCell>
                                        <a href="" title="Change password" onClick={openPwDialog(item)}>
                                            <Icon>lock</Icon>
                                        </a>
                                    </TableCell>
                                }
                            />
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <br />
            <a href="" onClick={openDialog}>
                Add new user
            </a>
            <AddUser
                showDialog={showDialog}
                closeDialog={closeDialog}
                addUser={addUser}
                validatePassword={validatePassword}
            />
            <UpdateUser
                showDialog={updateDialog.open}
                closeDialog={closeUpdateDialog}
                updateUser={updateUser}
                user={updateDialog.user}
            />
            <ChangePassword
                showDialog={pwDialog.open}
                closeDialog={closePwDialog}
                changePassword={changePassword}
                validatePassword={validatePassword}
                user={pwDialog.user}
            />
            <DelUser
                showDialog={delDialog}
                closeDialog={closeDelDialog}
                user={delUser}
                removeUser={() => {
                    removeUser(delUser);
                    closeDelDialog();
                }}
            />
        </div>
    );
}

UsersList.propTypes = {
    users: PropTypes.array.isRequired,
    fetchUsers: PropTypes.func.isRequired,
    removeUser: PropTypes.func.isRequired,
    addUser: PropTypes.func.isRequired,
    hasPermission: PropTypes.func.isRequired,
    validatePassword: PropTypes.func.isRequired,
    updateUser: PropTypes.func.isRequired,
    changePassword: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
};

export default UsersList;
