import { useContext } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@material-ui/core';
import AccessContext from 'contexts/AccessContext';
import usePagination from 'hooks/usePagination';
import { ADMIN } from 'component/providers/AccessProvider/permissions';
import PaginateUI from 'component/common/PaginateUI/PaginateUI';
import { SegmentListItem } from './SegmentListItem/SegmentListItem';
import { ISegment } from 'interfaces/segment';

const segments = [
    {
        id: 1,
        name: 'Segment 1',
        description: 'hjghjgfghjghjfghj',
        createdAt: 'date',
        createdBy: 'Youssef Khedher',
    },
    {
        id: 2,
        name: 'Segment 2',
        description: 'asfafsfsddfsafsd',
        createdAt: 'date',
        createdBy: 'Chris',
    },
    {
        id: 3,
        name: 'Segment 3',
        description: 'hrdfsfsadadsdfsdfse',
        createdAt: 'date',
        createdBy: 'Olav',
    },
    {
        id: 4,
        name: 'Segment 4',
        description: 'this is a description',
        createdAt: 'date',
        createdBy: 'Frederik',
    },
];

export const SegmentsList = () => {
    const { hasAccess } = useContext(AccessContext);
    const { page, pages, nextPage, prevPage, setPageIndex, pageIndex } =
        usePagination(segments, 10);

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

    if (!segments) return null;

    return (
        <div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Created on</TableCell>
                        <TableCell>Created By</TableCell>

                        <TableCell align="right">
                            {hasAccess(ADMIN) ? 'Action' : ''}
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>{renderSegments()}</TableBody>
                <PaginateUI
                    pages={pages}
                    pageIndex={pageIndex}
                    setPageIndex={setPageIndex}
                    nextPage={nextPage}
                    prevPage={prevPage}
                />
            </Table>
            <br />
        </div>
    );
};
