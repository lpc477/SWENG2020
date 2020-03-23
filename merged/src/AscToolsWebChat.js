import React from 'react';

import ChatInput from "./ChatInput.js";
import MessageList from "./MessageList.js";

import 'bootstrap/dist/css/bootstrap.min.css';
import './index1.css';

import { findByLabelText } from '@testing-library/react';

function AscToolsWebChat() {
	
	return( 
		<div>
			<div className="WindowBackground">
				<MessageList/>
				<ChatInput />
			</div>
			
		</div>
	)
}

export default AscToolsWebChat;