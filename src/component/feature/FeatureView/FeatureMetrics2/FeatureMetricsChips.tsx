import { styled } from '@material-ui/core';

export const FeatureMetricsChips = styled('ul')({
    display: 'flex',
    flexWrap: 'wrap',
    gap: '.5rem',
    listStyleType: 'none',
    padding: 0,
    minHeight: '100%',
    alignItems: 'center',
});

export const FeatureMetricsChipsItem = styled('li')(({ theme }) => ({
    listStyleType: 'none',
    '& > [aria-pressed=true]': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
    },
}));
