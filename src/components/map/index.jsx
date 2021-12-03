import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { MapContainer, TileLayer, useMapEvents, useMap } from "react-leaflet";

import { Clustering } from "utils";
import { Markers } from "./marker";

export const Map = connect(mapStateToProps)(MapDump);

function mapStateToProps({ constructions }) {
  return {
    constructions,
  };
}

function MapDump({ constructions }) {
  const initialMapView = getInitMapView();
  const position = [initialMapView.lat, initialMapView.lng];

  return (
    <MapContainer
      className="map"
      center={position}
      zoom={initialMapView.zoom}
      zoomAnimation={true}
    >
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      <ConstructionPoints constructions={constructions} />
    </MapContainer>
  );
}

function ConstructionPoints({ constructions }) {
  const initialMapView = getInitMapView();
  const mapInstance = useMap();
  const [cluster, setCluster] = useState(Clustering.makeCluster(constructions));
  const [points, setPoints] = useState([]);

  useEffect(() => {
    setCluster(Clustering.makeCluster(constructions));
  }, [constructions]);

  useEffect(() => {
    const bounds = mapInstance.getBounds();
    const bbox = [
      bounds.getWest(),
      bounds.getSouth(),
      bounds.getEast(),
      bounds.getNorth(),
    ];
    if (cluster.points.length > 0)
      setTimeout(
        () => setPoints(cluster.getClusters(bbox, initialMapView.zoom)),
        10
      );
    // eslint-disable-next-line
  }, [cluster]);

  const handleMapMove = (e) => {
    const bounds = mapInstance.getBounds();
    const bbox = [
      bounds.getWest(),
      bounds.getSouth(),
      bounds.getEast(),
      bounds.getNorth(),
    ];
    setPoints(cluster.getClusters(bbox, e.target._zoom));
  };

  useMapEvents({
    move: handleMapMove,
  });

  return (
    <>
      <Markers points={points} />
    </>
  );
}

function getInitMapView() {
  return {
    lat: -36.848461,
    lng: 174.763336,
    zoom: 10,
  };
}
