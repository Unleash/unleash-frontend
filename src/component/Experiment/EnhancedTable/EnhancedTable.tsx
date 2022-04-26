import {
    ComponentProps,
    // ChangeEventHandler,
    MouseEvent,
    ReactNode,
    useMemo,
    useState,
    VFC,
} from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';

// import { getComparator, Order, stableSort } from './utils';
import { TopTableToolbar } from './TopTableToolbar/TopTableToolbar';
// import { EnhancedTableHead } from './EnhancedTableHead/EnhancedTableHead';

// interface Data {
//     calories: number;
//     carbs: number;
//     fat: number;
//     name: string;
//     protein: number;
// }

// function createData(
//     name: string,
//     calories: number,
//     fat: number,
//     carbs: number,
//     protein: number
// ): Data {
//     return { name, calories, fat, carbs, protein };
// }

// const rows = [
//     createData('Cupcake', 305, 3.7, 67, 4.3),
//     createData('Donut', 452, 25.0, 51, 4.9),
//     createData('Eclair', 262, 16.0, 24, 6.0),
//     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//     createData('Gingerbread', 356, 16.0, 49, 3.9),
//     createData('Honeycomb', 408, 3.2, 87, 6.5),
//     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//     createData('Jelly Bean', 375, 0.0, 94, 0.0),
//     createData('KitKat', 518, 26.0, 65, 7.0),
//     createData('Lollipop', 392, 0.2, 98, 0.0),
//     createData('Marshmallow', 318, 0, 81, 2.0),
//     createData('Nougat', 360, 19.0, 9, 37.0),
//     createData('Oreo', 437, 18.0, 63, 4.0),
// ];

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        paper: {
            width: '100%',
            marginBottom: theme.spacing(2),
        },
        table: {
            minWidth: 750,
        },
    })
);

const columnRenderer = {
    number: (value: number) => `${value}`,
    boolean: (value: boolean) => (value ? 'Yes' : 'No'),
    date: (value: string | Date) => new Date(value).toLocaleDateString(), // FIXME: format
};

interface IEnhancedTableProps<T extends Record<string, any>> {
    data: T[];
    /**
     * The key of the data object to be used as a unique identifier of each row.
     */
    dataKey: keyof T;
    /**
     * What columns to render and how.
     */
    columns: (
        | {
              field: keyof T;
              render?: boolean | keyof typeof columnRenderer | VFC<Partial<T>>;
              label?: string;
              align?: ComponentProps<typeof TableCell>['align'];
          }
        | {
              field: string;
              render?: VFC<Partial<T>>;
              label?: string;
              align?: ComponentProps<typeof TableCell>['align'];
          }
    )[];
    isSelectable?: boolean;
}

export const EnhancedTable = <T,>({
    data,
    dataKey,
    columns,
    isSelectable = false,
}: IEnhancedTableProps<T>): ReturnType<VFC<IEnhancedTableProps<T>>> => {
    const classes = useStyles();
    // const [order, setOrder] = useState<Order>('asc');
    // const [orderBy, setOrderBy] = useState<keyof T>(dataKey);
    const [selected, setSelected] = useState<string[]>([]);
    // const columnsMap = useMemo(
    //     () => new Map(columns.map(({ field, ...rest }) => [field, rest])),
    //     [columns]
    // );

    const rows = useMemo(
        () =>
            data.map(item => {
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
        [data, dataKey, columns]
    );

    console.log({ data, rows });

    // const handleRequestSort = (
    //     event: MouseEvent<unknown>,
    //     property: keyof T
    // ) => {
    //     const isAsc = orderBy === property && order === 'asc';
    //     setOrder(isAsc ? 'desc' : 'asc');
    //     setOrderBy(property);
    // };

    // const handleSelectAllClick: ChangeEventHandler<
    //     HTMLInputElement
    // > = event => {
    //     if (event.target.checked) {
    //         const newSelecteds = rows.map(n => n.name);
    //         setSelected(newSelecteds);
    //         return;
    //     }
    //     setSelected([]);
    // };

    const handleClick = (event: MouseEvent<unknown>, key: string) => {
        const selectedIndex = selected.indexOf(key);
        let newSelected: string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, key);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        setSelected(newSelected);
    };

    const isSelected = (name: string) => selected.indexOf(name) !== -1;

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <TopTableToolbar rows={rows} numSelected={selected.length} />
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size="medium"
                        aria-label="enhanced table"
                    >
                        {/* <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        /> */}
                        <TableBody>
                            {/* // TODO: sort/filter hook? */}
                            {/* {stableSort(
                                rows,
                                getComparator(order, orderBy))} */}
                            {rows.map((row, index) => {
                                const isItemSelected = isSelected(row.__key);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        onClick={event =>
                                            handleClick(event, row.__key)
                                        }
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.__key}
                                        selected={isItemSelected}
                                    >
                                        {isSelectable ? (
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-labelledby':
                                                            labelId,
                                                    }}
                                                />
                                            </TableCell>
                                        ) : null}

                                        {columns.map(({ field, align }) => (
                                            <TableCell
                                                key={field as string}
                                                align={align}
                                            >
                                                {row[field]}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    );
};
