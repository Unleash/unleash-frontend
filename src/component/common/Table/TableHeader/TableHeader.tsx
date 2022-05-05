import { TableHead, TableRow } from '@mui/material';
import { FC } from 'react';
import { useStyles } from './TableHeader.styles';

/**
 * @deprecated
 */
export const TableHeader: FC = ({ children }) => {
    const { classes: styles } = useStyles();
    return (
        <TableHead>
            <TableRow className={styles.tableHeader}>{children}</TableRow>
        </TableHead>
    );
};
