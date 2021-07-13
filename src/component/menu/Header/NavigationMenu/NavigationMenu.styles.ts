import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
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
}));
