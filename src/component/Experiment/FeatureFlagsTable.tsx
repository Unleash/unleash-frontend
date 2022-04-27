import { VFC } from 'react';
import { Box, makeStyles, Paper, Table } from '@material-ui/core';
import { FeatureSchema } from 'openapi';
import { TableToolbar } from './TableToolbar/TableToolbar';
import { TableColumnHeader } from './TableColumnHeader/TableColumnHeader';
import { TableHeader } from './TableHeader/TableHeader';

const useStyles = makeStyles(theme => ({
    container: {
        borderRadius: '12px',
        // TODO: adjust shadow
    },
    content: {
        padding: theme.spacing(4),
    },
}));

interface IFeatureFlagsTableProps {
    data: FeatureSchema[];
}

export const FeatureFlagsTable: VFC<IFeatureFlagsTableProps> = ({ data }) => {
    const styles = useStyles();

    const columns = [
        { field: 'name', header: 'Feature toggle name' },
        { field: 'lastSeenAt', header: 'Seen', sort: false },
        { field: 'createdAt', header: 'Created on' },
        { field: 'project', header: 'Project ID' },
        { field: 'stale', header: 'Status' },
    ];

    const sort: { field: string; direction: 'asc' | 'desc' } = {
        field: 'name',
        direction: 'asc',
    };

    return (
        <Paper className={styles.container}>
            <TableToolbar title="Feature flags" />
            <Box className={styles.content}>
                <Table>
                    <TableHeader>
                        {columns.map(({ field, header, sort: sortColumn }) => (
                            <TableColumnHeader
                                key={field}
                                field={field}
                                isSortable={sortColumn}
                                sortOrder={
                                    sort.field === field
                                        ? sort.direction
                                        : undefined
                                }
                                onSort={() => {}}
                            >
                                {header}
                            </TableColumnHeader>
                        ))}
                    </TableHeader>
                </Table>
            </Box>
        </Paper>
    );
};
