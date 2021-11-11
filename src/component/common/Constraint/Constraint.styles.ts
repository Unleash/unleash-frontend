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
        padding: '0.1rem 0.5rem',
        border: `1px solid ${theme.palette.grey[300]}`,
        borderRadius: '5px',
        fontSize: theme.fontSizes.smallBody,
        backgroundColor: theme.palette.grey[200],
        margin: '0.5rem 0',
    },
    values: { marginLeft: '1.5rem' },
    contextName: {
        minWidth: '100px',
    },
}));
