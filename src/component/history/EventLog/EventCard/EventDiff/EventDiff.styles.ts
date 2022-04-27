import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles(theme => ({
    blue: {
        // @ts-expect-error
        color: theme.palette.code.edited,
    },
    negative: {
        // @ts-expect-error
        color: theme.palette.code.diffSub,
    },
    positive: {
        // @ts-expect-error
        color: theme.palette.code.diffAdd,
    },
}));
