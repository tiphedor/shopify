import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import App from './App';
import { index } from './modules/store';

ReactDOM.render(
	<React.Suspense fallback={<div />}>
		<React.StrictMode>
			<Provider store={index}>
				<App />
			</Provider>
		</React.StrictMode>
	</React.Suspense>,
	document.getElementById('root')
);
