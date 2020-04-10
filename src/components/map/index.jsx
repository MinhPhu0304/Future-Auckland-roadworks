import React, { useState, useEffect } from 'react'
import  { connect } from 'react-redux'
import { Map as LeafletMap, TileLayer } from 'react-leaflet'

import { Clustering } from 'utils'
import { Markers } from './marker'

export const MapRef = React.createRef() // For future use

export const Map = connect(mapStateToProps)(MapDump)

function mapStateToProps ({ constructions }) {
  return {
    constructions
  }
}

function MapDump ({ constructions }) {
  const initialMapView = getInitMapView()
  const position = [initialMapView.lat, initialMapView.lng]
  const [cluster, setCluster] = useState(Clustering.makeCluster(constructions))
  const [points, setPoints] = useState([])
  useEffect(() => {
    setCluster(Clustering.makeCluster(constructions))
  }, [constructions])

  useEffect(() => {
    const bounds = MapRef.current.leafletElement.getBounds()
    const bbox = [bounds.getWest(), bounds.getSouth(), bounds.getEast(), bounds.getNorth()]
    if (cluster.points.length > 0) setPoints(cluster.getClusters(bbox, initialMapView.zoom))
    // eslint-disable-next-line   
  }, [cluster])
  const handleChange = (viewPort) => {
    const bounds = MapRef.current.leafletElement.getBounds()
    const bbox = [bounds.getWest(), bounds.getSouth(), bounds.getEast(), bounds.getNorth()]
    setPoints(cluster.getClusters(bbox, viewPort.zoom))
  }

  return (
      <LeafletMap className="map" center={position} zoom={initialMapView.zoom} onViewportChanged={handleChange} ref={MapRef} >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        <Markers points={points}/> 
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
