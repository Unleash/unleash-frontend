import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    splashMainContainer: {
        backgroundColor: theme.palette.primary.light,
        height: 'fit-content',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '50px 0',
        [theme.breakpoints.down('sm')]: {
            padding: '0',
        },
    },
    splashContainer: {
        backgroundColor: theme.palette.primary.main,
        position: 'relative',
        height: '635px',
        width: '750px',
        padding: '2rem 1.5rem',
        borderRadius: '5px',
        color: '#fff',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        overflowX: 'hidden',
        [theme.breakpoints.down('sm')]: {
            height: 'fit-content',
            width: 'fit-content',
            padding: '2rem 0',
        },
    },
    closeButtonContainer: {
        display: 'inline-flex',
        justifyContent: 'flex-end',
        color: '#fff',
        position: 'absolute',
        right: '-10px',
        top: '5px',
    },
    closeButton:{
        textDecoration: 'none',
        color: '#fff',
        '&:hover': {
            backgroundColor: 'inherit',
        },
    },
    controllers: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        height: 'inherit',
        marginBottom: 5,
        marginTop: '35px'
    },
    circlesContainer: {
        display: 'flex',
        justifyContent: 'center',
    },
    circles: {
        display: 'inline-flex',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 15,
        position: 'relative',
    },
    buttonsContainer: {
        display: 'flex',
        justifyContent: 'center',
    },
    button: {
        textDecoration: 'none',
        width: '100px',
        color: '#fff',
        '&:hover': {
            backgroundColor: 'inherit',
        },
    },
    nextButton: {
        textDecoration: 'none',
        width: '100px',
        color: theme.palette.primary.light,
        backgroundColor: '#fff',
        '&:hover': {
            backgroundColor: '#fff',
        },
    },
}));
