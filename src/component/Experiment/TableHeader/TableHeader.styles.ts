import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    tableHeader: {
        '& > th': {
            backgroundColor: theme.v2.palette.grey[20],
            fontWeight: 'normal',
            border: 0,
            '&:first-child': {
                borderTopLeftRadius: '8px',
                borderBottomLeftRadius: '8px',
            },
            '&:last-child': {
                borderTopRightRadius: '8px',
                borderBottomRightRadius: '8px',
            },
        },
    },
}));
