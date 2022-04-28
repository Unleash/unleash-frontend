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
import { useSearch } from './EnhancedTable/useSearch';
import { useSort } from './EnhancedTable/useSort';
import { TableActions } from 'component/common/Table/TableActions/TableActions';

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
        { field: 'lastSeenAt', header: 'Seen' },
        { field: 'type', header: 'Type' },
        { field: 'name', header: 'Feature toggle name' },
        { field: 'createdAt', header: 'Created on' },
        { field: 'project', header: 'Project ID' },
        { field: 'stale', header: 'Status' },
    ] as const;

    const searchOptions = {
        columns: ['name'],
    } as const;

    const sortOptions = {
        name: 'string',
        createdAt: 'date',
    } as const;

    const {
        search,
        data: searchedData,
        onSearch,
    } = useSearch(data, searchOptions);
    const {
        sort,
        data: sortedData,
        onSort,
    } = useSort(searchedData, sortOptions);

    return (
        <Paper className={styles.container}>
            <TableToolbar title="Feature flags">
                {/*TODO: Should adapt and refactor to use with our new table logic*/}
                <TableActions search={search} onSearch={onSearch} />{' '}
            </TableToolbar>
            <Box className={styles.content}>
                <Table>
                    <TableHeader>
                        {columns.map(({ field, header }) => (
                            <TableColumnHeader
                                key={field}
                                field={field}
                                isSortable={Object.keys(sortOptions).includes(
                                    field
                                )}
                                sortOrder={
                                    sort?.field === field
                                        ? sort?.order
                                        : undefined
                                }
                                onSort={
                                    Object.keys(sortOptions).includes(field)
                                        ? () =>
                                              onSort(
                                                  field as keyof typeof sortOptions,
                                                  sort?.order === 'asc'
                                                      ? 'desc'
                                                      : 'asc'
                                              )
                                        : undefined
                                }
                            >
                                {header}
                            </TableColumnHeader>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {sortedData.map(
                            ({
                                name,
                                lastSeenAt,
                                type,
                                createdAt,
                                project,
                                stale,
                            }) => (
                                <TableRow key={name}>
                                    <TableCell>
                                        <FeatureStatus
                                            lastSeenAt={
                                                lastSeenAt
                                                    ? lastSeenAt.toISOString()
                                                    : undefined
                                            }
                                            tooltipPlacement="left"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <FeatureType type={type ?? ''} />
                                    </TableCell>
                                    <TableCell>{name}</TableCell>
                                    <TableCell>
                                        {createdAt?.toDateString()}
                                    </TableCell>
                                    <TableCell>{project}</TableCell>
                                    <TableCell>
                                        {stale ? 'Stale' : 'Active'}
                                    </TableCell>
                                </TableRow>
                            )
                        )}
                    </TableBody>
                </Table>
            </Box>
        </Paper>
    );
};
