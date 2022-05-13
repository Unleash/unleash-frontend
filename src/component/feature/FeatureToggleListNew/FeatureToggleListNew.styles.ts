import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(theme => ({
    tableRow: {
        '&:hover': {
            backgroundColor: theme.palette.grey[200],
        },
    },
    tableCell: {
        border: 'none',
        padding: '0.25rem 0',
    },
    tableCellHeader: {
        paddingBottom: '0.5rem',
        fontWeight: 'normal',
        color: theme.palette.grey[600],
        borderBottom: '1px solid ' + theme.palette.grey[200],
    },
    tableCellHeaderSortable: {
        cursor: 'pointer',
        background: theme.palette.grey[50],
    },
    tableCellStatus: {
        width: '60px',
    },
    tableCellName: {
        paddingLeft: '10px',
    },
    tableCellEnv: {
        width: '90px',
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
    },
    tableCellCreated: {
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
    },
    tableCellType: {
        width: '32px',
        alignItems: 'center',
        [theme.breakpoints.down(600)]: {
            display: 'none',
        },
    },
    link: {
        textDecoration: 'none',
        color: theme.palette.primary.main,
        fontWeight: theme.fontWeight.bold,
    },
    sortButton: {
        all: 'unset',
        '&:focus-visible, &:active': {
            outline: 'revert',
        },
    },
}));
