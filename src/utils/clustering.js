import supercluster from "supercluster"

export function makeCluster (locationData) {
  const points = makePoints(locationData)
  const cluster = new supercluster({
    radius: 40,
    maxZoom:20
  })
  cluster.load(points)
  return cluster
}

function makePoints (locationData) {
  return locationData.map((location) => ({
    type: 'Feature',
    geometry : {
      type: 'Point',
      coordinates: [ location.longitude, location.latitude ]
    },
    properties: {
      location
    }
  }))
}
