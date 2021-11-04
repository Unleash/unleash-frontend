import { makeStyles } from '@material-ui/core/styles';
import { Height } from '@material-ui/icons';

export const useStyles = makeStyles(theme => ({
    mainContainer: {
        backgroundColor: theme.palette.primary.light,
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        backgroundColor: theme.palette.primary.main,
        position: 'relative',
        height: '70vh',
        width: '50vw',
        padding: '2rem 1.5rem',
        borderRadius: '5px',
        color: '#fff',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
    },
    closeButton: {
        display: 'inline-flex',
        justifyContent: 'flex-end',
        color: '#fff',
        position: 'absolute',
        right: '20px',
        top: '15px',
    },
    controllers: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        height: 'inherit',
        marginBottom: 5,
    },
    circles: {
        display: 'inline-flex',
        justifyContent: 'center',
        marginBottom: 9,
        position: 'relative',
    },
    buttonsContainer: {
        display: 'flex',
        justifyContent: 'center',
    },
    button: {
        textDecoration: 'none',
        color: '#fff',
    },
    nextButton: {
        textDecoration: 'none',
        color: '#000',
        backgroundColor: '#fff',
    },
    //   icon:{
    //     // transform: 'translateX(212px)'
    //   }
}));
