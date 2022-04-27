import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles(theme => ({
    blue: {
        color: theme.code.edited,
    },
    negative: {
        color: theme.code.diffSub,
    },
    positive: {
        color: theme.code.diffAdd,
    },
}));
