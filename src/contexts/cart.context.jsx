import { createContext, useState, useEffect } from 'react'

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  )

  if (existingCartItem) {
    return cartItems.map((item) =>
      item.id === existingCartItem.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }]
}

const decreaseCartItem = (cartItems, cartItemToDecr) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToDecr.id
  )

  if (existingCartItem.quantity === 1) {
    return cartItems.filter((item) => item.id !== cartItemToDecr.id)
  }

  return cartItems.map((item) =>
    item.id === cartItemToDecr.id
      ? { ...item, quantity: item.quantity - 1 }
      : item
  )
}
const removeCartItem = (cartItems, cartItemToRemove) =>
  cartItems.filter((item) => item.id !== cartItemToRemove.id)

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  reduceItemInCart: () => {},
  removeItemFromCart: () => {},
  cartCount: 0,
  totalValue: 0,
})

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [cartCount, setCartCount] = useState(0)
  const [totalValue, setTotalValue] = useState(0)

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    )

    setCartCount(newCartCount)
  }, [cartItems])

  useEffect(() => {
    const newTotalValue = cartItems.reduce((total, cartItem) => {
      return total + cartItem.quantity * cartItem.price
    }, 0)
    setTotalValue(newTotalValue)
  }, [cartItems])

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd))
  }

  const reduceItemInCart = (cartItemToDecr) => {
    setCartItems(decreaseCartItem(cartItems, cartItemToDecr))
  }

  const removeItemFromCart = (cartItemtoRemove) => {
    setCartItems(removeCartItem(cartItems, cartItemtoRemove))
  }

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    reduceItemInCart,
    removeItemFromCart,
    cartItems,
    cartCount,
    totalValue,
  }
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
