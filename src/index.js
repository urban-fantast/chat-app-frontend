import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Redirect, Switch, Route} from 'react-router-dom';
import './index.css';
import Login from './Components/Login/Login';
import ChatWindow from './Components/ChatWindow/ChatWindow'
import * as serviceWorker from './serviceWorker';
import * as io from 'socket.io-client';
import SocketContext from './ContextVariables';

const socket = io("http://localhost:4001");


class App extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <SocketContext.Provider value={socket}>
                    <Switch>
                        <Redirect exact from="/" to="/login"/>
                        <Route path="/login" component={Login}/>
                        <Route path="/groupchat" component={ChatWindow}/> 
                    </Switch>
            </SocketContext.Provider>
        )
    }
}

ReactDOM.render(<Router><App /></Router>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
