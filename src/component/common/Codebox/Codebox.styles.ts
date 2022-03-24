import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    container: {
        backgroundColor: theme.palette.primary.main,
        padding: '1rem',
        borderRadius: '3px',
        position: 'relative',
        maxHeight: '500px',
        overflow: 'auto',
    },
    code: {
        margin: 0,
        wordBreak: 'break-all',
        color: '#fff',
        fontSize: 14,
    },
    icon: {
        fill: '#fff',
    },
    iconButton: {
        position: 'absolute',
        bottom: '10px',
        right: '20px',
    },
}));
