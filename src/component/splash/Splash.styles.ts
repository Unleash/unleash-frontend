import { makeStyles } from '@material-ui/core/styles';
import { Height } from '@material-ui/icons';

export const useStyles = makeStyles(theme => ({
  mainContainer:{
      backgroundColor: theme.palette.primary.light,
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
  },
  container:{
    backgroundColor: theme.palette.primary.main,
    height: '70vh',
    width: '50vw',
    padding: 10,
    color: '#fff',
    position: 'relative'
  },
  title:{
      textAlign:'center',
      marginTop: 20,
      marginBottom: 30

  },
  paragraph:{
    padding: '0 40px',
  },
  center:{
      display: 'flex',
      justifyContent: 'center'
  },
  buttonsContainer:{
    position: 'absolute',
    bottom: 0,
    display: 'flex',
    justifyContent: 'center'
  },
  button:{
    textDecoration: 'none',
    color: '#fff'
  }
}));
