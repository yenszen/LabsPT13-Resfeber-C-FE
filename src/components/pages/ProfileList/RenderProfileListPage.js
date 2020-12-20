import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Navbar } from '../../common';

const RenderProfileListPage = ({ data }) => {
  const history = useHistory();

  const onEditButtonClick = () => {
    history.push('/edit-form');
  };

  return (
    <div>
      <Navbar />
      <Button
        type="default"
        handleClick={onEditButtonClick}
        buttonText="Edit Profile"
      />
      <div>
        <h2>{data.user_name}</h2>
        <p>{data.status}</p>
        <p>{data.address_1}</p>
        <p>{data.address_2}</p>
        <p>{data.carType}</p>
        <p>{data.budget}</p>
        <p>{data.accommodationType}</p>
      </div>
    </div>
  );
};

export default RenderProfileListPage;

// Don't forget your prop types! It will save you a lot of debugging headache as you add more features.
RenderProfileListPage.propTypes = {
  // Here is an example of enforcing an object structure that we expect to receive in our props:
  data: PropTypes.shape({
    // Here we require an id of type number or string to prevent a "unique key prop" warning
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    user_name: PropTypes.string,
    status: PropTypes.string,
    address_1: PropTypes.string,
    address_2: PropTypes.string,
    carType: PropTypes.string,
    budget: PropTypes.number,
    accommodationType: PropTypes.string,
  }).isRequired,
};
