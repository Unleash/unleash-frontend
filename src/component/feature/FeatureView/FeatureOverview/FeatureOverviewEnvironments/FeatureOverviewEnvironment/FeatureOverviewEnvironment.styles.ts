import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(theme => ({
    featureOverviewEnvironment: {
        borderRadius: theme.shape.borderRadiusLarge,
        marginBottom: theme.spacing(2),
        background: theme.palette.background.default,
    },
    accordion: {
        boxShadow: 'none',
        background: 'none',
    },
    accordionHeader: {
        boxShadow: 'none',
        padding: '1rem 2rem',
        [theme.breakpoints.down(400)]: {
            padding: '0.5rem 1rem',
        },
    },
    accordionBodyInnerContainer: {
        [theme.breakpoints.down(400)]: {
            padding: '0.5rem',
        },
    },
    accordionDetails: {
        padding: theme.spacing(3),
        background: theme.palette.secondaryContainer,
        borderBottomLeftRadius: theme.shape.borderRadiusLarge,
        borderBottomRightRadius: theme.shape.borderRadiusLarge,
        borderBottom: `3px solid ${theme.palette.primary.main}`,
    },
    accordionBody: {
        width: '100%',
        position: 'relative',
        paddingBottom: '1rem',
    },
    header: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        paddingTop: '1.5rem',
    },
    headerTitle: {
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.down(560)]: {
            flexDirection: 'column',
            textAlign: 'center',
        },
    },
    headerIcon: {
        [theme.breakpoints.down(560)]: {
            marginBottom: '0.5rem',
        },
    },
    disabledIndicatorPos: {
        position: 'absolute',
        top: '15px',
        left: '20px',
        [theme.breakpoints.down(560)]: {
            top: '13px',
        },
    },
    iconContainer: {
        backgroundColor: theme.palette.primary.light,
        borderRadius: '50%',
        width: '28px',
        height: '28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: '0.5rem',
    },
    icon: {
        fill: '#fff',
        width: '17px',
        height: '17px',
    },
    linkContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: '1rem',
    },
    truncator: {
        [theme.breakpoints.down(560)]: {
            textAlign: 'center',
        },
    },
    container: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: '1.8rem',
        [theme.breakpoints.down(560)]: {
            flexDirection: 'column',
            marginLeft: '0',
        },
    },
}));
