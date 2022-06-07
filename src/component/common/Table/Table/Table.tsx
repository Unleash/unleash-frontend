import { FC, Profiler } from 'react';
import classnames from 'classnames';
import { Table as MUITable, TableProps } from '@mui/material';
import { useStyles } from './Table.styles';

declare global {
    interface Window {
        profilerData: any;
    }
}

window.profilerData = window.profilerData || [];

export const Table: FC<
    TableProps & {
        rowHeight?: 'auto' | 'dense' | 'standard' | 'compact' | number;
    }
> = ({ rowHeight = 'auto', className, ...props }) => {
    const { classes } = useStyles({ rowHeight });

    return (
        <Profiler
            id="table"
            onRender={(id, phase, duration) => {
                window.profilerData.push({
                    id,
                    phase,
                    duration,
                });
            }}
        >
            <MUITable
                className={classnames(classes.table, className)}
                {...props}
            />
        </Profiler>
    );
};
