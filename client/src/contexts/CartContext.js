import { useState, createContext, useEffect, useContext } from 'react'

const CartContext = createContext()
const defaultCart = JSON.parse(localStorage.getItem('cart')) || []
const CartProvider = ({ children }) => {
  const [items, setItems] = useState(defaultCart)

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items))
  }, [items])

  const addToCart = (data, findCartItem) => {
    if (!findCartItem) {
      return setItems((prevState) => [data, ...prevState])
    }
    const filtered = items.filter((item) => item._id !== findCartItem._id)
    setItems(filtered)
  }

  const removeFromCart = (data) => {
    const filtered = items.filter((item) => item._id !== data._id)
    setItems(filtered)
  }

  const values = {
    items,
    setItems,
    addToCart,
    removeFromCart,
  }

  return <CartContext.Provider value={values}>{children}</CartContext.Provider>
}

const useCart = () => useContext(CartContext)

export { CartProvider, useCart }
