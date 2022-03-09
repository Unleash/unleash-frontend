import { useContext } from 'react';
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

const segments: any[] = [
    // {
    //     id: 1,
    //     name: 'Segment 1',
    //     description: 'hjghjgfghjghjfghj',
    //     createdAt: 'date',
    //     createdBy: 'Youssef Khedher',
    // },
    // {
    //     id: 2,
    //     name: 'Segment 2',
    //     description: 'asfafsfsddfsafsd',
    //     createdAt: 'date',
    //     createdBy: 'Chris',
    // },
    // {
    //     id: 3,
    //     name: 'Segment 3',
    //     description: 'hrdfsfsadadsdfsdfse',
    //     createdAt: 'date',
    //     createdBy: 'Olav',
    // },
    // {
    //     id: 4,
    //     name: 'Segment 4',
    //     description: 'this is a description',
    //     createdAt: 'date',
    //     createdBy: 'Frederik',
    // },
];

export const SegmentsList = () => {
    const { hasAccess } = useContext(AccessContext);
    const { page, pages, nextPage, prevPage, setPageIndex, pageIndex } =
        usePagination(segments, 10);
    const styles = useStyles();

    const renderSegments = () => {
        return page.map((segment: ISegment) => {
            return (
                <SegmentListItem
                    key={segment.id}
                    id={segment.id}
                    name={segment.name}
                    description={segment.description}
                    createAt={segment.createdAt}
                    createdBy={segment.createdBy}
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
                    onClick={() => {}}
                    // @ts-expect-error
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
            <br />
        </div>
    );
};
