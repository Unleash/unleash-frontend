import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    title: {
        color: '#fff',
        marginBottom: '1rem',
        fontSize: '2rem',
    },
    container: {
        padding: '6rem 4rem',
        color: '#fff',
        position: 'relative',
        borderTopLeftRadius: '3px',
        borderBottomLeftRadius: '3px',
        textAlign: 'right',
        [theme.breakpoints.down('sm')]: {
            padding: '3rem 2rem',
        },
        [theme.breakpoints.down('xs')]: {
            padding: '3rem 1rem',
        },
    },
    switchesContainer: {
        position: 'absolute',
        bottom: '15px',
        left: '-50px',
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    switchIcon: {
        height: '100px',
    },
}));
