import React from 'react'
import ReactDOM from 'react-dom';
import { App } from './App';

function Render() {
    return (
        <React.Fragment>
            <App />
        </React.Fragment>
    );
}

ReactDOM.render(<Render />, document.querySelector("#root"));