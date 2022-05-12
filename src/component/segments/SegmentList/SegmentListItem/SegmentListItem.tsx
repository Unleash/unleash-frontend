import { useStyles } from './SegmentListItem.styles';
import { TableCell, TableRow, Typography } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import {
    UPDATE_SEGMENT,
    DELETE_SEGMENT,
} from 'component/providers/AccessProvider/permissions';
import PermissionHOC from 'component/common/PermissionIconButton/PermissionIconButton';
import TimeAgo from 'react-timeago';
import { ISegment } from 'interfaces/segment';
import { useNavigate } from 'react-router-dom';
import { SEGMENT_DELETE_BTN_ID } from 'utils/testIds';
import React from 'react';

interface ISegmentListItemProps {
    id: number;
    name: string;
    description: string;
    createdAt: string;
    createdBy: string;
    setCurrentSegment: React.Dispatch<
        React.SetStateAction<ISegment | undefined>
    >;
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
    const { classes: styles } = useStyles();
    const navigate = useNavigate();

    return (
        <TableRow className={styles.tableRow}>
            <TableCell className={styles.leftTableCell}>
                <Typography variant="body2" data-loading>
                    {name}
                </Typography>
            </TableCell>
            <TableCell className={styles.descriptionCell}>
                <Typography variant="body2" data-loading>
                    {description}
                </Typography>
            </TableCell>
            <TableCell className={styles.createdAtCell}>
                <Typography variant="body2" data-loading>
                    <TimeAgo date={createdAt} live={false} />
                </Typography>
            </TableCell>
            <TableCell className={styles.createdAtCell}>
                <Typography variant="body2" data-loading>
                    {createdBy}
                </Typography>
            </TableCell>

            <TableCell align="right">
                <PermissionHOC
                    data-loading
                    onClick={() => {
                        navigate(`/segments/edit/${id}`);
                    }}
                    permission={UPDATE_SEGMENT}
                    tooltip="Edit segment"
                >
                    <Edit />
                </PermissionHOC>
                <PermissionHOC
                    data-loading
                    onClick={() => {
                        setCurrentSegment({
                            id,
                            name,
                            description,
                            createdAt,
                            createdBy,
                            constraints: [],
                        });
                        setDelDialog(true);
                    }}
                    permission={DELETE_SEGMENT}
                    tooltip="Remove segment"
                    data-testid={`${SEGMENT_DELETE_BTN_ID}_${name}`}
                >
                    <Delete />
                </PermissionHOC>
            </TableCell>
        </TableRow>
    );
};
