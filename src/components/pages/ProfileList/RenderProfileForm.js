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
  editProfile,
  userInfo,
  authState,
}) {
  const history = useHistory();

  const onReturnToPage = () => {
    history.push('/profile');
  };

  return (
    <div className="profile-form">
      <Navbar />
      <Formik
        initialValues={{
          user_name: '',
          status: '',
          address_1: '',
          address_2: '',
          carType: '',
          budget: '',
          accommodation_type: '',
        }}
        validationSchema={Yup.object({
          user_name: Yup.string()
            .required('Name required')
            .min(3, 'Must be at least 3 characters')
            .max(15, 'Must be 15 characters or less')
            .matches(/^[A-Za-z ]+$/),
          status: Yup.string()
            .required('Status required')
            .oneOf(['Single', 'Couple', 'Family'], 'Invalid status'),
          address_1: Yup.string()
            .required('First address line required')
            .min(3, 'Must be at least 3 characters'),
          address_2: Yup.string().min(3, 'Must be at least 3 characters'),
          carType: Yup.string()
            .required('Vehicle type information required')
            .oneOf(
              ['Hatchback', 'Sedan', 'SUV', 'Minivan', 'Truck', 'Other'],
              'Invalid car type'
            ),
          budget: Yup.number()
            .required('Preferred budget information required')
            .positive()
            .integer(),
          accommodation_type: Yup.string()
            .required('Preferred accommodation information required')
            .oneOf(
              ['Entire Place', 'Private Room', 'Shared Room', 'Hotel Room'],
              'Invalid accommodation type'
            ),
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          resetForm();
          setSubmitting(false);
          editProfile({ ...values, id: userInfo.sub }, authState).then(() =>
            onReturnToPage()
          );
        }}
      >
        {props => (
          <Form style={{ width: '80%', margin: '0 auto' }}>
            <h2>Edit profile</h2>
            <CustomTextInput
              label="Name"
              name="user_name"
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
              name="budget"
              type="number"
              placeholder="1000"
            />
            <CustomAccommodationSelect
              label="Accommodation Type"
              name="accommodation_type"
              onChange={value =>
                props.setFieldValue('accommodation_type', value)
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
                handleClick={onReturnToPage}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default RenderProfileForm;
