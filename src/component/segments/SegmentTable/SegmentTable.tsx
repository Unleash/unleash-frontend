import { PageContent } from 'component/common/PageContent/PageContent';
import { PageHeader } from 'component/common/PageHeader/PageHeader';
import {
    TableSearch,
    SortableTableHeader,
    TableCell,
} from 'component/common/Table';
import { useTable, useGlobalFilter, useSortBy } from 'react-table';
import { CreateSegmentButton } from 'component/segments/CreateSegmentButton/CreateSegmentButton';
import { SearchHighlightProvider } from 'component/common/Table/SearchHighlightContext/SearchHighlightContext';
import { Table, TableBody, TableRow, useMediaQuery, Box } from '@mui/material';
import { sortTypes } from 'utils/sortTypes';
import { useSegments } from 'hooks/api/getters/useSegments/useSegments';
import { useMemo, useEffect } from 'react';
import { SegmentEmpty } from 'component/segments/SegmentEmpty/SegmentEmpty';
import { IconCell } from 'component/common/Table/cells/IconCell/IconCell';
import { Adjust } from '@mui/icons-material';
import { SegmentActionCell } from 'component/segments/SegmentActionCell/SegmentActionCell';
import { TextCell } from 'component/common/Table/cells/TextCell/TextCell';
import { DateCell } from 'component/common/Table/cells/DateCell/DateCell';
import theme from 'themes/theme';
import { SegmentDocsWarning } from 'component/segments/SegmentDocs/SegmentDocs';

export const SegmentTable = () => {
    const { segments, loading } = useSegments();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

    const data = useMemo(() => {
        return segments ?? [];
    }, [segments]);

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
            data: data as any,
            sortTypes,
            autoResetGlobalFilter: false,
            autoResetSortBy: false,
            disableSortRemove: true,
        },
        useGlobalFilter,
        useSortBy
    );

    useEffect(() => {
        if (isSmallScreen) {
            setHiddenColumns(['createdAt', 'createdBy']);
        } else {
            setHiddenColumns([]);
        }
    }, [setHiddenColumns, isSmallScreen]);

    const headerActions = (
        <>
            <TableSearch
                initialValue={globalFilter}
                onChange={setGlobalFilter}
            />
            <PageHeader.Divider />
            <CreateSegmentButton />
        </>
    );

    const header = <PageHeader title="Segments" actions={headerActions} />;

    if (loading) {
        return null;
    }

    if (data.length === 0) {
        return (
            <PageContent header={header}>
                <SegmentEmpty />
            </PageContent>
        );
    }

    return (
        <PageContent header={header}>
            <Box sx={{ mb: 4 }}>
                <SegmentDocsWarning />
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

const COLUMNS = [
    {
        id: 'Icon',
        width: '1%',
        canSort: false,
        Cell: () => <IconCell icon={<Adjust color="disabled" />} />,
    },
    {
        Header: 'Name',
        accessor: 'name',
        Cell: (props: any) => <TextCell>{props.row.original.name}</TextCell>,
    },
    {
        Header: 'Created at',
        accessor: 'createdAt',
        width: '1%',
        Cell: (props: any) => <DateCell value={props.row.original.createdAt} />,
    },
    {
        Header: 'Created by',
        accessor: 'createdBy',
        width: '1%',
        Cell: (props: any) => (
            <TextCell>{props.row.original.createdBy}</TextCell>
        ),
    },
    {
        Header: 'Actions',
        id: 'Actions',
        align: 'right',
        width: '1%',
        canSort: false,
        Cell: (props: any) => (
            <SegmentActionCell segment={props.row.original} />
        ),
    },
];
