import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Navbar } from '../../common';
import { Card } from 'antd';

const RenderProfileListPage = ({ data }) => {
  const history = useHistory();

  const onEditButtonClick = () => {
    history.push('/edit-form');
  };

  return (
    <div>
      <Navbar />
      <Card
        title={data.user_name}
        style={{ width: '80%', margin: '1rem auto 0' }}
        extra={
          <Button
            type="default"
            handleClick={onEditButtonClick}
            buttonText="Edit Profile"
          />
        }
      >
        <div>
          <h4>Status</h4>
          <p>{data.status}</p>
        </div>
        <div>
          <h4>Address Line 1</h4>
          <p>{data.address_1}</p>
        </div>
        <div>
          <h4>Address Line 2</h4>
          <p>{data.address_2}</p>
        </div>
        <div>
          <h4>Vehicle Type</h4>
          <p>{data.carType}</p>
        </div>
        <div>
          <h4>Budget</h4>
          <p>{data.budget}</p>
        </div>
        <div>
          <h4>Accommodation Type</h4>
          <p>{data.accommodation_type}</p>
        </div>
      </Card>
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
    accommodation_type: PropTypes.string,
  }).isRequired,
};
