import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    tableRow: {
        '&>td': {
            padding: '4px 16px',
            borderColor: '#EAEAED',
        },
        '&:hover': {
            backgroundColor: '#F7F7FA', // Should be a variable similar to theme.palette.grey[200] / theme.palette.grey[10]
        },
    },
    tableCellHeader: {
        '&>th': {
            backgroundColor: '#F2F2F5', // Should be a variable similar to theme.palette.grey[200] / theme.palette.grey[20]
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
            '&.tableCellHeaderSortable': {
                cursor: 'pointer',
                '&:hover': {
                    backgroundColor: '#e6e6e9', // Should be a variable similar to theme.palette.grey[70] TODO: fix this color
                },
                '&>svg': {
                    fontSize: '17px',
                    verticalAlign: 'middle',
                    color: '#78787A',
                    marginLeft: '2px',
                },
            },
        },
    },
    leftTableCell: {
        textAlign: 'left',
    },
    shrinkTableCell: {
        whiteSpace: 'nowrap',
        width: '0.1%',
    },
    marginAuto: {
        margin: 'auto',
    },
    hideSM: {
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    hideXS: {
        [theme.breakpoints.down('xs')]: {
            display: 'none',
        },
    },
}));
