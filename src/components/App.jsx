import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TimePick from './TimePickers';
import StationSelect from './StationSelecters';
import BudgetGet from './BudgetGetter';
import SaveButton from './SaveButton';
import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';



const useStyles = makeStyles(theme => ({
  layout: {
    backgroundColor: '#282c34',
    width: 'auto',
    marginLeft: 1000,
    marginRight: theme.spacing(2),
  },
}));



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: this.props.url,
      original_place: '',
      original_visit_time: '',
      original_budget: '',
      place: '',
      visit_time: '',
      budget: '',
      lat: '',
      lng: '',
    };
    this.GetUserInfo = this.GetUserInfo.bind(this);
    this.updateSetting = this.updateSetting.bind(this);
    this.handlePlaceChange = this.handlePlaceChange.bind(this);
    this.handleVisitTimeChange = this.handleVisitTimeChange.bind(this);
    this.handleBudgetChange = this.handleBudgetChange.bind(this);
  }

  componentDidMount() {
    console.log(this.state.url);
    this.GetUserInfo(this.state.url)
  }

  GetUserInfo(url) {
    fetch(url + "users/1/places")
      .then(response => response.json())
      .then(json => {
        this.setState({ original_place: json.place });
        this.setState({ place: json.place });
      })
    fetch(url + "users/1/visit_times")
      .then(response => response.json())
      .then(json => {
        this.setState({ original_visit_time: json.visit_time });
        this.setState({ visit_time: json.visit_time });
      })
    fetch(url + "users/1/budgets")
      .then(response => response.json())
      .then(json => {
        this.setState({ original_budget: json.budget });
        this.setState({ budget: json.budget });
      })
  }

  updateSetting() {
    const url = this.state.url
    if (this.state.original_place !== this.state.place) {
      this.updatePlace(url);
      console.log("fetch update place")
      console.log(this.state.original_place)
      console.log(this.state.place)
    }
    if (this.state.original_visit_time !== this.state.visit_time) {
      this.updateVisitTime(url);
      console.log("fetch update time")
      console.log(this.state.original_visit_time)
      console.log(this.state.visit_time)
    }
    if (this.state.original_budget !== this.state.budget) {
      this.updateBudget(url);
      console.log("fetch update budget")
      console.log(this.state.original_budget)
      console.log(this.state.budget)
    }
  }

  updatePlace(url) {
    fetch(url + "users/1/places", {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ place: this.state.place })
    })
  }

  updateCurrentPlace(url) {
    fetch(url + "users/1/places", {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ place: this.state.place })
    })
  }

  updateVisitTime(url) {
    fetch(url + "users/1/visit_times", {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ visit_time: this.state.visit_time })
    })
  }

  updateBudget(url) {
    fetch(url + "users/1/budgets", {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ budget: this.state.budget })
    })
  }

  handlePlaceChange(place) {
    console.log("update place");
    console.log(place);
    this.setState({ place });
  }

  handleVisitTimeChange(visit_time) {
    console.log("update visit time");
    console.log(visit_time);
    this.setState({ visit_time });
  }

  handleBudgetChange(budget) {
    console.log("update budget");
    console.log(budget);
    this.setState({ budget });
  }

  get_geolocation() {
    navigator.geolocation.getCurrentPosition(
      pos => {
        this.setState({ lat: pos.coords.latitude });
        this.setState({ lng: pos.coords.longitude });
      },
      err => console.log(err)
    );
    console.log(this.state.lat)
    console.log(this.state.lng)
  }

  render() {
    const { classes } = this.props;
    console.log("class");
    console.log(classes);
    return (
      <React.Fragment>
          <CssBaseline />
          <main>
              <Typography component="h1" variant="h4" align="center">
                設定
              </Typography>
              <React.Fragment>
                <Grid container spacing={8} justify-content='space-around' >
                  <Grid item xs={12} >
                  </Grid>
                  <Grid item xs={12} >
                    <StationSelect place={this.state.place} handlePlaceChange={this.handlePlaceChange} />
                  </Grid>
                  <Grid item xs={12} >
                    <TimePick visit_time={this.state.visit_time} handleVisitTimeChange={this.handleVisitTimeChange} />
                  </Grid>
                  <Grid item xs={12} >
                    <BudgetGet budget={this.state.budget} handleBudgetChange={this.handleBudgetChange} />
                  </Grid>
                  <Grid item xs={12} >
                    <SaveButton updateSetting={this.updateSetting} />
                  </Grid>
                </Grid>
              </React.Fragment>
          </main>
        </React.Fragment>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(useStyles)(App);
