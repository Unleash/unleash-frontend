import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(theme => ({
    cell: {
        display: 'flex',
        justifyContent: 'center',
        paddingRight: theme.spacing(2),
    },
    menuContainer: {
        borderRadius: theme.shape.borderRadiusLarge,
        padding: theme.spacing(1),
        paddingRight: theme.spacing(3),
    },
    item: {
        borderRadius: theme.shape.borderRadius,
    },
    text: {
        fontSize: theme.fontSizes.smallBody,
    },
}));
