import { useStyles } from './SegmentListItem.styles';
import { TableCell, TableRow, Typography } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import { ADMIN } from 'component/providers/AccessProvider/permissions';
import PermissionIconButton from 'component/common/PermissionIconButton/PermissionIconButton';
import TimeAgo from 'react-timeago';
import { ISegment } from 'interfaces/segment';

interface ISegmentListItemProps {
    id: number;
    name: string;
    description: string;
    createdAt: string;
    createdBy: string;
    setCurrentSegment: React.Dispatch<React.SetStateAction<ISegment | undefined>>;
    setDelDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SegmentListItem = ({
    id,
    name,
    description,
    createdAt,
    createdBy,
    setCurrentSegment,
    setDelDialog,
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
                        <TimeAgo date={createdAt} live={false} />
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
                        onClick={() => {
                            // @ts-expect-error
                            setCurrentSegment({ id, name, description });
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
