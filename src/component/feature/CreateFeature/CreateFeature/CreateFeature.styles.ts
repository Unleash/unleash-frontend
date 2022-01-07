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
        minWidth: '190px',
        [theme.breakpoints.down(600)]: {
            minWidth: '379px',
        },
    },
    customOutline: {
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#fff',
        },
        '&:not(.MuiOutlinedInput-notchedOutline):hover::before': {
            borderColor: '#fff',
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#fff',
        },
    },
    iconSelect: {
        fill: '#fff',
        marginRight: '0.5rem',
    },
    icon: {
        marginRight: '0.5rem',
        fill: '#000',
        fontSize: '1.9rem',
    },
    root: {
        color: '#fff',
    },
    link: {
        display: 'flex',
        alignItems: 'center',
        marginTop: '0.9rem',
        color: '#fff',
        textDecoration: 'none',
    },
    inputDescription: {
        marginBottom: '0.5rem',
        color: '#fff',
    },
}));
