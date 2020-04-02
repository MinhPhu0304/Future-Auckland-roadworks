# Scheduled road works in Auckland
SPOILER alert: This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

The project is using Auckland Transport API to get all data about scheduled roadworks in Auckland then displaying it on the map.

![Gif of the product](/docs_asset/demo.gif)

To run the website locally, you will need: 

## Auckland Transport API key

- Search AT developer or go to the link [here](https://dev-portal.at.govt.nz/)
- Sign in
- Click on your profile
- You can generate the api key there

## Setting environment variable

- IN the root project folder create a file named .env
- Put your key value like the example bellow
```
REACT_APP_AT_TRANSPORT_KEY=KEY_HERE
```

## Extra dependencies
- [Ramda](https://ramdajs.com/) - Some functional programming to spice things up
- [Leaflet](https://leafletjs.com/) - an open-source JavaScript library
for mobile-friendly interactive maps
- [React-Leaflet](https://react-leaflet.js.org/) - React components for 🍃 Leaflet maps
- [Redux](https://redux.js.org/)