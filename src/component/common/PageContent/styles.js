import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(theme => ({
    headerContainer: {
        padding: theme.padding.pageContent.header,
        borderBottom: theme.borders.default,
    },
    bodyContainer: {
        padding: theme.padding.pageContent.body,
    },
}));
