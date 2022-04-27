import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        alignItems: 'center',
    },
    header: {
        fontSize: theme.fontSizes.mainHeader,
    },
}));
