import React, { useEffect, useState, useContext } from 'react';
import { useCheckQuantity } from './useCheckQuantity';
import { AppContext } from '../App/AppContext';
import './Count.css';

const Count = ({ min, max, pid, isBlocked }) => {
   const { setProductQuantity } = useContext(AppContext);

   const [count, setCount] = useState(1);
   const [tempCount, setTempCount] = useState(1);

   const check = useCheckQuantity(pid, tempCount);

   useEffect(() => {
      if (check) {
         if (check.success) {
            setCount(tempCount);
            setProductQuantity(pid, tempCount);
         } else {
            setCount(min);
            setTempCount(min);
            setProductQuantity(pid, min);
         }
      }
   }, [check]);

   const increment = () => {
      if (count >= min && count < max) {
         setTempCount((prev) => ++prev);
      }

   };

   const decrement = () => {
      if (count > min && count <= max) {
         setTempCount((prev) => --prev);
      }
   };

   return (
      <div className="countContainer">
         <div className="buttonContainer">
            <button
               className="button"
               disabled={isBlocked}
               onClick={decrement}
            >
               -
            </button>
            <button
               className="button"
               disabled={isBlocked}
               onClick={increment}
            >
               +
            </button>
         </div>
         <p className="countText">Obecnie masz {count} sztuk produktu</p>
      </div>
   )
}

export default Count;
