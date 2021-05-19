import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        alignItems: 'center',
        margin: '1rem 0',
    },
    wing: {
        width: '80px',
        height: '3px',
        backgroundColor: theme.palette.division.main,
        borderRadius: theme.borders.radius.main,
    },
    text: {
        textAlign: 'center',
        display: 'block',
        margin: '0 1rem',
    },
}));
