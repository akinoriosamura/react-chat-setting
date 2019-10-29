import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
    },
}));

export default function InquiryButton(props) {
    const classes = useStyles();

    return (
        <div>
            <Button variant="contained" size="small" className={classes.button} startIcon={<SaveIcon />} onClick={() => props.updateSetting()}>
                問い合わせ
            </Button>
        </div>
    );
}