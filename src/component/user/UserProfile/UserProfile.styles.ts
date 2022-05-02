import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(theme => ({
    userProfileMenu: {
        display: 'flex',
    },
    profileContainer: {
        position: 'relative',
    },
    button: {
        color: 'inherit',
        padding: '0.2rem 1rem',
    },
    icon: {
        color: theme.palette.grey[600],
    },
}));
