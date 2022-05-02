import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles(theme => ({
    container: {
        border: '1px solid #f1f1f1',
        borderRadius: '3px',
        position: 'relative',
        maxWidth: '350px',
        color: '#44606e',
    },
    headerContainer: { display: 'flex', padding: '0.5rem' },
    divider: {
        backgroundColor: theme.palette.grey[100],
        height: '1px',
        width: '100%',
    },
    checkContainer: {
        width: '95px',
        margin: '0 0.25rem',
        display: 'flex',
        justifyContent: 'center',
    },
    statusBarContainer: {
        display: 'flex',
        padding: '0.5rem',
    },
    statusBar: {
        width: '50px',
        borderRadius: '3px',
        backgroundColor: 'red',
        height: '6px',
    },
    title: {
        marginBottom: '0',
        display: 'flex',
        alignItems: 'center',
        gap: '1ch',
    },
    statusBarSuccess: {
        backgroundColor: theme.palette.primary.main,
    },
    repeatingError: {
        marginTop: '0.5rem',
        bottom: '0',
        position: 'absolute',
    },
}));
