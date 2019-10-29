import React, { Component } from 'react';
import TimePick from './TimePickers';
import StationSelect from './StationSelecters';
import BudgetGet from './BudgetGetter';
import SaveButton from './SaveButton';
import { Grid } from '@material-ui/core';


export default class App extends Component {
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


  componentWillMount() {
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
    return (
      <Grid container spacing={8} alignItems="center" justify="center">
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
    );
  }
}

