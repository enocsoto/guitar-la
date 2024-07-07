const Guitar = ({ guitar, addToCart }) => {
  const { id, name, image, price, description } = guitar;

  return (
    <div className="col-md-6 col-lg-4 my-4 row align-items-center">
      <div className="col-4">
        <img className="img-fluid" src={`./img/${image}.jpg`} alt="imagen guitarra" />
      </div>
      <div className="col-8">
        <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
        <p>{description}</p>
        <p className="fw-black text-primary fs-3">{price}</p>
        <button
          type="button"
          className="btn btn-dark w-100"
          // se pasa la funcion setCart, la cualrecibe un argumento que es cart
          // pero se renombra como prevState como convencion ya que simboliza el
          // estate previo, y luego el arreglo con una copia del state previo y 
          // el nuevo objeto que se va a setear 
          onClick={() => addToCart(guitar)}
        >Agregar al Carrito</button>
      </div>
    </div>
  )
}
export default Guitar