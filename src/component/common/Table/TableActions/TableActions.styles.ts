import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    fieldWidth: {
        width: '48px',
        transitionProperty: 'all',
    },
    fieldWidthEnter: {
        width: '100%',
        transition: 'all 0.6s',
    },
    fieldWidthLeave: {
        width: 0,
    },
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
