import React from 'react';
import { toHex } from '../operations';
import '../css/basic-ui.css';

import { Redirect } from 'react-router-dom';

export class Login extends React.Component {
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
            await fetch("/api/login", {
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
                        console.log('username or password invalid. try again');
                    }
                });
        }
    }

    render() {
        return (
            <React.Fragment>
                <h1>Login</h1>
                <div className="outer-form">
                    <input className="name" placeholder="name..." />
                    <br />
                    <input className="pass" placeholder="pass..." />
                    <br />
                    <button className="submit" onClick={this.handleSubmit}>Login</button>
                </div>
                {this.state.redirect ? <Redirect to={`/success?authtoken=${toHex(this.state.token)}`} /> : null}
            </React.Fragment>
        )
    }
}