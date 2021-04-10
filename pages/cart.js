import Head from 'next/head';
import React from 'react';
import { DataContext } from '../store/GlobalState';
import {} from '../store/Action';

const Cart = () => {
  const { state, dispatch } = React.useContext(DataContext);
  const { cart } = state;
  if(cart.length === 0) return <img className="img-responsive w-100" src="/empty__cart.jpg" alt="Empty product"/>
  return (
    <div>
      <Head>
        <title>Cart Page</title>
      </Head>
      <h1>cart</h1>
    </div>
  )
};

export default Cart;