
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductCart from './ProductCart';
import '../../scss/components/Cart/_Cart.scss';
import { emptyDb, totalPrice } from '../../redux/cartReducer/cartActions';
import { Button } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { reset } from '../../redux/iconReducer/iconActions';
import swal from "sweetalert"

function Cart() {
  const products = useSelector((state) => state.cartReducer.cart);
  const history = useHistory()
  const total = useSelector((state) => state.cartReducer.total);
  const dispatch = useDispatch();
  const [validation, setValidation] = useState(true)


  useEffect(() => {
    dispatch(totalPrice());
  }, [dispatch]);

  const handleClick = () => {
    dispatch(emptyDb());
    dispatch(totalPrice());
    dispatch(reset())
  };

  const handleNext = () => {
    if(!validation) {
     swal("Aviso!", "Ingrese un valor valido", "warning");
    }else {
      history.push({
        pathname: "/user/cart/order",
      })
    }
  }

  return (
    <div className="cart-container">
      <h1>Carrito ({products.length})</h1>
      <div className="cart">
        {products ? (
          products?.map((product) => (
            <ProductCart setValidation={setValidation} product={product} key={product.id} />
          ))
        ) : (
          <h1>No hay elementos en el carrito</h1>
        )}
      </div>
      <div className="deleteAll">
        {products.length !== 0 ? (
          <Button onClick={handleClick}>Eliminar todo</Button>
        ) : (
          ''
        )}
      </div>
      <hr />

      <div className="total">
        {total ? <h2>Total ${total}</h2> : ''}
        {products.length ? (
            <Button onClick={handleNext}>Continuar Compra</Button>
        ) : (
          <div>
          <div >¿Aún no llenas tu carrito? ¡Anímate a hacerlo!</div>
          <Link className="link-redirect" to="/catalog">
            <Button>Regresar al catálogo</Button>
          </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
