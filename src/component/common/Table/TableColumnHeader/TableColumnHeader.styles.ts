import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    tableCell: {
        padding: 0,
    },
    tableSortableCell: {
        backgroundColor: theme.v2.palette.grey[20],
        '&:hover': {
            backgroundColor: theme.v2.palette.grey[40],
            '& > svg': {
                color: theme.v2.palette.grey[90],
            },
        },
        '& > svg': {
            fontSize: theme.v2.fontSizes.headerIcon,
            verticalAlign: 'middle',
            color: theme.v2.palette.grey[70],
            marginLeft: '4px',
        },
        '&.sorted': {
            fontWeight: 'bold',
            '& > svg': {
                color: theme.v2.palette.grey[90],
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
        fontSize: theme.v2.fontSizes.headerIcon,
        lineHeight: '1',
        marginLeft: theme.spacing(0.5),
    },
    inactiveIcon: {
        color: theme.v2.palette.grey[70],
    },
}));
