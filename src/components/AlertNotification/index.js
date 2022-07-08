import { toast } from 'react-toastify';

export const AlertNotification = ({
  message,
  position = 'top-center',
  autoClose = 5000,
  hideProgressBar = false,
  closeOnClick = true,
  pauseOnHover = true,
  draggable = false,
  ...rest
}) =>
  toast(message, {
    ...rest,
    progress: undefined,
    position,
    autoClose,
    hideProgressBar,
    closeOnClick,
    pauseOnHover,
    draggable,
  });
