import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles, withTheme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      marginBottom: '0%',
      marginTop : '1%',
      color: 'white',
      alignItems:'center',
      marginLeft:'15%',
      height: '100%',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
      textDecorationColor: 'white',
    },
   

  }));
export default function AddressForm() {
    const classes = useStyles();
    const [age, setAge] = React.useState('');
    const [open, setOpen] = React.useState(false);
  
 
  
  
  return (
     
    <React.Fragment>
     
      <div className="col-sm-16">
          
         <div >  
           {/* <Paper> */}
           <form className={classes.container} noValidate>
    <TextField id="outlined-basic" label="Name" variant="outlined" />
    <TextField id="outlined-basic" label="Age" variant="outlined" />
    <TextField id="outlined-basic" label="Gender" variant="outlined" />
    <TextField id="outlined-basic" label="Mobile Number" variant="outlined" />
    </form>
    <form className={classes.container} noValidate>
    <TextField id="outlined-basic" label="Number of day" variant="outlined" />
      <TextField
        id="date"
        label="Booking Date"
        type="date"
        defaultValue="xxxx-xx-xx"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
             {/* </Paper>    */}
  
    </div>
     
          </div>
    </React.Fragment>
  );
}