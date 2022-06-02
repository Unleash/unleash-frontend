import { FilterList } from '@mui/icons-material';
import { Box, Divider, Paper, styled } from '@mui/material';
import {
    getColumnValues,
    getFilterableColumns,
    IGetSearchContextOutput,
} from 'hooks/useSearch';
import { VFC } from 'react';

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

    const filters = getFilterableColumns(searchContext.columns).map(column => ({
        name: column.filterName,
        options: searchContext.data.map(row => getColumnValues(column, row)),
    }));

    return (
        <StyledPaper>
            <StyledBox>
                <StyledFilterList />
                <Box>
                    <StyledHeader>
                        Filter your search with operators like:
                    </StyledHeader>
                    <p>
                        Filter by project{' '}
                        <StyledCode>project:default,myproject</StyledCode>
                    </p>
                    <p>
                        Filter by status <StyledCode>status:active</StyledCode>{' '}
                        or <StyledCode>status:stale</StyledCode>
                    </p>
                </Box>
            </StyledBox>
            <StyledDivider />
            Combine filters and search{' '}
            <StyledCode>project:myproject</StyledCode>{' '}
            <StyledCode>status:active</StyledCode>{' '}
            <StyledCode>feature toggle name</StyledCode>
        </StyledPaper>
    );
};
