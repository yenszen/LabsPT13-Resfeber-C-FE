import React from 'react';
import { Link } from 'react-router-dom';
import { Button, FormInput, FormButton } from '../../common';
import ReactMapGL from 'react-map-gl';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

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

      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={viewport => setViewport(viewport)}
      ></ReactMapGL>

      {searchResults ? (
        <React.Fragment>
          {searchResults.map(result => {
            return (
              <div key={result.venue.id}>
                <h4>{result.venue.name}</h4>
                <p>Category: {result.venue.categories[0].name}</p>
                <p>Address: {result.venue.location.address}</p>
              </div>
            );
          })}
        </React.Fragment>
      ) : (
        <React.Fragment></React.Fragment>
      )}
    </div>
  );
}
export default RenderHomePage;
