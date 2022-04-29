import { VFC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
    Box,
    Link,
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableRow,
} from '@material-ui/core';
import { FeatureSchema } from 'openapi';
import { TableToolbar } from '../TableToolbar/TableToolbar';
import { TableColumnHeader } from '../TableColumnHeader/TableColumnHeader';
import { TableHeader } from '../TableHeader/TableHeader';
import FeatureType from 'component/feature/FeatureView/FeatureType/FeatureType';
import FeatureStatus from 'component/feature/FeatureView/FeatureStatus/FeatureStatus';
import { useSearch } from '../hooks/useSearch';
import { useSortableHeaders } from '../hooks/useSortableHeaders';
import { TableActions } from '../TableActions/TableActions';
import { CreateFeatureButton } from 'component/feature/CreateFeatureButton/CreateFeatureButton';
import { usePagination } from '../hooks/usePagination';
import PaginateUI from 'component/common/PaginateUI/PaginateUI';
import { Highlighter } from 'component/common/Highlighter/Highlighter';
import { FeatureNameCell } from './FeatureNameCell/FeatureNameCell';
import { DateCell } from './DateCell/DateCell';
import { LinkCell } from './LinkCell/LinkCell';
import { FeatureStatusCell } from './FeatureStatusCell/FeatureStatusCell';

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

    const {
        search,
        data: searchedData,
        onSearch,
    } = useSearch(data, {
        columns: ['name', 'project'], // TODO: optimize search and add 'description'
    });

    const { data: sortedData, headerProps: sortableHeaderProps } =
        useSortableHeaders(
            searchedData,
            {
                lastSeenAt: 'date',
                type: 'string',
                name: 'string',
                createdAt: 'date',
                project: 'string',
                stale: (
                    { stale: a }: FeatureSchema,
                    { stale: b }: FeatureSchema
                ) => (a === b ? 0 : a ? 1 : -1),
            },
            { field: 'createdAt', order: 'desc' }
        );

    // TODO: Just so we don't forget to keep pagination in mind, even though ideally it should be done server-side
    const { page, pages, nextPage, prevPage, setPageIndex, pageIndex } =
        usePagination(sortedData, 50);

    return (
        <Paper className={styles.container}>
            <TableToolbar title={`Feature toggles (${data.length})`}>
                <TableActions search={search} onSearch={onSearch}>
                    <Link
                        component={RouterLink}
                        to="/archive"
                        underline="always"
                        style={{ marginRight: '24px' }}
                    >
                        View archive
                    </Link>
                    <CreateFeatureButton
                        loading={false}
                        filter={{ query: '', project: 'default' }}
                    />
                </TableActions>
            </TableToolbar>
            <Box className={styles.content}>
                <Table>
                    <TableHeader>
                        {columns.map(({ field, header }) => (
                            <TableColumnHeader
                                key={field}
                                {...sortableHeaderProps[field]}
                            >
                                {header}
                            </TableColumnHeader>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {page.map(
                            ({
                                name,
                                description,
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
                                    <TableCell>
                                        <FeatureNameCell
                                            name={name}
                                            project={project}
                                            description={description}
                                            search={search}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <DateCell date={createdAt} />
                                    </TableCell>
                                    <TableCell>
                                        <LinkCell to={`/project/${project}`}>
                                            <Highlighter search={search}>
                                                {project}
                                            </Highlighter>
                                        </LinkCell>
                                    </TableCell>
                                    <TableCell>
                                        <FeatureStatusCell stale={stale} />
                                    </TableCell>
                                </TableRow>
                            )
                        )}
                    </TableBody>
                </Table>
                <PaginateUI
                    pages={pages}
                    pageIndex={pageIndex}
                    setPageIndex={setPageIndex}
                    nextPage={nextPage}
                    prevPage={prevPage}
                    style={{ position: 'static' }}
                />
            </Box>
        </Paper>
    );
};
