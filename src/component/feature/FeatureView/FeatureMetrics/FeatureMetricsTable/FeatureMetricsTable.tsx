import { IFeatureMetricsRaw } from 'interfaces/featureToggle';
import { TableBody, TableRow } from '@mui/material';
import { DateCell } from 'component/common/Table/cells/DateCell/DateCell';
import { useTable, useGlobalFilter, useSortBy } from 'react-table';
import { SortableTableHeader, TableCell, Table } from 'component/common/Table';
import { IconCell } from 'component/common/Table/cells/IconCell/IconCell';
import { Assessment } from '@mui/icons-material';
import { useMemo } from 'react';
import { TextCell } from 'component/common/Table/cells/TextCell/TextCell';

export const FEATURE_METRICS_TABLE_ID = 'feature-metrics-table-id';

interface IFeatureMetricsTableProps {
    metrics: IFeatureMetricsRaw[];
}

export const FeatureMetricsTable = ({ metrics }: IFeatureMetricsTableProps) => {
    const initialState = useMemo(
        () => ({ sortBy: [{ id: 'timestamp', desc: true }] }),
        []
    );

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable(
            {
                initialState,
                columns: COLUMNS as any,
                data: metrics as any,
                disableSortRemove: true,
                defaultColumn: { Cell: TextCell },
            },
            useGlobalFilter,
            useSortBy
        );

    if (metrics.length === 0) {
        return null;
    }

    return (
        <Table {...getTableProps()} rowHeight="standard">
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
    );
};

const COLUMNS = [
    {
        id: 'Icon',
        width: '1%',
        canSort: false,
        Cell: () => <IconCell icon={<Assessment color="disabled" />} />,
    },
    {
        Header: 'Time',
        accessor: 'timestamp',
        Cell: (props: any) => <DateCell value={props.row.original.timestamp} />,
    },
    {
        Header: 'Application',
        accessor: 'appName',
    },
    {
        Header: 'Environment',
        accessor: 'environment',
    },
    {
        Header: 'Requested',
        accessor: (original: any) => original.yes + original.no,
    },
    {
        Header: 'Exposed',
        accessor: 'yes',
    },
];
