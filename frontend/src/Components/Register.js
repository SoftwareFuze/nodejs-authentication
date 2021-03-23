import React from 'react';
import '../css/basic-ui.css';
import '../css/form-ui.css';
import { Redirect } from 'react-router-dom';
import { toHex } from '../operations';

export class Register extends React.Component {
    constructor () {
        super();
        this.state = {
            token: '',
            redirect: false
        };
    }

    handleSubmit = async () => {
        const [ nameInput, passInput ] = document.querySelectorAll("input");
        if (nameInput.value && passInput.value) {
            await fetch("/api/register", {
                'method': 'POST',
                'headers': { 'Content-Type': 'application/json' },
                'body': JSON.stringify({
                    name: nameInput.value,
                    pass: passInput.value
                })
            }).then(a=>a.json())
                .then(res => {
                    if (res.status === 200) {
                        this.state.token = res.token;
                        this.setState({
                            redirect: true
                        });
                    } else {
                        console.log('that username already exists. try another one');
                    }
                });
        }
    }

    render() {
        return (
            <React.Fragment>
                <h1>Register</h1>
                <div className="outer-form">
                    <input className="name" placeholder="name..." />
                    <br />
                    <input className="pass" placeholder="pass..." />
                    <br />
                    <button className="submit" onClick={this.handleSubmit}>Register</button>
                </div>
                {this.state.redirect ? <Redirect to={`/success?authtoken=${toHex(this.state.token)}`} /> : null}
            </React.Fragment>
        );
    }
}