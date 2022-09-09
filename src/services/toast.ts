import { toast as t } from 'react-toastify';

class ToastService {
  success(message: string) {
    t.success(message);
  }

  error(message: string) {
    t.error(message);
  }

  info(message: string) {
    t.info(message);
  }
}

const toast = new ToastService();

export default toast;
