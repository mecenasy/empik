import {
   setProducts,
   productQuantity,
} from './constants';

export const reducer = (state, action) => {
   switch (action.type) {
      case setProducts: {
         const newProducts = action.products.reduce(
            (accu, curr) => {
               const newAccu = {
                  ...accu,
                  [curr.pid]: { ...curr, quantity: 1 },
               };

               return newAccu;
            }, {});

         return newProducts;
      }
      case productQuantity: {
         const product = state[action.pid];

         const newProducts = {
            ...state,
            [action.pid]: {
               ...product, quantity: action.quantity
            }
         };

         return newProducts;
      }
      default:
         return state;
   }
};