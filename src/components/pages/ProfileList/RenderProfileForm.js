import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { FormButton, Button, Navbar } from '../../common';
import { useHistory } from 'react-router-dom';

function RenderProfileForm({
  CustomTextInput,
  CustomStatusSelect,
  CustomVehicleSelect,
  CustomAccommodationSelect,
}) {
  const history = useHistory();

  const onCancelClick = () => {
    history.push('/profile-list');
  };

  return (
    <div className="profile-form">
      <Navbar />
      <Formik
        initialValues={{
          name: '',
          status: '',
          address_1: '',
          address_2: '',
          carType: '',
          preferredBudget: '',
          accommodationType: '',
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .required('Name required')
            .min(3, 'Must be at least 3 characters')
            .max(15, 'Must be 15 characters or less')
            .matches(/^[A-Za-z ]+$/),
          status: Yup.string()
            .required('Status required')
            .oneOf(['single', 'couple', 'family'], 'Invalid status'),
          address_1: Yup.string()
            .required('First address line required')
            .min(3, 'Must be at least 3 characters'),
          address_2: Yup.string().min(3, 'Must be at least 3 characters'),
          carType: Yup.string()
            .required('Vehicle type information required')
            .oneOf(
              ['hatchback', 'sedan', 'suv', 'minivan', 'truck', 'other'],
              'Invalid car type'
            ),
          preferredBudget: Yup.number()
            .required('Preferred budget information required')
            .positive()
            .integer(),
          accommodationType: Yup.string()
            .required('Preferred accommodation information required')
            .oneOf(
              ['entirePlace', 'privateRoom', 'sharedRoom', 'hotelRoom'],
              'Invalid accommodation type'
            ),
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            resetForm();
            setSubmitting(false);
          }, 2000);
        }}
      >
        {props => (
          <Form style={{ width: '80%', margin: '0 auto' }}>
            <h2>Edit profile</h2>
            <CustomTextInput
              label="Name"
              name="name"
              type="text"
              placeholder="John Doe"
            />
            <CustomStatusSelect
              label="Status"
              name="status"
              onChange={value => props.setFieldValue('status', value)}
            />
            <CustomTextInput
              label="Address line 1"
              name="address_1"
              type="text"
              placeholder="Faircliff Ave"
            />
            <CustomTextInput
              label="Address line 2"
              name="address_2"
              type="text"
              placeholder="Louisville"
            />
            <CustomVehicleSelect
              label="Vehicle Type"
              name="carType"
              onChange={value => props.setFieldValue('carType', value)}
            />
            <CustomTextInput
              label="Preferred Budget"
              name="preferredBudget"
              type="number"
              placeholder="1000"
            />
            <CustomAccommodationSelect
              label="Accommodation Type"
              name="accommodationType"
              onChange={value =>
                props.setFieldValue('accommodationType', value)
              }
            />
            <div
              style={{
                padding: '0 2rem',
                display: 'flex',
                justifyContent: 'space-around',
              }}
            >
              <FormButton
                type="primary"
                htmlType="submit"
                buttonText={props.isSubmitting ? 'Submitting...' : 'Submit'}
              />
              <Button
                type="danger"
                buttonText="Cancel"
                handleClick={onCancelClick}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default RenderProfileForm;
