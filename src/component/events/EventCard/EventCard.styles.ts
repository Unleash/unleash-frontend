import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(theme => ({
    eventEntry: {
        border: `1px solid ${theme.palette.neutral.light}`,
        padding: '1rem',
        margin: '1rem 0',
        borderRadius: theme.shape.borderRadius,
    },
    eventLogHeader: {
        minWidth: '110px',
    },
}));
