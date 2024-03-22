import React from 'react';
import useErrorContext from '../../hooks/useErrorContext';
import { 
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';

/**
 * Error dialog component to display error to user.
 * @returns 
 */
function ErrorDialog() {
  const { error, setError } = useErrorContext();

  const handleClose = () => {
    setError(undefined);
  };

  return (
    <Dialog
      open={error ? true : false}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>
        {error?.errorTitle}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          {error?.errorText}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Назад</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ErrorDialog;