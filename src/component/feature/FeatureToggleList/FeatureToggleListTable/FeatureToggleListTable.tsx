import { useEffect, useMemo, VFC } from 'react';
import { Link, useMediaQuery, useTheme } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useGlobalFilter, useSortBy, useTable } from 'react-table';
import {
    Table,
    SortableTableHeader,
    TableBody,
    TableCell,
    TableRow,
    TablePlaceholder,
    TableSearch,
} from 'component/common/Table';
import { SearchHighlightProvider } from 'component/common/Table/SearchHighlightContext/SearchHighlightContext';
import { DateCell } from '../../../common/Table/cells/DateCell/DateCell';
import { FeatureLinkCell } from 'component/common/Table/cells/FeatureLinkCell/FeatureLinkCell';
import { FeatureSeenCell } from 'component/common/Table/cells/FeatureSeenCell/FeatureSeenCell';
import { FeatureTypeCell } from 'component/common/Table/cells/FeatureTypeCell/FeatureTypeCell';
import { FeatureStaleCell } from './FeatureStaleCell/FeatureStaleCell';
import { CreateFeatureButton } from '../../CreateFeatureButton/CreateFeatureButton';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
import { PageContent } from 'component/common/PageContent/PageContent';
import { PageHeader } from 'component/common/PageHeader/PageHeader';
import { sortTypes } from 'utils/sortTypes';
import { usePersistentQuery } from 'hooks/usePersistentQuery';

interface IExperimentProps {
    data: Record<string, any>[];
    isLoading?: boolean;
}

type IPageQuery = Partial<Record<'q' | 'sort' | 'order', string>>;

const columns = [
    {
        Header: 'Seen',
        accessor: 'lastSeenAt',
        Cell: FeatureSeenCell,
        sortType: 'date',
        align: 'center',
    },
    {
        Header: 'Type',
        accessor: 'type',
        Cell: FeatureTypeCell,
        align: 'center',
    },
    {
        Header: 'Feature toggle name',
        accessor: 'name',
        maxWidth: 300,
        width: '67%',
        Cell: ({
            row: {
                // @ts-expect-error -- props type
                original: { name, description, project },
            },
        }) => (
            <FeatureLinkCell
                title={name}
                subtitle={description}
                to={`/projects/${project}/features/${name}`}
            />
        ),
        sortType: 'alphanumeric',
    },
    {
        Header: 'Created on',
        accessor: 'createdAt',
        Cell: DateCell,
        sortType: 'date',
    },
    {
        Header: 'Project ID',
        accessor: 'project',
        Cell: ({ value }: { value: string }) => (
            <FeatureLinkCell title={value} to={`/projects/${value}`} />
        ),
        sortType: 'alphanumeric',
    },
    {
        Header: 'State',
        accessor: 'stale',
        Cell: FeatureStaleCell,
        sortType: 'boolean',
    },
    // Always hidden -- for search
    {
        accessor: 'description',
    },
];

const defaultSort = { id: 'createdAt', desc: false };

export const FeatureToggleListTable: VFC<IExperimentProps> = ({
    data,
    isLoading = false,
}) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
    const isMediumScreen = useMediaQuery(theme.breakpoints.down('lg'));
    const [query, setQuery] = usePersistentQuery<IPageQuery>(
        'FeatureToggleListTable'
    );

    const initialState = useMemo(
        () => ({
            sortBy: [
                query.sort
                    ? { id: query.sort, desc: query.order === 'desc' }
                    : defaultSort,
            ],
            hiddenColumns: ['description'],
            globalFilter: query.q || '',
        }),
        [] // eslint-disable-line react-hooks/exhaustive-deps
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state: { globalFilter, sortBy },
        setGlobalFilter,
        setHiddenColumns,
    } = useTable(
        {
            columns,
            data,
            initialState,
            sortTypes,
            autoResetGlobalFilter: false,
            disableSortRemove: true,
            disableMultiSort: true,
        },
        useGlobalFilter,
        useSortBy
    );

    useEffect(() => {
        if (isSmallScreen) {
            setHiddenColumns([
                'lastSeenAt',
                'type',
                'stale',
                'description',
                'createdAt',
            ]);
        } else if (isMediumScreen) {
            setHiddenColumns(['lastSeenAt', 'stale', 'description']);
        } else {
            setHiddenColumns(['description']);
        }
    }, [setHiddenColumns, isSmallScreen, isMediumScreen]);

    useEffect(() => {
        const tableState: IPageQuery = {};
        if (sortBy[0]?.id !== defaultSort.id) {
            tableState.sort = sortBy[0].id;
        }
        if (
            sortBy[0].desc &&
            !(sortBy[0]?.id === defaultSort.id && defaultSort.desc)
        ) {
            tableState.order = 'desc';
        }
        if (globalFilter) {
            tableState.q = globalFilter;
        }

        setQuery(tableState);
    }, [sortBy, globalFilter]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <PageContent
            isLoading={isLoading}
            header={
                <PageHeader
                    title={`Feature toggles (${data.length})`}
                    actions={
                        <>
                            <TableSearch
                                initialValue={globalFilter}
                                onChange={setGlobalFilter}
                            />
                            <PageHeader.Divider />
                            <Link
                                component={RouterLink}
                                to="/archive"
                                underline="always"
                                sx={{ marginRight: 3 }}
                            >
                                View archive
                            </Link>
                            <CreateFeatureButton
                                loading={false}
                                filter={{ query: '', project: 'default' }}
                            />
                        </>
                    }
                />
            }
        >
            <SearchHighlightProvider value={globalFilter}>
                <Table {...getTableProps()}>
                    <SortableTableHeader headerGroups={headerGroups} />
                    <TableBody {...getTableBodyProps()}>
                        {rows.map(row => {
                            prepareRow(row);
                            return (
                                <TableRow hover {...row.getRowProps()}>
                                    {row.cells.map(cell => (
                                        <TableCell {...cell.getCellProps()}>
                                            {cell.render('Cell')}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </SearchHighlightProvider>
            <ConditionallyRender
                condition={rows.length === 0}
                show={
                    <ConditionallyRender
                        condition={globalFilter?.length > 0}
                        show={
                            <TablePlaceholder>
                                No features or projects found matching &ldquo;
                                {globalFilter}
                                &rdquo;
                            </TablePlaceholder>
                        }
                        elseShow={
                            <TablePlaceholder>
                                No features available. Get started by adding a
                                new feature toggle.
                            </TablePlaceholder>
                        }
                    />
                }
            />
        </PageContent>
    );
};
