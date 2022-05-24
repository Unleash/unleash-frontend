import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(theme => ({
    docs: {
        marginBottom: '2rem',
    },
    tableRow: {
        background: '#F6F6FA',
        borderRadius: '8px',
    },
    cell: {
        borderBottom: 'none',
        display: 'table-cell',
    },
    firstHeader: {
        borderTopLeftRadius: '5px',
        borderBottomLeftRadius: '5px',
    },
    lastHeader: {
        borderTopRightRadius: '5px',
        borderBottomRightRadius: '5px',
    },
    hideSM: {
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
    },
    hideXS: {
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
}));
