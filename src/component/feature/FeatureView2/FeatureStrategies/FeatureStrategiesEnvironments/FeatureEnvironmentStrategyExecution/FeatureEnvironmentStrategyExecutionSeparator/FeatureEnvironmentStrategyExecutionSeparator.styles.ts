import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    container: {
        position: 'relative',
        width: '100%',
        height: '25px',
        marginTop: '1rem',
    },
    textContainer: {
        display: 'flex',
        justifyContent: 'center',
    },
    textPositioning: { position: 'absolute', top: '-20px', zIndex: 300 },
}));
