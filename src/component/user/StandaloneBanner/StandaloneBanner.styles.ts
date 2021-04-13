import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(theme => ({
    title: {
        color: '#fff',
        fontSize: '1.25rem',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '2rem',
    },
    switchesContainer: {
        position: 'fixed',
        bottom: '40px',
        display: 'flex',
        flexDirection: 'column',
    },
    switchIcon: {
        height: '180px',
    },
    bottomStar: {
        position: 'absolute',
        bottom: '233px',
        left: '315px',
    },
    bottomRightStar: {
        position: 'absolute',
        bottom: '350px',
        left: '420px',
    },
    midRightStar: {
        position: 'absolute',
        bottom: '550px',
        left: '500px',
    },
    midLeftStar: {
        position: 'absolute',
        bottom: '500px',
        left: '150px',
    },
    midLeftStarTwo: {
        position: 'absolute',
        bottom: '700px',
        left: '100px',
    },
}));
