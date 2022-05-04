import { ComponentProps, createElement, ReactNode, useMemo, VFC } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { TableToolbar } from 'component/common/Table/TableToolbar/TableToolbar';
import { usePagination } from 'hooks/table/usePagination';
import { useStyles } from './EnhancedTable.styles';
import Pagination from '../Pagination/Pagination';
import { sortPresetFunctions } from 'hooks/table/useSort';
import { useSortableHeaders } from 'hooks/table/useSortableHeaders';
import { TableHeader } from '../TableHeader/TableHeader';
import { TableColumnHeader } from '../TableColumnHeader/TableColumnHeader';
import { TableActions } from '../TableActions/TableActions';
import { useSearch } from 'hooks/table/useSearch';
import useLoading from 'hooks/useLoading';

const columnRenderer = {
    number: (value: number) => `${value}`,
    boolean: (value: boolean) => (value ? 'Yes' : 'No'),
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
     */
    columns: {
        field: keyof T;
        render?:
            | boolean
            | keyof typeof columnRenderer
            | VFC<Partial<T> & { __search?: string }>;
        label?: string;
        align?: ComponentProps<typeof TableCell>['align'];
        sort?:
            | true
            | keyof typeof sortPresetFunctions
            | ((a: T, b: T) => number);
    }[];
    defaultSort?: { field: keyof T; order: 'asc' | 'desc' };
    searchColumns?: (keyof T)[];
    toolbar?: ReactNode;
    isToolbarSeparated?: boolean;
    pageSize?: number;
    isLoading?: boolean;
}

/**
 * TODO: refactor into hook
 */
export const EnhancedTable = <T,>({
    data,
    dataKey,
    columns,
    pageSize,
    title,
    defaultSort,
    toolbar,
    isToolbarSeparated,
    searchColumns,
    isLoading = false,
}: IEnhancedTableProps<T>): ReturnType<VFC<IEnhancedTableProps<T>>> => {
    const styles = useStyles();

    const ref = useLoading(isLoading);

    const {
        search,
        data: searchedData,
        onSearch,
    } = useSearch(data, {
        columns: searchColumns,
    });

    const sortOptions = useMemo(() => {
        const columnsWithSort = columns.filter(({ sort }) => Boolean(sort));
        return columnsWithSort.reduce(
            (acc, { field, sort }) => ({ ...acc, [field]: sort }),
            {} as Record<
                keyof T,
                | true
                | keyof typeof sortPresetFunctions
                | ((a: T, b: T) => number)
            >
        );
    }, [columns]);

    const { data: sortedData, headerProps: sortableHeaderProps } =
        useSortableHeaders(searchedData, sortOptions, defaultSort);

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
                        row[key] = createElement(render, {
                            ...item,
                            __search: Boolean(onSearch) ? search : undefined,
                        });
                    }
                });
                return row;
            }),
        [page, dataKey, columns, onSearch, search]
    );

    return (
        <Paper ref={ref} className={styles.paper}>
            <TableToolbar title={title}>
                <TableActions
                    isSeparated={isToolbarSeparated}
                    search={search}
                    onSearch={
                        searchColumns && searchColumns?.length > 0
                            ? onSearch
                            : undefined
                    }
                >
                    {toolbar}
                </TableActions>
            </TableToolbar>
            <TableContainer className={styles.tableContainer}>
                <Table
                    aria-labelledby="tableTitle"
                    size="medium"
                    aria-label="enhanced table"
                >
                    <TableHeader>
                        {columns.map(({ field, label }) => (
                            <TableColumnHeader
                                key={field as string}
                                {...sortableHeaderProps[field as string]}
                            >
                                {label || (field as string)}
                            </TableColumnHeader>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {rows.map(row => (
                            <TableRow hover tabIndex={-1} key={row.__key}>
                                {columns.map(({ field, align }) => (
                                    <TableCell
                                        key={field as string}
                                        align={align}
                                    >
                                        {row[field as string]}
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
