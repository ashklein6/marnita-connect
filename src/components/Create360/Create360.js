import React, { Component } from 'react';
import { connect } from 'react-redux';

// React-confirm-alert
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

// Material-UI
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';

const styles = {
  button: {
    margin: 25
  },
  textField: {
    width: 400,
    marginBottom: 10
  },
  form: {
    textAlign: 'center',
  },
  header: {
    textAlign: 'center',
    marginBottom: 25
  }
};

class Create360 extends Component {

  state = {
    name: '',
    client: '',
    date: '',
    location: '',
    category: '',
    description: '',
    status: false,
  };

  // will navigate to admin dashboard
  returnToDashboard = (event) => {
    event.preventDefault();
    this.props.history.push('/dashboard');
  };

  // handles change for inputs
  handleChange = (event) => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value,
    })
  };

  // handles change for switch
  handleSwitch = (event) => {
    let newValue = !this.state.status;
    this.setState({
      ...this.state,
      status: newValue
    });
  };

  // dispatch to current360Saga
  handleSubmit = (event) => {
    event.preventDefault();
    if(this.state.name && this.state.client && this.state.date && this.state.location && this.state.category && this.state.description){
      this.confirmSubmit();
    } else {
      this.errorMessage();
    };
  };

  errorMessage = () => {
    confirmAlert({
      title: 'Error',
      message: 'All fields must be completed to proceed.',
      buttons: [
        {
          label: 'Ok',
        },
      ]
    })
  };


  create360 = () => {
    if(!this.state.status){
      this.props.dispatch({ type: 'CREATE_360_COMPLETE', payload: this.state });
      this.props.history.push('/manage360s');
    } else {
      this.props.dispatch({ type: 'CREATE_360_LOWDOWN', payload: this.state }); 
      this.props.history.push('/manage360s');
    };
  }

  confirmSubmit = () => {
    confirmAlert({
      title: 'Confirm to submit',
      message: `Are you sure you want to create a 360 with these properties?
                Name: ${this.state.name},
                Client: ${this.state.client},
                Date: ${this.state.date},
                Location: ${this.state.location},
                Category: ${this.state.category},
                Description: ${this.state.description}`,
      buttons: [
        {
          label: 'Submit',
          onClick: () => this.create360()
        },
        {
          label: 'Edit',
        }
      ]
    })
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button
          className={classes.button} 
          variant="contained"
          onClick={this.returnToDashboard}
        >
          Return to Dashboard
        </Button>
        <form className={classes.form} onSubmit={this.handleSubmit}>
          <Typography variant="h2" className={classes.header}>Create 360</Typography>
          <TextField
            label="Name"
            className={classes.textField}
            margin="dense"
            variant="outlined"
            onChange={this.handleChange}
            value={this.state.name}
            name ="name"
            placeholder="Name"
          /><br />

          <TextField
            label="Client"
            className={classes.textField}
            margin="dense"
            variant="outlined"
            onChange={this.handleChange}
            value={this.state.client}
            name ="client"
            placeholder="Client"
          /><br />

          <TextField
            className={classes.textField}
            type="date"
            margin="dense"
            variant="outlined"
            onChange={this.handleChange}
            value={this.state.date}
            name ="date"
          /><br />

          <TextField
            label="Location"
            className={classes.textField}
            margin="dense"
            variant="outlined"
            onChange={this.handleChange}
            value={this.state.location}
            name ="location"
            placeholder="Location"
          /><br />

          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel
              ref={ref => {
                this.InputLabelRef = ref;
              }}
              htmlFor="outlined-age-simple"
            >
              Category
            </InputLabel>
            <Select
              className={classes.textField}
              value={this.state.category}
              onChange={this.handleChange}
              input={
                <OutlinedInput
                  labelWidth={0}
                  name="category"
                  id="outlined-age-simple"
                />
              }
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {this.props.reduxState.iziCategories.map(category => (
                <MenuItem key={category.id} value={category.id}>{category.category}</MenuItem>
              ))}
            </Select>
          </FormControl><br />

          <TextField
            label="Description"
            className={classes.textField}
            margin="dense"
            variant="outlined"
            onChange={this.handleChange}
            value={this.state.description}
            name ="description"
            placeholder="Description"
          /><br />

          <span>Longform</span>
          <Switch
            checked={this.state.status}
            onChange={this.handleSwitch}
            color="default"
          />
          <span>Shortform</span>

          <br />

          <Button type="submit" variant="contained">Create 360</Button>
        </form>
    </div>
    );
  }
};

const mapReduxStateToProps = (reduxState) => ({
 reduxState
});

export default connect(mapReduxStateToProps)(withStyles(styles)(Create360));