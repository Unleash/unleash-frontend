import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    container: {
        border: `1px solid ${theme.palette.grey[300]}`,
        borderRadius: '5px',
        maxWidth: '270px',
        padding: '1rem',
        marginLeft: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    constraintsContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '0.5rem',
        width: '100%',
    },
    header: {
        color: theme.palette.primary.main,
        textAlign: 'center',
        margin: '0.5rem 0',
        fontSize: theme.fontSizes.bodySize,
    },
    constraint: {
        fontSize: theme.fontSizes.smallBody,
        alignItems: 'center;',
        margin: '0.5rem 0',
        display: 'flex',
        border: `1px solid ${theme.palette.grey[300]}`,
        padding: '0.2rem',
        borderRadius: '5px',
    },
    constraintName: {
        minWidth: '100px',
        marginRight: '0.5rem',
    },
    constraintOperator: {
        marginRight: '0.5rem',
    },
    constraintValues: {
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        maxWidth: '50%',
    },
    text: { textAlign: 'center', margin: '0.2rem 0 0.5rem' },
}));
