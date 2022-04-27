import { TableHead, TableRow } from '@material-ui/core';
import { FC } from 'react';
import { useStyles } from './TableHeader.styles';

export const TableHeader: FC = ({ children }) => {
    const styles = useStyles();
    return (
        <TableHead>
            <TableRow className={styles.tableHeader}>{children}</TableRow>
        </TableHead>
    );
};
