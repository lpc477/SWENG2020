import { hooks } from 'botframework-webchat-component';
import React, { useCallback, useState } from 'react';
import TextBox from "./TextBox.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import { findByLabelText } from '@testing-library/react';

const { useActivities, useSendMessage } = hooks;

function AscToolsWebChat() {
	// activities are the array of all messages to display on the screen
	// if you want to see what the activities look like, uncomment the following line,
	// build the app and open the developers options in firefox
	
	// console.log(activities);
	const [activities] = useActivities();
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
	
	console.log(activities);

	activities.filter(({ type }) => type === 'message');

	var textBoxes = activities.map(thisMessage => <TextBox 
														key={thisMessage.id}
														user={thisMessage.from.role} 
														time={thisMessage.timestamp.substring(11, 19)}
														message={thisMessage.text}/>);

	/*
	We can filter activites by their properties, this is how the default app filters them but
	we can have a look at these later and see which ones we need and don't need:
	activities
          // Currently, this sample only displays an activity of type "message"
          .filter(({ type }) => type === 'message')
          // We need to hide "postBack" message sent by the user
          .filter(({ channelData: { postBack } = {}, from: { role } }) => !(role === 'user' && postBack))
          // Normalize the activity:
          // - Every activity should have an "attachments" array, consisting of zero or more attachments:
          // - If this is a "messageBack" message, we should use the "displayText",
          //   because "text" is being submitted to bot, and "displayText" is what we use to override what the bot displays to the user.
          .map(activity => ({
            ...activity,
            attachments: activity.attachments || [],
            text: getValueOrUndefined(activity, 'channelData', 'messageBack', 'displayText') || activity.text
          }))
		  
	*/
	
	// At the moment this JS file is not displaying anything. 
	
	return(
		<div >
			<form onSubmit={handleSubmit}>
			  <input autoFocus={true} onChange={handleChange} type="textbox" value={sendBoxValue} />
			  <div style={{display:"flex", flexDirection:"column-reverse", alignItems:"flex-end"}}>
			  {textBoxes}
			  </div>
			</form>
		</div>
	)
}

export default AscToolsWebChat;