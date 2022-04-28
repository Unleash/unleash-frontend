import React, { FC, useContext } from 'react';
import { TableCell, Typography } from '@material-ui/core';
import classnames from 'classnames';
import {
    UnfoldMoreOutlined,
    KeyboardArrowDown,
    KeyboardArrowUp,
} from '@material-ui/icons';
import ConditionallyRender from 'component/common/ConditionallyRender';
import { useStyles } from 'component/common/Table/TableCellSortable/TableCellSortable.styles';
import { AnnouncerContext } from 'component/common/Announcer/AnnouncerContext/AnnouncerContext';

interface ITableColumnHeaderProps {
    className?: string;
    isSortable?: boolean;
    field: string;
    sortOrder?: 'asc' | 'desc';
    onSort?: () => void;
}

export const TableColumnHeader: FC<ITableColumnHeaderProps> = ({
    children,
    className,
    isSortable,
    field,
    sortOrder,
    onSort,
}) => {
    const { setAnnouncement } = useContext(AnnouncerContext);
    const styles = useStyles();

    const ariaSort = isSortable
        ? sortOrder === 'desc'
            ? 'descending'
            : 'ascending'
        : undefined;

    const onSortClick = () => {
        if (onSort) {
            onSort();
            setAnnouncement(
                // TODO: improve ARIA label
                `Sorted table by ${field}, ${
                    sortOrder === 'desc' ? 'ascending' : 'descending'
                }`
            );
        }
    };

    return (
        <TableCell
            aria-sort={ariaSort}
            className={classnames(
                className,
                isSortable && styles.tableCellHeaderSortable,
                isSortable && 'sorted'
            )}
            onClick={onSortClick}
        >
            <ConditionallyRender
                condition={Boolean(isSortable)}
                show={
                    <>
                        <Typography
                            className={classnames(
                                sortOrder && styles.sortButton
                            )}
                            component="span"
                        >
                            {children}
                        </Typography>

                        <ConditionallyRender
                            condition={Boolean(sortOrder)}
                            show={
                                <ConditionallyRender
                                    condition={sortOrder === 'asc'}
                                    show={<KeyboardArrowUp />}
                                    elseShow={<KeyboardArrowDown />}
                                />
                            }
                            elseShow={<UnfoldMoreOutlined />}
                        />
                    </>
                }
                elseShow={children}
            />
        </TableCell>
    );
};
