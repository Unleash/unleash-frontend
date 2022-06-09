import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(theme => ({
    container: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        px: 1.5,
    },
    divider: {
        borderColor: theme.palette.dividerAlternative,
        height: theme.spacing(3),
        margin: theme.spacing(0, 2),
    },
}));
