import React, {Component} from 'react';
import './Message.scss'
import PropTypes from 'prop-types';

class Message extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {content, time, user} = this.props;
        return (
            <div className="message">
                <p>{time}</p>
                <b>{content}</b>
                <p>{user}</p>
            </div>
        )
    }
}

Message.propTypes = {
    content: PropTypes.string,
    time: PropTypes.string,
    user: PropTypes.string
}

export default Message;