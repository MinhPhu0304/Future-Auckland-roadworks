import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = process.env.MAP_BOX_TOKEN || 'GET YOUR OWN TOKEN YOU LAZY'
const map = new mapboxgl.Map({
container: 'YOUR_CONTAINER_ELEMENT_ID',
style: 'mapbox://styles/mapbox/streets-v11'
});

