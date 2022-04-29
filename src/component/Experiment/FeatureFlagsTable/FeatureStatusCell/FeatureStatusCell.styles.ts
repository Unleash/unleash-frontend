import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    status: {
        color: theme.v2.palette.green['80'],
        fontSize: 'inherit',
    },
    stale: {
        color: theme.v2.palette.red['90'],
    },
}));
