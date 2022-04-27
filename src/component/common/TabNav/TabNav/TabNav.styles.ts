import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles(theme => ({
    tabNav: {
        // @ts-expect-error
        backgroundColor: theme.palette.tabs.main,
    },
}));
