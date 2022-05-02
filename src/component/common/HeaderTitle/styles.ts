import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles(theme => ({
    headerTitleContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
    },
    headerTitle: {
        fontSize: theme.fontSizes.mainHeader,
        fontWeight: 'normal',
    },
    headerActions: {
        position: 'absolute',
        right: 0,
    },
}));
