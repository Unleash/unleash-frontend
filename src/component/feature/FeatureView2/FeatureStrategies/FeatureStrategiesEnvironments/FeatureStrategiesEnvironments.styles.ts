import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    container: {
        width: '70%',
    },
    fullWidth: {
        width: '90%',
    },
    tabContainer: {
        margin: '2rem 2rem 0rem 2rem',
    },
    tabNavigation: {
        backgroundColor: 'transparent',
        textTransform: 'none',
        boxShadow: 'none',
        borderBottom: `1px solid ${theme.palette.grey[400]}`,
        width: '100%',
    },
    tabButton: {
        textTransform: 'none',
        width: 'auto',
    },
}));
