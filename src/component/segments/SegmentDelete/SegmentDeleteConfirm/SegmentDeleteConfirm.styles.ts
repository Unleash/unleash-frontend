import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles(theme => ({
    deleteParagraph: {
        marginTop: '2rem',
    },
    deleteInput: {
        marginTop: '1rem',
    },
    link: {
        textDecoration: 'none',
        color: theme.palette.primary.main,
        fontWeight: theme.fontWeight.bold,
    },
}));
