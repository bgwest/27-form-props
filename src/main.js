import React from 'react'; // ES6
import ReactDom from 'react-dom';
import App from './components/app/app';
import '../style/main.scss';

// !: = development notes

const rootNode = document.createElement('div');
document.body.appendChild(rootNode);
// !: this will be what starts the entire application
ReactDom.render(<App />, rootNode);
