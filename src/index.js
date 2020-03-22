import React from 'react';
import ReactDOM from 'react-dom';
import { Employee } from './components';
import { Provider } from 'react-redux';
import store from './reducers/store';

ReactDOM.render(
	<Provider store={store}>
		<Employee />
	</Provider>,
	document.getElementById('root')
);
