import React, { useContext } from 'react'
import { Map as LeafletMap, Popup, Marker, TileLayer } from 'react-leaflet'

import { State } from '../../App'

export function Map () {
  const { state } = useContext(State)
  const { locationData } = state
  const initialMapView = getInitMapView()
  const position = [initialMapView.lat, initialMapView.lng]
  return (
    <div style={{ height: 575, width: 500 }}>
      <LeafletMap center={position} zoom={initialMapView.zoom} style={{ height: 575, width: 500 }}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        {
          locationData.map((location) => (
            <Marker position={[location.latitude, location.longitude]}>
              <Popup>
                {location.name}
              </Popup>
            </Marker>
          ))
        }
      </LeafletMap>
    </div>
  )
}

function getInitMapView() {
  return {
    lat: -36.848461,
    lng: 174.763336,
    zoom: 10,
  }
}
