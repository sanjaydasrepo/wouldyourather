import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/App'
import reducers from './reducers'
import { createStore }  from 'redux'
import { Provider } from 'react-redux';
import middlerware from './middleware'

const store = createStore( reducers, middlerware )
ReactDOM.render(
<Provider store={ store }>
    <App />
</Provider>
, document.getElementById('root'))