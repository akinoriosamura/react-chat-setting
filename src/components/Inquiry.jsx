import React, { Component } from 'react';
import Mail from './Mail';
import InquiryContent from './InquiryContent';
import InquiryButton from './InquiryButton';
import { Grid } from '@material-ui/core';


export default class Inquiry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: this.props.url,
            original_mail: '',
            original_inquiry: '',
            mail: '',
            inquiry: '',
        };
        this.GetUserInfo = this.GetUserInfo.bind(this);
        this.updateSetting = this.updateSetting.bind(this);
        this.handleMailChange = this.handleMailChange.bind(this);
        this.handleInquiryChange = this.handleInquiryChange.bind(this);
    }


    componentWillMount() {
        console.log(this.state.url);
        this.GetUserInfo(this.state.url)
    }

    GetUserInfo(url) {
        fetch(url + "users/1/mails")
            .then(response => response.json())
            .then(json => {
                this.setState({ original_mail: json.mail });
                this.setState({ mail: json.mail });
            })
        fetch(url + "users/1/inquirys")
            .then(response => response.json())
            .then(json => {
                this.setState({ original_inquiry: json.inquiry });
                this.setState({ inquiry: json.inquiry });
            })
    }

    updateSetting() {
        const url = this.state.url
        if (this.state.original_mail !== this.state.mail) {
            this.updateMail(url);
            console.log("fetch update mail")
            console.log(this.state.original_mail)
            console.log(this.state.mail)
        }
        if (this.state.original_inquiry !== this.state.inquiry) {
            this.updateInquiry(url);
            console.log("fetch update inquiry")
            console.log(this.state.original_inquiry)
            console.log(this.state.inquiry)
        }
    }

    updateMail(url) {
        fetch(url + "users/1/mails", {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ mail: this.state.mail })
        })
    }

    updateInquiry(url) {
        fetch(url + "users/1/inquirys", {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ inquiry: this.state.inquiry })
        })
    }


    handleMailChange(mail) {
        console.log("update mail");
        console.log(mail);
        this.setState({ mail });
    }

    handleInquiryChange(inquiry) {
        console.log("update visit time");
        console.log(inquiry);
        this.setState({ inquiry });
    }

    render() {
        return (
            <Grid container spacing={8} alignItems="center" justify="center">
                <Grid item xs={12} >
                    <Mail handleMailChange={this.handleMailChange} />
                </Grid>
                <Grid item xs={12} >
                    <InquiryContent handleInquiryChange={this.handleInquiryChange} />
                </Grid>
                <Grid item xs={12} >
                    <InquiryButton updateSetting={this.updateSetting} />
                </Grid>
            </Grid>
        );
    }
}

