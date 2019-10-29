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

export default function InquiryContent(props) {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        multiline: 'Controlled',
    });



    return (
        <form className={classes.container} noValidate autoComplete="off">
            <TextField
                id="outlined-multiline-static"
                label="Multiline"
                onChange={e => props.handleInquiryChange(e.target.value)}
                multiline
                rows="4"
                defaultValue=""
                className={classes.textField}
                margin="normal"
                variant="outlined"
            />
        </form>
    );
}