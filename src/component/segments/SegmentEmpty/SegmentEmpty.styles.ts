import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(theme => ({
    empty: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBlock: '5rem',
    },
    title: {
        fontSize: theme.fontSizes.mainHeader,
        marginBottom: '1.25rem',
    },
    subtitle: {
        fontSize: theme.fontSizes.smallBody,
        color: theme.palette.grey[800],
        maxWidth: 515,
        marginBottom: 20,
        textAlign: 'center',
    },
    paramButton: {
        textDecoration: 'none',
        color: theme.palette.primary.main,
        fontWeight: theme.fontWeight.bold,
    },
}));
