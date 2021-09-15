import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    tabContainer: {},
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
    bodyContent: {
        marginTop: '2rem',
    },
}));
