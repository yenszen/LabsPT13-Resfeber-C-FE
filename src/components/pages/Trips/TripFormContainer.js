import React from 'react';
import RenderTripForm from './RenderTripForm';
import { useField } from 'formik';
import { Form, Input, Alert } from 'antd';
import { editTrip } from '../../../api';
import { useOktaAuth } from '@okta/okta-react';

function TripFormContainer(props) {
  const { authState } = useOktaAuth();
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

  return (
    <React.Fragment>
      <RenderTripForm
        CustomTextInput={CustomTextInput}
        authState={authState}
        editTrip={editTrip}
        tripId={props.match.params.id}
      />
    </React.Fragment>
  );
}

export default TripFormContainer;
