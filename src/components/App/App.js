import React, { useEffect, useState, useReducer } from 'react';
import './App.css';
import useFetch from 'use-http';
import Item from '../Item/Item';
import { reducer } from '../reducer';
import { setProductAction, productQuantityAction } from '../actions';
import { AppContext } from './AppContext';
import { priceFormat } from '../helper';

const App = () => {
   const { get, loading, error } = useFetch('http://localhost:4040');

   const [state, dispatch] = useReducer(reducer, {});
   const [productList, setProductList] = useState([]);

   const [sum, setSum] = useState(0);

   const currentSum = Object.values(state)
   .reduce((accu, { quantity, price }) => {
      const value = (quantity * Number.parseFloat(price)) + accu;
      return value;
   }, 0).toFixed(2);
   
   useEffect(async () => {
      const fetchedProducts = await get('/api/cart');

      const list = fetchedProducts.map((product) => product.pid);

      dispatch(setProductAction(fetchedProducts));

      setProductList(list);
   }, []);

   useEffect(() => {
      setSum(currentSum);
   }, [currentSum]);

   const setProductQuantity = (pid, quantity) => {
      dispatch(productQuantityAction(pid, quantity));
   };

   return (
      <div className="container">
         <h3>Lista produktów</h3>
         {loading && (
            <p>Pobieram produkty</p>
         )}
         {error
            ? <p>Przepraszamy coś poszło nie tak</p>
            : (
               <AppContext.Provider
                  value={{ setProductQuantity }}
               >
                  <ul>
                     {
                        productList.map((pid) => {
                           return (<Item key={pid} {...state[pid]} />)
                        })
                     }
                  </ul>
               </AppContext.Provider>
            )}
         {Boolean(sum) && <p className='sum'>suma: {priceFormat(sum.toString())}</p>}
      </div >
   );
};

export {
   App
};
