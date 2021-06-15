import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    list: { margin: '0', padding: '0', listStyleType: 'none' },
    listItem: {
        display: 'flex',
        margin: '0.8rem 0',
    },
    listItemNameContainer: { width: '30%' },
    listItemTypeContainer: { width: '20%' },
    listItemEnvContainer: {
        marginLeft: 'auto',
        display: 'flex',
    },
}));
