import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    featureStrategyCard: {
        padding: '1rem',
        maxWidth: '290px',
        border: `1px solid ${theme.palette.grey[300]}`,
        borderRadius: '3px',
        margin: '0.5rem 0',
        display: 'flex',
        position: 'relative',
        cursor: 'pointer',
        width: '100%',
        '&:active': {
            backgroundColor: theme.palette.primary.main,
            color: '#fff',
            '& $addButton': {
                color: '#fff',
            },
        },
    },
    title: {
        maxWidth: '150px',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
    },
    leftSection: {
        display: 'flex',
        height: '100%',
        marginRight: '1rem',
    },
    iconContainer: {
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '1px 1px 2px rgb(135 135 135 / 40%)',
        backgroundColor: '#fff',
    },
    icon: {
        fill: theme.palette.primary.main,
    },
    disabledButton: {
        color: '#585858 !important',
        backgroundColor: '#fff',
        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
        marginBottom: '15px',
    },
    description: {
        marginTop: '0.5rem',
        fontSize: theme.fontSizes.smallerBody,
    },
    isDragging: {
        backgroundColor: theme.palette.primary.main,
    },
    addButton: {
        position: 'absolute',
        right: 0,
        top: 0,
    },
}));
