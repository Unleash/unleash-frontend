import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    constraintIconContainer: {
        backgroundColor: theme.palette.primary.main,
        height: '28px',
        width: '28px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: '2rem',
    },
    constraintIcon: {
        fill: '#fff',
        width: '26px',
        height: '26px',
    },
    accordion: {
        border: `1px solid ${theme.palette.grey[300]}`,
        borderRadius: '5px',
        margin: '1rem 0',
        backgroundColor: '#fff',
    },
    operator: {
        border: `1px solid ${theme.palette.secondary.main}`,
        padding: '0.25rem 1rem',
        color: theme.palette.secondary.main,
        textTransform: 'uppercase',
        borderRadius: '5px',
        margin: '0rem 2rem',
        fontSize: theme.fontSizes.smallBody,
    },
    headerMetaInfo: { display: 'flex', alignItems: 'center' },
    headerContainer: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
    },
    headerActions: { marginLeft: 'auto' },
    summary: { border: 'none', padding: '0.25rem 1rem' },
}));
