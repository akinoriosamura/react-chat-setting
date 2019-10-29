import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
}));

export default function Mail(props) {
    const classes = useStyles();

    return (
        <form className={classes.container} noValidate autoComplete="off">
            <TextField
                id="outlined-email-input"
                label="Email"
                onChange={e => props.handleMailChange(e.target.value)}
                className={classes.textField}
                type="email"
                name="email"
                autoComplete="email"
                margin="normal"
                variant="outlined"
            />
        </form>
    );
}