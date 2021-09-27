import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    sidebar: {
        width: '30%',
        padding: '2rem',
        borderRight: `1px solid ${theme.palette.grey[300]}`,
        transition: 'width 0.3s ease',
        position: 'relative',
    },
    sidebarSmall: {
        width: '10%',
    },
    iconButton: {
        position: 'absolute',
        bottom: '50%',
        right: '-25px',
        backgroundColor: theme.palette.grey[300],
    },
    icon: {
        transition: 'transform 0.4s ease',
        transitionDelay: '0.4s',
    },
    expandedIcon: {
        transform: 'rotate(180deg)',
    },
}));
