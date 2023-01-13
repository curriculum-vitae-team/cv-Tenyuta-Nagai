import React, { useEffect, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Slide, { SlideProps } from '@mui/material/Slide';
import { useReactiveVar } from '@apollo/client';
import { notificationService } from '../../../graphql/notification/notificationService';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="standard" {...props} />;
});

type TransitionProps = Omit<SlideProps, 'direction'>;

function Transition(props: TransitionProps) {
  return <Slide {...props} direction="up" />;
}

export const Notifier = () => {
  const open = useReactiveVar(notificationService.isOpen$);
  const type = useReactiveVar(notificationService.type$);
  const message = useReactiveVar(notificationService.message$);
  const [transition, setTransition] = useState<React.ComponentType<TransitionProps> | undefined>(
    undefined
  );

  useEffect(() => {
    if (open) {
      setTransition(() => Transition);
    }
  }, [open]);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    notificationService.closeAlert();
  };

  return (
    <>
      <Snackbar
        open={open}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        autoHideDuration={3000}
        onClose={handleClose}
        TransitionComponent={transition}
      >
        <Alert onClose={handleClose} severity={type as 'success' | 'error'} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};
