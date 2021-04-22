import React, { useState } from 'react';
import {
  Modal, ModalVariant,
  Button,
  Form, FormGroup, TextInput, ActionGroup
} from '@patternfly/react-core';
import { useAppSelector, useAppDispatch } from '@app/store/hooks';
import { selectNotifications, create } from '@app/store/features/notification/notificationSlice';

export function CreateUserModal(props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const notifications = useAppSelector(selectNotifications); //// needed?
  const dispatch = useAppDispatch();

  const handleFirstNameChanged = firstName => {
    setFirstName(firstName);
  };

  const handleLastNameChanged = lastName => {
    setLastName(lastName);
  };

  const handleEmailChanged = email => {
    setEmail(email);
  };

  const getUniqueId = () => (new Date().getTime());

  const handleCreateUser = () => {
    console.log("creating", firstName, lastName, email) ////
    props.onToggle();

    dispatch(create({ title: `Creating user ${firstName} ${lastName}`, type: 'info', id: getUniqueId() }));
  }

  return (

    <Modal
      variant={ModalVariant.small}
      title="Create user"
      isOpen={props.isOpen}
      onClose={props.onToggle}
    // actions={[
    //   <Button key="confirm" variant="primary" onClick={this.props.onToggle}>
    //     Confirm
    //     </Button>,
    //   <Button key="cancel" variant="link" onClick={this.props.onToggle}>
    //     Cancel
    //     </Button>
    // ]}
    >
      <Form>
        <FormGroup
          label="First name"
          isRequired
          fieldId="simple-form-name-01"
        >
          <TextInput
            isRequired
            type="text"
            id="simple-form-name-01"
            name="simple-form-name-01"
            aria-describedby="simple-form-name-01-helper"
            value={firstName}
            onChange={handleFirstNameChanged}
          />
        </FormGroup>
        <FormGroup label="Last name" isRequired fieldId="simple-form-number-01">
          <TextInput
            isRequired
            type="text"
            id="simple-form-number-01"
            name="simple-form-number-01"
            value={lastName}
            onChange={handleLastNameChanged}
          />
        </FormGroup>
        <FormGroup label="Email" isRequired fieldId="simple-form-email-01">
          <TextInput
            isRequired
            type="email"
            placeholder="user@example.com"
            id="simple-form-email-01"
            name="simple-form-email-01"
            value={email}
            onChange={handleEmailChanged}
          />
        </FormGroup>
        <ActionGroup>
          <Button variant="primary" onClick={handleCreateUser}>Create user</Button>
          <Button variant="link" onClick={props.onToggle}>Cancel</Button>
        </ActionGroup>
      </Form>
    </Modal>
  );
}
