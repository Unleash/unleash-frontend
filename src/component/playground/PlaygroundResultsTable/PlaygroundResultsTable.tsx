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
import { useGlobalFilter, useSortBy, useTable } from 'react-table';
import { SearchHighlightProvider } from 'component/common/Table/SearchHighlightContext/SearchHighlightContext';
import { sortTypes } from 'utils/sortTypes';
import { useMemo, useState } from 'react';
import { HighlightCell } from 'component/common/Table/cells/HighlightCell/HighlightCell';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
import { Search } from 'component/common/Search/Search';
import { usePlaygroundResults } from '../../../hooks/api/getters/usePlaygroundResults/usePlaygroundResults';
import { LinkCell } from '../../common/Table/cells/LinkCell/LinkCell';
import { FeatureStatusCell } from '../StatusCell/FeatureStatusCell';
import { useSearchParams } from 'react-router-dom';
import { useSearch } from '../../../hooks/useSearch';
import { ContextBanner } from '../ContextBanner/ContextBanner';

export const PlaygroundResultsTable = () => {
    const { features, input, loading } = usePlaygroundResults();
    const { context } = input;
    const [initialState] = useState({
        sortBy: [{ id: 'name' }],
        hiddenColumns: ['description'],
    });

    const [searchParams, setSearchParams] = useSearchParams();

    const [searchValue, setSearchValue] = useState(
        searchParams.get('search') || ''
    );

    const {
        data: searchedData,
        getSearchText,
        getSearchContext,
    } = useSearch(COLUMNS, searchValue, features);

    const data = useMemo(() => {
        return (
            features ??
            Array(5).fill({
                name: 'Feature name',
                project: 'Feature Project',
                variant: 'Feature variant',
                enabled: 'Feature state',
            })
        );
    }, [searchedData, loading]);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable(
            {
                initialState,
                columns: COLUMNS as any,
                data: data as any,
                sortTypes,
                autoResetGlobalFilter: false,
                autoResetSortBy: false,
                disableSortRemove: true,
                defaultColumn: {
                    Cell: HighlightCell,
                },
            },
            useGlobalFilter,
            useSortBy
        );
    return (
        <PageContent
            header={
                <PageHeader
                    titleElement={`Results (${
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
            isLoading={loading}
        >
            <ConditionallyRender
                condition={!loading && data.length === 0}
                show={() => (
                    <TablePlaceholder>
                        None of the feature toggles were evaluated yet.
                    </TablePlaceholder>
                )}
                elseShow={() => (
                    <>
                        <SearchHighlightProvider
                            value={getSearchText(searchValue)}
                        >
                            {context && <ContextBanner context={context} />}
                            <Table {...getTableProps()} rowHeight="standard">
                                <SortableTableHeader
                                    headerGroups={headerGroups as any}
                                />
                                <TableBody {...getTableBodyProps()}>
                                    {rows.map(row => {
                                        prepareRow(row);
                                        return (
                                            <TableRow
                                                hover
                                                {...row.getRowProps()}
                                            >
                                                {row.cells.map(cell => (
                                                    <TableCell
                                                        {...cell.getCellProps()}
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
                            condition={searchValue?.length > 0}
                            show={
                                <TablePlaceholder>
                                    No feature toggles found matching &ldquo;
                                    {searchValue}&rdquo;
                                </TablePlaceholder>
                            }
                        />
                    </>
                )}
            />
        </PageContent>
    );
};

const COLUMNS = [
    {
        Header: 'Name',
        accessor: 'name',
        width: '60%',
        Cell: ({ value }: any) => (
            <LinkCell title={value} to={`/feature/${value}`} />
        ),
    },
    {
        Header: 'Project ID',
        accessor: 'project',
        sortType: 'alphanumeric',
        filterName: 'project',
        searchable: true,
        maxWidth: 170,
        Cell: ({ value }: any) => (
            <LinkCell title={value} to={`/projects/${value}`} />
        ),
    },
    {
        Header: 'Variant',
        accessor: 'variant',
        sortType: 'alphanumeric',
        filterName: 'variant',
        searchable: true,
        maxWidth: 170,
        Cell: ({ value }: any) => <HighlightCell value={value} />,
    },
    {
        Header: 'isEnabled',
        accessor: 'enabled',
        maxWidth: 170,
        Cell: ({ value }: any) => <FeatureStatusCell enabled={value} />,
    },
    {
        accessor: 'description',
    },
];
