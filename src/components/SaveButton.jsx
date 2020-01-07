import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles(theme => ({
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
      },
      button: {
        marginRight: '10%',
      },
}));

export default function IconLabelButtons(props) {
    const classes = useStyles();

    return (
        <div className={classes.buttons}>
            <Button variant="contained" className={classes.button} onClick={() => props.updateSetting()}>
                Save
            </Button>
        </div>
    );
}