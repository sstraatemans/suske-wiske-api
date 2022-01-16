import { useState } from 'react';
import { Button, Modal, Typography } from '@components/.';
import { TextField, Checkbox } from '@components/Form';
import { useFormControls } from '@hooks/useFormControls';

export const CreateUser = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { formValues, handleInputEvent, handleInputValue } =
    useFormControls<AuthenticateCodeUser>();
  console.log(formValues);
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <Modal open handleClose={handleClose}>
          <>
            <Typography variant='h4'>Ik wil data aanpassen</Typography>
            <Typography>
              Vul je email adres in om een authenticatie code te creeeren.
              <br />
            </Typography>
            <TextField
              label='E-mail'
              name='email'
              value={formValues?.email}
              handleInputEvent={handleInputEvent}
              required
            />
            <Checkbox
              name='termsAgreed'
              value={formValues?.termsAgreed}
              handleInputValue={handleInputValue}
              required
            >
              I agree with the terms
            </Checkbox>
            <Button>Geef me de code</Button>
          </>
        </Modal>
      )}
      <Button onClick={handleOpen}>Ja! Ik wil data aan kunnen passen</Button>
    </>
  );
};
