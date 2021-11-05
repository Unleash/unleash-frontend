import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    title:{
        textAlign: 'center',
        marginBottom: '20px'
    },
    topDescription:{
        padding: '0px 40px',
        marginBottom: '5px',
        fontSize: '17px'
    },
    bottomDescription:{
        padding: '0px 40px',
        fontSize: '17px',
        marginTop: '5px',

    },
    icon:{
        fontSize: '150px',
        display: 'block',
        margin: 'auto',
    },
    img:{
        maxWidth: '100%',
        mawHeight: '100%',
        textAlign: 'center'
    }
}));
