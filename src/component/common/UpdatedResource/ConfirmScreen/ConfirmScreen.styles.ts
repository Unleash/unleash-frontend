import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    container: {
        width: '100%',
        height: '100%',
    },
    starting: {
        opacity: '0',
    },
    headerContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    confettiContainer: {
        height: '500px',
        position: 'relative',
        justifyContent: 'center',
        maxWidth: '600px',
        margin: '0 auto',
        display: 'flex',
    },
    headerStyles: {
        fontWeight: 'normal',
        marginLeft: '1rem',
    },
    paragraph: {
        margin: '1.5rem 0 0 0',
    },
    createdContainer: {
        display: 'flex',
        paddingTop: '2rem',
        alignItems: 'center',
        flexDirection: 'column',
    },
    anim: {
        animation: `$drop 10s 3s`,
    },
    buttonStyle: {
        marginTop: '1rem',
    },
    '@keyframes drop': {
        '0%': {
            opacity: '0%',
            top: '0%',
        },
        '10%': {
            opacity: '100%',
        },
        '100%': {
            top: '100%',
        },
    },
}));
