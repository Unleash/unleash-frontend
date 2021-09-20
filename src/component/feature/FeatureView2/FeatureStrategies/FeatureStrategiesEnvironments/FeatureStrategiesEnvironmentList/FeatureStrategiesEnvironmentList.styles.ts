import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    container: {
        padding: '1rem 2rem 2rem 2rem',
        height: '100%',
        transition: 'background-color 0.4s ease',
    },
    isOver: {
        backgroundColor: theme.palette.primary.light,
        opacity: '0.75',
    },
    strategiesContainer: {
        maxWidth: '70%',
    },
    dropbox: {
        textAlign: 'center',
        fontSize: theme.fontSizes.smallBody,
        padding: '1rem',
        border: `2px dotted ${theme.palette.primary.light}`,
        borderRadius: '3px',
        transition: 'background-color 0.4s ease',
        marginTop: '1rem',
    },
    dropboxActive: {
        border: `2px dotted #fff`,
        color: '#fff',
        transition: 'color 0.4s ease',
    },
    dropIcon: {
        fill: theme.palette.primary.light,
        marginTop: '0.5rem',
        height: '40px',
        width: '40px',
    },
    dropIconActive: {
        fill: '#fff',
        transition: 'color 0.4s ease',
    },
}));
