import React, { useState, useEffect, useMemo } from 'react';
import RenderProfileForm from './RenderProfileForm';
import { useField } from 'formik';
import { Form, Input, Select, Alert } from 'antd';
import { editProfile } from '../../../api';
import { useOktaAuth } from '@okta/okta-react';

function ProfileFormContainer() {
  const { authState, authService } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);
  // eslint-disable-next-line
  const [memoAuthService] = useMemo(() => [authService], []);

  useEffect(() => {
    let isSubscribed = true;

    memoAuthService
      .getUser()
      .then(info => {
        if (isSubscribed) {
          setUserInfo(info);
        }
      })
      .catch(err => {
        isSubscribed = false;
        return setUserInfo(null);
      });
    return () => (isSubscribed = false);
  }, [memoAuthService]);

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
    const [field, meta] = useField(props);

    return (
      <FormItem>
        <label htmlFor={props.name}>{label}</label>
        <Select {...field} {...props} onChange={props.onChange}>
          <Option value="Single">Single</Option>
          <Option value="Couple">Couple</Option>
          <Option value="Family">Family</Option>
        </Select>
        {meta.touched && meta.error ? (
          <Alert message={meta.error} type="error" />
        ) : null}
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
          <Option value="Hatchback">Hatchback</Option>
          <Option value="Sedan">Sedan</Option>
          <Option value="SUV">SUV</Option>
          <Option value="Minivan">Minivan</Option>
          <Option value="Truck">Truck</Option>
          <Option value="Other">Other</Option>
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
          <Option value="Entire Place">Entire Place</Option>
          <Option value="Private Room">Private Room</Option>
          <Option value="Shared Room">Shared Room</Option>
          <Option value="Hotel Room">Hotel Room</Option>
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
        editProfile={editProfile}
        userInfo={userInfo}
        authState={authState}
      />
    </React.Fragment>
  );
}

export default ProfileFormContainer;
