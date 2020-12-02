import React from 'react';
import RenderProfileForm from './RenderProfileForm';
import { useField } from 'formik';
import { Form, Input, Select, Alert } from 'antd';

function ProfileFormContainer() {
  const FormItem = Form.Item;

  const CustomTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);

    return (
      <FormItem>
        <label htmlFor={props.name}>{label}</label>
        <Input {...field} {...props} />
        {meta.touched && meta.error ? (
          <Alert message={meta.error} type="error" />
        ) : null}
      </FormItem>
    );
  };

  const CustomStatusSelect = ({ label, ...props }) => {
    const { Option } = Select;
    const [field] = useField(props);

    return (
      <FormItem>
        <label htmlFor={props.name}>{label}</label>
        <Select {...field} {...props} onChange={props.onChange}>
          <Option value="single">Single</Option>
          <Option value="couple">Couple</Option>
          <Option value="family">Family</Option>
        </Select>
      </FormItem>
    );
  };

  const CustomVehicleSelect = ({ label, ...props }) => {
    const { Option } = Select;
    const [field, meta] = useField(props);

    return (
      <FormItem>
        <label htmlFor={props.name}>{label}</label>
        <Select {...field} {...props} onChange={props.onChange}>
          <Option value="hatchback">Hatchback</Option>
          <Option value="sedan">Sedan</Option>
          <Option value="suv">SUV</Option>
          <Option value="minivan">Minivan</Option>
          <Option value="truck">Truck</Option>
          <Option value="other">Other</Option>
        </Select>
        {meta.touched && meta.error ? (
          <Alert message={meta.error} type="error" />
        ) : null}
      </FormItem>
    );
  };

  const CustomAccommodationSelect = ({ label, ...props }) => {
    const { Option } = Select;
    const [field, meta] = useField(props);

    return (
      <FormItem>
        <label htmlFor={props.id || props.name}>{label}</label>
        <Select {...field} {...props} onChange={props.onChange}>
          <Option value="entirePlace">Entire Place</Option>
          <Option value="privateRoom">Private Room</Option>
          <Option value="sharedRoom">Shared Room</Option>
          <Option value="hotelRoom">Hotel Room</Option>
        </Select>
        {meta.touched && meta.error ? (
          <Alert message={meta.error} type="error" />
        ) : null}
      </FormItem>
    );
  };

  return (
    <React.Fragment>
      <RenderProfileForm
        CustomTextInput={CustomTextInput}
        CustomStatusSelect={CustomStatusSelect}
        CustomVehicleSelect={CustomVehicleSelect}
        CustomAccommodationSelect={CustomAccommodationSelect}
      />
    </React.Fragment>
  );
}

export default ProfileFormContainer;
