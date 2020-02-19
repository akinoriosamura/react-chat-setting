import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    display: 'flex',
    marginLeft: '10%',
    marginRight: '10%',
    whiteSpace: 'nowrap'
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


export default function IntBudgetGet(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    budget: '',
  });
  console.log("prpp budget");
  console.log(props.budget);
  //document.getElementById('default').innerText = "d_budegt";
  const handleChange = prop => event => {
    console.log("handle budget change");
    console.log(props.budget);
    setValues({ ...values, [prop]: event.target.value });
    console.log(props.budget);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel shrink id="demo-simple-select-placeholder-label-label">
          価格帯
        </InputLabel>
        <Select
          labelId="demo-simple-select-placeholder-label-label"
          id="demo-simple-select-placeholder-label"
          value={props.budget}
          onChange={
            e => {
                handleChange('budget');
                props.handleBudgetChange(e.target.value);
            }
          }
          displayEmpty
          className={classes.selectEmpty}
        >
          <MenuItem>
            <div id="default">
            </div>
          </MenuItem>
          <MenuItem value={"1"}>とても安い</MenuItem>
          <MenuItem value={"2"}>安い</MenuItem>
          <MenuItem value={"3"}>普通</MenuItem>
          <MenuItem value={"4"}>高い</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}