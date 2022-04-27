import { VFC } from 'react';
import {
    Box,
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableRow,
} from '@material-ui/core';
import { FeatureSchema } from 'openapi';
import { TableToolbar } from './TableToolbar/TableToolbar';
import { TableColumnHeader } from './TableColumnHeader/TableColumnHeader';
import { TableHeader } from './TableHeader/TableHeader';
import FeatureType from 'component/feature/FeatureView/FeatureType/FeatureType';
import FeatureStatus from 'component/feature/FeatureView/FeatureStatus/FeatureStatus';

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
        { field: 'lastSeenAt', header: 'Seen', sort: false },
        { field: 'type', header: 'Type', sort: false },
        { field: 'name', header: 'Feature toggle name' },
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
                                // isSortable={sortColumn}
                                isSortable={true}
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
                    <TableBody>
                        {data.map(({ name, lastSeenAt, type }) => (
                            <TableRow key={name}>
                                <TableCell>
                                    <FeatureStatus
                                        lastSeenAt={`${lastSeenAt}`}
                                        tooltipPlacement="left"
                                    />
                                </TableCell>
                                <TableCell>
                                    <FeatureType type={type ?? ''} />
                                </TableCell>
                                <TableCell>{name}</TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </Paper>
    );
};
