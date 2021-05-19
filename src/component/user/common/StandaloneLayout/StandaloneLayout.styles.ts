import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    container: {
        padding: '4rem',
        background: '#3a5663',
        display: 'flex',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        },
        overflow: 'hidden',
        minHeight: '100vh',
    },
    leftContainer: {
        width: '40%',
        borderRadius: '3px',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            minHeight: 'auto',
        },
    },
    bannerSubtitle: {
        [theme.breakpoints.down('sm')]: {
            maxWidth: '300px',
        },
        fontSize: '2rem',
        fontWeight: '300',
    },
    rightContainer: {
        width: '60%',
        borderTopRightRadius: '3px',
        borderBottomRightRadius: '3px',
        backgroundColor: '#fff',
        position: 'relative',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            position: 'static',
            minHeight: 'auto',
        },
    },
    menu: {
        position: 'absolute',
        right: '20px',
        top: '20px',
        '& a': {
            textDecoration: 'none',
            color: '#000',
        },
        [theme.breakpoints.down('sm')]: {
            '& a': {
                color: '#fff',
            },
        },
    },
    title: {
        fontWeight: 'bold',
        fontSize: '1.2rem',
        marginBottom: '1rem',
    },
    innerRightContainer: {
        display: 'flex',
        justifyContent: 'center',
        padding: '6rem 3rem',
        [theme.breakpoints.down('sm')]: {
            padding: '2rem 2rem',
        },
        [theme.breakpoints.down('xs')]: {
            padding: '2rem 1rem',
        },
    },
}));
