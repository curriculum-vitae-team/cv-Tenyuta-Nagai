import React, { useRef } from 'react';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useReactiveVar } from '@apollo/client';
import Slide from '@mui/material/Slide';
import { notificationService } from '../../../graphql/notification/notificationService';
import * as Styled from './Notifier.styles';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="standard" {...props} />;
});

export const Notifier = () => {
  const alertArray = useReactiveVar(notificationService.alertArray$);
  const containerRef = useRef(null);

  const handleClose = (id: number) => {
    return () => notificationService.closeAlert(id);
  };

  return (
    <Styled.Wrapper ref={containerRef}>
      {alertArray.map(({ id, type, message }) => (
        <>
          <Slide direction="up" in={true} container={containerRef.current}>
            <Alert key={id} onClose={handleClose(id)} severity={type} sx={{ width: '100%' }}>
              {message}
            </Alert>
          </Slide>
        </>
      ))}
    </Styled.Wrapper>
  );
};
