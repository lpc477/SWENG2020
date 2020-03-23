import React from 'react';
import TextBox from "./TextBox.js";
import { hooks } from 'botframework-webchat-component';
import ScrollableFeed from 'react-scrollable-feed'
import Button from 'react-bootstrap/Button';

const { useActivities } = hooks;

function MessageList() {
    // activities are the array of all messages to display on the screen
    // if you want to see what the activities look like, uncomment the following line,
    // build the app and open the developers options in firefox

    const [activities] = useActivities();
    const scrolledToBottom = true;

    console.log(activities);

    // CAN IGNORE THIS FOR TIME BEING
    /*
	We can filter activites by their properties, this is how the default app filters them but
	we can have a look at these later and see which ones we need and don't need:
	activities
          // Currently, this sample only displays an activity of type "message"
          .filter(({ type }) => type === 'message')
          // We need to hide "postBack" message sent by the user
          
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

    activities.filter(({ type }) => type === 'message');

    var textBoxes = activities.map(thisMessage => <TextBox
        key={thisMessage.id}
        user={thisMessage.from.role}
        time={thisMessage.timestamp.substring(11, 19)}
        message={thisMessage.text} />);

    return (
        <ScrollableFeed forceScroll="true" className="MessageList">
            {textBoxes}
        </ScrollableFeed>
    );
}

export default MessageList;