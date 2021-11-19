import React from 'react';
import ReactDOM from 'react-dom';

//import App from './app/App';
import { AppNew } from './app/AppNew';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<AppNew />, document.getElementById('root'));

serviceWorker.unregister();
