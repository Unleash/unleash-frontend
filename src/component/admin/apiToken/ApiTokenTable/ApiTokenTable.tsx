import { useApiTokens } from 'hooks/api/getters/useApiTokens/useApiTokens';
import { useTable, useGlobalFilter, useSortBy } from 'react-table';
import { PageContent } from 'component/common/PageContent/PageContent';
import {
    SortableTableHeader,
    TableSearch,
    TableCell,
} from 'component/common/Table';
import { Table, TableBody, Box, TableRow, useMediaQuery } from '@mui/material';
import { PageHeader } from 'component/common/PageHeader/PageHeader';
import { SearchHighlightProvider } from 'component/common/Table/SearchHighlightContext/SearchHighlightContext';
import { ApiTokenDocs } from 'component/admin/apiToken/ApiTokenDocs/ApiTokenDocs';
import { CreateApiTokenButton } from 'component/admin/apiToken/CreateApiTokenButton/CreateApiTokenButton';
import { IconCell } from 'component/common/Table/cells/IconCell/IconCell';
import { TextCell } from 'component/common/Table/cells/TextCell/TextCell';
import { Lock } from '@mui/icons-material';
import { ActionCell } from 'component/common/Table/cells/ActionCell/ActionCell';
import { CopyApiTokenButton } from 'component/admin/apiToken/CopyApiTokenButton/CopyApiTokenButton';
import { RemoveApiTokenButton } from 'component/admin/apiToken/RemoveApiTokenButton/RemoveApiTokenButton';
import { DateCell } from 'component/common/Table/cells/DateCell/DateCell';
import { sortTypes } from 'utils/sortTypes';
import { useEffect, useMemo } from 'react';
import theme from 'themes/theme';
import useUiConfig from 'hooks/api/getters/useUiConfig/useUiConfig';
import { ProjectsList } from 'component/admin/apiToken/ProjectsList/ProjectsList';

export const ApiTokenTable = () => {
    const { tokens } = useApiTokens();
    const hiddenColumns = useHiddenColumns();
    const initialState = useMemo(() => ({ sortBy: [{ id: 'createdAt' }] }), []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state: { globalFilter },
        setGlobalFilter,
        setHiddenColumns,
    } = useTable(
        {
            columns: COLUMNS as any,
            data: tokens as any,
            initialState,
            sortTypes,
            disableSortRemove: true,
        },
        useGlobalFilter,
        useSortBy
    );

    useEffect(() => {
        setHiddenColumns(hiddenColumns);
    }, [setHiddenColumns, hiddenColumns]);

    const headerSearch = (
        <TableSearch initialValue={globalFilter} onChange={setGlobalFilter} />
    );

    const headerActions = (
        <>
            {headerSearch}
            <PageHeader.Divider />
            <CreateApiTokenButton />
        </>
    );

    const header = <PageHeader title="API Access" actions={headerActions} />;

    if (!tokens.length) {
        return null;
    }

    return (
        <PageContent header={header}>
            <Box sx={{ mb: 4 }}>
                <ApiTokenDocs />
            </Box>
            <SearchHighlightProvider value={globalFilter}>
                <Table {...getTableProps()}>
                    <SortableTableHeader headerGroups={headerGroups as any} />
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
        </PageContent>
    );
};

const useHiddenColumns = (): string[] => {
    const { uiConfig } = useUiConfig();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

    return useMemo(() => {
        const hidden: string[] = [];

        if (!uiConfig.flags.E) {
            hidden.push('projects');
            hidden.push('environment');
        }

        if (isMediumScreen) {
            hidden.push('Icon');
            hidden.push('createdAt');
        }

        if (isSmallScreen) {
            hidden.push('username');
        }

        return hidden;
    }, [uiConfig, isSmallScreen, isMediumScreen]);
};

const COLUMNS = [
    {
        id: 'Icon',
        width: '1%',
        canSort: false,
        Cell: () => <IconCell icon={<Lock color="disabled" />} />,
    },
    {
        Header: 'Name',
        accessor: 'username',
        Cell: (props: any) => (
            <TextCell>{props.row.original.username}</TextCell>
        ),
    },
    {
        Header: 'Type',
        accessor: 'type',
        Cell: (props: any) => <TextCell>{props.row.original.type}</TextCell>,
    },
    {
        Header: 'Project',
        accessor: 'project',
        Cell: (props: any) => (
            <TextCell>
                <ProjectsList
                    project={props.row.original.project}
                    projects={props.row.original.projects}
                />
            </TextCell>
        ),
    },
    {
        Header: 'Environment',
        accessor: 'environment',
        Cell: (props: any) => (
            <TextCell>{props.row.original.environment}</TextCell>
        ),
    },
    {
        Header: 'Created',
        accessor: 'createdAt',
        Cell: (props: any) => <DateCell value={props.row.original.createdAt} />,
    },
    {
        Header: 'Actions',
        id: 'Actions',
        align: 'center',
        width: '1%',
        canSort: false,
        Cell: (props: any) => (
            <ActionCell>
                <CopyApiTokenButton token={props.row.original} />
                <RemoveApiTokenButton token={props.row.original} />
            </ActionCell>
        ),
    },
];
