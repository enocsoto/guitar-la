import { useState } from 'react'
import Guitar from './components/Guitar'
import Header from './components/Header'
import { db } from '../src/data/db'
function App() {
  const [data, setData] = useState(db)
  const [cart, setCart] = useState([])//desde que se declara el state ya conoce la variable que se va a setear

  const addToCart = (item) => {
    const itemExists = cart.findIndex(guitar => guitar.id === item.id)
    if (itemExists >= 0) {
      alert('La guitarra ya se encuentra en el carrito.')
      const updatedCart = [...cart];
      updatedCart[itemExists].quantity++
    } else {
      alert('La guitarra ha sido agregada al carrito.')
      item.quantity = 1//agregando propiedad antes de setear el state
      //agregando el item al carrito
      setCart([...cart, item])
    }
  }

  return (
    <>
      <Header
        cart={cart}
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
