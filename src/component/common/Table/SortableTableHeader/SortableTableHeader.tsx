import { VFC } from 'react';
import { TableHead, TableRow } from '@mui/material';
import { HeaderGroup } from 'react-table';
import { useStyles } from './SortableTableHeader.styles';
import { CellSortable } from './CellSortable/CellSortable';

interface ISortableTableHeaderProps {
    headerGroups: HeaderGroup<object>[];
    className?: string;
}

export const SortableTableHeader: VFC<ISortableTableHeaderProps> = ({
    headerGroups,
    className,
}) => {
    const { classes: styles } = useStyles();

    return (
        <TableHead className={className}>
            {headerGroups.map(headerGroup => (
                <TableRow
                    {...headerGroup.getHeaderGroupProps()}
                    className={styles.tableHeader}
                >
                    {headerGroup.headers.map(column => {
                        const content = column.render('Header');

                        return (
                            <CellSortable
                                {...column.getHeaderProps(
                                    column.getSortByToggleProps()
                                )}
                                ariaTitle={
                                    typeof content === 'string'
                                        ? content
                                        : undefined
                                }
                                isSortable={column.canSort}
                                isSorted={column.isSorted}
                                isDescending={column.isSortedDesc}
                                maxWidth={column.maxWidth}
                                minWidth={column.minWidth}
                                width={column.width}
                                // @ts-expect-error -- check after `react-table` v8
                                align={column.align}
                            >
                                {content}
                            </CellSortable>
                        );
                    })}
                </TableRow>
            ))}
        </TableHead>
    );
};
