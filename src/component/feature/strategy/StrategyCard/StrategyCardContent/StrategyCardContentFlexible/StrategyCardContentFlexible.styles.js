import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(theme => ({
    activeCard: {
        transition: 'transform 0.4s ease',
        transform: 'scaleY(1.4) translateX(100px)',
    },
}));
