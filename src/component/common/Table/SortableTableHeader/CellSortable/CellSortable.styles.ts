import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(theme => ({
    header: {
        position: 'relative',
        fontWeight: theme.fontWeight.medium,
    },
    sortable: {
        padding: 0,
        '&:hover, &:focus': {
            backgroundColor: theme.palette.grey[400],
            '& svg': {
                color: 'inherit',
            },
        },
    },
    sortButton: {
        all: 'unset',
        padding: theme.spacing(2),
        whiteSpace: 'nowrap',
        width: '100%',
        '&:focus-visible, &:active': {
            outline: 'revert',
        },
        display: 'flex',
        alignItems: 'center',
        boxSizing: 'inherit',
        cursor: 'pointer',
    },
    sortedButton: {
        fontWeight: theme.fontWeight.bold,
    },
}));
