import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
    },
    search: {
        display: 'flex',
        alignItems: 'center',
        // @ts-expect-error
        backgroundColor: theme.palette.searchField.main,
        border: `1px solid ${theme.palette.grey[300]}`,
        borderRadius: '25px',
        padding: '0.25rem 0.5rem',
        maxWidth: '450px',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        },
        '&:focus-within': {
            border: `1px solid ${theme.palette.primary.light}`,
        },
    },
    searchIcon: {
        marginRight: 8,
        color: theme.palette.grey[600],
    },
    clearContainer: {
        width: '30px',
    },
    clearIcon: {
        color: theme.palette.grey[600],
    },
    inputRoot: {
        width: '100%',
    },
}));
