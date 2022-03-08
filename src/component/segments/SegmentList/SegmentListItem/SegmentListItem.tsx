import { useStyles } from './SegmentListItem.styles';
import { TableCell, TableRow, Typography } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import { ADMIN } from 'component/providers/AccessProvider/permissions';
import PermissionIconButton from 'component/common/PermissionIconButton/PermissionIconButton';

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
                        onClick={() => {}}
                        permission={ADMIN}
                    >
                        <Edit />
                    </PermissionIconButton>
                    <PermissionIconButton
                        data-loading
                        aria-label="Remove segment"
                        onClick={() => {}}
                        permission={ADMIN}
                    >
                        <Delete />
                    </PermissionIconButton>
                </TableCell>
            </TableRow>
        </>
    );
};
