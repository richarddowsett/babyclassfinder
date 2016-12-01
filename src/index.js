import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'
import App from './App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
//import 'bootstrap/dist/css/bootstrap-theme.css';
import './theme.css';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import appReduce from './reducer'

let store = createStore(appReduce)

render((
  <Provider store={store}>
  <Router history={browserHistory}>
    <Route path="/" component={App}>
    </Route>
  </Router>
  </Provider>
), document.getElementById('root'))
//ReactDOM.render(<App/>  ,
  //document.getElementById('root')
//);
