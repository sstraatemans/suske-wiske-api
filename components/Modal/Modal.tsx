import { FC } from 'react';
import ModalMUI, { ModalProps } from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from './Fade';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

type Props = ModalProps & {
  open: boolean;
  handleClose: () => void;
};

export const Modal: FC<Props> = ({ children, open, handleClose }) => {
  const classes = useStyles();

  return (
    <ModalMUI
      aria-labelledby='spring-modal-title'
      aria-describedby='spring-modal-description'
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <>
        <Fade in={open}>
          <div className={classes.paper}>{children}</div>
        </Fade>
      </>
    </ModalMUI>
  );
};
