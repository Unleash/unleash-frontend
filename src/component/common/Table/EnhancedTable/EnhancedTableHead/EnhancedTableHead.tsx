// import { ChangeEventHandler, MouseEvent } from 'react';
import {
    // Checkbox,
    // createStyles,
    // makeStyles,
    TableCell,
    TableHead,
    TableRow,
    // TableSortLabel,
    // Theme,
} from '@material-ui/core';
import { useStyles } from 'component/admin/users/UsersList/UserListItem/UserListItem.styles'; // FIXME: move
import { ComponentProps } from 'react';
// import { Order } from '../utils';

// const useStyles = makeStyles((theme: Theme) =>
//     createStyles({
//         visuallyHidden: {
//             border: 0,
//             clip: 'rect(0 0 0 0)',
//             height: 1,
//             margin: -1,
//             overflow: 'hidden',
//             padding: 0,
//             position: 'absolute',
//             top: 20,
//             width: 1,
//         },
//     })
// );

// interface IEnhancedTableHeadProps<T extends Record<any, any>> {
interface IEnhancedTableHeadProps {
    // numSelected: number;
    // onRequestSort: (event: MouseEvent<unknown>, property: keyof T) => void;
    // onSelectAllClick: ChangeEventHandler<HTMLInputElement>;
    // order: Order;
    // orderBy: string;
    // rowCount: number;
    columns: {
        field?: string;
        label?: string;
        align: ComponentProps<typeof TableCell>['align'];
    }[];
}

export const EnhancedTableHead = ({
    // onSelectAllClick,
    // order,
    // orderBy,
    // numSelected,
    // rowCount,
    // onRequestSort,
    columns,
}: IEnhancedTableHeadProps) => {
    const styles = useStyles();
    // const styles = useStyles();
    // const createSortHandler =
    //     (property: keyof T) => (event: MouseEvent<unknown>) => {
    //         onRequestSort(event, property);
    //     };

    return (
        <TableHead>
            <TableRow className={styles.tableCellHeader}>
                {columns.map(column => {
                    return (
                        <TableCell
                            align={column.align}
                            key={column.field}
                            // className={classnames(
                            //     styles.hideXS,
                            //     styles.firstColumnSM
                            // )}
                        >
                            {column.label !== undefined
                                ? column.label
                                : column.field}
                        </TableCell>
                    );
                })}
                {/* <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={
                            numSelected > 0 && numSelected < rowCount
                        }
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                    />
                </TableCell> */}
                {/* {headCells.map(headCell => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                        active={orderBy === headCell.id}
                        direction={orderBy === headCell.id ? order : 'asc'}
                        onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={styles.visuallyHidden}>
                                    {order === 'desc'
                                        ? 'sorted descending'
                                        : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))} */}
            </TableRow>
        </TableHead>
    );
};
