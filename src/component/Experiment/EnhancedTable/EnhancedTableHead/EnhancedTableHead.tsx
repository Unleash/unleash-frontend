import { ChangeEventHandler, MouseEvent } from 'react';
import {
    Checkbox,
    // createStyles,
    // makeStyles,
    TableCell,
    TableHead,
    TableRow,
    // TableSortLabel,
    // Theme,
} from '@material-ui/core';
import { Order } from '../utils';

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

interface IEnhancedTableHeadProps<T extends Record<any, any>> {
    numSelected: number;
    onRequestSort: (event: MouseEvent<unknown>, property: keyof T) => void;
    onSelectAllClick: ChangeEventHandler<HTMLInputElement>;
    order: Order;
    orderBy: string;
    rowCount: number;
}

export const EnhancedTableHead = <T,>({
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
}: IEnhancedTableHeadProps<T>) => {
    // const styles = useStyles();
    // const createSortHandler =
    //     (property: keyof T) => (event: MouseEvent<unknown>) => {
    //         onRequestSort(event, property);
    //     };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={
                            numSelected > 0 && numSelected < rowCount
                        }
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                    />
                </TableCell>
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
