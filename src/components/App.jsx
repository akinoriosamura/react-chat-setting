import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IntBudgetGet from './IntBudgetGetters';
import PreferGet from './PreferGetters';
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

const liff = window.liff;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: this.props.url,
      profile: {},
      original_prefer: '',
      original_budget: '',
      prefer: '',
      budget: '',
      lat: '',
      lng: '',
    };
    this.GetUserInfo = this.GetUserInfo.bind(this);
    this.updateSetting = this.updateSetting.bind(this);
    this.handlePreferChange = this.handlePreferChange.bind(this);
    this.handleBudgetChange = this.handleBudgetChange.bind(this);
    this.initVConsole()
    console.log("finish constructor");
  }

  componentDidMount() {
    this.LiffInit();
    console.log(this.state.profile);
    console.log("user ID");
    console.log(this.state.profile.userId);
    console.log("url");
    console.log(this.state.url);
    console.log("finish componentdidmount");
  }

  initVConsole() {
    var VConsole = require('vconsole');
    var vConsole = new VConsole({
        defaultPlugins: ['system', 'network', 'element', 'storage'],
        maxLogNumber: 1000,
        onReady: function() {
            console.log('vConsole is ready.');
        },
        onClearLog: function() {
            console.log('on clearLog');
        }
    });
  }

  LiffInit() {
    console.log("liffinit in didmount");
    liff.init(
      data => {
          console.log('LIFF initialized!');
          // Now you can call LIFF API
          const userId = data.context.userId;
          liff.getProfile().then(pr => {
            console.log(pr);
            const userDisplayName = pr.displayName
            console.info('User name is', userDisplayName);
            const prof = pr
            console.log(prof);
            console.log(prof.userId);
            this.setState({ profile: prof });
          })
          .catch((err) => {
              console.error('LIFF getProfile failed', err);
          })
          .then(() => {
            this.ShapeURL();
            this.GetUserInfo();
          })
      },
      err => {
          console.error('LIFF initialization failed', err);
      }
    );
  }

  ShapeURL() {
    console.log("shapeurl");
    var reg = new RegExp("(https?://.*?/)(.*?)");
    console.log(this.state.url.match(reg)[0]);
    var new_url = this.state.url.match(reg)[0]
    this.setState({ url: new_url });
    console.log(this.state.url);
  }

  GetUserInfo() {
    console.log("get user info");
    console.log(this.state.url + "users/" + this.state.profile.userId + "/prefers");
    fetch(this.state.url + "users/" + this.state.profile.userId + "/prefers")
      .then(response => response.json())
      .then(json => {
        this.setState({ original_prefer: json.prefer });
        this.setState({ prefer: json.prefer });
      })
    fetch(this.state.url + "users/" + this.state.profile.userId + "/budgets")
      .then(response => response.json())
      .then(json => {
        this.setState({ original_budget: json.budget });
        this.setState({ budget: json.budget });
      })
  }

  updateSetting() {
    const url = this.state.url
    if (this.state.original_prefer !== this.state.prefer) {
      this.updatePrefer(url);
      console.log("fetch update prefer")
      console.log(this.state.original_prefer)
      console.log(this.state.prefer)
    }
    if (this.state.original_budget !== this.state.budget) {
      this.updateBudget(url);
      console.log("fetch update budget")
      console.log(this.state.original_budget)
      console.log(this.state.budget)
    }
  }

  updatePrefer(url) {
    fetch(url + "users/" + this.state.profile.userId + "/prefers", {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prefer: this.state.prefer })
    })
    .then(response => response.json())
    .then(json => {
      console.log("update prefer");
      console.log(json);
    })
  }

  updateBudget(url) {
    fetch(url + "users/" + this.state.profile.userId + "/budgets", {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ budget: this.state.budget })
    })
    .then(response => response.json())
    .then(json => {
      console.log("update budget");
      console.log(json);
    })
  }

  handlePreferChange(prefer) {
    console.log("update prefer");
    console.log(prefer);
    this.setState({ prefer });
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
      <React.Fragment >
          <CssBaseline />
              <Typography component="h2" variant="h4" align="center" style={{ marginTop: "3%"}} >
                希望条件
              </Typography>
              <React.Fragment>
                <Grid container spacing={4} justify-content='space-around' >
                  <Grid item xs={12} >
                  </Grid>
                  <Grid item xs={12} >
                    <IntBudgetGet budget={this.state.budget} handleBudgetChange={this.handleBudgetChange} />
                  </Grid>
                  <Grid item xs={12} >
                    <PreferGet prefer={this.state.prefer} handlePreferChange={this.handlePreferChange} />
                  </Grid>
                  <Grid item xs={12} >
                    <SaveButton updateSetting={this.updateSetting} />
                  </Grid>
                </Grid>
              </React.Fragment>
        </React.Fragment>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(useStyles)(App);
