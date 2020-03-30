export function fetchScheduledWork (dispatch) {
  const getData = async () => {
    const res = await fetch('https://api.at.govt.nz/v2/locations/scheduledworks', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': `${process.env.REACT_APP_AT_TRANSPORT_KEY}`
      }
    })
    const data = await res.json()
    dispatch({
      action: 'Change',
      locationData: data.response
    })
  }
  getData()
  return null
}
