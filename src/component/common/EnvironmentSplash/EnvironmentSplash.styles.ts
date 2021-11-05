import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    title:{
        textAlign: 'center',
        marginBottom: '20px',
        lineHeight: '1.3'
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
    logo:{
        width: '80%',
        height: '60%',
        display: 'block',
        margin: 'auto',
        marginTop: '25px',
    },
}));
