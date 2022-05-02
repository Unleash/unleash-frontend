import React, { FC, useContext } from 'react';
import { Box, TableCell, Typography } from '@material-ui/core';
import classnames from 'classnames';
import {
    UnfoldMoreOutlined,
    KeyboardArrowDown,
    KeyboardArrowUp,
} from '@material-ui/icons';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
import { useStyles } from './TableColumnHeader.styles';
import { AnnouncerContext } from 'component/common/Announcer/AnnouncerContext/AnnouncerContext';

interface ITableColumnHeaderProps {
    children: string;
    className?: string;
    isSortable?: boolean;
    sortOrder?: 'asc' | 'desc';
    onSort?: () => void;
}

export const TableColumnHeader: FC<ITableColumnHeaderProps> = ({
    children,
    className,
    isSortable,
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
                `Sorted table by ${children}, ${
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
                styles.tableCell,
                isSortable && styles.tableSortableCell
            )}
        >
            <ConditionallyRender
                condition={Boolean(isSortable)}
                show={
                    <button
                        aria-label={`Sort by ${children}`}
                        onClick={onSortClick}
                        className={styles.sortButton}
                    >
                        <Box className={styles.cellPadding}>
                            <Typography
                                component="span"
                                variant="body2"
                                className={classnames(
                                    Boolean(sortOrder) && styles.activeSortLabel
                                )}
                            >
                                {children}
                            </Typography>

                            <ConditionallyRender
                                condition={Boolean(sortOrder)}
                                show={
                                    <ConditionallyRender
                                        condition={sortOrder === 'asc'}
                                        show={
                                            <Box
                                                component="span"
                                                className={styles.icon}
                                            >
                                                <KeyboardArrowUp fontSize="inherit" />
                                            </Box>
                                        }
                                        elseShow={
                                            <Box
                                                component="span"
                                                className={styles.icon}
                                            >
                                                <KeyboardArrowDown fontSize="inherit" />
                                            </Box>
                                        }
                                    />
                                }
                                elseShow={
                                    <Box
                                        component="span"
                                        className={styles.icon}
                                    >
                                        <UnfoldMoreOutlined fontSize="inherit" />
                                    </Box>
                                }
                            />
                        </Box>
                    </button>
                }
                elseShow={
                    <Box className={styles.cellPadding}>
                        <Typography variant="body2" component="span">
                            {children}
                        </Typography>
                    </Box>
                }
            />
        </TableCell>
    );
};
