import { action, handle } from '@articulate/ducks'

const initialState = []

const handler = {
  UPDATE_CONSTRUCTIONS: updateConstruction
}

const reducer = handle(initialState, handler)

function updateConstruction (state, { constructions }) {
  return [
    ...state,
    ...constructions
  ]
}

const Constructions = { 
  actions: {
    UPDATE_CONSTRUCTIONS: action('UPDATE_CONSTRUCTIONS')
  },
  reducer
}
export {
  Constructions,
}
