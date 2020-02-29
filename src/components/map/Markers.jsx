import React from 'react'
import PropTypes from 'prop-types'
import { Marker as LeafletMarker, Popup, withLeaflet } from 'react-leaflet'

export const Markers = withLeaflet(MarkersDump)

function MarkersDump ({ currentLocation, leaflet, cluster }) {
  const bounds = leaflet.map.getBounds()
  const bbox = [bounds.getWest(), bounds.getSouth(), bounds.getEast(), bounds.getNorth()]

  const location = currentLocation.length === 0 ? cluster.getClusters(bbox, leaflet.map.getZoom()) : currentLocation
  return (
    <>
      {
        location.map((location, index) => (
          <LeafletMarker key={index} position={[location.geometry.coordinates[1], location.geometry.coordinates[0]]}>
            <Popup>
              {location.name}
            </Popup>
          </LeafletMarker>
      ))}
    </>
  )
}

Markers.propTypes = {
  currentLocation: PropTypes.array.isRequired,
}
