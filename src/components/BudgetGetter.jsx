import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles(theme => ({
    center: {
        display: 'flex',
        marginLeft: '10%',
        marginRight: '10%',
        whiteSpace: 'nowrap',
      },
}));

function BudgetGet(props) {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        budget: '',
    });

    const handleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value });
    };

    return (
        <div>
            <FormControl className={classes.center}>
                <FormHelperText id="budget-helper-text">予算</FormHelperText>
                <Input
                    id="adornment-budget"
                    value={props.budget}
                    defaultValue="1000"
                    onChange={
                        e => {
                            handleChange('budget');
                            props.handleBudgetChange(e.target.value);
                        }
                    }
                    endAdornment={<InputAdornment position="end">円以内</InputAdornment>}
                    aria-describedby="budget-helper-text"
                    inputProps={{
                        'aria-label': 'budget',
                        style: {textAlign: 'center'}
                    }}
                />
            </FormControl>
        </div>
    );
}

export default BudgetGet;