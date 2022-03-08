import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '5rem',
    },
    title: {
        fontSize: theme.fontSizes.mainHeader,
        marginBottom: 12,
    },
    subtitle: {
        fontSize: theme.fontSizes.smallBody,
        maxWidth: 515,
        marginBottom: 20,
        wordBreak: 'break-all',
        whiteSpace: 'normal',
    },
    tableRow: {
        background: '#F6F6FA',
        borderRadius: '8px',
    },
    paramButton: {
        color: theme.palette.primary.dark,
    },
}));
