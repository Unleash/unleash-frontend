import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    sidebar: {
        width: '30%',
        padding: '2rem',
        borderRight: `1px solid ${theme.palette.grey[300]}`,
    },
}));
