import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { getFormattedDate , checkInteger,addInCollection } from './utils';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    paddingTop: theme.spacing.unit * 6,
    maxWidth: 500,
    margin:'auto',
    border: '1px solid black',
    padding: theme.spacing.unit * 5,
    marginTop: theme.spacing.unit * 3,
  },
  margin: {
    margin: theme.spacing.unit,
  },
  textField: {
    flexBasis: 200,
    display:'block'
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  date:{
    flexBasis: 200,
    display:'block',
    marginLeft: theme.spacing.unit * 1.5,
  }
});

const ranges = [
  {
    value: 'PAID',
    label: 'PAID',
  },
  {
    value: 'DUE',
    label: 'DUE',
  }
];

const integerValues = [
    "phone",
    "invoiceAmount"
];

const defaults = {
    cutomerName:'',
    phone: '',
    invoiceAmount: '',
    invoiceStatus: '', 
}

class OutlinedInputAdornments extends React.Component {
  state = {
    ...defaults,
    disableFields:this.props.disableFields ? true : false,
  };

    handleChange = prop => event => {
        const data = event.target.value
        const isIntInput =  integerValues.some(value=>value === prop)
        let stateMutation = true;
        if(isIntInput){
            if(checkInteger(data)){
                stateMutation = false;
            }
        }
        if(stateMutation){
            this.setState({ 
                [prop]: data
            });
        }
    };

    handleSubmmit = (e)=>{
       addInCollection('invoices',this.state);
        this.setState({
            ...defaults,
        });
        alert('Invoice added succesfully, check it in the invoice list');
    }

    

  render() {
    const { classes } = this.props;
    const { 
        cutomerName,
        phone,
        invoiceAmount,
        invoiceStatus, 
        disableFields
    } = this.state;
    return (
      <div className={classes.root}>
      <form className={classes.container} noValidate>
      <Typography align='center' color='primary' variant='h5' gutterBottom >Add a invoice </Typography>
        <TextField
          id="outlined-simple-start-adornment"
          className={classNames(classes.margin, classes.textField)}
          variant="outlined"
          label="Customer Name"
          value={cutomerName}
          onChange={this.handleChange('cutomerName')}
          InputProps={{
            startAdornment: <InputAdornment position="start">Mr/Mrs</InputAdornment>,
          }}
          fullWidth
          disabled={disableFields}
        />

        <TextField
          className={classNames(classes.margin, classes.textField)}
          variant="outlined"
          label="Phone"
          value={phone}
          onChange={this.handleChange('phone')}
          InputProps={{
            startAdornment: <InputAdornment position="start">Ph</InputAdornment>,
          }}
          fullWidth
          disabled={disableFields}
        />

        <TextField
          id="outlined-adornment-amount"
          className={classNames(classes.margin, classes.textField)}
          variant="outlined"
          label="Invoice Amount"
          value={invoiceAmount}
          onChange={this.handleChange('invoiceAmount')}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          fullWidth
          disabled={disableFields}
        />

        <TextField
          select
          id="outlined-adornment-password"
          className={classNames(classes.margin, classes.textField)}
          variant="outlined"
          label="Status"
          value={invoiceStatus}
          onChange={this.handleChange('invoiceStatus')}
          InputProps={{
            startAdornment: <InputAdornment position="start">St</InputAdornment>,
          }}
          fullWidth
          disabled={disableFields}
        >
        {ranges.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        
        <TextField
        id="date"
        label="Invoice Date"
        type="date"
        defaultValue={getFormattedDate(new Date(),'YYYY-MM-DD')}
        className={classes.date}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={this.handleChange('invoiceDate')}
        disabled={disableFields}
        fullWidth
      />
        <Button fullWidth variant="contained" color="primary" className={classes.button} onClick={this.handleSubmmit} >
            ADD
        </Button>
        </form>
      </div>
    );
  }
}

OutlinedInputAdornments.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OutlinedInputAdornments);
