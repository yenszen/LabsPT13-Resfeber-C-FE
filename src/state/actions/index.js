// import all of your actions into this file, and export them back out.
// This allows for the simplification of flow when importing actions into your components throughout your app.
// Actions should be focused to a single purpose.
// You can have multiple action creators per file if it makes sense to the purpose those action creators are serving.
// Declare action TYPES at the top of the file
import axios from 'axios';
import { FETCH_RESULTS } from './types';

const version = '20201010';

export const fetchResults = (location, query) => dispatch => {
  return axios
    .get(
      `https://api.foursquare.com/v2/venues/explore?near=${location}&query=${query}&client_id=${process.env.REACT_APP_FS_CLIENT_ID}&client_secret=${process.env.REACT_APP_FS_CLIENT_SECRET}&v=${version}`
    )
    .then(res => {
      dispatch({
        type: FETCH_RESULTS,
        payload: res.data.response.groups[0].items,
      });
    })
    .catch(err => console.log(err));
};
