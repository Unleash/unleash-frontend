import { PageContent } from 'component/common/PageContent/PageContent';
import { PageHeader } from 'component/common/PageHeader/PageHeader';
import {
    SortableTableHeader,
    Table,
    TableBody,
    TableCell,
    TablePlaceholder,
    TableRow,
} from 'component/common/Table';
import { SortingRule, useFlexLayout, useSortBy, useTable } from 'react-table';
import { SearchHighlightProvider } from 'component/common/Table/SearchHighlightContext/SearchHighlightContext';
import { useMediaQuery } from '@mui/material';
import { sortTypes } from 'utils/sortTypes';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { HighlightCell } from 'component/common/Table/cells/HighlightCell/HighlightCell';
import { DateCell } from 'component/common/Table/cells/DateCell/DateCell';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
import { Search } from 'component/common/Search/Search';
import { FeatureTypeCell } from 'component/common/Table/cells/FeatureTypeCell/FeatureTypeCell';
import { FeatureSeenCell } from 'component/common/Table/cells/FeatureSeenCell/FeatureSeenCell';
import { LinkCell } from 'component/common/Table/cells/LinkCell/LinkCell';
import { FeatureStaleCell } from 'component/feature/FeatureToggleList/FeatureStaleCell/FeatureStaleCell';
import { ReviveArchivedFeatureCell } from 'component/archive/ArchiveTable/ReviveArchivedFeatureCell/ReviveArchivedFeatureCell';
import { useStyles } from 'component/feature/FeatureToggleList/styles';
import { featuresPlaceholder } from 'component/feature/FeatureToggleList/FeatureToggleListTable';
import theme from 'themes/theme';
import { FeatureSchema } from 'openapi';
import { useFeatureArchiveApi } from 'hooks/api/actions/useFeatureArchiveApi/useReviveFeatureApi';
import useToast from 'hooks/useToast';
import { formatUnknownError } from 'utils/formatUnknownError';
import { useSearch } from 'hooks/useSearch';
import { FeatureArchivedCell } from './FeatureArchivedCell/FeatureArchivedCell';
import { useVirtualizedRange } from 'hooks/useVirtualizedRange';
import { useSearchParams } from 'react-router-dom';

export interface IFeaturesArchiveTableProps {
    archivedFeatures: FeatureSchema[];
    title: string;
    refetch: () => void;
    loading: boolean;
    storedParams: SortingRule<string>;
    setStoredParams: (
        newValue:
            | SortingRule<string>
            | ((prev: SortingRule<string>) => SortingRule<string>)
    ) => SortingRule<string>;
    projectId?: string;
}

export const ArchiveTable = ({
    archivedFeatures = [],
    loading,
    refetch,
    storedParams,
    setStoredParams,
    title,
    projectId,
}: IFeaturesArchiveTableProps) => {
    const rowHeight = theme.shape.tableRowHeight;
    const { classes } = useStyles();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
    const isMediumScreen = useMediaQuery(theme.breakpoints.down('lg'));
    const { setToastData, setToastApiError } = useToast();

    const [searchParams, setSearchParams] = useSearchParams();
    const { reviveFeature } = useFeatureArchiveApi();

    const [searchValue, setSearchValue] = useState(
        searchParams.get('search') || ''
    );

    const onRevive = useCallback(
        async (feature: string) => {
            try {
                await reviveFeature(feature);
                await refetch();
                setToastData({
                    type: 'success',
                    title: "And we're back!",
                    text: 'The feature toggle has been revived.',
                });
            } catch (e: unknown) {
                setToastApiError(formatUnknownError(e));
            }
        },
        [refetch, reviveFeature, setToastApiError, setToastData]
    );

    const columns = useMemo(
        () => [
            {
                id: 'Seen',
                Header: 'Seen',
                width: 85,
                canSort: true,
                Cell: FeatureSeenCell,
                accessor: 'lastSeenAt',
                align: 'center',
            },
            {
                Header: 'Type',
                accessor: 'type',
                width: 85,
                canSort: true,
                Cell: FeatureTypeCell,
                align: 'center',
            },
            {
                Header: 'Name',
                accessor: 'name',
                searchable: true,
                minWidth: 100,
                Cell: ({ value, row: { original } }: any) => (
                    <HighlightCell
                        value={value}
                        subtitle={original.description}
                    />
                ),
                sortType: 'alphanumeric',
            },
            {
                Header: 'Created',
                accessor: 'createdAt',
                width: 150,
                Cell: DateCell,
                sortType: 'date',
            },
            {
                Header: 'Archived',
                accessor: 'archivedAt',
                width: 150,
                Cell: FeatureArchivedCell,
                sortType: 'date',
            },
            ...(!projectId
                ? [
                      {
                          Header: 'Project ID',
                          accessor: 'project',
                          sortType: 'alphanumeric',
                          filterName: 'project',
                          searchable: true,
                          maxWidth: 170,
                          Cell: ({ value }: any) => (
                              <LinkCell
                                  title={value}
                                  to={`/projects/${value}`}
                              />
                          ),
                      },
                  ]
                : []),
            {
                Header: 'State',
                accessor: 'stale',
                Cell: FeatureStaleCell,
                sortType: 'boolean',
                maxWidth: 120,
                filterName: 'state',
                filterParsing: (value: any) => (value ? 'stale' : 'active'),
            },
            {
                Header: 'Actions',
                id: 'Actions',
                align: 'center',
                maxWidth: 85,
                canSort: false,
                Cell: ({ row: { original } }: any) => (
                    <ReviveArchivedFeatureCell
                        project={original.project}
                        onRevive={() => onRevive(original.name)}
                    />
                ),
            },
            // Always hidden -- for search
            {
                accessor: 'description',
            },
        ],
        //eslint-disable-next-line
        [projectId]
    );

    const {
        data: searchedData,
        getSearchText,
        getSearchContext,
    } = useSearch(columns, searchValue, archivedFeatures);

    const data = useMemo(
        () => (loading ? featuresPlaceholder : searchedData),
        [searchedData, loading]
    );

    const [initialState] = useState(() => ({
        sortBy: [
            {
                id: searchParams.get('sort') || storedParams.id,
                desc: searchParams.has('order')
                    ? searchParams.get('order') === 'desc'
                    : storedParams.desc,
            },
        ],
        hiddenColumns: ['description'],
    }));

    const {
        headerGroups,
        rows,
        state: { sortBy },
        getTableBodyProps,
        getTableProps,
        prepareRow,
        setHiddenColumns,
    } = useTable(
        {
            columns: columns as any[], // TODO: fix after `react-table` v8 update
            data,
            initialState,
            sortTypes,
            disableSortRemove: true,
            autoResetSortBy: false,
        },
        useFlexLayout,
        useSortBy
    );

    useEffect(() => {
        const hiddenColumns = ['description'];
        if (isMediumScreen) {
            hiddenColumns.push('lastSeenAt', 'status');
        }
        if (isSmallScreen) {
            hiddenColumns.push('type', 'createdAt');
        }
        setHiddenColumns(hiddenColumns);
    }, [setHiddenColumns, isSmallScreen, isMediumScreen]);

    useEffect(() => {
        if (loading) {
            return;
        }
        const tableState: Record<string, string> = {};
        tableState.sort = sortBy[0].id;
        if (sortBy[0].desc) {
            tableState.order = 'desc';
        }
        if (searchValue) {
            tableState.search = searchValue;
        }

        setSearchParams(tableState, {
            replace: true,
        });
        setStoredParams({ id: sortBy[0].id, desc: sortBy[0].desc || false });
    }, [loading, sortBy, searchValue]); // eslint-disable-line react-hooks/exhaustive-deps

    const [firstRenderedIndex, lastRenderedIndex] =
        useVirtualizedRange(rowHeight);

    return (
        <PageContent
            isLoading={loading}
            header={
                <PageHeader
                    title={`${title} (${
                        rows.length < data.length
                            ? `${rows.length} of ${data.length}`
                            : data.length
                    })`}
                    actions={
                        <Search
                            initialValue={searchValue}
                            onChange={setSearchValue}
                            hasFilters
                            getSearchContext={getSearchContext}
                        />
                    }
                />
            }
        >
            <SearchHighlightProvider value={getSearchText(searchValue)}>
                <Table
                    {...getTableProps()}
                    rowHeight={rowHeight}
                    style={{
                        height:
                            rowHeight * rows.length +
                            theme.shape.tableRowHeightCompact,
                    }}
                >
                    <SortableTableHeader
                        headerGroups={headerGroups as any}
                        flex
                    />
                    <TableBody {...getTableBodyProps()}>
                        {rows.map((row, index) => {
                            const isVirtual =
                                index < firstRenderedIndex ||
                                index > lastRenderedIndex;

                            if (isVirtual) {
                                return null;
                            }

                            prepareRow(row);
                            return (
                                <TableRow
                                    hover
                                    {...row.getRowProps()}
                                    style={{
                                        display: 'flex',
                                        top:
                                            index * rowHeight +
                                            theme.shape.tableRowHeightCompact,
                                    }}
                                    className={classes.row}
                                >
                                    {row.cells.map(cell => (
                                        <TableCell
                                            {...cell.getCellProps({
                                                style: {
                                                    flex: cell.column.minWidth
                                                        ? '1 0 auto'
                                                        : undefined,
                                                },
                                            })}
                                            className={classes.cell}
                                        >
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
                show={() => (
                    <ConditionallyRender
                        condition={searchValue?.length > 0}
                        show={
                            <TablePlaceholder>
                                No feature toggles found matching &ldquo;
                                {searchValue}&rdquo;
                            </TablePlaceholder>
                        }
                        elseShow={
                            <TablePlaceholder>
                                None of the feature toggles were archived yet.
                            </TablePlaceholder>
                        }
                    />
                )}
            />
        </PageContent>
    );
};
