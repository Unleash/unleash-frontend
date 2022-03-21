import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    container: {
        minHeight: '80vh',
        width: '100%',
        display: 'flex',
        margin: '0 auto',
        [theme.breakpoints.down(900)]: {
            flexDirection: 'column',
        },
    },
    modal: {
        minHeight: '100vh',
        borderRadius: 0,
    },
    sidebar: {
        backgroundColor: theme.palette.primary.light,
        padding: '2rem',
        width: '35%',
        borderTopRightRadius: '1rem',
        borderBottomRightRadius: '1rem',
        [theme.breakpoints.down(900)]: {
            marginBottom: '2rem',
            width: '100%',
            borderRadius: '1rem',
        },
        [theme.breakpoints.down(500)]: {
            padding: '2rem 1rem',
        },
    },
    title: {
        marginBottom: '1.5rem',
        fontWeight: 'normal',
    },
    subtitle: {
        color: '#fff',
        marginBottom: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontWeight: 'normal',
    },
    description: {
        color: '#fff',
    },
    linkContainer: {
        margin: '1.5rem 0',
        display: 'flex',
        alignItems: 'center',
    },
    linkIcon: {
        marginRight: '0.5rem',
        color: '#fff',
    },
    documentationLink: {
        color: '#fff',
        display: 'block',
    },
    formContent: {
        borderTopLeftRadius: '1rem',
        borderBottomLeftRadius: '1rem',
        position: 'relative',
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        padding: '2rem',
        width: '65%',
        [theme.breakpoints.down(900)]: {
            width: '100%',
            borderRadius: '1rem',
        },
        [theme.breakpoints.down(500)]: {
            padding: '2rem 1rem',
        },
    },
    icon: { fill: '#fff' },
    mobileGuidanceBgContainer: {
        zIndex: 1,
        position: 'absolute',
        right: 0,
        top: 0,
        overflow: 'hidden',
        width: '75px',
        height: '75px',
        borderTopRightRadius: '1rem',
    },
    mobileGuidanceBackground: {
        position: 'absolute',
        right: 0,
        top: 0,
        width: '75px',
        height: '75px',
    },
    mobileGuidanceButton: {
        position: 'absolute',
        zIndex: 400,
        right: 0,
    },
    infoIcon: {
        fill: '#fff',
    },
}));
