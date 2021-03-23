import React from 'react';
import '../css/basic-ui.css';
import { toString } from '../operations';

export class Success extends React.Component {
    constructor () {
        super();
        this.state = {
            userData: {},
            message: ''
        };
    }

    componentDidMount = async () => {
        const token = toString(window.location.href.split("authtoken=")[1]);
        await fetch("/getUser", {
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            'body': ''
        }).then(a=>a.json())
            .then(res => {
                this.setState({
                    userData: res.data,
                    message: res.message
                });
            })
            .catch(e => {
                console.clear();
                const errorMessage = `<code>Error 403: </code>Authentication Token Invalid`;
                document.body.innerHTML = errorMessage;
            });
    }

    render() {
        return (
            <React.Fragment>
                <h1>{Object.keys(this.state.userData).length > 0 ? `Welcome, ${this.state.userData.user.name}!` : ""}</h1>
                <h4>{this.state.message !== "" ? this.state.message : ""}</h4>
            </React.Fragment>
        );
    }
}