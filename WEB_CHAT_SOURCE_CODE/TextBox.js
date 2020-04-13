import React from "react";
import Toast from 'react-bootstrap/Toast';
import Button from 'react-bootstrap/Button';
import { hooks } from 'botframework-webchat-component';
const { useSendMessageBack } = hooks;

function TextBox(props) {
    var thisStyle = {};
    var userName = "";
    var text = props.message.text;
    const sourceOfMessage = props.message.from.role;
    const time = props.message.timestamp.substring(11, 19);
    if (sourceOfMessage === "bot") {
        userName = "Asclepius.Tools";
        thisStyle = {alignSelf: "flex-start", flexShrink:0, minWidth:"100px", marginLeft: "1vw", whiteSpace: "pre-line"};
        
    }
    else{ // if(sourceOfMessage = "user") 
        userName = "You";
        thisStyle = {alignSelf: "flex-end", flexShrink:0, minWidth:"100px", marginRight: "1vw"};
    }
    const sendMessageBack = useSendMessageBack();

    // This is boolean that checks if the message object passed has attachments at all
    const shouldIncludeButtonPrompts = (props.message.hasOwnProperty("attachments")) && !!props.message.attachments;
    
    // This method will extract the innerHTML from a prompt button that was pressed, and will send it
    // The most important parameter here going forward will be the first parameter, which is just a 
    // fake object at the moment, but it will allow us to send objects of any type to the bot 
    const sendPromptReply = event => {
        event.preventDefault();
        sendMessageBack({object:33, test:22}, event.target.innerHTML, event.target.innerHTML);
    }

    // This will make a list of buttons to display, but only if the above shouldIncludeButtonPrompts is true
    var i = 0;
    const promptsButtonList = (shouldIncludeButtonPrompts) ? 
                            props.message.attachments[0].content.buttons.map(thisButton => 
                                <Button key={i++} onClick={sendPromptReply} variant="outline-secondary" block>{thisButton.text}</Button>) 
                            : null;

    return (
        <Toast style={thisStyle}>
            <Toast.Header closeButton={false}>
                <strong className="mr-auto">{userName}</strong>
                <small>{time}</small>
            </Toast.Header>
            <Toast.Body>{text}</Toast.Body>
            {promptsButtonList}
        </Toast> 
    );
}

export default TextBox;
