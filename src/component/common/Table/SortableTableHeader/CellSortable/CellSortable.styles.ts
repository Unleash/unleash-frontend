import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(theme => ({
    header: {
        position: 'relative',
        fontWeight: theme.fontWeight.medium,
    },
    sortable: {
        padding: 0,
        '&:hover, &:focus': {
            backgroundColor: theme.palette.tableHeaderHover,
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
        '& .hover-only': {
            visibility: 'hidden',
        },
        ':hover, :focus, &:focus-visible, &:active': {
            outline: 'revert',
            '& svg': {
                color: 'inherit',
            },
            '& .hover-only': {
                visibility: 'visible',
            },
        },
        display: 'flex',
        alignItems: 'center',
        boxSizing: 'inherit',
        cursor: 'pointer',
    },
    sortedButton: {
        fontWeight: theme.fontWeight.bold,
    },
    label: {
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflowX: 'hidden',
        overflowY: 'visible',
    },
    alignLeft: {
        justifyContent: 'flex-start',
        textAlign: 'left',
    },
    alignRight: {
        justifyContent: 'flex-end',
        textAlign: 'right',
    },
    alignCenter: {
        justifyContent: 'center',
        textAlign: 'center',
    },
}));
