import React, { useCallback, useState } from 'react';
import ReactDOM from "react-dom"
import { hooks } from 'botframework-webchat-component';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';


const { useSendMessage } = hooks;

function ChatInput() {
	const sendMessage = useSendMessage();

	// sendBoxValue is initialised as '', as nothing has been typed in yet. 
	// When we call setSendBoxValue, we can update the value in the sendBox
	const [sendBoxValue, setSendBoxValue] = useState('');

	// Not 100% sure what this does
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


		// THIS IS THE CODE FOR THE BOOTSTRAP SUBMIT BAR, NEED TO FIND OUT HOW TO TAKE INPUT FROM IT
	// <footer>
	// <form className="container">
	// 	<InputGroup className="mb-3" >
	// 		<FormControl 
	// 			controlId="userInput"
	// 			onSubmit={handleSubmit}
	// 			placeholder="Recipient's username"
	// 			aria-label="Recipient's username"
	// 			aria-describedby="basic-addon2" />
	// 		<InputGroup.Append>
	// 		<Button variant="outline-secondary">Send</Button>
	// 		</InputGroup.Append>
	// 	</InputGroup>
	// </form>
	// </footer> );

	return (
		<footer>
			
			<form onSubmit={handleSubmit}>
				<input autoFocus={true} type="textbox" onChange={handleChange} value={sendBoxValue} />
			</form>
		</footer>);
}

export default ChatInput;