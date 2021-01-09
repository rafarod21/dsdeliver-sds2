import { useEffect, useState } from 'react';

import ProductsList from './ProductsList';
import StepsHeader from './StepsHeader';
import OrderLacation from './OrderLacation';

import { fetchProducts } from '../api';

import { OrderLocationData, Product } from './types';

import './styles.css';

function Orders() {
  const [products, setProducts] = useState<Product[]>([]);
  const [orderLocation, setOrderLocation] = useState<OrderLocationData>();

  useEffect(() => {
    fetchProducts()
      .then(response => setProducts(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="orders-container">
      <StepsHeader />
      <ProductsList products={products} />
      <OrderLacation onChangeLocation={location => setOrderLocation(location)} />
    </div>
  );
}

export default Orders;