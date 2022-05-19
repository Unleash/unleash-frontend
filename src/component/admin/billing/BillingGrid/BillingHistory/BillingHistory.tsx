// TODO: finish this

import {
    Table,
    SortableTableHeader,
    TableBody,
    TableCell,
    TableRow,
    TablePlaceholder,
} from 'component/common/Table';
import { PageContent } from 'component/common/PageContent/PageContent';
import { DateCell } from 'component/common/Table/cells/DateCell/DateCell';
import { useMemo, VFC } from 'react';
import { useGlobalFilter, useSortBy, useTable } from 'react-table';
import { sortTypes } from 'utils/sortTypes';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
import { IconButton, Typography } from '@mui/material';
import FileDownload from '@mui/icons-material/FileDownload';

interface IBillingHistoryProps {
    data: Record<string, any>[];
    isLoading?: boolean;
}

const columns = [
    {
        Header: 'Date',
        accessor: 'createdAt',
        Cell: DateCell,
        sortType: 'date',
    },
    {
        Header: 'Invoice nr.',
        accessor: 'number',
    },
    {
        Header: 'Payment method',
        accessor: 'method',
    },
    {
        Header: 'Amount',
        accessor: 'amountFomratted', // TODO: typo
        align: 'right',
    },
    {
        Header: 'Status',
        accessor: 'status',
        align: 'center',
    },
    {
        Header: 'Download',
        accessor: 'invoicePDF',
        align: 'center',
        Cell: ({ value }: { value: string }) => (
            <IconButton href={value}>
                <FileDownload />
            </IconButton>
        ),
    },
];

export const BillingHistory: VFC<IBillingHistoryProps> = ({
    data,
    isLoading = false,
}) => {
    const initialState = useMemo(
        () => ({
            sortBy: [{ id: 'createdAt', desc: false }],
        }),
        []
    );

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable(
            {
                columns,
                data,
                initialState,
                sortTypes,
                autoResetGlobalFilter: false,
                disableSortRemove: true,
            },
            useGlobalFilter,
            useSortBy
        );

    return (
        <PageContent isLoading={isLoading} disablePadding>
            <Typography
                sx={theme => ({
                    marginTop: '48px',
                    marginBottom: '20px',
                    fontSize: theme.fontSizes.mainHeader,
                })}
            >
                Payment history
            </Typography>
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
            <ConditionallyRender
                condition={rows.length === 0}
                show={
                    <TablePlaceholder>
                        You have not made any payments.
                    </TablePlaceholder>
                }
            />
        </PageContent>
    );
};
