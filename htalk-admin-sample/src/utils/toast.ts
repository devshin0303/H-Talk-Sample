import {toast, ToastOptions} from 'react-toastify'

const toastImpl = (
  type: 'default' | 'info' | 'error' | 'success' | 'warning',
  message: string,
  options?: ToastOptions
) => {
  toast(message, {
    type,
    hideProgressBar: true,
    autoClose: 5000,
    position: 'top-right',
    ...options,
  })
}

export const toaster = {
  show(message: string, options?: ToastOptions) {
    toastImpl('default', message, options)
  },
  info(message: string, options?: ToastOptions) {
    toastImpl('info', message, options)
  },
  error(message: string, options?: ToastOptions) {
    toastImpl('error', message, options)
  },
  success(message: string, options?: ToastOptions) {
    toastImpl('success', message, options)
  },
  warn(message: string, options?: ToastOptions) {
    toastImpl('warning', message, options)
  },
}
