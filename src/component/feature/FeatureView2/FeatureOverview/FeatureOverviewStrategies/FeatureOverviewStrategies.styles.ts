import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    container: {
        borderRadius: '12.5px',
        width: '100%',
        backgroundColor: '#fff',
    },
    headerContainer: {
        borderBottom: `1px solid ${theme.palette.grey[300]}`,
    },
    headerInnerContainer: {
        padding: '1.5rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    actions: { position: 'relative' },
    bodyContainer: {
        padding: '3rem 2rem',
    },
}));
