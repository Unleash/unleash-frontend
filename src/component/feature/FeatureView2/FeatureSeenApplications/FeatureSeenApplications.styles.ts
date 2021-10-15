import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    applicationList: {
        float: 'right'
    },
    listLink: {
        color: '#212121',
        textDecoration: 'none',
        fontWeight: 'normal',
        display: 'block',
    },
    truncate: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    }
}));
