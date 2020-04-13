// import React libraries
import React, { useState, useEffect } from 'react';

// import libraries from Microsoft's botframework-webchat repo
import { createDirectLine, createStore } from 'botframework-webchat';
import directLineDisconnect from 'botframework-webchat-core/lib/actions/disconnect';
import { Components } from 'botframework-webchat-component';

// import from other files in our AscTools project
import ChatInput from "./ChatInput.js";
import MessageList from "./MessageList.js";

// import from React-Boostrap
import 'bootstrap/dist/css/bootstrap.min.css';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

var secret = process.env.DIRECT_LINE_SECRET;

const initializeDirectLine = async setDirectLine => {
  const res = await fetch('https://directline.botframework.com/v3/directline/tokens/generate', 
                { method: 'POST', headers: { 'Authorization': 'Bearer iQ0RbsV7tfA.Iv9w0NYvH7OoZJxqilYyZMdbK-xLhYlco0piDalWT00' }});
  const { token } = await res.json();
  setDirectLine(createDirectLine({ token }));
};

function App() {
  // Establising connection to the bot
  const [directLine, setDirectLine] = useState();
  useEffect(() => {
    initializeDirectLine(setDirectLine);
  }, []);

  // this method is used for the New Patient button, allows us to restart the conversation
  const storeMiddleware = () => next => action => {
    if (action.type === 'DIRECT_LINE/DISCONNECT_FULFILLED') {
      setDirectLine(null);
      setStore(createStore({}, storeMiddleware));
      initializeDirectLine(setDirectLine);
    }
    return next(action)
  };

  // store is a state used by the imported 'Components' library
  const [store, setStore] = useState(createStore({}, storeMiddleware));

  const disconnect = () => store.dispatch(directLineDisconnect());

  // The following code is used for resizing the window. This was necessary in order for the
  // app to be fully responsive (as well as display correctly on mobile), as simply using vh
  // variables in the CSS files did not achieve the desired result
  let vh = window.innerHeight * 0.01;
	let vw = window.innerWidth * 0.01;
	// Then we set the value in the --vh custom property to the root of the document
	document.documentElement.style.setProperty('--vh', `${vh}px`);
	document.documentElement.style.setProperty('--vw', `${vw}px`);

	window.addEventListener('resize', () => {
		// We execute the same script as before
		let vh = window.innerHeight * 0.01;
		let vw = window.innerWidth * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
		document.documentElement.style.setProperty('--vw', `${vw}px`);
	  });

  return (
    <div className="WindowBackground">
          {!!directLine &&
            <Components.Composer directLine={directLine} store={store}>
              <div className="ChatContentContainer">
                <div className="AscToolsHeader">
                  <a href="https://asclepius.tools/" style={{marginLeft: "1vw"}}><b>Asclepius.Tools</b></a>
                    <DropdownButton as={ButtonGroup} title="Options" id="bg-nested-dropdown" style={{marginTop: "1vh", marginRight: "1vw"}}>
                        <Dropdown.Item eventKey="1" onClick={disconnect}>New Patient</Dropdown.Item>
                        <Dropdown.Item eventKey="2">Print Advice</Dropdown.Item>
                    </DropdownButton>
                </div>
                <MessageList/>
                <ChatInput />
              </div>
            </Components.Composer>
          }
    </div>
  );
}

export default App;