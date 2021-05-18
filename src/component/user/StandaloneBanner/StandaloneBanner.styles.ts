import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    title: {
        color: '#fff',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
    },
    container: {
        padding: '4rem 2rem',
        color: '#fff',
        position: 'relative',
        borderTopLeftRadius: '3px',
        borderBottomLeftRadius: '3px',
        [theme.breakpoints.down('sm')]: {
            padding: '3rem 2rem',
        },
        [theme.breakpoints.down('xs')]: {
            padding: '3rem 1rem',
        },
    },
    switchesContainer: {
        position: 'absolute',
<<<<<<< HEAD
        bottom: '40px',
=======
        bottom: '100px',
>>>>>>> 2bc9135 (feat: change layout)
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    switchIcon: {
        height: '130px',
    },
}));
