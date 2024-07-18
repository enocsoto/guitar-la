import { useEffect, useState } from 'react'
import Guitar from './components/Guitar'
import Header from './components/Header'
import { db } from '../src/data/db'
function App() {

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

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
      />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar
              guitar={guitar}
              key={guitar.id}
              addToCart={addToCart}
            />
          ))}
        </div>
      </main>


      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
      </footer>
    </>
  )
}

export default App
