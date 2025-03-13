import { useContext } from 'react'
import { CartContext } from '../../contexts/cart.context'
import {
  CheckoutContainer,
  CheckoutHeader,
  CheckoutHeaderBlock,
  Total,
} from './checkout.styles'
import CheckoutItem from '../../components/checkout-item/checkout-item.component'

const Checkout = () => {
  const { cartItems, totalValue } = useContext(CartContext)

  return (
    <CheckoutContainer>
      <CheckoutHeader>
        <CheckoutHeaderBlock>
          <span>Product</span>
        </CheckoutHeaderBlock>
        <CheckoutHeaderBlock>
          <span>Description</span>
        </CheckoutHeaderBlock>
        <CheckoutHeaderBlock>
          <span>Quantity</span>
        </CheckoutHeaderBlock>
        <CheckoutHeaderBlock>
          <span>Price</span>
        </CheckoutHeaderBlock>
        <CheckoutHeaderBlock>
          <span>Remove</span>
        </CheckoutHeaderBlock>
      </CheckoutHeader>
      {cartItems.map((cartItem) => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      ))}
      <Total>Total:${totalValue}</Total>
    </CheckoutContainer>
  )
}

export default Checkout
