import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(theme => ({
    createStrategyCard: {
        width: '200px',
        textAlign: 'center',
        borderTop: `4px solid ${theme.palette.primary.main}`,
    },
}));
