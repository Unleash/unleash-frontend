import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles({
    listItem: {
        padding: 0,
        '& a': {
            textDecoration: 'none',
            color: 'inherit',
        },
    },
});
