import React, { useEffect } from 'react'
import { Provider } from 'react-redux'

import './App.css'
import { Map } from './components/Map'
import { store } from 'store'
import { getAllConstructions } from 'store/thunks'

export const State = React.createContext({})

export function App() {
  useEffect(() => {
    store.dispatch(getAllConstructions())
  }, [])

  return (
    <Provider store={store}>
      <div className="App">
        <Map />
      </div>
    </Provider>
  )
}
