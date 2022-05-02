import { ComponentProps, ReactNode, useMemo, VFC } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { TableToolbar } from 'component/common/Table/TableToolbar/TableToolbar';
import { usePagination } from 'hooks/table/usePagination';
import { EnhancedTableHead } from './EnhancedTableHead/EnhancedTableHead';
import { useStyles } from './EnhancedTable.styles';
import Pagination from '../Pagination/Pagination';
import { sortPresetFunctions } from 'hooks/table/useSort';
import { useSortableHeaders } from 'hooks/table/useSortableHeaders';

const columnRenderer = {
    number: (value: number) => `${value}`,
    boolean: (value: boolean) => (value ? 'Yes' : 'No'),
    date: (value: string | Date) => new Date(value).toLocaleDateString(), // FIXME: format
};

interface IEnhancedTableProps<T extends Record<string, any>> {
    title: string;
    data: T[];
    /**
     * The key of the data object to be used as a unique identifier of each row.
     */
    dataKey: keyof T;
    /**
     * What columns to render and how.
     * TODO: improve type
     */
    columns: (
        | {
              field: keyof T;
              render?: boolean | keyof typeof columnRenderer | VFC<Partial<T>>;
              label?: string;
              align?: ComponentProps<typeof TableCell>['align'];
              sort?:
                  | boolean
                  | keyof typeof sortPresetFunctions
                  | VFC<Partial<T>>;
          }
        | {
              field: string;
              render?: VFC<Partial<T>>;
              label?: string;
              align?: ComponentProps<typeof TableCell>['align'];
              sort?: VFC<Partial<T>>;
          }
    )[];
    pageSize?: number;
}

export const EnhancedTable = <T,>({
    data,
    dataKey,
    columns,
    pageSize,
    title,
}: IEnhancedTableProps<T>): ReturnType<VFC<IEnhancedTableProps<T>>> => {
    const classes = useStyles();

    const { data: sortedData } = useSortableHeaders(data, {});

    const {
        data: page,
        pageCount,
        pageIndex,
        onPageChange,
    } = usePagination(sortedData, pageSize);

    const rows = useMemo(
        () =>
            page.map(item => {
                const row = {
                    __key: `${item[dataKey]}`,
                } as Record<string, ReactNode> & {
                    __key: string;
                };

                columns.forEach(({ field, render }) => {
                    const key = field as string;
                    const value = item[field as keyof T];

                    if (render === undefined) {
                        row[key] = value;
                    } else if (
                        typeof render === 'string' &&
                        value !== undefined
                    ) {
                        const func =
                            columnRenderer[
                                render as keyof typeof columnRenderer
                            ];
                        // @ts-expect-error -- TS has issues resolving parameter types
                        row[key] = func(value);
                    } else if (typeof render === 'function') {
                        row[key] = render(item);
                    }
                });
                return row;
            }),
        [page, dataKey, columns]
    );

    return (
        <Paper className={classes.paper}>
            <TableToolbar title={title} />
            <TableContainer className={classes.tableContainer}>
                <Table
                    aria-labelledby="tableTitle"
                    size="medium"
                    aria-label="enhanced table"
                >
                    <EnhancedTableHead
                        columns={columns.map(({ field, label, align }) => ({
                            field: field as string,
                            label,
                            align,
                        }))}
                    />
                    <TableBody>
                        {rows.map(row => (
                            <TableRow hover tabIndex={-1} key={row.__key}>
                                {columns.map(({ field, align }) => (
                                    <TableCell
                                        key={field as string}
                                        align={align}
                                    >
                                        {row[field]}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination
                pageCount={pageCount}
                pageIndex={pageIndex}
                onPageChange={onPageChange}
            />
        </Paper>
    );
};
