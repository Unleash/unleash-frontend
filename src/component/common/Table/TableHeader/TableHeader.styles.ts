import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(theme => ({
    tableHeader: {
        '& > th': {
            backgroundColor: theme.palette.grey[200],
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
