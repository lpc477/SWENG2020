import React from "react";
import ReactDOM from "react-dom";
import Toast from 'react-bootstrap/Toast';

function TextBox(props) {
    var thisStyle = {};
    var userName = "";
    if (props.user === "bot") {
        userName = "Asclepius.Tools";
        thisStyle = {alignSelf: "flex-start", flexShrink:0, minWidth:"100px", marginLeft: "1%"};
        
    }
    else{ // if(props.user = "user") 
        userName = "You";
        thisStyle = {alignSelf: "flex-end", flexShrink:0, minWidth:"100px", marginRight: "1%"};
    }

    return (
        <Toast style={thisStyle}>
            <Toast.Header closeButton={false}>
                <strong className="mr-auto">{userName}</strong>
                <small>{props.time}</small>
            </Toast.Header>
            <Toast.Body>{props.message}</Toast.Body>
        </Toast> 
    );
}

export default TextBox;
