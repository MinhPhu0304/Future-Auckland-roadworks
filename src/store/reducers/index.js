import { combineReducers } from 'redux'

import { Constructions } from './constructions'
import { PageState } from './pageState'

const rootReducer = combineReducers({ constructions: Constructions.reducer, pageState: PageState.reducer })

export {
  Constructions,
  PageState,
  rootReducer,
}
