import {useMemo, useState, VFC} from 'react';
import {useFlexLayout, useSortBy, useTable} from 'react-table';
import {
    Table,
    TableBody,
    TableRow,
    TableCell,
    SortableTableHeader, VirtualizedTable, TablePlaceholder,
} from 'component/common/Table';
import {Avatar, SelectChangeEvent, styled} from '@mui/material';
import {Delete} from '@mui/icons-material';
import {sortTypes} from 'utils/sortTypes';
import {
    IProjectAccessOutput,
    IProjectAccessUser,
} from 'hooks/api/getters/useProjectAccess/useProjectAccess';
import {ProjectRoleCell} from './ProjectRoleCell/ProjectRoleCell';
import PermissionIconButton from 'component/common/PermissionIconButton/PermissionIconButton';
import {UPDATE_PROJECT} from 'component/providers/AccessProvider/permissions';
import {TextCell} from 'component/common/Table/cells/TextCell/TextCell';
import {ActionCell} from 'component/common/Table/cells/ActionCell/ActionCell';
import {SearchHighlightProvider} from "../../../common/Table/SearchHighlightContext/SearchHighlightContext";
import {ConditionallyRender} from "../../../common/ConditionallyRender/ConditionallyRender";
import {useSearch} from "../../../../hooks/useSearch";
import {useSearchParams} from "react-router-dom";

const initialState = {
    sortBy: [{id: 'name'}],
};

const StyledAvatar = styled(Avatar)(({theme}) => ({
    width: theme.spacing(4),
    height: theme.spacing(4),
    margin: 'auto',
}));

interface IProjectAccessTableProps {
    access: IProjectAccessOutput;
    projectId: string;
    handleRoleChange: (
        userId: number
    ) => (event: SelectChangeEvent) => Promise<void>;
    handleRemoveAccess: (user: IProjectAccessUser) => void;
}

export const ProjectAccessTable: VFC<IProjectAccessTableProps> = ({
                                                                      access,
                                                                      projectId,
                                                                      handleRoleChange,
                                                                      handleRemoveAccess,
                                                                  }) => {
    const data = access.users;

    const [searchParams, setSearchParams] = useSearchParams();

    const columns = useMemo(
        () => [
            {
                Header: 'Avatar',
                accessor: 'imageUrl',
                disableSortBy: true,
                maxWidth: 80,
                Cell: ({value}: { value: string }) => (
                    <TextCell>
                        <StyledAvatar
                            data-loading
                            alt="Gravatar"
                            src={value}
                        />
                    </TextCell>
                ),
                align: 'center',
            },
            {
                id: 'name',
                Header: 'Name',
                minWidth: 200,
                accessor: (row: any) => row.name || '',
            },
            {
                id: 'username',
                Header: 'Username',
                accessor: 'email',
                minWidth: 200,
                Cell: ({row: {original: user}}: any) => (
                    <TextCell>{user.email || user.username}</TextCell>
                ),
            },
            {
                Header: 'Role',
                accessor: 'roleId',
                minWidth: 120,
                Cell: ({
                           value,
                           row: {original: user},
                       }: {
                    value: number;
                    row: { original: IProjectAccessUser };
                }) => (
                    <ProjectRoleCell
                        value={value}
                        user={user}
                        roles={access.roles}
                        onChange={handleRoleChange(user.id)}
                    />
                ),
            },
            {
                id: 'actions',
                Header: 'Actions',
                disableSortBy: true,
                align: 'center',
                maxWidth: 200,
                Cell: ({row: {original: user}}: any) => (
                    <ActionCell>
                        <PermissionIconButton
                            permission={UPDATE_PROJECT}
                            projectId={projectId}
                            onClick={() => handleRemoveAccess(user)}
                            disabled={access.users.length === 1}
                            tooltipProps={{
                                title:
                                    access.users.length === 1
                                        ? 'Cannot remove access. A project must have at least one owner'
                                        : 'Remove access',
                            }}
                        >
                            <Delete/>
                        </PermissionIconButton>
                    </ActionCell>
                ),
            },
        ],
        [
            access.roles,
            access.users.length,
            handleRemoveAccess,
            handleRoleChange,
            projectId,
        ]
    );

    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} =
        useTable(
            {
                columns: columns as any[], // TODO: fix after `react-table` v8 update
                data: data as any[],
                initialState,
                sortTypes,
                autoResetGlobalFilter: false,
                autoResetSortBy: false,
                disableSortRemove: true,
                defaultColumn: {
                    Cell: TextCell,
                },
            },
            useFlexLayout,
            useSortBy,
        );

    const [searchValue, setSearchValue] = useState(
        searchParams.get('search') || ''
    );

    const {
        data: searchedData,
        getSearchText,
        getSearchContext,
    } = useSearch(columns, searchValue, rows);

    return (
        // <Table {...getTableProps()} rowHeight="compact">
        //     {/* @ts-expect-error -- react-table  */}
        //     <SortableTableHeader headerGroups={headerGroups} />
        //     <TableBody {...getTableBodyProps()}>
        //         {rows.map(row => {
        //             prepareRow(row);
        //             return (
        //                 <TableRow hover {...row.getRowProps()}>
        //                     {row.cells.map(cell => (
        //                         <TableCell {...cell.getCellProps()}>
        //                             {cell.render('Cell')}
        //                         </TableCell>
        //                     ))}
        //                 </TableRow>
        //             );
        //         })}
        //     </TableBody>
        // </Table>
        <>
            <SearchHighlightProvider value={getSearchText(searchValue)}>
                <VirtualizedTable
                    rows={rows}
                    headerGroups={headerGroups}
                    prepareRow={prepareRow}
                />
            </SearchHighlightProvider>
            <ConditionallyRender
                condition={rows.length === 0}
                show={
                    <ConditionallyRender
                        condition={searchValue?.length > 0}
                        show={
                            <TablePlaceholder>
                                No feature toggles found matching &ldquo;
                                {searchValue}
                                &rdquo;
                            </TablePlaceholder>
                        }
                        elseShow={
                            <TablePlaceholder>
                                No feature toggles available. Get started by
                                adding a new feature toggle.
                            </TablePlaceholder>
                        }
                    />
                }
            />
        </>
    );
};
