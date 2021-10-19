import {
    TableRow,
    TableCell,
    Avatar,
    IconButton,
    Typography,
} from '@material-ui/core';
import { Edit, Lock, Delete } from '@material-ui/icons';
import { SyntheticEvent, useContext } from 'react';
import { ADMIN } from '../../../../../component/providers/AccessProvider/permissions';
import ConditionallyRender from '../../../../../component/common/ConditionallyRender';
import { formatDateWithLocale } from '../../../../../component/common/util';
import AccessContext from '../../../../../contexts/AccessContext';
import { IUser } from '../../../../../interfaces/user';

interface IUserListItemProps {
    user: IUser;
    renderRole: (roleId: number) => string;
    openUpdateDialog: (user: IUser) => (e: SyntheticEvent) => void;
    openPwDialog: (user: IUser) => (e: SyntheticEvent) => void;
    openDelDialog: (user: IUser) => (e: SyntheticEvent) => void;
    location: ILocation;
}

interface ILocation {
    locale: string;
}

const UserListItem = ({
    user,
    renderRole,
    openDelDialog,
    openPwDialog,
    openUpdateDialog,
    location,
}: IUserListItemProps) => {
    const { hasAccess } = useContext(AccessContext);

    return (
        <TableRow key={user.id}>
            <TableCell>
                <Avatar
                    data-loading
                    alt={user.name}
                    src={user.imageUrl}
                    title={`${user.name || user.email || user.username} (id: ${
                        user.id
                    })`}
                />
            </TableCell>
            <TableCell>
                <span data-loading>
                    {formatDateWithLocale(user.createdAt, location.locale)}
                </span>
            </TableCell>
            <TableCell style={{ textAlign: 'left' }}>
                <Typography variant="body2" data-loading>
                    {user.name}
                </Typography>
            </TableCell>
            <TableCell style={{ textAlign: 'left' }}>
                <Typography variant="body2" data-loading>
                    {user.username || user.email}
                </Typography>
            </TableCell>
            <TableCell align="center">
                <Typography variant="body2" data-loading>
                    {renderRole(user.rootRole)}
                </Typography>
            </TableCell>
            <ConditionallyRender
                condition={hasAccess(ADMIN)}
                show={
                    <TableCell align="right">
                        <IconButton
                            data-loading
                            aria-label="Edit"
                            title="Edit"
                            onClick={openUpdateDialog(user)}
                        >
                            <Edit />
                        </IconButton>
                        <IconButton
                            data-loading
                            aria-label="Change password"
                            title="Change password"
                            onClick={openPwDialog(user)}
                        >
                            <Lock />
                        </IconButton>
                        <IconButton
                            data-loading
                            aria-label="Remove user"
                            title="Remove user"
                            onClick={openDelDialog(user)}
                        >
                            <Delete />
                        </IconButton>
                    </TableCell>
                }
                elseShow={<TableCell />}
            />
        </TableRow>
    );
};

export default UserListItem;
