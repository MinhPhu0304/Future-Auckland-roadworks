import React, { useReducer } from 'react'

import './App.css'
import { Map } from './components/map'
import { FetchScheduledWork } from './components/DataFetching'

export const State = React.createContext(null)

function App() {
  const [state, dispatch] = useReducer(reducers, {})
return (
    <State.Provider value={{dispatch, state}}>
      <div className="App">
        <Map state={state}/>
        <FetchScheduledWork />
      </div>
    </State.Provider>
  );
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

export default App;
