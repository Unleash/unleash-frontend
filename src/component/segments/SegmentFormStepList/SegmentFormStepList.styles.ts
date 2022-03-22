import { makeStyles } from '@material-ui/core/styles';
import { formTemplateSidebarWidth } from 'component/common/FormTemplate/FormTemplate.styles';

export const useStyles = makeStyles(theme => ({
    stepsContainer: {
        width: 153,
        display: 'flex',
        position: 'absolute',
        alignItems: 'center',
        borderRadius: 10,
        justifyContent: 'center',
        top: 36,
        left: 0,
        right: formTemplateSidebarWidth,
        margin: 'auto',
        background: '#fff',
        padding: '0.25rem',
        [theme.breakpoints.down(900)]: {
            right: 0,
        },
    },
    stepsText: { marginRight: 15 },
    emptyCircle: {
        fill: theme.palette.primary.light,
        fontSize: 17,
    },
    filledCircle: { fill: theme.palette.primary.main },
}));
