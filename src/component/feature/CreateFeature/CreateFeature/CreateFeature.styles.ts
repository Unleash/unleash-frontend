import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    select: {
        '&:before': {
            borderColor: '#fff',
        },
        '&:after': {
            borderColor: '#fff',
        },
        '&:not(.Mui-disabled):hover::before': {
            borderColor: '#fff',
        },
        color: '#fff',
        minWidth: '120px',
        backgroundColor: 'transparent',
    },
    icon: {
        fill: '#fff',
        marginRight: '0.5rem'
    },
    root: {
        color: '#fff',
    },
    link: {
        display: 'flex',
        alignItems: 'center',
        marginTop: '0.7rem',
        color: '#fff',
    },
}));
