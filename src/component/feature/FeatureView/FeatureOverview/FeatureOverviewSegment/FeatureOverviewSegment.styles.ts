import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles(theme => ({
    container: {
        width: '100%',
        padding: '1rem',
        fontSize: theme.fontSizes.smallBody,
        backgroundColor: theme.palette.grey[200],
        position: 'relative',
        borderRadius: '5px',
        textAlign: 'center',
    },
    link: {
        textDecoration: 'none',
        fontWeight: theme.fontWeight.bold,
        color: theme.palette.primary.main,
    },
}));
