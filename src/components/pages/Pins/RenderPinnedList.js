import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Card } from 'antd';
import { Navbar, Button } from '../../common';
import { addToTrip, removePin } from '../../../api';

const RenderPinnedList = props => (
  <Layout>
    <Navbar />
    {props.data.map((item, index) => (
      <Card
        title={item.destination_name}
        extra={
          <div>
            <Button buttonText="Add to trip" type="ghost" />
            <Button
              buttonText="Remove pin"
              handleClick={() => removePin(item.id)}
            />
          </div>
        }
        key={index}
      >
        <p>{item.category}</p>
        <p>{item.address}</p>
        <p>
          {item.city}, {item.state}
        </p>
      </Card>
    ))}
  </Layout>
);

export default RenderPinnedList;

// Don't forget your prop types! It will save you a lot of debugging headache as you add more features.
RenderPinnedList.propTypes = {
  data: PropTypes.arrayOf(
    // Here is an example of enforcing an object structure that we expect to receive in our props:
    PropTypes.shape({
      // Here we require an id of type number or string to prevent a "unique key prop" warning
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      destination_name: PropTypes.string,
      category: PropTypes.string,
      address: PropTypes.string,
      lat: PropTypes.number,
      lng: PropTypes.number,
      city: PropTypes.string,
      state: PropTypes.string,
    })
  ),
};
