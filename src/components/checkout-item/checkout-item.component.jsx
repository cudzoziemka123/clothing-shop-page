import './checkout-item.styles.scss'
import { useContext } from 'react'
import { CartContext } from '../../contexts/cart.context'
const CheckoutItem = ({ cartItem }) => {
  const { name, imageUrl, quantity, price } = cartItem
  const { addItemToCart, reduceItemInCart, removeItemFromCart } =
    useContext(CartContext)

  const removeItemHandler = () => {
    removeItemFromCart(cartItem)
  }
  const increaseItemHandler = () => {
    addItemToCart(cartItem)
  }
  const decreaseItemHandler = () => {
    reduceItemInCart(cartItem)
  }
  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={decreaseItemHandler}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>

        <div className="arrow" onClick={increaseItemHandler}>
          &#10095;
        </div>
      </span>
      <span className="price">{price}</span>
      <div className="remove-button" onClick={removeItemHandler}>
        &#10005;
      </div>
    </div>
  )
}

export default CheckoutItem
