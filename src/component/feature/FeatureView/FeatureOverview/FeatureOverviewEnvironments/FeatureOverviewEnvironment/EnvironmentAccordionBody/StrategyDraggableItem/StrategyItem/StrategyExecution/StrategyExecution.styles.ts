import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(theme => ({
    valueContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '1ch',
        padding: theme.spacing(2, 3),
        border: `1px solid ${theme.palette.dividerAlternative}`,
        borderRadius: theme.shape.borderRadius,
    },
    valueSeparator: {
        color: theme.palette.grey[700],
    },
    summary: {
        width: '100%',
        padding: theme.spacing(2, 3),
        borderRadius: theme.shape.borderRadius,
        border: `1px solid ${theme.palette.divider}`,
    },
}));
