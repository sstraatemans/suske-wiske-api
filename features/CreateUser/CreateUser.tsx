import { useState, FormEvent } from 'react';
import { Button, Modal, Typography } from '@components/.';
import { TextField, Checkbox } from '@components/Form';
import { useFormControls, useUpdateUserMutation } from '@hooks/.';

export const CreateUser = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { formValues, handleInputEvent, handleInputValue } = useFormControls<User>();
  const { mutateData, mutateResult } = useUpdateUserMutation();

  console.log(formValues);
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formValues) return;

    await mutateData({ ...formValues });
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
            <Button onClick={handleSubmit}>Geef me de code</Button>
          </>
        </Modal>
      )}
      <Button onClick={handleOpen}>Ja! Ik wil data aan kunnen passen</Button>
    </>
  );
};
