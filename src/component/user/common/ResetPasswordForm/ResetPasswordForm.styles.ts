import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
    },
    button: {
        width: '150px',
        margin: '1rem auto',
        display: 'block',
    },
}));
