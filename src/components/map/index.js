import React, { useState, useContext } from 'react'
import DeckGL, { ScatterplotLayer } from 'deck.gl'
import { StaticMap } from 'react-map-gl'
import { isEmpty } from 'ramda'

import { State } from '../../App'

const MAP_BOX_TOKEN = process.env.REACT_APP_MAP_BOX_TOKEN || 'Get your own token'

export function Map () {
  const [hoveringObject, setHovering] = useState({})
  const { state } = useContext(State)
  const { locationData } = state
  
  const layer = generateDataPayload(locationData)
  const defaultLayerOptions = getDefaultLayerOption()
  const scatteredPlotLayer = new ScatterplotLayer({
    ...defaultLayerOptions,
    data: layer,
    getPosition: d => d.coordinates,
    getRadius: d => Math.sqrt(d.exits),
    getFillColor: d => [255, 140, 0],
    onHover: ({object, x, y}) => {
      if (object == null) {
        setHovering({})
      }  else {
        setHovering({
          point: object,
          pointerX: x,
          pointerY: y
        })
      }
    }
  })
  return (
    <DeckGL initialViewState={getInitialMapView()} controller={true} layers={[scatteredPlotLayer]}>
      <StaticMap mapStyle="mapbox://styles/mapbox/dark-v9"  mapboxApiAccessToken={MAP_BOX_TOKEN} />
      { !isEmpty(hoveringObject) && <Tooltip markerData={hoveringObject} pointerX={hoveringObject.pointerX} pointerY={hoveringObject.pointerY}/>}
    </DeckGL>
  )
}

function generateDataPayload (locationData) {
  if (!locationData || locationData.length == 0) return []
  if (!Array.isArray(locationData)) return []
  return locationData.map(location => {
    return {
      ...location,
      coordinates: location.geometry.coordinates, 
    }
  })
}

function getDefaultLayerOption () {
  return {
    pickable: true,
    opacity: 0.8,
    stroked: true,
    filled: true,
    autoHighlight:  true,
    radiusScale: 10,
    radiusMinPixels: 10,
    radiusMaxPixels: 1000,
    highlightColorhighlightColor: 'blue',
    lineWidthMinPixels: 1,
  }
}

function getInitialMapView () {
  return {
    longitude: 174.764049,
    latitude: -36.852096,
    zoom: 14,
  }
}

function Tooltip ({ markerData, pointerX, pointerY}) {
  return (
    <div style={{ position: 'absolute', zIndex: 1, pointerEvents: 'none', left: pointerX, top: pointerY, backgroundColor: 'white', maxWidth: '200px' }}>
      <h6>{ markerData.point.name } </h6>
      <p> { markerData.point.description }</p>
    </div>
  )
}
