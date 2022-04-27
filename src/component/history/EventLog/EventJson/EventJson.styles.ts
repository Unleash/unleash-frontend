import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles(theme => ({
    historyItem: {
        padding: '5px',
        '&:nth-child(odd)': {
            backgroundColor: theme.code.background,
        },
    },
}));
