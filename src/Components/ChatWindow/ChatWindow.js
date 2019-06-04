import React, {Component} from 'react';
import ChatFlow from './ChatFlow/ChatFlow';
import SocketContext from '../../ContextVariables';

class ChatWindow extends Component {
    constructor(props) {
        super(props);
    }

    getTextRef = (node) => {
        this.textRef = node;
    }

    handleEnterKey = (e, socket, username) => {
        if (e.nativeEvent.keyCode === 13) {
            this.sendMsgToServer(this.textRef.value, new Date(), username, socket);
            this.textRef.value = "";
        }
        else {
            socket.emit ('user typing', username);
        }
    }

    handleClick = (e, socket, username) => {
        this.sendMsgToServer(this.textRef.value, new Date(), username, socket);
        this.textRef.value = "";
    }

    sendMsgToServer = (message, date, username, socket) => {
        socket.emit ('chat message', message, date, username);
    }

    render() {
        return (
            <SocketContext.Consumer>
                {socket => (
                    <div>
                        <ChatFlow socket={socket}/>
                        <input placeholder="Type your message here" onKeyPress={(e) => this.handleEnterKey (e, socket, this.props.location.state.username)} ref={this.getTextRef}/>
                        <button type="button" onClick={(e) => this.handleClick (e, socket, this.props.location.state.username)}>
                            Submit
                        </button>
                    </div>
                )}
            </SocketContext.Consumer>
            
        )
    }
}

export default ChatWindow;