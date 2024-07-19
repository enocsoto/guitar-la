import { useEffect, useMemo, useState } from "react";
import { db } from '../data/db';

const useCart = () => {

  const initialCart = () => {
    const localStorageCart = localStorage.getItem('cart');
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  }

  const [data, setData] = useState(db)
  const [cart, setCart] = useState(initialCart)//desde que se declara el state ya conoce la variable que se va a setear

  const MAX_ITEMS = 5;
  const MIN_ITEMS = 1;
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (item) => {
    const itemExists = cart.findIndex(guitar => guitar.id === item.id)
    if (itemExists >= 0) {
      console.count('La guitarra ya se encuentra en el carrito.')
      const updatedCart = [...cart];
      updatedCart[itemExists].quantity++
      setCart(updatedCart)
    } else {
      console.log('La guitarra ha sido agregada al carrito.')
      item.quantity = 1//agregando propiedad antes de setear el state
      //agregando el item al carrito
      setCart([...cart, item])
    }
  }

  const removeFromCart = (itemId) => {
    //remove en dos lineas
    // const updatedCart = cart.filter(guitar => guitar.id !== itemId)
    // setCart(updatedCart)

    //remove en una sola linea utilizando el prevState
    setCart(prevState => prevState.filter(guitar => guitar.id !== itemId))
  }

  function increaseQuantity(id) {
    const updatedCart = cart.map(item => {
      if (item.id === id && item.quantity < MAX_ITEMS) {
        return { ...item, quantity: item.quantity + 1 }
      }
      return item;
    })
    setCart(updatedCart)
  }

  function decreaseQuantity(id) {
    const updatedCart = cart.map(item => {
      if (item.id === id && item.quantity > MIN_ITEMS) {
        return { ...item, quantity: item.quantity - 1 }
      }
      return item;
    })
    setCart(updatedCart)
  }

  function clearCart() {
    setCart([])
  }

  //state Derivado depende del state del cart
  //useMemo es un hook enfocado al performance
  // se ejecuta solamente cuando el state cambie, y recibe un arreglo de dependencias como segundo argumento
  const isEmpty = useMemo(() => cart.length === 0, [cart]);
  const totalCart = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart]);


  return {
    data,
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    isEmpty,
    totalCart
  }
}

export default useCart;