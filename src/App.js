import React, { useEffect } from 'react'
import { Provider } from 'react-redux'

import './App.css'
import { Map } from 'components/map'
import { LoadingIndicator } from 'components/loading'
import { store } from 'store'
import { getAllConstructions } from 'store/thunks'

export const State = React.createContext({})

export function App() {
  useEffect(() => {
    store.dispatch(getAllConstructions())
  }, [])

  return (
    <Provider store={store}>
      <LoadingIndicator />
      <div className="App">
        <Map />
      </div>
    </Provider>
  )
}
