import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles(theme => ({
    historyItem: {
        padding: '5px',
        '&:nth-child(odd)': {
            // @ts-expect-error
            backgroundColor: theme.palette.code.background,
        },
    },
}));
