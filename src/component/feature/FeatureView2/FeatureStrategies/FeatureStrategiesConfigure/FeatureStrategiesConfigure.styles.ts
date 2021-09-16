import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    container: {
        padding: '0rem 2rem 2rem 2rem',
    },
    buttonContainer: {
        marginTop: '1rem',
    },
    btn: {
        minWidth: '100px',
    },
    header: {
        fontWeight: 'normal',
        marginBottom: '1rem',
        fontSize: theme.fontSizes.mainHeader,
    },
}));
