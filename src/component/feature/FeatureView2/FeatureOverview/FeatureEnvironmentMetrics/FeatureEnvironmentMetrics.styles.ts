import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        borderRadius: '10px',
        backgroundColor: '#fff',
        padding: '1rem 2rem 2rem 2rem',
        marginBottom: '1rem',
        flexDirection: 'column',
        width: '50%',
        marginRight: '1rem',
    },
    headerContainer: {
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: theme.fontSizes.subHeader,
        fontWeight: 'normal',
        margin: 0,
    },
    bodyContainer: {
        display: 'flex',
        align: 'items',
        marginTop: '1rem',
    },
    trueCountContainer: {
        marginBottom: '0.5rem',
    },
    trueCount: {
        width: '15px',
        height: '15px',
        borderRadius: '50%',
        backgroundColor: theme.palette.primary.main,
    },
    paragraph: {
        fontSize: theme.fontSizes.smallBody,
    },
}));
