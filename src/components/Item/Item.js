import React from 'react';
import Count from '../Count/Count';
import './Item.css';
import { priceFormat } from '../helper';

const Item = ({ pid, name, price, max, min, isBlocked }) => {
   const formattedPrice = priceFormat(price);

   return (
      <li key={pid} className="row">
         <div className="product">
            <span className="name">{name}</span>
            {' '}
            <span className="price">{formattedPrice}</span>
         </div>
         <Count max={max} min={min} isBlocked={isBlocked} pid={pid} />
      </li>
   )
}

export default Item;
