import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles(theme => ({
    mobileMarginTop: {
        [theme.breakpoints.down('md')]: {
            marginTop: theme.spacing(2),
        },
    },
}));
