import { styled } from '@material-ui/core';

export const FeatureMetricsChipsItem = styled('li')(({ theme }) => ({
    listStyleType: 'none',
    '& > [aria-pressed=true]': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
    },
}));
