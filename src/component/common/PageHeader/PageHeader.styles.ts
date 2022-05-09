import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(theme => ({
    headerContainer: {
        display: 'flex',
        flexDirection: 'column',
    },
    topContainer: {
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
