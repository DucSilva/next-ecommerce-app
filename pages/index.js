import { getData } from '../utils/fetchData';
import React from 'react';
import Head from 'next/head';
import ProductItem from '../components/product/ProductItem';

const Home = (props) => {
  const [products, setProducts] = React.useState(props?.productProps)
  return (
    <div className="products">
      <Head>
        <title>Home page</title>
      </Head>
      {
        products.length === 0 ? <h2> No Products</h2>
        : products.map(product => (
          <ProductItem key={product._id} product={product} />
        ))
      }
    </div>
  )
};

export async function getServerSideProps(){
  const res = await getData('product')
  return {
    props: {
      productProps: res.products,
      result: res.result,
    },
  }
}
export default Home;