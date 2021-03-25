import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(theme => ({
    constraintContainer: {
        backgroundColor: '#f1f1f1',
        margin: '0.5rem 0',
        borderRadius: theme.borders.radius.main,
        padding: '0.8rem',
        overflow: 'scroll',
        display: 'flex',
        alignItems: 'center',
    },
    verticalSpacer: {
        margin: '0 0.25rem',
    },
    title: {
        fontWeight: 'bold',
    },
}));
