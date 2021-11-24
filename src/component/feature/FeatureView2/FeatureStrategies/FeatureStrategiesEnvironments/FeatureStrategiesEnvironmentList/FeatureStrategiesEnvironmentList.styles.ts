import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    container: {
        height: '100%',
        width: '100%',
        position: 'relative',
        transition: 'background-color 0.4s ease',
    },
    isOver: {
        backgroundColor: theme.palette.primary.light,
        opacity: '0.75',
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
    environmentList: {
        marginTop: 0,
        marginBottom: 0,
    },
    strategiesContainer: {
        padding: '1rem',
    },
    headerContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: '15px',
        borderBottom: `1px solid ${theme.palette.grey[300]}`,
        [theme.breakpoints.down(700)]: {
            position: 'absolute',
            top: '-120px',
        },
    },
    headerInnerContainer: {
        padding: '1rem',
    },
}));
