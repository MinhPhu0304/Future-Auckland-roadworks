import React, { useContext, useState } from 'react'
import { Map as LeafletMap, TileLayer } from 'react-leaflet'

import { Clustering } from 'utils'
import { State } from 'App'
import { Markers } from './Markers'

export const MapRef = React.createRef() // For future use

export function Map () {
  const { state } = useContext(State)
  const { locationData } = state
  const initialMapView = getInitMapView()
  const position = [initialMapView.lat, initialMapView.lng]
  const cluster = Clustering.makeCluster(locationData)
  const [location, setLocation ] = useState([])
  const handleChange = (viewPort) => {
    const bounds = MapRef.current.leafletElement.getBounds()
    const bbox = [bounds.getWest(), bounds.getSouth(), bounds.getEast(), bounds.getNorth()]
    setLocation(cluster.getClusters(bbox, viewPort.zoom))
  }

  return (
      <LeafletMap className="map" center={position} zoom={initialMapView.zoom} onViewportChanged={handleChange} ref={MapRef} >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        <Markers locationData={locationData} cluster={cluster} currentLocation={location}/> 
      </LeafletMap>
  )
}

function getInitMapView() {
  return {
    lat: -36.848461,
    lng: 174.763336,
    zoom: 10,
  }
}
