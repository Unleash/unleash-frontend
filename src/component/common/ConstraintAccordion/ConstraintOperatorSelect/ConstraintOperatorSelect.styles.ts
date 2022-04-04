import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    valueContainer: {
        lineHeight: 1.1,
        marginTop: -5,
        marginBottom: -10,
    },
    optionContainer: {
        lineHeight: 1.2,
    },
    label: {
        fontSize: theme.fontSizes.smallBody,
    },
    description: {
        fontSize: theme.fontSizes.smallerBody,
        color: theme.palette.grey[700],
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
    },
}));
