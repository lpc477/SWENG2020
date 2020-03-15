import { Components } from 'botframework-webchat-component';
import { createDirectLine } from 'botframework-webchat';
import React from 'react';

import AscToolsWebChat from "./AscToolsWebChat";

var connected = false;

async function getDirectLineToken() {
  const res = await fetch('https://webchat-mockbot.azurewebsites.net/directline/token', { method: 'POST' });
  const { token } = await res.json();

  return token;
}

function App() {
  const [directLine, setDirectLine] = React.useState();

  if (!directLine) {
    // We will load DirectLineJS asynchronously on first render.
    getDirectLineToken().then(token => setDirectLine(createDirectLine({ token })));
  }

// The following return value is just to let us know if we are connected to the MockBot
// When running the app, it should switch from "Not Connected!" to "Connected!" quickly

  return (
	<div>
		{!!directLine && (
        <Components.Composer directLine={directLine}>
          <AscToolsWebChat />
        </Components.Composer>
      )}
	</div>
  );
}

export default App;
