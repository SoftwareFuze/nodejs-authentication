import React from 'react';
import { Home } from './Components/Home';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import { Register } from './Components/Register';
import { Login } from './Components/Login';
import { Success } from './Components/Success';
import './css/basic-ui.css';

export class App extends React.Component {
    constructor () {
        super();
        this.state = {};
    }

    render() {
        return (
            <React.Fragment>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />
                        <Route path="/success" component={Success} />
                    </Switch>
                </BrowserRouter>
            </React.Fragment>
        );
    }
}