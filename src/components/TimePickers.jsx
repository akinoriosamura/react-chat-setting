import React, { Component } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles(theme => ({
  center: {
    display: 'flex',
    marginLeft: '10%',
    marginRight: '10%',
  },
}));


function TimePick(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <FormControl className={classes.center}>
        <FormHelperText id="time-helper-text" >訪問時間</FormHelperText>
        <Input
          id="adornment-time"
          type="time"
          defaultValue="12:30"
          onChange={e => props.handleVisitTimeChange(e.target.value)}
          aria-describedby="time-helper-text"
          inputProps={{
            step: 300, // 5 min
            style: {textAlign: 'center'}
          }}
        />
      </FormControl>
    </React.Fragment>
  );
}

export default TimePick;