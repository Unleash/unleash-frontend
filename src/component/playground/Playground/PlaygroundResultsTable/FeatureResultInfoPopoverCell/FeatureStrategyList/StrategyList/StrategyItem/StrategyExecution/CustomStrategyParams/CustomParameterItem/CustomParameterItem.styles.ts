import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(theme => ({
    container: {
        width: '100%',
        padding: theme.spacing(2, 3),
        borderRadius: theme.shape.borderRadius,
        border: `1px solid ${theme.palette.divider}`,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing(2),
    },
    chip: {
        margin: '0.25rem',
    },
    column: {
        flexGrow: 1,
        flexDirection: 'column',
    },
    paragraph: {
        flexGrow: 1,
    },
}));
