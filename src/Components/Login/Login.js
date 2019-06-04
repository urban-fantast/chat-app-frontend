import React, {Component} from 'react';
import './Login.scss';
import {Redirect} from 'react-router-dom';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ''
        };
    }

    setInputRef = (node) => {
        this.inputRef = node;
    }

    handleClick = () => {
        this.setState({
            username: this.inputRef.value
        });
    }

    render() {
        if(this.state.username !== '') {
            return (
                <Redirect to= {{
                        pathname: '/groupchat',
                        state: {username: this.state.username}
                    }}
                />
            )
        }
        return (
            <div className="login-window">
                <h1> Login Page </h1>
                <p>Enter your Username</p>
                <input 
                    ref={this.setInputRef}
                    label="Username" 
                    placeholder="Sreekanth"
                />
                <button 
                    onClick= {this.handleClick}
                > Login </button>
            </div>
        )
    }
}

export default Login;