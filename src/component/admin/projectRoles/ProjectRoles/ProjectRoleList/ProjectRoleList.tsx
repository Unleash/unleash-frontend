import { useMemo, useState } from 'react';
import {
    Table,
    SortableTableHeader,
    TableBody,
    TableCell,
    TableRow,
    TablePlaceholder,
    TableSearch,
} from 'component/common/Table';
import { useTable, useGlobalFilter, useSortBy } from 'react-table';
import { ADMIN } from 'component/providers/AccessProvider/permissions';
import useProjectRoles from 'hooks/api/getters/useProjectRoles/useProjectRoles';
import IRole, { IProjectRole } from 'interfaces/role';
import useProjectRolesApi from 'hooks/api/actions/useProjectRolesApi/useProjectRolesApi';
import useToast from 'hooks/useToast';
import ProjectRoleDeleteConfirm from '../ProjectRoleDeleteConfirm/ProjectRoleDeleteConfirm';
import { formatUnknownError } from 'utils/formatUnknownError';
import { Box } from '@mui/material';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
import PermissionIconButton from 'component/common/PermissionIconButton/PermissionIconButton';
import { Delete, Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { PageContent } from 'component/common/PageContent/PageContent';
import { SearchHighlightProvider } from 'component/common/Table/SearchHighlightContext/SearchHighlightContext';
import { PageHeader } from 'component/common/PageHeader/PageHeader';
import { sortTypes } from 'utils/sortTypes';
import { TextCell } from 'component/common/Table/cells/TextCell/TextCell';

const ROOTROLE = 'root';
const BUILTIN_ROLE_TYPE = 'project';

const ProjectRoleList = () => {
    const navigate = useNavigate();
    const { roles, refetch, loading } = useProjectRoles();

    const paginationFilter = (role: IRole) => role?.type !== ROOTROLE;
    const data = roles.filter(paginationFilter);

    const { deleteRole } = useProjectRolesApi();
    const [currentRole, setCurrentRole] = useState<IProjectRole | null>(null);
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

    const columns = useMemo(
        () => [
            {
                Header: 'Project role',
                accessor: 'name',
            },
            {
                Header: 'Description',
                accessor: 'description',
                width: '67%',
            },
            {
                Header: 'Actions',
                id: 'Actions',
                align: 'center',
                Cell: ({
                    row: {
                        original: { id, type, name, description },
                    },
                }: any) => (
                    <Box
                        sx={{ display: 'flex', justifyContent: 'center' }}
                        data-loading
                    >
                        <PermissionIconButton
                            data-loading
                            disabled={type === BUILTIN_ROLE_TYPE}
                            onClick={() => {
                                navigate(`/admin/roles/${id}/edit`);
                            }}
                            permission={ADMIN}
                            tooltipProps={{ title: 'Edit role' }}
                        >
                            <Edit />
                        </PermissionIconButton>
                        <PermissionIconButton
                            data-loading
                            disabled={type === BUILTIN_ROLE_TYPE}
                            onClick={() => {
                                setCurrentRole({
                                    id,
                                    name,
                                    description,
                                } as IProjectRole);
                                setDelDialog(true);
                            }}
                            permission={ADMIN}
                            tooltipProps={{ title: 'Remove role' }}
                        >
                            <Delete />
                        </PermissionIconButton>
                    </Box>
                ),
                width: 100,
                disableSortBy: true,
            },
        ],
        []
    );

    const initialState = useMemo(
        () => ({
            sortBy: [{ id: 'name', desc: false }],
        }),
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state: { globalFilter },
        setGlobalFilter,
    } = useTable(
        {
            columns: columns as any[], // TODO: fix after `react-table` v8 update
            data,
            initialState,
            sortTypes,
            autoResetGlobalFilter: false,
            autoResetSortBy: false,
            disableSortRemove: true,
            defaultColumn: {
                Cell: ({ value }) => <TextCell>{value}</TextCell>,
            },
        },
        useGlobalFilter,
        useSortBy
    );

    return (
        <PageContent
            isLoading={loading}
            header={
                <PageHeader
                    title={`Project roles (${data.length})`}
                    actions={
                        <>
                            <TableSearch
                                initialValue={globalFilter}
                                onChange={setGlobalFilter}
                            />
                            <PageHeader.Divider />
                            {/* <AddProjectRoleButton /> */}
                        </>
                    }
                />
            }
        >
            <SearchHighlightProvider value={globalFilter}>
                <Table {...getTableProps()}>
                    <SortableTableHeader headerGroups={headerGroups} />
                    <TableBody {...getTableBodyProps()}>
                        {rows.map(row => {
                            prepareRow(row);
                            return (
                                <TableRow hover {...row.getRowProps()}>
                                    {row.cells.map(cell => (
                                        <TableCell {...cell.getCellProps()}>
                                            {cell.render('Cell')}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </SearchHighlightProvider>
            <ConditionallyRender
                condition={rows.length === 0}
                show={
                    <ConditionallyRender
                        condition={globalFilter?.length > 0}
                        show={
                            <TablePlaceholder>
                                No project roles found matching &ldquo;
                                {globalFilter}
                                &rdquo;
                            </TablePlaceholder>
                        }
                        elseShow={
                            <TablePlaceholder>
                                No project roles available. Get started by
                                adding one.
                            </TablePlaceholder>
                        }
                    />
                }
            />

            <ProjectRoleDeleteConfirm
                role={currentRole!}
                open={delDialog}
                setDeldialogue={setDelDialog}
                handleDeleteRole={deleteProjectRole}
                confirmName={confirmName}
                setConfirmName={setConfirmName}
            />
        </PageContent>
    );
};

export default ProjectRoleList;
