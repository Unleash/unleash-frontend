import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    fieldWidth: {
        width: '45px',
        '& .search-icon': {
            marginRight: 0,
        },
        '& .input-container, .clear-container': {
            width: 0,
        },
        '& input::placeholder': {
            color: 'transparent',
            transition: 'all 0.6s',
        },
        '& input:focus-within::placeholder': {
            color: theme.palette.text.primary,
        },
    },
    fieldWidthEnter: {
        width: '100%',
        marginRight: '12px',
        transition: 'all 0.6s',
        '& .search-icon': {
            marginRight: '8px',
        },
        '& .input-container': {
            width: '100%',
            transition: 'all 0.6s',
        },
        '& .clear-container': {
            width: '30px',
            transition: 'all 0.6s',
        },
        '& .search-container': {
            borderColor: theme.palette.grey[300],
        },
    },
    fieldWidthLeave: {
        width: '45px',
        marginRight: 0,
        transition: 'all 0.6s',
        '& .search-icon': {
            marginRight: 0,
            transition: 'all 0.6s',
        },
        '& .input-container, .clear-container': {
            width: 0,
            transition: 'all 0.6s',
        },
        '& .search-container': {
            borderColor: 'transparent',
        },
    },
    verticalSeparator: {
        height: '100%',
        backgroundColor: '#BDBDBF',
        width: '1px',
        display: 'inline-block',
        marginLeft: '16px',
        marginRight: '32px',
        padding: '10px 0',
        verticalAlign: 'middle',
    },
}));
