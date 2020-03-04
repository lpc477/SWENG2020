import React from "react";
import ReactDOM from "react-dom";
import Toast from 'react-bootstrap/Toast';

function TextBox(props) {
    var thisStyle = {};
    var userName = "";
    if (props.user == "bot") {
        userName = "Asclepius.Tools";
        thisStyle = {position: 'relative', left:10};
        
    }
    else{ // if(props.user = "user") 
        userName = "You";
        // NEED TO FIX THIS, WILL NOT DISPLAY THE USERS MESSAGES CORRECTLY AS-IS
        thisStyle = {position: 'relative', right: "-80%"};
    }

    return (
        <Toast style={thisStyle}>
            <Toast.Header closeButton={false}>
                <strong className="mr-auto">{userName}</strong>
                <small>{props.time}</small>
            </Toast.Header>
            <Toast.Body>{props.message}</Toast.Body>
        </Toast>);
}

export default TextBox;