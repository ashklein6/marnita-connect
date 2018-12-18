import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table360s from '../Table360s/Table360s';

// Material-UI
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';

//this page has all sorts of weird problems, but the general idea is there...
//ashley, if you're reading this, you should probs go get a hot apple blahst
class Manage360s extends Component {

  state = {
      unpublishedName: '',
      unpublishedLocation: '',
      unpublishedDate: '',
      unpublishedCategory: '',
      publishedName: '',
      publishedLocation: '',
      publishedDate: '',
      publishedCategory: '',
  };

  componentDidMount() {
    this.props.dispatch({type: 'FETCH_PUBLISHED'});
    this.props.dispatch({type: 'FETCH_UNPUBLISHED'});
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  };

  searchPublished = (event) => {
    event.preventDefault();
    this.props.dispatch({
      type: 'FETCH_360_SEARCH_PUBLISHED', 
      payload: {
        name: this.state.publishedName.toLowerCase(),
        location: this.state.publishedLocation.toLowerCase(),
        date: this.state.publishedDate,
        category: this.state.publishedCategory,
        publishedStatus: true
      }
    })
  };

  searchUnpublished = (event) => {
    event.preventDefault();
    this.props.dispatch({
      type: 'FETCH_360_SEARCH_UNPUBLISHED', 
      payload: {
        name: this.state.unpublishedName.toLowerCase(),
        location: this.state.unpublishedLocation.toLowerCase(),
        date: this.state.unpublishedDate,
        category: this.state.unpublishedCategory,
        publishedStatus: false
      }
    });
  };

  returnToDash = () => {
    this.props.history.push('/dashboard');
  };

  goToGenerator = () => {
    this.props.history.push('/generate360');
  }

 render() {
   const { classes } = this.props;

   return (
      <div >
        <Button variant="contained" onClick={this.returnToDash}>Return to Dashboard</Button>
        <span>
          <Typography variant="h4" className={classes.header}>Unpublished 360s</Typography>
          <Button variant="contained" onClick={this.goToGenerator}>Create New 360</Button>
        </span>
        <span>
          <Typography>Search By</Typography>
          <form onSubmit={this.searchUnpublished}>
            <TextField placeholder="Name or Client" type="search" onChange={this.handleChange}
              name="unpublishedName" value={this.state.unpublishedName}/>
            <TextField placeholder="Location" type="search" onChange={this.handleChange}
              name="unpublishedLocation" value={this.state.unpublishedLocation}/>
            <TextField placeholder="Date" type="date" onChange={this.handleChange}
              name="unpublishedDate" value={this.state.unpublishedDate}/>
            <TextField
              select
              className={classNames(classes.margin, classes.textField)}
              value={this.state.unpublishedCategory}
              onChange={this.handleChange}
              name="unpublishedCategory"
              InputProps={{
                startAdornment: <InputAdornment position="start">Category</InputAdornment>,
              }}
            >
              {this.props.reduxState.iziCategories.map(category => (
                <MenuItem key={category.id} value={category.id}>
                  {category.category}
                </MenuItem>
              ))}
            </TextField>
            <Button type="submit">Search</Button>
          </form>
        </span>
        <Table360s rows={this.props.reduxState.all360s.unpublished}/>
        <span>
          <Typography variant="h4" className={classes.header}>Published 360s</Typography>
          <Typography>Search By</Typography>
          <form onSubmit={this.searchPublished}>
            <TextField placeholder="Name or Client" type="search" onChange={this.handleChange}
              name="publishedName" value={this.state.publishedName}/>
            <TextField placeholder="Location" type="search" onChange={this.handleChange}
              name="publishedLocation" value={this.state.publishedLocation} />
            <TextField placeholder="Date" type="date" onChange={this.handleChange}
              name="publishedDate" value={this.state.publishedDate}/>
            <TextField
              select
              className={classNames(classes.margin, classes.textField)}
              value={this.state.publishedCategory}
              onChange={this.handleChange}
              name="publishedCategory"
              InputProps={{
                startAdornment: <InputAdornment position="start">Category</InputAdornment>,
              }}
            >
              {this.props.reduxState.iziCategories.map(category => (
                <MenuItem key={category.id} value={category.id}>
                  {category.category}
                </MenuItem>
              ))}
            </TextField>
            <Button type="submit">Search</Button>
          </form>
        </span>
        <Table360s rows={this.props.reduxState.all360s.published}/>
      </div>
   );
 }
};

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3,
  },
  textField: {
    flexBasis: 200,
  },
});

const mapReduxStateToProps = (reduxState) => ({
 reduxState
});

export default connect(mapReduxStateToProps)(withStyles(styles)(Manage360s));