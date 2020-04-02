import { Constructions } from 'store/reducers'

function getAllConstructions () {
  return async (dispatch) => {
    const res = await fetch('https://api.at.govt.nz/v2/locations/scheduledworks', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': `${process.env.REACT_APP_AT_TRANSPORT_KEY}`
      }
    })
    const { response } = await res.json()
    dispatch(Constructions.actions.UPDATE_CONSTRUCTIONS({ constructions: response }))
  }
}

export { 
  getAllConstructions
}
