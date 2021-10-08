import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    container: {
        display: 'inline-block',
        width: '42px',
        height: '42px',
        fontSize: '0.7em',
        background: 'gray',
        borderRadius: '3px',
        textAlign: 'center',
        verticalAlign: 'middle',
        padding: '13px 10px',
    },
}));
