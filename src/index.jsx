import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import Inquiry from './components/Inquiry';
import * as serviceWorker from './serviceWorker';


var url = window.location.href

/*var VConsole = require('vconsole');
var vConsole = new VConsole();
console.log('vconsole Hello world');
console.log('foo');   // black word, white bakcground
console.info('bar');  // purple word, white background
console.debug('oh');  // orange word, white background
console.warn('foo');  // orange word, yellow background
console.error('bar'); // red word, pink background
*/
if (url.match(/inquiry/)) {
    console.log("inquiry url");
    const url = "./";
    // const url = url.replace('/inquiry/', '/');
    console.log(url);
    ReactDOM.render(<Inquiry url={url} />, document.getElementById('root'));
} else {
    console.log("index url")
    ReactDOM.render(<App url={url} />, document.getElementById('root'));
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
