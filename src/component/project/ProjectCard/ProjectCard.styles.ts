import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    projectCard: {
        padding: '1rem',
        width: '220px',
        margin: '0.5rem',
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        fontWeight: 'normal',
        fontSize: '1rem',
    },
    projectIcon: {
        margin: '1rem auto',
        width: '80px',
        display: 'block',
    },
    info: {
        marginTop: '2rem',
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '0.8rem',
    },
    infoBox: {
        textAlign: 'center',
    },
    infoStats: {
        color: '#4A4599',
        fontWeight: 'bold',
    },
}));
