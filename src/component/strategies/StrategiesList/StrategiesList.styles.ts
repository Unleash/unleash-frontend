import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(theme => ({
    listItem: {
        padding: '0',
        ['& a']: {
            textDecoration: 'none',
            color: theme.palette.primary.light,
        },
        '&:hover': {
            backgroundColor: theme.palette.grey[200],
        },
    },
}));
