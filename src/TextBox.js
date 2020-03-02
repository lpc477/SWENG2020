import React from "react";
import ReactDOM from "react-dom";
import Toast from 'react-bootstrap/Toast';

function TextBox(props) {
    var thisStyle = {};
    var userName = "";
    if (props.user == "bot") {
        userName = "Asclepius.Tools";
        thisStyle = {alignSelf: "flex-start"};
    }
    else{ // if(props.user = "user") 
        userName = "You";
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