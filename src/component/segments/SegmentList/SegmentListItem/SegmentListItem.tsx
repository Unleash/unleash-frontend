import { useStyles } from './SegmentListItem.styles';
import { TableCell, TableRow, Typography } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import { ADMIN } from 'component/providers/AccessProvider/permissions';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import PermissionIconButton from 'component/common/PermissionIconButton/PermissionIconButton';
import { useHistory } from 'react-router-dom';

interface ISegmentListItemProps {
    id: number;
    name: string;
    description: string;
    createAt: string;
    createdBy: string;
}

export const SegmentListItem = ({
    id,
    name,
    description,
    createAt,
    createdBy,
}: ISegmentListItemProps) => {
    const history = useHistory();
    const styles = useStyles();

    return (
        <>
            <TableRow className={styles.tableRow}>
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
                <TableCell className={styles.leftTableCell}>
                    <Typography variant="body2" data-loading>
                        {createAt}
                    </Typography>
                </TableCell>
                <TableCell className={styles.leftTableCell}>
                    <Typography variant="body2" data-loading>
                        {createdBy}
                    </Typography>
                </TableCell>

                <TableCell align="right">
                    <PermissionIconButton
                        data-loading
                        aria-label="Edit"
                        // disabled={type === BUILTIN_ROLE_TYPE}
                        onClick={() => {
                            history.push(`/test`);
                        }}
                        permission={ADMIN}
                    >
                        <Edit />
                    </PermissionIconButton>
                    <PermissionIconButton
                        data-loading
                        aria-label="Remove segment"
                        // disabled={type === BUILTIN_ROLE_TYPE}
                        onClick={() => {
                            // @ts-expect-error
                            setCurrentRole({ id, name, description });
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
