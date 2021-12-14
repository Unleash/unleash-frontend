import { useStyles } from './RoleListItem.styles';
import { TableRow, TableCell, Typography } from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';
import { ADMIN } from '../../../providers/AccessProvider/permissions';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import PermissionIconButton from '../../../common/PermissionIconButton/PermissionIconButton';
import { IProjectRole } from '../../../../interfaces/role';

interface IRoleListItemProps {
    id: number;
    name: string;
    description: string;
    setCurrentRole: React.Dispatch<React.SetStateAction<IProjectRole>>;
    setDelDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const RoleListItem = ({
    id,
    name,
    description,
    setCurrentRole,
    setDelDialog,
}: IRoleListItemProps) => {
    const styles = useStyles();

    return (
        <>
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
                        onClick={() => {
                            setCurrentRole({ id, name, description });
                            setDelDialog(true);
                        }}
                        permission={ADMIN}
                    >
                        <Delete />
                    </PermissionIconButton>
                </TableCell>
            </TableRow>
        </>
    );
};

export default RoleListItem;
