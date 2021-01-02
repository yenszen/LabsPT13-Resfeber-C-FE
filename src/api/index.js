import axios from 'axios';

// we will define a bunch of API calls here.
const profileURL = `${process.env.REACT_APP_API_URI}/profile`;
const tripsURL = `${process.env.REACT_APP_API_URI}/trips`;
const itineraryURL = `${process.env.REACT_APP_API_URI}/itinerary`;
const pinsURL = `${process.env.REACT_APP_API_URI}/pins`;
const dataURL = `${process.env.REACT_APP_API_URI}/temp_ds_api`;

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

// DS API CALLS
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

const getFuelData = stateCode => {
  try {
    return axios.get(`${dataURL}/fuel/${stateCode}`).then(res => {
      console.log('getFuelData', res.data);
      return res.data;
    });
  } catch (error) {
    console.log('getFuelData', error);
  }
};

const getDrivingDistance = coordinates => {
  try {
    const joined = coordinates.join(';');
    return axios
      .get(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${joined}?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`
      )
      .then(res => {
        console.log('getDrivingDistance', res.data);
        return res.data;
      });
  } catch (error) {
    console.log('getDrivingDistance', error);
  }
};

const apiAuthGet = (url, authHeader) => {
  return axios.get(url, { headers: authHeader });
};

const apiAuthPost = (url, data, authHeader) => {
  return axios.post(url, data, { headers: authHeader });
};

const apiAuthPut = (url, data, authHeader) => {
  return axios.put(url, data, { headers: authHeader });
};

const apiAuthPatch = (url, data, authHeader) => {
  return axios.patch(url, data, { headers: authHeader });
};

const apiAuthDelete = (url, authHeader) => {
  return axios.delete(url, { headers: authHeader });
};

// PROFILE API CALLS
const getProfileData = (userId, authState) => {
  try {
    return apiAuthGet(`${profileURL}/${userId}`, getAuthHeader(authState)).then(
      res => res.data
    );
  } catch (error) {
    return new Promise(() => {
      console.log(error);
      return [];
    });
  }
};

const editProfile = (data, authState) => {
  try {
    return apiAuthPut(profileURL, data, getAuthHeader(authState)).then(res =>
      console.log('editProfile', res.data)
    );
  } catch (error) {
    console.log('editProfile', error);
    return [];
  }
};

// TRIPS API CALLS
const getMyTrips = (userId, authState) => {
  try {
    return apiAuthGet(
      `${tripsURL}/${userId}/user`,
      getAuthHeader(authState)
    ).then(res => {
      console.log('getMyTrips', res.data);
      return res.data;
    });
  } catch (error) {
    console.log('getMyTrips', error);
    return [];
  }
};

const createNewTrip = (data, authState) => {
  try {
    return apiAuthPost(tripsURL, data, getAuthHeader(authState)).then(res =>
      console.log('createNewTrip', res.data)
    );
  } catch (error) {
    console.log('createNewTrip', error);
    return [];
  }
};

const editTrip = (tripId, data, authState) => {
  try {
    return apiAuthPatch(
      `${tripsURL}/${tripId}`,
      data,
      getAuthHeader(authState)
    ).then(res => console.log('editTrip', res.data));
  } catch (error) {
    console.log('editTrip', error);
    return [];
  }
};

const removeTrip = (tripId, authState) => {
  try {
    return apiAuthDelete(
      `${tripsURL}/${tripId}`,
      getAuthHeader(authState)
    ).then(res => console.log('removeTrip', res.data));
  } catch (error) {
    console.log('removeTrip', error);
    return [];
  }
};

// ITINERARY (locations) API CALLS
const getItinerary = (tripId, authState) => {
  try {
    return apiAuthGet(itineraryURL, getAuthHeader(authState)).then(res => {
      console.log('getItinerary', res.data);
      const relevantLocs = res.data.filter(item => item.trip_id === tripId);
      // return res.data;
      return relevantLocs;
    });
  } catch (error) {
    console.log('getItinerary', error);
    return [];
  }
};

const addToTrip = (data, authState) => {
  try {
    return apiAuthPost(itineraryURL, data, getAuthHeader(authState)).then(res =>
      console.log('addToTrip', res.data)
    );
  } catch (error) {
    console.log('addToTrip', error);
    return [];
  }
};

const removeFromTrip = (itineraryId, authState) => {
  try {
    return apiAuthDelete(
      `${itineraryURL}/${itineraryId}`,
      getAuthHeader(authState)
    ).then(res => console.log('removeFromTrip', res.data));
  } catch (error) {
    console.log('removeFromTrip', error);
    return [];
  }
};

// PINS API CALLS
const getPins = authState => {
  try {
    return apiAuthGet(pinsURL, getAuthHeader(authState)).then(res => {
      console.log('getPins', res.data);
      return res.data;
    });
  } catch (error) {
    console.log('getPins', error);
    return [];
  }
};

const addPin = (data, authState) => {
  try {
    return apiAuthPost(pinsURL, data, getAuthHeader(authState)).then(res =>
      console.log('addPin', res.data)
    );
  } catch (error) {
    console.log('addPin', error);
    return [];
  }
};

const removePin = (pinId, authState) => {
  try {
    return apiAuthDelete(
      `${pinsURL}/${pinId}`,
      getAuthHeader(authState)
    ).then(res => console.log('removePin', res.data));
  } catch (error) {
    console.log('removePin', error);
    return [];
  }
};

export {
  sleep,
  getExampleData,
  getDSData,
  getFuelData,
  getDrivingDistance,
  getProfileData,
  editProfile,
  getMyTrips,
  createNewTrip,
  editTrip,
  removeTrip,
  getItinerary,
  addToTrip,
  removeFromTrip,
  getPins,
  addPin,
  removePin,
};
