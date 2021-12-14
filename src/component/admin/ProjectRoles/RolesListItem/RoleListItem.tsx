import { useStyles } from './RoleListItem.styles';
import { TableRow, TableCell, Typography } from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';
import { ADMIN } from '../../../providers/AccessProvider/permissions';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import PermissionIconButton from '../../../common/PermissionIconButton/PermissionIconButton';
import useProjectRolesApi from '../../../../hooks/api/actions/useProjectRolesApi/useProjectRolesApi';
import useProjectRoles from '../../../../hooks/api/getters/useProjectRoles/useProjectRoles';

interface IRoleListItemProps {
    id: number;
    name: string;
    description: string;
}

const RoleListItem = ({ id, name, description }: IRoleListItemProps) => {
    const styles = useStyles();
    const { deleteRole } = useProjectRolesApi();
    const { refetch } = useProjectRoles();

    const deleteProjectRole = async () => {
        try {
            await deleteRole(id);
            refetch();
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <TableRow className={styles.tableRow}>
            <TableCell>
                <SupervisedUserCircleIcon className={styles.icon} />
            </TableCell>
            <TableCell className={styles.leftTableCell}>
                <Typography variant="body2" data-loading>
                    {name}
                </Typography>
            </TableCell>
            <TableCell className={styles.leftTableCell}>
                <Typography variant="body2" data-loading>
                    {description}
                </Typography>
            </TableCell>

            <TableCell align="right">
                <PermissionIconButton
                    data-loading
                    aria-label="Edit"
                    tooltip="Edit"
                    onClick={() => {
                        console.log('hi');
                    }}
                    permission={ADMIN}
                >
                    <Edit />
                </PermissionIconButton>
                <PermissionIconButton
                    data-loading
                    aria-label="Remove role"
                    tooltip="Remove role"
                    onClick={deleteProjectRole}
                    permission={ADMIN}
                >
                    <Delete />
                </PermissionIconButton>
            </TableCell>
        </TableRow>
    );
};

export default RoleListItem;
