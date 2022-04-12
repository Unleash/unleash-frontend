import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    verticalSeparator: {
        height: '100%',
        backgroundColor: '#BDBDBF',
        width: '1px',
        display: 'inline-block',
        marginLeft: '12px',
        marginRight: '26px',
        padding: '10px 0',
        verticalAlign: 'middle',
    },
}));
