import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    featureOverviewEnvironment: {
        borderRadius: '12.5px',
        padding: '0.2rem',
        marginBottom: '1rem',
        backgroundColor: '#fff',
    },
    accordionHeader: {
        boxShadow: 'none',
        padding: '2rem',
    },
    headerTitle: {
        display: 'flex',
        alignItems: 'center',
    },
    iconContainer: {
        backgroundColor: theme.palette.primary.light,
        borderRadius: '50%',
        width: '28px',
        height: '28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: '0.5rem',
    },
    icon: {
        fill: '#fff',
        width: '17px',
        height: '17px',
    },
}));
