import React from 'react'
import { render } from 'react-dom'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { Router, Route, browserHistory } from 'react-router'
import AppComponent from './App';
import AdminComponent from './admin/Admin';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import './theme.css';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import appReduce from './reducer'

const loggerMiddleware = createLogger()

let store = createStore(appReduce,
  applyMiddleware(thunkMiddleware,
  loggerMiddleware)
)

render(
  <Provider store={store}>
  <Router history={browserHistory}>
    <Route path="/" component={AppComponent}>
    </Route>
    <Route path="/admin" component={AdminComponent}/>
  </Router>
</Provider>
, document.getElementById('root'))
//ReactDOM.render(<App/>  ,
  //document.getElementById('root')
//);
