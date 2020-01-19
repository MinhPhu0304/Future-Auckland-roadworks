# Scheduled road works in Auckland
SPOILER alert: This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

The project is using Auckland Transport API to get all data about scheduled roadworks in Auckland then displaying it on the map. That is the first iteration of it.

To run the website locally, you will 2 api keys: 

## Auckland Transport API key

- Search AT developer or go to the link [here](https://dev-portal.at.govt.nz/)
- Sign in
- Click on your profile
- You can generate the api key there

## Mapbox API key
- Google mapbox or go to [mapbox.com](https://www.mapbox.com/)
- Follow the sign up process to get the api key

## Setting environment variable

- IN the root project folder create a file named .env
- Put your key value like the example bellow
```
REACT_APP_MAP_BOX_TOKEN=KEY_HERE
REACT_APP_AT_TRANSPORT_KEY=KEY_HERE
```

## Extra dependencies
- Deck.gl
- [react-map-gl](https://uber.github.io/react-map-gl/#/) - because I am lazy to write my own map components
- [Ramda](https://ramdajs.com/) - Some functional programming to spice things up