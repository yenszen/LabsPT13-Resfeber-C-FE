import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { FormButton, Button, Navbar } from '../../common';
import { useHistory } from 'react-router-dom';

function RenderTripForm({ tripId, CustomTextInput, editTrip, authState }) {
  const history = useHistory();

  const onReturnToPage = () => {
    history.push(`/itinerary/${parseInt(tripId)}`);
  };

  return (
    <div>
      <Navbar />
      <Formik
        initialValues={{ tripname: '', start_date: '', end_date: '' }}
        validationSchema={Yup.object({
          tripname: Yup.string()
            .required('Trip Name required')
            .min(3, 'Must be at least 3 characters')
            .max(35, 'Must be 35 characters or less')
            .matches(
              /^[A-Za-z ]+$/,
              'Only spaces, upper and lowercases allowed'
            ),
          start_date: Yup.string()
            .required('Start date required')
            .matches(
              /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/,
              'Please enter in dd/mm/yyyy format'
            ),
          end_date: Yup.string()
            .required('End date required')
            .matches(
              /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/,
              'Please enter in dd/mm/yyyy format'
            ),
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          resetForm();
          setSubmitting(false);
          editTrip(tripId, values, authState).then(() => onReturnToPage());
        }}
      >
        {props => (
          <Form>
            <h2>Edit Trip</h2>
            <CustomTextInput
              label="Trip Name"
              name="tripname"
              type="text"
              placeholder="My New Trip"
            />
            <CustomTextInput
              label="Start Date"
              name="start_date"
              type="text"
              placeholder="dd/mm/yyyy"
            />
            <CustomTextInput
              label="End Date"
              name="end_date"
              type="text"
              placeholder="dd/mm/yyyy"
            />
            <div>
              <FormButton
                type="primary"
                htmlType="submit"
                buttonText={props.isSubmitting ? 'Submitting...' : 'Submit'}
              />
              <Button
                type="danger"
                buttonText="Cancel"
                handleClick={onReturnToPage}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default RenderTripForm;
