import React, { useState } from 'react'
import DeckGL ,{ GeoJsonLayer, ScatterplotLayer } from 'deck.gl'
import { StaticMap } from 'react-map-gl'
import { isEmpty } from 'ramda'

const initialViewState = {
  longitude: 174.764049,
  latitude: -36.852096,
  zoom: 14,
};


const MAP_BOX_TOKEN = process.env.REACT_APP_MAP_BOX_TOKEN || 'Get your own token'
const defaultLayerOption = {
  pickable: true,
  opacity: 0.8,
  stroked: true,
  filled: true,
  radiusScale: 10,
  radiusMinPixels: 10,
  radiusMaxPixels: 1000,
  lineWidthMinPixels: 1,
}

export function Map({ state }) {
  const [hoveringObject, setHovering] = useState({})

  const { locationData } = state
  const layer = generateDataPayload(locationData)
  const scatteredPlotLayer = new ScatterplotLayer({
    ...defaultLayerOption,
    data: layer,
    getPosition: d => d.coordinates,
    getRadius: d => Math.sqrt(d.exits),
    getFillColor: d => [255, 140, 0],
    getLineColor: d => [0, 0, 0],
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
    <DeckGL
      initialViewState={initialViewState}
      controller={true}
      layers={[scatteredPlotLayer]}
    >
      <StaticMap 
        mapStyle="mapbox://styles/mapbox/dark-v9"
        mapboxApiAccessToken={MAP_BOX_TOKEN} />
      { !isEmpty(hoveringObject) && <Tooltip markerData={hoveringObject} pointerX={hoveringObject.pointerX} pointerY={hoveringObject.pointerY}/>}
    </DeckGL>
  );
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

function Tooltip ({ markerData, pointerX, pointerY}) {
  return (
    <div style={{ position: 'absolute', zIndex: 1, pointerEvents: 'none', left: pointerX, top: pointerY, backgroundColor: 'white', maxWidth: '200px' }}>
      <h6>{ markerData.point.name } </h6>
      <p> { markerData.point.description }</p>
    </div>
  )
}