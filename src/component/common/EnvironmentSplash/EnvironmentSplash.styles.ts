import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    splashContainer: {
        position: 'absolute',
    },
    title: {
        textAlign: 'center',
        marginBottom: '20px',
        lineHeight: '1.3',
    },
    topDescription: {
        padding: '0px 40px',
        marginBottom: '5px',
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
        width: '80%',
        height: '60%',
        display: 'block',
        margin: 'auto',
        marginTop: '35px',
    },
    linkList: {
        padding: '30px 25px',
    },
    link: {
        color: '#fff',
    },
}));
