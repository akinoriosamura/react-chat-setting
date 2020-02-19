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

function PreferGet(props) {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        prefer: '',
    });
    console.log("prpp prefer");
    console.log(props.prefer);
    const handleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value });
    };

    return (
        <div>
            <FormControl className={classes.center}>
                <FormHelperText id="prefer-helper-text">カテゴリ</FormHelperText>
                <Input
                    id="adornment-prefer"
                    value={props.prefer}
                    onChange={
                        e => {
                            handleChange('prefer');
                            props.handlePreferChange(e.target.value);
                        }
                    }
                    aria-describedby="prefer-helper-text"
                    inputProps={{
                        'aria-label': 'prefer'
                    }}
                />
            </FormControl>
        </div>
    );
}

export default PreferGet;