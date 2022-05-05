import { forwardRef } from 'react';
import { Paper, PaperProps } from '@mui/material';
import { useStyles } from './TableContainer.styles';

export const TableContainer = forwardRef<HTMLDivElement, PaperProps>(
    ({ children, ...props }, ref) => {
        const { classes: styles } = useStyles();

        return (
            <Paper ref={ref} className={styles.panel} {...props}>
                {children}
            </Paper>
        );
    }
);
