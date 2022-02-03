import { toast } from 'react-toastify';

export const notify = (message, autoclose, type) => {
  (type === 'success'
    ? toast.success
    : type === 'error'
    ? toast.error
    : type === 'info' && toast.info)(message, {
    position: 'top-right',
    autoClose: autoclose || 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};
