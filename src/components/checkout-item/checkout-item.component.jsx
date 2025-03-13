import {
  Arrow,
  BaseSpan,
  CheckoutItemContainer,
  ImageContainer,
  Quantity,
  RemoveButton,
  Value,
} from './checkout-item.styles'
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
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <BaseSpan>{name}</BaseSpan>
      <Quantity>
        <Arrow onClick={decreaseItemHandler}>&#10094;</Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={increaseItemHandler}>&#10095;</Arrow>
      </Quantity>
      <BaseSpan>{price}</BaseSpan>
      <RemoveButton onClick={removeItemHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  )
}

export default CheckoutItem
