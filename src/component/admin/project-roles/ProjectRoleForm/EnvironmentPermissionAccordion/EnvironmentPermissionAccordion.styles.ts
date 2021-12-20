import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    environmentPermissionContainer: {
        marginBottom: '1.25rem',
    },
    accordionSummary: {
        boxShadow: 'none',
        padding: '0',
    },
    label: {
        minWidth: '300px',
    },
    accordionBody: {
        padding: '0',
        flexWrap: 'wrap',
    },
    header: {
        color: theme.palette.primary.light,
    },
    icon: {
        fill: theme.palette.primary.light,
    },
}));
