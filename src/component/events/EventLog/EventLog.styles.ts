import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(theme => ({
    events: {
        listStyleType: 'none',
        margin: 0,
        padding: 0,
        display: 'grid',
        gap: theme.spacing(2),
    },
}));
