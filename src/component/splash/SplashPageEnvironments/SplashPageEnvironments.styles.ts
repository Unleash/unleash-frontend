import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(theme => ({
    splashContainer: {
        position: 'fixed',
    },
    title: {
        textAlign: 'center',
        marginBottom: '20px',
        lineHeight: '1.3',
        [theme.breakpoints.down('sm')]: {
            marginTop: '1rem',
        },
    },
    topDescription: {
        padding: '0px 40px',
        marginBottom: '15px',
        fontSize: '17px',
        [theme.breakpoints.down('sm')]: {
            padding: '0 20px',
        },
    },
    bottomDescription: {
        padding: '0px 20px',
        fontSize: '17px',
        marginTop: '15px',
        [theme.breakpoints.down('sm')]: {
            padding: '0 20px',
        },
    },
    icon: {
        fontSize: '150px',
        display: 'block',
        margin: 'auto',
        [theme.breakpoints.down('sm')]: {
            fontSize: '90px',
        },
    },
    logo: {
        width: '70%',
        height: '60%',
        display: 'block',
        margin: 'auto',
        marginTop: '2rem',
        [theme.breakpoints.down('sm')]: {
            width: '80%',
            height: '80%',
            marginTop: '0rem',
        },
    },
    linkList: {
        padding: '30px 25px',
    },
    link: {
        color: '#fff',
    },
}));
