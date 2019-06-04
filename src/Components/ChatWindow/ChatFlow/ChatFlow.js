import React, {Component} from 'react';
import Message from '../Message/Message';
import './ChatFlow.scss'
import axios from 'axios';
import PropTypes from 'prop-types';

const instance = axios.create({baseURL: 'http://localhost:4001'});

class ChatFlow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            userTyping: ''
        }
    }

    updateMessageList = () => {
        instance.get('/').
            then(res => {
                this.setState({messages: res.data.response});
            }).
            catch(error => console.log(error));
    }

    componentDidMount = () => {
        this.updateMessageList();
        this.updateUserTyping();
        this.listenToMsgs();
    }

    updateUserTyping = () => {
        this.props.socket.on ('user typing', username => {
            this.setState({userTyping: username});
        })
    }

    listenToMsgs = () => {
        this.props.socket.on ( 'chat message', details => {
            this.setState( state => ({
                messages: [...state.messages, {message: details.message, time: details.time, user: details.user}],
                userTyping: ''
            }));
        });
    }
    render() {
        const {messages, userTyping} = this.state;
        const messageList = messages ? (
            messages.map( item => 
                <Message content={item.message} 
                        time={item.time} 
                        user={item.user}
                /> 
            )) : null;
        return (
           <div className="chatflow">
                {messageList}
                {userTyping ? <span className="usertyping">{userTyping} is Typing</span> : null}
           </div>
        )
    }

}

ChatFlow.propTypes = {
    socket: PropTypes.object
}

export default ChatFlow;