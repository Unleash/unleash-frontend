import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(theme => ({
    tableCell: {
        padding: 0,
    },
    tableSortableCell: {
        backgroundColor: theme.palette.grey[200],
        '&:hover': {
            backgroundColor: theme.palette.grey[400],
            '& > svg': {
                color: theme.palette.grey[900],
            },
        },
        '& > svg': {
            verticalAlign: 'middle',
            color: theme.palette.grey[700],
            marginLeft: '4px',
        },
        '&.sorted': {
            fontWeight: 'bold',
            '& > svg': {
                color: theme.palette.grey[900],
            },
        },
    },
    cellPadding: {
        padding: theme.spacing(2),
        display: 'flex',
        alignItems: 'center',
    },
    sortButton: {
        all: 'unset',
        cursor: 'pointer',
        width: '100%',
        height: '100%',
    },
    activeSortLabel: {
        fontWeight: 'bold',
    },
    icon: {
        fontSize: theme.fontSizes.bodySize,
        lineHeight: '1',
        marginLeft: theme.spacing(0.5),
        marginBottom: theme.spacing(-0.5),
    },
    inactiveIcon: {
        color: theme.palette.grey[700],
    },
}));
