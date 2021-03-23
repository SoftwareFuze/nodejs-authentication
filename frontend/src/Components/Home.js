import React from 'react';
import '../css/basic-ui.css';
import '../css/home-ui.css';
import { Link } from 'react-router-dom';


export class Home extends React.Component {
    constructor () {
        super();
        this.state = {};
    }

    render() {
        return (
            <React.Fragment>
                <h1>Authentication Demo</h1>
                <div>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </div>
            </React.Fragment>
        )
    }
}