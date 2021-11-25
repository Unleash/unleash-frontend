import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    constraintHeader: {
        fontWeight: 'bold',
        fontSize: theme.fontSizes.smallBody,
    },
    constraint: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0.1rem 0.5rem',
        fontSize: theme.fontSizes.smallBody,
        backgroundColor: theme.palette.grey[200],
        margin: '0.5rem 0',
        position: 'relative',
    },
    constraintBtn: {
        color: theme.palette.primary.main,
        fontWeight: 'normal',
        marginBottom: '0.5rem',
    },
    constraintContainer: {
        border: `1px solid ${theme.palette.grey[300]}`,
        borderRadius: '5px',
    },
    column: {
        flexDirection: 'column',
    },
    values: { marginLeft: '1.5rem' },
}));
