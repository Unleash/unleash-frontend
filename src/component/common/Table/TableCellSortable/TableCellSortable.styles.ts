import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    tableCellHeaderSortable: {
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#e6e6e9', // Should be a variable similar to theme.palette.grey[70] TODO: fix this color
            '& > svg': {
                color: '#000',
            },
        },
        '& > svg': {
            fontSize: '18px',
            verticalAlign: 'middle',
            color: '#78787A',
            marginLeft: '4px',
        },
        '&.sorted': {
            fontWeight: 'bold',
            '& > svg': {
                color: '#000',
            },
        },
    },
}));
