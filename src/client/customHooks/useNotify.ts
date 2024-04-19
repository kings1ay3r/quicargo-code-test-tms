import { toast } from 'react-toastify'

const useToast = () => {
  const showToast = (message, type = 'info') => {
    const options = {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    }

    switch (type) {
      case 'info':
        toast.info(message, options)
        break
      case 'success':
        toast.success(message, options)
        break
      case 'warning':
        toast.warn(message, options)
        break
      case 'error':
        toast.error(message, options)
        break
      default:
        toast(message, options)
        break
    }
  }

  return showToast
}

export default useToast
