import React, { useReducer, useEffect } from 'react'

import 'App.css'
import { Map } from 'components/Map'
import { fetchScheduledWork } from 'components/DataFetching'

export const State = React.createContext({})

export function App() {
  const [state, dispatch] = useReducer(reducers, getInitialState())
  useEffect(() => {
    fetchScheduledWork(dispatch)
  }, [])

  return (
    <State.Provider value={{ dispatch, state }}>
      <div className="App">
        <Map />
      </div>
    </State.Provider>
  );
}

function getInitialState () {
  return {
    locationData: []
  }
}

function reducers (state, payload) {
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
