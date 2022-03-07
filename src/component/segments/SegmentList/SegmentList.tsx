import { useContext, useState } from 'react';
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
import useProjectRoles from 'hooks/api/getters/useProjectRoles/useProjectRoles';
import useProjectRolesApi from 'hooks/api/actions/useProjectRolesApi/useProjectRolesApi';
import useToast from 'hooks/useToast';
import { formatUnknownError } from 'utils/format-unknown-error';
import { ISegment } from 'interfaces/segment';

const segments = [
    {
        id: 1,
        name: 'Segment',
        description: 'hre',
        createdAt: 'test',
        createdBy: 'Youssef Khedher',
    },
    {
        id: 2,
        name: 'Segment',
        description: 'hre',
        createdAt: 'test',
        createdBy: 'Youssef Khedher',
    },
];

export const SegmentsList = () => {
    const { hasAccess } = useContext(AccessContext);

    const { page, pages, nextPage, prevPage, setPageIndex, pageIndex } =
        usePagination(segments, 10);
    const { deleteRole } = useProjectRolesApi();
    const { refetch } = useProjectRoles();
    const [currentRole, setCurrentRole] = useState<ISegment | null>(null);
    const [delDialog, setDelDialog] = useState(false);
    const [confirmName, setConfirmName] = useState('');
    const { setToastData, setToastApiError } = useToast();

    const deleteProjectRole = async () => {
        if (!currentRole?.id) return;
        try {
            await deleteRole(currentRole?.id);
            refetch();
            setToastData({
                type: 'success',
                title: 'Successfully deleted role',
                text: 'Your role is now deleted',
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
                    createAt={segment.createdAt}
                    createdBy={segment.createdBy}
                    // setDelDialog={setDelDialog}
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
                        <TableCell>Project Role</TableCell>
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
