import React from 'react';
import { Link } from 'react-router-dom';
import { Button, FormInput, FormButton } from '../../common';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './Homepage.css';

function RenderHomePage(props) {
  const {
    userInfo,
    authService,
    searchResults,
    handleSubmit,
    handleQueryInput,
    handleLocationInput,
    selectedCategory,
    dropdownOptions,
    onCategorySelect,
    viewport,
    setViewport,
    selectedResult,
    setSelectedResult,
    tempMarkers,
    addMarkers,
    removeMarkers,
    mapView,
    handleMapView,
  } = props;

  return (
    <div>
      <h1>Hi {userInfo.name} Welcome to Labs Basic SPA</h1>
      <div>
        <p>
          This is an example of a common example of how we'd like for you to
          approach components.
        </p>

        <p>
          <Link to="/profile-list">Profiles Example</Link>
        </p>
        <p>
          <Link to="/example-list">Example List of Items</Link>
        </p>
        <p>
          <Link to="/datavis">Data Visualizations Example</Link>
        </p>
        <p>
          <Button
            handleClick={() => authService.logout()}
            buttonText="Logout"
          />
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <Dropdown
          options={dropdownOptions}
          onChange={onCategorySelect}
          value={selectedCategory ? selectedCategory.label : null}
          placeholder="Select a category"
        />
        <FormInput
          labelId="Search"
          name="Search"
          placeholder="Attractions, Food etc..."
          onChange={handleQueryInput}
        />
        <FormInput
          labelId="Located"
          name="Located"
          placeholder="Near..."
          onChange={handleLocationInput}
        />
        <FormButton buttonText="Search" isDisabled={false} />
      </form>

      <Button
        buttonText={mapView ? 'List View' : 'Map View'}
        handleClick={handleMapView}
      />
      <Button buttonText="Clear map markers" handleClick={removeMarkers} />

      {mapView ? (
        <ReactMapGL
          {...viewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          onViewportChange={viewport => setViewport(viewport)}
        >
          {tempMarkers.length > 0 ? (
            <React.Fragment>
              {tempMarkers.map(result => (
                <Marker
                  key={result.venue.id}
                  latitude={result.venue.location.lat}
                  longitude={result.venue.location.lng}
                >
                  <div
                    onClick={e => {
                      e.preventDefault();
                      setSelectedResult(result);
                    }}
                    className="marker"
                  >
                    <span></span>
                  </div>
                </Marker>
              ))}
            </React.Fragment>
          ) : null}

          {selectedResult ? (
            <Popup
              latitude={selectedResult.venue.location.lat}
              longitude={selectedResult.venue.location.lng}
              onClose={() => setSelectedResult(null)}
            >
              <div>
                <h4>{selectedResult.venue.name}</h4>
                <p>Category: {selectedResult.venue.categories[0].name}</p>
                <p>Address: {selectedResult.venue.location.address}</p>
              </div>
            </Popup>
          ) : null}
        </ReactMapGL>
      ) : null}

      {searchResults && !mapView ? (
        <React.Fragment>
          {searchResults.map(result => {
            return (
              <div key={result.venue.id}>
                <h4>{result.venue.name}</h4>
                <p>Category: {result.venue.categories[0].name}</p>
                <p>Address: {result.venue.location.address}</p>
                <Button
                  buttonText="Show on map"
                  handleClick={() => addMarkers(result)}
                />
              </div>
            );
          })}
        </React.Fragment>
      ) : null}
    </div>
  );
}
export default RenderHomePage;
