import Head from 'next/head';
import React from 'react';
import { DataContext } from '../store/GlobalState';
import CartItem from '../components/CartItem';
import Link from 'next/link';
import { getData } from '../utils/fetchData';

const Cart = () => {
  const { state, dispatch } = React.useContext(DataContext);
  const { cart, auth } = state;

  const [total, setTotal] = React.useState(0);

  React.useEffect(() => {
    const getTotal = () => {
      const res = cart.reduce((prev, item) => {
        return prev + (item?.price * item?.quantity)
      }, 0)
      setTotal(res);
    };

    getTotal();
  }, [cart]);

  React.useEffect(() => {
    const cartLocal = JSON.parse(localStorage.getItem('__next__cart__devmd'));
    if(cartLocal && cartLocal.length > 0){
      let newArr = [];
      const updateCart = async () => {
        for(const item of cartLocal){
          const res = await getData(`product/${item?._id}`)
          const { _id, title, images, price, inStock } = res?.product;
          if(inStock > 0) {
            newArr.push({
              _id, title, images, inStock, price, quantity: item.quantity > inStock ? 1 : item.quantity
            })
          }
        }
        dispatch({ type: 'ADD_CART', payload: newArr})
      }

      updateCart();
    }
  }, [])

  if(cart.length === 0) return <img className="img-responsive w-100" src="/empty__cart.jpg" alt="Empty product"/>
  return (
    <div className="row mx-auto">
      <div className="col-md-8 text-secondary table-responsive my-3">
        <h2 className="text-uppercase">shopping cart</h2>
        <table className="table my-3">
          <tbody>
            {cart.map(item => (
              <CartItem key={item._id} item={item} dispatch={dispatch} cart={cart}/>
            ))}
          </tbody>
        </table>
      </div>

      <div className="col-md-4 text-right text-uppercase text-secondary">
        <form>
          <h2>Shipping</h2>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            name="address"
            id="address"
            className="form-control mb-2"
          />
          <label htmlFor="mobile">Mobile</label>
          <input
            type="text"
            name="mobile"
            id="mobile"
            className="form-control mb-2"
          />
        </form>
        <h3>Total: <span className="text-info">${total}</span></h3>
        <Link href={auth?.user ? '#' : '/signin'}>
              <a className="btn btn-outline-success my-2">Process with payment</a>
        </Link>
      </div>
    </div>
  )
};

export default Cart;