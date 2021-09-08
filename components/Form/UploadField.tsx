import { ChangeEvent, ChangeEventHandler, useState } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button } from '../';

const useStyles = makeStyles({
  input: {
    display: 'none',
  },
});

export const UploadField = ({ onChange, progress }) => {
  const classes = useStyles();

  const handleSelect = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target?.files?.length) onChange(event.target.files[0]);
  };

  return (
    <Box>
      <label>
        <LinearProgress variant='determinate' value={progress} />
        <input className={classes.input} type='file' onChange={handleSelect} />
        <Button className='btn-choose' variant='outlined' component='span'>
          Choose Files
        </Button>
      </label>
    </Box>
  );
};
