import React, { useReducer, useEffect } from 'react'

import './App.css'
import { Map } from './components/map'
import { fetchScheduledWork } from './components/DataFetching'

export const State = React.createContext({})

function App() {
  const [state, dispatch] = useReducer(reducers, { locationData: [] })
  useEffect(() => {
    fetchScheduledWork(dispatch)
  }, [])

  return (
    <State.Provider value={{ dispatch, state }}>
      <div className="App">
        <Map state={state} />
      </div>
    </State.Provider>
  );
}

function reducers(state, payload) {
  const { action } = payload

  switch (action) {
    case 'Change':
      const { locationData } = payload
      return {
        ...state,
        locationData
      }
    default:
      return state
  }
}

export default App;
