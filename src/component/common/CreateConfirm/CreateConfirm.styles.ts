import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    container: {
        width: '100%',
        height: '100%',
    },
    starting: {
        opacity: '0',
    },
    confettiContainer: {
        height: '500px',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
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
