import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    container: {
        margin: '1rem 0',
        border: `1px solid ${theme.palette.grey[300]}`,
        borderRadius: '5px',
    },
    accordion: {
        boxShadow: 'none',
    },
    accordionSummary: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
    },
    accordionHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    accordionActions: {
        marginLeft: 'auto',
    },
    icon: {
        marginRight: '0.5rem',
        fill: theme.palette.primary.main,
        minWidth: '35px',
    },
    rollout: {
        fontSize: theme.fontSizes.smallBody,
        marginLeft: '0.5rem',
    },
}));
