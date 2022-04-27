import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles(theme => ({
    dialogFormContent: {
        ['& > *']: {
            margin: '0.5rem 0',
        },
    },
}));
