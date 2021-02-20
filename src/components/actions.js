import {
   setProducts,
   productQuantity,
} from './constants';

export const setProductAction = (products) => ({
   type: setProducts,
   products,
});

export const productQuantityAction = (pid, quantity) => ({
   type: productQuantity,
   quantity,
   pid,
});