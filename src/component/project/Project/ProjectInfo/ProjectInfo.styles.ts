import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    projectInfo: {
        width: '275px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: 'none',
    },
    projectIcon: {
        margin: '2rem 0',
    },
    subtitle: {
        marginBottom: '1.25rem',
    },
    emphazisedText: {
        fontSize: '1.5rem',
        marginBottom: '1rem',
    },
    infoSection: {
        margin: '0',
        textAlign: 'center',
        marginBottom: '1.5rem',
        backgroundColor: '#fff',
        borderRadius: '10px',
        width: '100%',
        padding: '1.5rem 1rem 1.5rem 1rem',
    },
    arrowIcon: {
        color: '#635dc5',
        marginLeft: '0.5rem',
    },
    infoLink: {
        textDecoration: 'none',
        color: '#635dc5',
    },
}));
