import React from "react";
import { renderToString } from "react-dom/server";
import { divIcon } from "leaflet";
import PropTypes from "prop-types";
import { Marker as LeafletMarker, Popup, useMap } from "react-leaflet";

export function Markers({ points }) {
  const mapInstance = useMap();
  const zoomIn = (latlng) => {
    const currentZoom = mapInstance.getZoom();
    mapInstance.setView(latlng, currentZoom + 3);
  };
  return (
    <>
      {points.map((location, index) => {
        if (location.properties.cluster) {
          return (
            <ClusterMarker location={location} key={index} zoomIn={zoomIn} />
          );
        }
        return (
          <LeafletMarker
            key={index}
            position={[
              location.geometry.coordinates[1],
              location.geometry.coordinates[0],
            ]}
          >
            <Popup autoPan={false}>
              {location.properties.location.description.replace(
                "Other (Specify Below). ",
                ""
              )}
            </Popup>
          </LeafletMarker>
        );
      })}
    </>
  );
}

Markers.propTypes = {
  points: PropTypes.array.isRequired,
};

function ClusterMarker({ location, zoomIn }) {
  const icon = divIcon({
    className: "Cluster",
    html: renderToString(<ClusterMarkerStyle location={location} />),
  });
  return (
    <LeafletMarker
      icon={icon}
      position={[
        location.geometry.coordinates[1],
        location.geometry.coordinates[0],
      ]}
      eventHandlers={{
        click: () =>
          zoomIn([
            location.geometry.coordinates[1],
            location.geometry.coordinates[0],
          ]),
      }}
    />
  );
}

function ClusterMarkerStyle({ location }) {
  const style = makeCustomCircleStyle();
  return <div style={style}>{location.properties.point_count}</div>;
}

function makeCustomCircleStyle() {
  return {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 25,
    width: 25,
    backgroundColor: "black",
    color: "white",
    borderRadius: "50%",
    border: "3px double red",
  };
}
