import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles({
    container: {
        width: '100%',
        transform: 'translateY(-30px)',
    },
    form: {
        width: '100%',
        '& > *': {
            width: '100%',
        },
    },
    button: {
        width: '150px',
        marginTop: '1.15rem',
    },
});
