import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(theme => ({
    title: {
        fontWeight: 'inherit',
        color: theme.palette.text.secondary,
    },

    container: {
        display: 'grid',
        backgroundColor: theme.palette.neutral.light,
        borderRadius: theme.shape.borderRadiusLarge,
        padding: theme.spacing(0.5),
        [theme.breakpoints.up('md')]: {
            gridTemplateColumns: 'auto minmax(0, 1fr)',
        },

        '& dl': {
            display: 'grid',
            gridTemplateColumns: 'auto 1fr',
            alignContent: 'start',
            gap: theme.spacing(1),
            padding: theme.spacing(2),
            [theme.breakpoints.up('md')]: {
                padding: theme.spacing(4),
            },
        },
    },

    code: {
        backgroundColor: 'white',
        overflowX: 'auto',
        padding: theme.spacing(2),
        borderBottomLeftRadius: theme.shape.borderRadiusLarge,
        borderBottomRightRadius: theme.shape.borderRadiusLarge,
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(4),
            borderRadius: 0,
            borderTopRightRadius: theme.shape.borderRadiusLarge,
            borderBottomRightRadius: theme.shape.borderRadiusLarge,
        },

        '& code': {
            wordWrap: 'break-word',
            whiteSpace: 'pre-wrap',
            fontFamily: 'monospace',
            lineHeight: 1.5,
            fontSize: theme.fontSizes.smallBody,
        },
    },
}));
