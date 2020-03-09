import React, { useCallback, useState } from 'react';
import ReactDOM from "react-dom"
import { hooks } from 'botframework-webchat-component';
import Button from 'react-bootstrap/Button';

const { useSendMessage } = hooks;

function ChatInput() {
	const sendMessage = useSendMessage();

	// sendBoxValue is initialised as '', as nothing has been typed in yet. 
	// When we call setSendBoxValue, we can update the value in the sendBox
	const [sendBoxValue, setSendBoxValue] = useState('');

	const handleChange = useCallback(({ target: { value } }) => setSendBoxValue(value), [setSendBoxValue]);

	// This is called when we want to send a message, the sendMessage function uses the hooks
	// from the botframework-webchat-component to relay our message, and then we must manually update
	// the submit box text
	const handleSubmit = useCallback(
		event => {
			event.preventDefault();
			sendMessage(sendBoxValue);
			setSendBoxValue('');
		},
		[sendBoxValue, sendMessage, setSendBoxValue]);

	// Since we're using a textarea for input, I had to create this function so that if the user presses enter
	// it sends the sendBoxValue, instead of skipping to a new line. 
	const onEnterPress = (e) => {
		if(e.keyCode === 13 && e.shiftKey === false) {
			e.preventDefault();
			sendMessage(sendBoxValue);
			setSendBoxValue('');
		}
	 }

	return (
		<footer>
			<form onSubmit={handleSubmit}>
				<textarea className="UserInput" autoFocus={true} onKeyDown={onEnterPress} onChange={handleChange} value={sendBoxValue}/>
			</form>
			<Button variant="outline-secondary" onClick={handleSubmit}>Send</Button>
		</footer>);
}

export default ChatInput;
