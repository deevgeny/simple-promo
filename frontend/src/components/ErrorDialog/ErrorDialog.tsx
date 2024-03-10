import React, { useState } from 'react';
import { 
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';

function ErrorDialog() {
  // Дописать сервис, который будет брать аксиос ошибку парсить ее и
  // выдавать сообщение, а если это не аксиос ошибка, то тогда будет выдавать
  // то сообщение, которое передано в сервис
  const [errorMessage, setErrorMessage] = useState<any | undefined>();

  const handleClose = () => {
    setErrorMessage(undefined);
  };

  return (
    <Dialog
      open={errorMessage ? true : false}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>
        {errorMessage?.title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          {errorMessage?.text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Назад</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ErrorDialog;