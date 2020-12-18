import axios from 'axios';

// we will define a bunch of API calls here.
const apiUrl = `${process.env.REACT_APP_API_URI}/profiles`;

const sleep = time =>
  new Promise(resolve => {
    setTimeout(resolve, time);
  });

const getExampleData = () => {
  return axios
    .get(`https://jsonplaceholder.typicode.com/photos?albumId=1`)
    .then(response => response.data);
};

const getAuthHeader = authState => {
  if (!authState.isAuthenticated) {
    throw new Error('Not authenticated');
  }
  return { Authorization: `Bearer ${authState.idToken}` };
};

const getDSData = (url, authState) => {
  // here's another way you can compose together your API calls.
  // Note the use of GetAuthHeader here is a little different than in the getProfileData call.
  const headers = getAuthHeader(authState);
  if (!url) {
    throw new Error('No URL provided');
  }
  return axios
    .get(url, { headers })
    .then(res => JSON.parse(res.data))
    .catch(err => err);
};

const apiAuthGet = authHeader => {
  return axios.get(apiUrl, { headers: authHeader });
};

const getProfileData = authState => {
  try {
    return apiAuthGet(getAuthHeader(authState)).then(response => response.data);
  } catch (error) {
    return new Promise(() => {
      console.log(error);
      return [];
    });
  }
};

const getTestProfileData = () => {
  try {
    return axios.get('http://localhost:3001/profile').then(res => {
      console.log('test profile data', res.data);
      return res.data;
    });
  } catch (error) {
    console.log(error);
    return [];
  }
};

// ALL TRIPS API CALLS RESIDE BELOW
const getMyTrips = () => {
  try {
    return axios.get('http://localhost:3001/myTrips').then(res => {
      // console.log('getMyTrips', res.data);
      return res.data;
    });
  } catch (error) {
    console.log('getMyTrips', error);
    return [];
  }
};

const createNewTrip = data => {
  try {
    return axios.post(`http://localhost:3001/myTrips`, data).then(res => {
      console.log('createNewTrip', res.data);
    });
  } catch (error) {
    console.log('createNewTrip', error);
    return [];
  }
};

const addToTrip = (tripId, data) => {
  try {
    return axios
      .patch(`http://localhost:3001/myTrips/${tripId}`, data)
      .then(res => {
        console.log('addToTrip', res.data);
      });
  } catch (error) {
    console.log('addToTrip', error);
    return [];
  }
};

export {
  sleep,
  getExampleData,
  getProfileData,
  getDSData,
  getTestProfileData,
  getMyTrips,
  createNewTrip,
  addToTrip,
};
