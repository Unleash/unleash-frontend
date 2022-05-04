import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(theme => ({
    root: {
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
        paddingTop: '20px', // TODO: theme
        paddingBottom: '20px', // TODO: theme
        borderBottom: `1px solid ${theme.palette.divider}`,
        justifyContent: 'space-between',
    },
}));
