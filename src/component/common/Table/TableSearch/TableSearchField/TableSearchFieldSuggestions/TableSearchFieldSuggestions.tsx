import { FilterList } from '@mui/icons-material';
import { Box, Divider, Paper, styled } from '@mui/material';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
import {
    getColumnValues,
    getFilterableColumns,
    getFilterValues,
    getSearchTextGenerator,
    IGetSearchContextOutput,
} from 'hooks/useSearch';
import { useMemo, VFC } from 'react';

const randomIndex = (arr: any[]) => Math.floor(Math.random() * arr.length);

const StyledPaper = styled(Paper)(({ theme }) => ({
    position: 'absolute',
    width: '100%',
    left: 0,
    top: '20px',
    zIndex: 2,
    padding: theme.spacing(4, 1.5, 1.5),
    borderBottomLeftRadius: theme.spacing(1),
    borderBottomRightRadius: theme.spacing(1),
    boxShadow: '0px 8px 20px rgba(33, 33, 33, 0.15)',
    fontSize: theme.fontSizes.smallerBody,
    color: theme.palette.text.secondary,
    wordBreak: 'break-word',
}));

const StyledBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: theme.spacing(2),
}));

const StyledFilterList = styled(FilterList)(({ theme }) => ({
    color: theme.palette.text.secondary,
}));

const StyledHeader = styled('span')(({ theme }) => ({
    fontSize: theme.fontSizes.smallBody,
    color: theme.palette.text.primary,
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
    border: `1px dashed ${theme.palette.dividerAlternative}`,
    margin: theme.spacing(1.5, 0),
}));

const StyledCode = styled('span')(({ theme }) => ({
    backgroundColor: theme.palette.secondaryContainer,
    color: theme.palette.text.primary,
    padding: theme.spacing(0, 0.5),
    borderRadius: theme.spacing(0.5),
}));

interface TableSearchFieldSuggestionsProps {
    getSearchContext: () => IGetSearchContextOutput;
}

export const TableSearchFieldSuggestions: VFC<
    TableSearchFieldSuggestionsProps
> = ({ getSearchContext }) => {
    const searchContext = getSearchContext();
    const getSearchText = getSearchTextGenerator(searchContext.columns);

    const randomRow = useMemo(
        () => randomIndex(searchContext.data),
        [searchContext.data]
    );

    const filters = getFilterableColumns(searchContext.columns)
        .map(column => {
            const filterOptions = searchContext.data.map(row =>
                getColumnValues(column, row)
            );

            return {
                name: column.filterName,
                header: column.Header ?? column.filterName,
                options: [...new Set(filterOptions)].sort((a, b) =>
                    a.localeCompare(b)
                ),
                suggestedOption:
                    filterOptions[randomRow] ?? `example-${column.filterName}`,
                values: getFilterValues(
                    column.filterName,
                    searchContext.searchValue
                ),
            };
        })
        .sort((a, b) => a.name.localeCompare(b.name));

    const searchableColumns = searchContext.columns.filter(
        column => column.searchable && column.accessor
    );

    const searchableColumnsString = searchableColumns
        .map(column => column.Header ?? column.accessor)
        .join(', ');

    const suggestedTextSearch = getColumnValues(
        searchableColumns.filter(column => !column.filterName)[0],
        searchContext.data[randomRow]
    );

    const searchText = getSearchText(searchContext.searchValue);
    const searchFilters = filters.filter(filter => filter.values.length > 0);

    return (
        <StyledPaper>
            <StyledBox>
                <StyledFilterList />
                <Box>
                    <ConditionallyRender
                        condition={Boolean(searchContext.searchValue)}
                        show={
                            <>
                                <StyledHeader>Searching for:</StyledHeader>
                                <ConditionallyRender
                                    condition={Boolean(searchText)}
                                    show={
                                        <p>
                                            <StyledCode>
                                                {searchText}
                                            </StyledCode>{' '}
                                            in {searchableColumnsString}
                                        </p>
                                    }
                                />
                                {searchFilters.map(filter => (
                                    <p key={filter.name}>
                                        <StyledCode>
                                            {filter.values.join(',')}
                                        </StyledCode>{' '}
                                        filter in {filter.header}. Options:{' '}
                                        {filter.options.join(', ')}
                                    </p>
                                ))}
                            </>
                        }
                        elseShow={
                            <>
                                <StyledHeader>
                                    Filter your search with operators like:
                                </StyledHeader>
                                {filters.map(filter => (
                                    <p key={filter.name}>
                                        Filter by {filter.header}:{' '}
                                        <StyledCode>
                                            {filter.name}:{filter.options[0]}
                                        </StyledCode>
                                        <ConditionallyRender
                                            condition={
                                                filter.options.length > 1
                                            }
                                            show={
                                                <>
                                                    {' or '}
                                                    <StyledCode>
                                                        {filter.name}:
                                                        {filter.options
                                                            .slice(0, 2)
                                                            .join(',')}
                                                    </StyledCode>
                                                </>
                                            }
                                        />
                                    </p>
                                ))}
                            </>
                        }
                    />
                </Box>
            </StyledBox>
            <StyledDivider />
            Combine filters and search. Example:{' '}
            <StyledCode>
                {filters.map(filter => (
                    <span key={filter.name}>
                        {filter.name}:{filter.suggestedOption}{' '}
                    </span>
                ))}
                <span>{suggestedTextSearch}</span>
            </StyledCode>
        </StyledPaper>
    );
};
