import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Picker } from './components';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Picker />, document.getElementById('root'));
registerServiceWorker();
