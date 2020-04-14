import React, { useCallback, useState } from 'react';
import { hooks } from 'botframework-webchat-component';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

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

    const onClickHandler = event => {
        event.preventDefault();
        const value = event.target.innerHTML;
        if(value === "Nederlands")
            sendMessage("nl");
        if(value === "Español")
            sendMessage("es");
        if(value === "English")
            sendMessage("en");
    }

	return (
		<footerInput>
				<form style={{marginLeft: "1vw"}} className="FormContainer" onSubmit={handleSubmit}>
					<textarea className="UserInput" autoFocus={true} onKeyDown={onEnterPress} onChange={handleChange} value={sendBoxValue}/>
				</form>
				<ButtonGroup style={{marginRight: "1vw"}}>
                    <Button variant="outline-secondary" onClick={handleSubmit}>Send</Button>
                    <DropdownButton as={ButtonGroup} variant="outline-secondary" alignRight title="lang" id="bg-nested-dropdown">
                        <Dropdown.Item eventKey="1" value = "en" onClick = {onClickHandler}>English</Dropdown.Item>
                        <Dropdown.Item eventKey="2" value = "es" onClick = {onClickHandler}>Español</Dropdown.Item>
                        <Dropdown.Item eventKey="3" value = "nl" onClick = {onClickHandler}>Nederlands</Dropdown.Item>
                    </DropdownButton>
                </ButtonGroup>
		</footerInput>);
}

export default ChatInput;
