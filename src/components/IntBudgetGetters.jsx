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
    prefer: '',
  });
  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
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
                handleChange('prefer');
                props.handleBudgetChange(e.target.value);
            }
          }
          displayEmpty
          className={classes.selectEmpty}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={1}>とても安い</MenuItem>
          <MenuItem value={2}>安い</MenuItem>
          <MenuItem value={3}>普通</MenuItem>
          <MenuItem value={4}>高い</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}