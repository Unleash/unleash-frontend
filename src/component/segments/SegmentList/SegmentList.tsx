import { useContext, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from '@material-ui/core';
import AccessContext from 'contexts/AccessContext';
import usePagination from 'hooks/usePagination';
import { ADMIN } from 'component/providers/AccessProvider/permissions';
import PaginateUI from 'component/common/PaginateUI/PaginateUI';
import { SegmentListItem } from './SegmentListItem/SegmentListItem';
import { ISegment } from 'interfaces/segment';
import PermissionButton from 'component/common/PermissionButton/PermissionButton';
import { useStyles } from './SegmentList.styles';
import { useSegments } from 'hooks/api/getters/useSegments/useSegments';
import { SegmentDeleteConfirm } from '../SegmentDeleteConfirm/SegmentDeleteConfirm';
import { useSegmentsApi } from 'hooks/api/actions/useSegmentsApi/useSegmentsApi';
import useToast from 'hooks/useToast';
import { formatUnknownError } from 'utils/format-unknown-error';
import { useHistory } from 'react-router-dom';

export const SegmentsList = () => {
    const { hasAccess } = useContext(AccessContext);
    const history = useHistory();
    const { segments, refetchSegments } = useSegments();
    const { deleteSegment } = useSegmentsApi();
    const { page, pages, nextPage, prevPage, setPageIndex, pageIndex } =
        usePagination(segments, 10);
    const [currentSegment, setCurrentSegment] = useState<ISegment | null>(null);
    const [delDialog, setDelDialog] = useState(false);
    const [confirmName, setConfirmName] = useState('');
    const { setToastData, setToastApiError } = useToast();

    const styles = useStyles();

    const onDeleteSegment = async () => {
        if (!currentSegment?.id) return;
        try {
            await deleteSegment(currentSegment?.id);
            refetchSegments();
            setToastData({
                type: 'success',
                title: 'Successfully deleted segment',
                text: 'Your segment is now deleted',
            });
        } catch (error: unknown) {
            setToastApiError(formatUnknownError(error));
        }
        setDelDialog(false);
        setConfirmName('');
    };

    const renderSegments = () => {
        return page.map((segment: ISegment) => {
            return (
                <SegmentListItem
                    key={segment.id}
                    id={segment.id}
                    name={segment.name}
                    description={segment.description}
                    createdAt={segment.createdAt}
                    createdBy={segment.createdBy}
                    //@ts-expect-error
                    setCurrentSegment={setCurrentSegment}
                    setDelDialog={setDelDialog}
                />
            );
        });
    };

    const renderNoSegments = () => {
        return (
            <div className={styles.container}>
                <Typography className={styles.title}>
                    There are no segments created yet.
                </Typography>
                <p className={styles.subtitle}>
                    Segment makes it easy for you to define who should be
                    exposed to your feature. The segment is often a collection
                    of constraints and can be reused.
                </p>
                <PermissionButton
                    onClick={() => {history.push('/segments/create')}}
                    variant="outlined"
                    color="secondary"
                    className={styles.paramButton}
                    permission={ADMIN}
                >
                    Create your first segment
                </PermissionButton>
            </div>
        );
    };

    return (
        <div>
            <Table>
                <TableHead>
                    <TableRow className={styles.tableRow}>
                        <TableCell classes={{ root: styles.cell }}>
                            Name
                        </TableCell>
                        <TableCell classes={{ root: styles.cell }}>
                            Description
                        </TableCell>
                        <TableCell classes={{ root: styles.cell }}>
                            Created on
                        </TableCell>
                        <TableCell classes={{ root: styles.cell }}>
                            Created By
                        </TableCell>
                        <TableCell
                            align="right"
                            classes={{ root: styles.cell }}
                        >
                            {hasAccess(ADMIN) ? 'Actions' : ''}
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>{segments.length > 0 && renderSegments()}</TableBody>

                <PaginateUI
                    pages={pages}
                    pageIndex={pageIndex}
                    setPageIndex={setPageIndex}
                    nextPage={nextPage}
                    prevPage={prevPage}
                />
            </Table>
            {segments.length === 0 && renderNoSegments()}
            <SegmentDeleteConfirm
                //@ts-expect-error
                segment={currentSegment}
                open={delDialog}
                setDeldialogue={setDelDialog}
                handleDeleteSegment={onDeleteSegment}
                confirmName={confirmName}
                setConfirmName={setConfirmName}
            />
            <br />
        </div>
    );
};
