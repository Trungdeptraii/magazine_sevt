import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import {stores} from './stores/stores.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <BrowserRouter>
      <Provider store={stores}>
        <App />
      </Provider>
    </BrowserRouter>
  // </React.StrictMode>,
)
