import React from 'react'
import { connect } from 'react-redux'
import { renderToString } from 'react-dom/server'
import { divIcon } from 'leaflet'
import PropTypes from 'prop-types'
import { Marker as LeafletMarker, Popup, withLeaflet } from 'react-leaflet'

export const Markers = connect(mapStateToProps)(withLeaflet(MarkersDump))

function mapStateToProps ({ constructions }) {
  return {
    constructions
  }
}

function MarkersDump ({ constructions, leaflet, cluster }) {
  const bounds = leaflet.map.getBounds()
  const bbox = [bounds.getWest(), bounds.getSouth(), bounds.getEast(), bounds.getNorth()]

  const location = constructions.length !== 0 ? cluster.getClusters(bbox, leaflet.map.getZoom()) : constructions
  const zoomIn = (latlng) => {
    const currentZoom = leaflet.map.getZoom()
    leaflet.map.setView(latlng, currentZoom + 3)
  }
  return (
    <>
      {
        location.map((location, index) => {
          if (location.properties.cluster) return (<ClusterMarker location={location} key={index} zoomIn={zoomIn} />)
          return (
            <LeafletMarker key={index} position={[location.geometry.coordinates[1], location.geometry.coordinates[0]]}>
              <Popup>
                {location.properties.location.type}
              </Popup>
            </LeafletMarker>
          )
        })}
    </>
  )
}

Markers.propTypes = {
  currentLocation: PropTypes.array.isRequired,
}

function ClusterMarker ({ location, zoomIn }) {
  const icon = divIcon({
    className: 'Cluster',
    html: renderToString(<ClusterMarkerStyle location={location} />)
  })
  return (
    <LeafletMarker icon={icon} position={[location.geometry.coordinates[1], location.geometry.coordinates[0]]} onClick={() => zoomIn([location.geometry.coordinates[1], location.geometry.coordinates[0]])} >
    </LeafletMarker>
  )
}

function ClusterMarkerStyle ({ location }) {
  const style = makeCustomCircleStyle()
  return (
    <div style={style}>
      {location.properties.point_count}
    </div>
  )
}

function makeCustomCircleStyle () {
  return {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 25,
    width: 25,
    backgroundColor: 'black',
    color: 'white',
    borderRadius: '50%',
    border: '3px double red'
  }
}