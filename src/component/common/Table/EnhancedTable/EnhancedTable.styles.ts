import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(theme => ({
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
        borderRadius: '12px',
        paddingBottom: theme.spacing(4),
    },
    tableContainer: {
        padding: theme.spacing(4),
        paddingBottom: 0,
    },
}));
