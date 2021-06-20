import { action, handle } from '@articulate/ducks'

export const PAGE_STATE = {
  LOADING: 'loading',
  LOADED: 'loaded data',
  FAILED: 'failed to load'
}

const initialState = PAGE_STATE.LOADING

const handler = {
  UPDATE_PAGE_STATE: updatePageState
}

const reducer = handle(initialState, handler)

function updatePageState(_, { newPageState }) {
  return newPageState
}

const PageState = {
  actions: {
    UPDATE_PAGE_STATE: action('UPDATE_PAGE_STATE')
  },
  reducer
}
export {
  PageState,
}
