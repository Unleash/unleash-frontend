import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(theme => ({
    valueContainer: {
        width: '100%',
        padding: theme.spacing(2, 3),
        border: `1px solid ${theme.palette.dividerAlternative}`,
        borderRadius: theme.shape.borderRadius,
    },
    valueSeparator: {
        color: theme.palette.grey[700],
    },
}));
