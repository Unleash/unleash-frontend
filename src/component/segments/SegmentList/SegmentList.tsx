import { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@mui/material';
import usePagination from 'hooks/usePagination';
import PaginateUI from 'component/common/PaginateUI/PaginateUI';
import { SegmentListItem } from './SegmentListItem/SegmentListItem';
import { ISegment } from 'interfaces/segment';
import { useStyles } from './SegmentList.styles';
import { useSegments } from 'hooks/api/getters/useSegments/useSegments';
import { useSegmentsApi } from 'hooks/api/actions/useSegmentsApi/useSegmentsApi';
import useToast from 'hooks/useToast';
import { formatUnknownError } from 'utils/formatUnknownError';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
import { PageHeader } from 'component/common/PageHeader/PageHeader';
import { PageContent } from 'component/common/PageContent/PageContent';
import { SegmentDelete } from '../SegmentDelete/SegmentDelete';
import { SegmentDocsWarning } from 'component/segments/SegmentDocs/SegmentDocs';
import { SegmentEmpty } from 'component/segments/SegmentEmpty/SegmentEmpty';
import { CreateSegmentButton } from 'component/segments/CreateSegmentButton/CreateSegmentButton';

export const SegmentsList = () => {
    const { segments = [], refetchSegments } = useSegments();
    const { deleteSegment } = useSegmentsApi();
    const { page, pages, nextPage, prevPage, setPageIndex, pageIndex } =
        usePagination(segments, 10);
    const [currentSegment, setCurrentSegment] = useState<ISegment>();
    const [delDialog, setDelDialog] = useState(false);
    const { setToastData, setToastApiError } = useToast();

    const { classes: styles } = useStyles();

    const onDeleteSegment = async () => {
        if (!currentSegment?.id) return;
        try {
            await deleteSegment(currentSegment?.id);
            await refetchSegments();
            setToastData({
                type: 'success',
                title: 'Successfully deleted segment',
            });
        } catch (error: unknown) {
            setToastApiError(formatUnknownError(error));
        }
        setDelDialog(false);
    };

    const renderSegments = () => {
        return page.map((segment: ISegment) => {
            return (
                <SegmentListItem
                    key={segment.id}
                    segment={segment}
                    setCurrentSegment={setCurrentSegment}
                    setDelDialog={setDelDialog}
                />
            );
        });
    };

    return (
        <PageContent
            header={
                <PageHeader
                    title="Segments"
                    actions={<CreateSegmentButton />}
                />
            }
        >
            <div className={styles.docs}>
                <SegmentDocsWarning />
            </div>
            <Table>
                <TableHead>
                    <TableRow className={styles.tableRow}>
                        <TableCell
                            className={styles.firstHeader}
                            classes={{ root: styles.cell }}
                        >
                            Name
                        </TableCell>
                        <TableCell
                            classes={{ root: styles.cell }}
                            className={styles.hideSM}
                        >
                            Description
                        </TableCell>
                        <TableCell
                            classes={{ root: styles.cell }}
                            className={styles.hideXS}
                        >
                            Created on
                        </TableCell>
                        <TableCell
                            classes={{ root: styles.cell }}
                            className={styles.hideXS}
                        >
                            Created By
                        </TableCell>
                        <TableCell
                            align="right"
                            classes={{ root: styles.cell }}
                            className={styles.lastHeader}
                        >
                            Action
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <ConditionallyRender
                        condition={segments.length > 0}
                        show={renderSegments()}
                    />
                </TableBody>
            </Table>
            <PaginateUI
                pages={pages}
                pageIndex={pageIndex}
                setPageIndex={setPageIndex}
                nextPage={nextPage}
                prevPage={prevPage}
                style={{ position: 'static', marginTop: '2rem' }}
            />
            <ConditionallyRender
                condition={segments.length === 0}
                show={() => <SegmentEmpty />}
            />
            <ConditionallyRender
                condition={Boolean(currentSegment)}
                show={() => (
                    <SegmentDelete
                        segment={currentSegment!}
                        open={delDialog}
                        setDeldialogue={setDelDialog}
                        handleDeleteSegment={onDeleteSegment}
                    />
                )}
            />
        </PageContent>
    );
};
