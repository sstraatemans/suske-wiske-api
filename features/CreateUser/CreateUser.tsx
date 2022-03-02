import { useState, FormEvent } from 'react';
import { Button, Modal, Typography } from '@components/.';
import { TextField, Checkbox } from '@components/Form';
import { useFormControls, useUpdateUserMutation } from '@hooks/.';

const formatDate = (date: Date) => {
  console.log(11, date);
  return new Intl.DateTimeFormat('nl-NL', { dateStyle: 'full', timeStyle: 'short' }).format(
    new Date(date)
  );
};

export const CreateUser = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { formValues, handleInputEvent, handleInputValue } = useFormControls<User>();
  const { mutateData, mutateResult } = useUpdateUserMutation();
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
            {mutateResult ? (
              <>
                {mutateResult.alreadyExists ? (
                  <>
                    <Typography variant='h4'>Email bestaat al</Typography>
                    <Typography>Je code is: {mutateResult.id}</Typography>
                    <Typography>geldig tot: {formatDate(mutateResult.expireDate)}</Typography>
                    <Button>Start opnieuw</Button>
                  </>
                ) : (
                  <>
                    <Typography variant='h4'>Succes!</Typography>
                    <Typography>Je code is: {mutateResult.id}</Typography>
                    <Typography>geldig tot: {formatDate(mutateResult.expireDate)}</Typography>
                  </>
                )}
              </>
            ) : (
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
            )}
          </>
        </Modal>
      )}
      <Button onClick={handleOpen}>Ja! Ik wil data aan kunnen passen</Button>
    </>
  );
};
