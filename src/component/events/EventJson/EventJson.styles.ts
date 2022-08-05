import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(theme => ({
    container: {
        padding: theme.spacing(4),
        backgroundColor: theme.palette.neutral.light,
        borderRadius: theme.shape.borderRadiusLarge,
        fontSize: theme.fontSizes.smallBody,

        '& code': {
            wordWrap: 'break-word',
            whiteSpace: 'pre',
            fontFamily: 'monospace',
            lineHeight: '100%',
        },
    },
}));
