import React from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import Dropdown from 'react-dropdown';
import { FormInput, FormButton } from '../../common';
import { Layout, Button } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

function MapPage(props) {
  const {
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
    <Layout className="home-map">
      <form onSubmit={handleSubmit}>
        <section>
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
        </section>
        <FormInput
          labelId=""
          name="Located"
          placeholder="WHERE TO?"
          onChange={handleLocationInput}
        />
        <Button className="explore-button" isDisabled={false}>
          Explore!
        </Button>
      </form>

      <Button handleClick={handleMapView}>
        {mapView ? 'List View' : 'Map View'}
      </Button>
      <Button handleClick={removeMarkers}>Clear map markers</Button>

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
    </Layout>
  );
}

export default MapPage;
