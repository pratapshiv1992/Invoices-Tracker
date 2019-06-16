import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { getFormattedDate , checkInteger,addInCollection ,getDocument } from './utils';

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
    customerName:'',
    phone: '',
    invoiceAmount: '',
    invoiceStatus: '', 
    invoiceDate:getFormattedDate(new Date(),'YYYY-MM-DD')
}

class OutlinedInputAdornments extends React.Component {
  state = {
    ...defaults,
    disableFields:false,
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
        const invoiceData = this.state;
        let dataCheck = true;
        for(let value in invoiceData){
            if(!value){
                dataCheck=false;
            }
        }
        if(dataCheck){
            addInCollection('invoices',this.state);
            this.setState({
                ...defaults,
            });
            alert('Invoice added succesfully, check it out in the invoice list');
        }else{
            alert('Please fill all the fields');
        }
       
    }

    goBack = (e)=>{
        const {history:{ goBack} } = this.props;
        goBack();
     }

     deleteInvoice = (e)=>{
        const {history:{ goBack},match:{params:{id}} } = this.props;
        getDocument('invoices',id).delete();
        goBack();
     }

    componentDidMount(){
        const { editMode } = this.props;
        if(editMode){
            const { match:{params:{id}} } = this.props;
            getDocument('invoices',id).get().then(snap=>{
                const document =  {...snap.data(),id:snap.id };
                this.setState({
                    ...document,
                    disableFields:true
                });
            });
            
        }
    }
    

  render() {
    const { classes,editMode} = this.props;
    
    const { 
        customerName,
        phone,
        invoiceAmount,
        invoiceStatus, 
        disableFields,
        invoiceDate
    } = this.state;

    const dataCheck= customerName && phone && invoiceAmount && invoiceStatus && invoiceDate ? true : false;

    return (
      <div className={classes.root}>
      <form className={classes.container} noValidate>
      <Typography align='center' color='primary' variant='h5' gutterBottom >{ editMode ? 'Edit an invoice ' : 'Add an invoice'}</Typography>
        <TextField
          id="outlined-simple-start-adornment"
          className={classNames(classes.margin, classes.textField)}
          variant="outlined"
          label="Customer Name"
          value={customerName}
          onChange={this.handleChange('customerName')}
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
        <Button fullWidth variant="contained" color="primary" className={classes.button} onClick={editMode ? this.deleteInvoice : this.handleSubmmit} disabled = {!dataCheck} >
            {editMode ? 'DELETE ':'ADD' }
        </Button>
        <Button fullWidth variant="contained" color="secondary" className={classes.button} onClick={this.goBack} >
            GO BACK
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
