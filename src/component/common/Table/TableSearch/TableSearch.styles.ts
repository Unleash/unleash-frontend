import { makeStyles } from 'tss-react/mui';

const transitionTiming = '0.5s cubic-bezier(0.4, 0, 0.2, 1)';

export const useStyles = makeStyles()(theme => ({
    searchField: {
        width: '45px',
        '& .search-icon': {
            marginRight: 0,
        },
        '& .input-container, .clear-container': {
            width: 0,
        },
        '& input::placeholder': {
            color: 'transparent',
            transition: `color ${transitionTiming}`,
        },
        '& input:focus-within::placeholder': {
            color: theme.palette.text.primary,
        },
    },
    searchFieldEnter: {
        width: '250px',
        transition: `width ${transitionTiming}`,
        '& .search-icon': {
            marginRight: '8px',
        },
        '& .input-container': {
            width: '100%',
            transition: `width ${transitionTiming}`,
        },
        '& .clear-container': {
            width: '30px',
            transition: `width ${transitionTiming}`,
        },
        '& .search-container': {
            borderColor: theme.palette.grey[300],
        },
    },
    searchFieldLeave: {
        width: '45px',
        transition: `width ${transitionTiming}`,
        '& .search-icon': {
            marginRight: 0,
            transition: `margin-right ${transitionTiming}`,
        },
        '& .input-container, .clear-container': {
            width: 0,
            transition: `width ${transitionTiming}`,
        },
        '& .search-container': {
            borderColor: 'transparent',
        },
    },
    searchButton: {
        marginTop: '-4px',
        marginBottom: '-4px',
        marginRight: '-4px',
        marginLeft: '-4px',
    },
}));
