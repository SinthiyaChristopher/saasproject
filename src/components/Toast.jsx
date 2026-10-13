import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Utility functions for triggering toasts
export const notifySuccess = (msg) => toast.success(msg, { position: "top-right" });
export const notifyError = (msg) => toast.error(msg, { position: "top-right" });
export const notifyInfo = (msg) => toast.info(msg, { position: "top-right" });

function Toast() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
  );
}

export default Toast;