// import all of your reducers into this file, and export them back out.
// This allows for the simplification of flow when importing reducers into your actions throughout your app.

export const reducers = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_SEARCH_RESULTS':
      return { ...state, searchResults: action.payload };
    case 'FETCH_CATEGORY_RESULTS':
      return { ...state, searchResults: action.payload };
    default:
      return state;
  }
};
