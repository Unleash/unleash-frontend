import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles(theme => ({
    tableRow: {
        '& > td': {
            padding: '4px 16px',
            borderColor: theme.v2.palette.grey[30],
        },
        '&:hover': {
            backgroundColor: theme.v2.palette.grey[10],
        },
    },
    tableCellHeader: {
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
    errorMessage: {
        textAlign: 'center',
        marginTop: '20vh',
    },
    leftTableCell: {
        textAlign: 'left',
    },
    shrinkTableCell: {
        whiteSpace: 'nowrap',
        width: '0.1%',
    },
    avatar: {
        width: '32px',
        height: '32px',
        margin: 'auto',
    },
    firstColumnSM: {
        [theme.breakpoints.down('md')]: {
            borderTopLeftRadius: '8px',
            borderBottomLeftRadius: '8px',
        },
    },
    firstColumnXS: {
        [theme.breakpoints.down('sm')]: {
            borderTopLeftRadius: '8px',
            borderBottomLeftRadius: '8px',
        },
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
