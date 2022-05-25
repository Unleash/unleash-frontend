import { useStyles } from './SegmentListItem.styles';
import { TableCell, TableRow, Typography, Box } from '@mui/material';
import TimeAgo from 'react-timeago';
import { ISegment } from 'interfaces/segment';
import React from 'react';
import { EditSegmentButton } from 'component/segments/EditSegmentButton/EditSegmentButton';
import { RemoveSegmentButton } from 'component/segments/RemoveSegmentButton/RemoveSegmentButton';

interface ISegmentListItemProps {
    segment: ISegment;
}

export const SegmentListItem = ({ segment }: ISegmentListItemProps) => {
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
                    <RemoveSegmentButton segment={segment} />
                </Box>
            </TableCell>
        </TableRow>
    );
};
