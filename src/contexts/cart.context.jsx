import { createContext, useState, useEffect, useReducer } from 'react'

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

export const CART_ACTION_TYPES = {
  SET_CART_OPEN: 'SET_CART_OPEN',
  ADD_ITEM_TO_CART: 'ADD_ITEM_TO_CART',
  REDUCE_ITEM_FROM_CART: 'REDUCE_ITEM_FROM_CART',
  REMOVE_ITEM_FROM_CART: 'REMOVE_ITEM_FROM_CART',
}

const cartReducer = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case 'SET_CART_ITEMS':
      return {
        ...state,
        ...payload,
      }

    default:
      throw new Error(`unhandled type of ${type} in cartReducer`)
  }
}

const INITIAL_STATE = {
  isCartOpen: true,
  cartItems: [],
  cartCount: 0,
  totalValue: 0,
}

export const CartProvider = ({ children }) => {
  const [{ cartItems, isCartOpen, cartCount, totalValue }, dispatch] =
    useReducer(cartReducer, INITIAL_STATE)

  const updateCartItemsReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    )
    const newTotalValue = newCartItems.reduce((total, cartItem) => {
      return total + cartItem.quantity * cartItem.price
    }, 0)

    dispatch({
      type: 'SET_CART_ITEMS',
      payload: {
        cartItems: newCartItems,
        totalValue: newTotalValue,
        cartCount: newCartCount,
      },
    })
  }

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd)
    updateCartItemsReducer(newCartItems)
  }

  const reduceItemInCart = (cartItemToDecr) => {
    const newCartItems = decreaseCartItem(cartItems, cartItemToDecr)
    updateCartItemsReducer(newCartItems)
  }

  const removeItemFromCart = (cartItemtoRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemtoRemove)
    updateCartItemsReducer(newCartItems)
  }

  const value = {
    isCartOpen,
    setIsCartOpen: () => {},
    addItemToCart,
    reduceItemInCart,
    removeItemFromCart,
    cartItems,
    cartCount,
    totalValue,
  }
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
