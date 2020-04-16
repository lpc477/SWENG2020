// import React libraries
import React, { useState, useEffect } from 'react';

// import libraries from Microsoft's botframework-webchat repo
import { createDirectLine, createStore } from 'botframework-webchat';
import directLineDisconnect from 'botframework-webchat-core/lib/actions/disconnect';
import { Components } from 'botframework-webchat-component';

// import from other files in our AscTools project
import ChatInput from "./ChatInput.js";
import {MessageList} from "./MessageList.js";
import './chat.css';

// import from React-Boostrap
import 'bootstrap/dist/css/bootstrap.min.css';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import {a} from './MessageList';
import jsPDF from 'jspdf';
import logo from '../WEB_CHAT/image/icon-128x128.png';
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

// THIS METHOD IS USED FOR PRINTING OUT THE LIFESTYLE ADVICE FROM THE CHATBOT
    const printer = event => {      
//------------------------------extracting just advice messages-----------------------------------//
var arr = new Array();
var loop1 = 0;
for(var i = a[0].length-1; i >= 0; i--){
  if(a[0][i].hasOwnProperty('text')){
    if(a[0][i].text.includes('Confidence score : ')){
      if(a[0][i-1].hasOwnProperty('text')){
        arr[loop1] = a[0][i-1].text;
        loop1++;
      }
      else {
        arr[loop1] = a[0][i-1].attachments[0].content.title;
        loop1++;
      }
    }
  }
} 
var doc = new jsPDF('p', 'mm', "a4");
var options = {
  pagesplit: true
};
//------------------------------extracting just advice messages ends-----------------------------------//
//------------------------------initial doc set up-----------------------------------//
doc.setFont('courier')
doc.setFontType('normal')

//------------------------------initial doc set up end-----------------------------------//
//------------------------------printing advice-----------------------------------//
    var y = new String();
    var loop2 = 1;
    for(var loop1 = arr.length-1; loop1 >= 0; loop1--){
      doc.text(65, 23, 'Lifestyle Advice Report',)
      doc.text(90, 35, 'Page ' + loop2)
      doc.addImage(logo, 'png', 20, 20, 20, 20); 
      doc.addImage(logo, 'png', 170, 20, 20, 20);  
      doc.text('The text', doc.internal.pageSize.width, 50, null, null, 'left');
      doc.text(17,50, "Advice : ");
      doc.text(17,60, doc.splitTextToSize(arr[loop1]), {maxWidth: 165, align: "justify"})
      if(loop1 != 0)doc = doc.addPage();
      loop2++;
    }
         doc.save('LifesytleAdvice.pdf')
  }

  //------------------------------printing advice end-----------------------------------//


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
    
  // Normally I would have put this in another .js file in this folder, but this requires
  // some methods and objects that are in this App.js file that would make for harder-to-read
  // and maintain code if I were to pass objects and methods back and forth between the files.
  function AscHeader () {
    return (
      <div className="AscToolsHeader">
        <homepageLink><a href="https://asclepius.tools/" style={{marginLeft: "1vw"}}><b>Asclepius.Tools</b></a></homepageLink>
          <DropdownButton as={ButtonGroup} title="Options" id="bg-nested-dropdown" style={{marginTop: "1vh", marginRight: "1vw"}}>
            <Dropdown.Item eventKey="1" onClick={disconnect}>New Patient</Dropdown.Item>
            <Dropdown.Item eventKey="2" onClick={printer}>Print Advice</Dropdown.Item>
          </DropdownButton>
      </div>
    );
  }

  return (
    <div className="WindowBackground">
          {!!directLine &&
            <Components.Composer directLine={directLine} store={store}>
              <div className="ChatContentContainer">
                <AscHeader />
                <MessageList/>
                <ChatInput />
              </div>
            </Components.Composer>
          }
    </div>
  );
}

export default App;