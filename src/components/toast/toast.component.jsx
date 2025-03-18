import { useEffect } from 'react'
import { useContext } from 'react'
import { CartContext } from '../../contexts/cart.context'
import { ToastContainer, toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

const Toast = () => {
  const { cartCount } = useContext(CartContext)
  useEffect(() => {
    if (cartCount > 0) {
      toast.info('Added to cart. Check it out!')
    }
  }, [cartCount])

  return (
    <ToastContainer
      position="top-center"
      autoClose={1000}
      hideProgressBar={true}
      theme={'dark'}
    />
  )
}

export default Toast
