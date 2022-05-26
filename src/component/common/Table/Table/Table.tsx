import { FC } from 'react';
import classnames from 'classnames';
import { Table as MUITable, TableProps } from '@mui/material';
import { useStyles } from './Table.styles';

export const Table: FC<
    TableProps & {
        rowHeight?: 'flex' | 'dense' | 'standard' | 'compact' | number;
    }
> = ({ rowHeight = 'flex', className, ...props }) => {
    const { classes } = useStyles({ rowHeight });

    return (
        <MUITable className={classnames(classes.table, className)} {...props} />
    );
};
