import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        '&:nth-child(0)': {
            backgroundColor: 'red',
        },
    },
    apiError: {
        maxWidth: '400px',
        marginBottom: '1rem',
    },
    cardLink: { color: 'inherit', textDecoration: 'none' },
}));
