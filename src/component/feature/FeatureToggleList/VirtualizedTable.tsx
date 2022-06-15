import { useMemo, VFC } from 'react';
import { useTheme } from '@mui/material';
import {
    SortableTableHeader,
    Table,
    TableCell,
    TableBody,
    TableRow,
} from 'component/common/Table';
import { useVirtualizedRange } from 'hooks/useVirtualizedRange';
import { useStyles } from './styles';
import { HeaderGroup, Row } from 'react-table';

interface IVirtualizedTableProps {
    rowHeight?: number;
    headerGroups: HeaderGroup<object>[];
    rows: Row<object>[];
    prepareRow: (row: Row) => void;
}

export const VirtualizedTable: VFC<IVirtualizedTableProps> = ({
    rowHeight: rowHeightOverride,
    headerGroups,
    rows,
    prepareRow,
}) => {
    const { classes } = useStyles();
    const theme = useTheme();
    const rowHeight = useMemo(
        () => rowHeightOverride || theme.shape.tableRowHeight,
        [rowHeightOverride, theme.shape.tableRowHeight]
    );

    const [firstRenderedIndex, lastRenderedIndex] =
        useVirtualizedRange(rowHeight);

    const tableHeight =
        rowHeight * rows.length + theme.shape.tableRowHeightCompact;

    return (
        <Table
            role="table"
            rowHeight={rowHeight}
            style={{ height: tableHeight }}
        >
            <SortableTableHeader headerGroups={headerGroups} flex />
            <TableBody role="rowgroup">
                {rows.map((row, index) => {
                    const top =
                        index * rowHeight + theme.shape.tableRowHeightCompact;

                    const isVirtual =
                        index < firstRenderedIndex || index > lastRenderedIndex;

                    if (isVirtual) {
                        return null;
                    }

                    prepareRow(row);
                    return (
                        <TableRow
                            hover
                            {...row.getRowProps()}
                            key={row.id}
                            className={classes.row}
                            style={{ display: 'flex', top }}
                        >
                            {row.cells.map(cell => (
                                <TableCell
                                    {...cell.getCellProps({
                                        style: {
                                            flex: cell.column.minWidth
                                                ? '1 0 auto'
                                                : undefined,
                                        },
                                    })}
                                    className={classes.cell}
                                >
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
