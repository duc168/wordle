import React from 'react';
import { ToastContainer, Zoom } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const Toast: React.FC<any> = () => {
  return (
    <ToastContainer
      theme="dark"
      pauseOnFocusLoss={false}
      pauseOnHover={true}
      hideProgressBar={true}
      icon={false}
      closeButton={false}
      bodyStyle={{
        textAlign: 'center',
      }}
      position="top-center"
      newestOnTop={true}
      autoClose={1000}
      transition={Zoom}
    />
  );
};

export default Toast;
