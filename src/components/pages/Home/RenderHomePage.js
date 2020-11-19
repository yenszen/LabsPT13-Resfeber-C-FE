import React from 'react';
import { Link } from 'react-router-dom';
import { Button, FormInput, FormButton } from '../../common';

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
    onLocationSelect,
    selectedCategory,
    dropdownOptions,
    onCategorySelect,
  } = props;

  return (
    <div>
      <h1>hi sara welcome to labs basic spa</h1>
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

      {searchResults ? (
        <React.Fragment>
          {searchResults.map(result => {
            const coordinates = {};
            coordinates['lat'] = result.venue.location.lat;
            coordinates['lng'] = result.venue.location.lng;

            return (
              <div
                key={result.venue.id}
                onClick={() => onLocationSelect(coordinates)}
              >
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
