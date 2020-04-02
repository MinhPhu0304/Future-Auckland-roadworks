import { combineReducers } from 'redux'

import { Constructions } from './constructions'

const rootReducer = combineReducers({ constructions: Constructions.reducer })

export {
  Constructions,
  rootReducer,
}
