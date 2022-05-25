import { useStyles } from './SegmentListItem.styles';
import { Box, TableCell, TableRow, Typography } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { DELETE_SEGMENT } from 'component/providers/AccessProvider/permissions';
import PermissionIconButton from 'component/common/PermissionIconButton/PermissionIconButton';
import TimeAgo from 'react-timeago';
import { ISegment } from 'interfaces/segment';
import { SEGMENT_DELETE_BTN_ID } from 'utils/testIds';
import React from 'react';
import { EditSegmentButton } from 'component/segments/EditSegmentButton/EditSegmentButton';

interface ISegmentListItemProps {
    segment: ISegment;
    setCurrentSegment: React.Dispatch<
        React.SetStateAction<ISegment | undefined>
    >;
    setDelDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SegmentListItem = ({
    segment,
    setCurrentSegment,
    setDelDialog,
}: ISegmentListItemProps) => {
    const { classes: styles } = useStyles();

    return (
        <TableRow className={styles.tableRow}>
            <TableCell className={styles.leftTableCell}>
                <Typography variant="body2" data-loading>
                    {segment.name}
                </Typography>
            </TableCell>
            <TableCell className={styles.descriptionCell}>
                <Typography variant="body2" data-loading>
                    {segment.description}
                </Typography>
            </TableCell>
            <TableCell className={styles.createdAtCell}>
                <Typography variant="body2" data-loading>
                    <TimeAgo date={segment.createdAt} live={false} />
                </Typography>
            </TableCell>
            <TableCell className={styles.createdAtCell}>
                <Typography variant="body2" data-loading>
                    {segment.createdBy}
                </Typography>
            </TableCell>

            <TableCell align="right">
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <EditSegmentButton segment={segment} />
                    <PermissionIconButton
                        data-loading
                        onClick={() => {
                            setCurrentSegment(segment);
                            setDelDialog(true);
                        }}
                        permission={DELETE_SEGMENT}
                        tooltipProps={{ title: 'Remove segment' }}
                        data-testid={`${SEGMENT_DELETE_BTN_ID}_${name}`}
                    >
                        <Delete />
                    </PermissionIconButton>
                </Box>
            </TableCell>
        </TableRow>
    );
};
