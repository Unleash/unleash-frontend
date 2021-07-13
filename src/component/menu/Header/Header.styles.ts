import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    header: {
        backgroundColor: '#fff',
        color: '#000',
        padding: '0.5rem',
        boxShadow: 'none',
        [theme.breakpoints.down('sm')]: {
            padding: '1rem 0.5rem',
        },
    },
    links: {
        display: 'flex',
        justifyContent: 'center',
        marginLeft: '1.5rem',
        ['& a']: {
            textDecoration: 'none',
            color: 'inherit',
            marginRight: '1.5rem',
        },
    },
    container: {
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            padding: '0',
        },
    },
    drawerButton: {
        color: theme.palette.iconButtons.main,
    },
    headerTitle: {
        fontSize: '1.4rem',
    },
    userContainer: {
        marginLeft: 'auto',
        display: 'flex',
        alignItems: 'center',
    },
    logo: {
        width: '150px',
    },
    popover: {
        top: '25px',
    },
    menuItem: {
        minWidth: '150px',
    },
    menuItemBox: {
        width: '12.5px',
        height: '12.5px',
        display: 'block',
        backgroundColor: theme.palette.primary.main,
        marginRight: '1rem',
        borderRadius: '2px',
    },
    navMenuLink: {
        textDecoration: 'none',
        alignItems: 'center',
        display: 'flex',
        color: '#000',
    },
    docsLink: {
        color: '#000',
        textDecoration: 'none',
        padding: '0.25rem 0.8rem',
        display: 'flex',
        alignItems: 'center',
    },
    docsIcon: {
        color: '#6C6C6C',
        height: '25px',
        width: '25px',
    },
}));
