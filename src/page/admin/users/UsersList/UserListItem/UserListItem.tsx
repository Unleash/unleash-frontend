import {
    TableRow,
    TableCell,
    Avatar,
    IconButton,
    Icon,
} from '@material-ui/core';
import { useContext } from 'react';
import { ADMIN } from '../../../../../component/AccessProvider/permissions';
import ConditionallyRender from '../../../../../component/common/ConditionallyRender';
import { formatDateWithLocale } from '../../../../../component/common/util';
import AccessContext from '../../../../../contexts/AccessContext';
import { IUser } from '../../../../../interfaces/user';

interface IUserListItemProps {
    user: IUser;
    renderRole: (roleId: number) => string;
    openUpdateDialog: (user: IUser) => void;
    openPwDialog: (user: IUser) => void;
    openDelDialog: (user: IUser) => void;
    location: any;
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
                    variant="rounded"
                    alt={user.name}
                    src={user.imageUrl}
                    title={`${user.name || user.email || user.username} (id: ${
                        user.id
                    })`}
                />
            </TableCell>
            <TableCell>
                {formatDateWithLocale(user.createdAt, location.locale)}
            </TableCell>
            <TableCell style={{ textAlign: 'left' }}>{user.name}</TableCell>
            <TableCell style={{ textAlign: 'left' }}>
                {user.username || user.email}
            </TableCell>
            <TableCell align="center">{renderRole(user.rootRole)}</TableCell>
            <ConditionallyRender
                condition={hasAccess(ADMIN)}
                show={
                    <TableCell align="right">
                        <IconButton
                            aria-label="Edit"
                            title="Edit"
                            onClick={() => openUpdateDialog(user)}
                        >
                            <Icon>edit</Icon>
                        </IconButton>
                        <IconButton
                            aria-label="Change password"
                            title="Change password"
                            onClick={() => openPwDialog(user)}
                        >
                            <Icon>lock</Icon>
                        </IconButton>
                        <IconButton
                            aria-label="Remove user"
                            title="Remove user"
                            onClick={() => openDelDialog(user)}
                        >
                            <Icon>delete</Icon>
                        </IconButton>
                    </TableCell>
                }
                elseShow={<TableCell />}
            />
        </TableRow>
    );
};

export default UserListItem;
