import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    stepsContainer: {
        width: 153,
        display: 'flex',
        position: 'absolute',
        alignItems: 'center',
        borderRadius: 10,
        justifyContent: 'center',
        top: -14,
        left: 0,
        right: 0,
        margin: 'auto',
        background: '#fff',
        padding: '0.25rem',
    },
    stepsText: { marginRight: 15 },
    emptyCircle: {
        fill: theme.palette.primary.light,
        fontSize: 17,
    },
    filledCircle: { fill: theme.palette.primary.main },
}));
