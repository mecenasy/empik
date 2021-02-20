import { useState, useEffect, useRef } from 'react';
import useFetch from 'use-http';

export const useCheckQuantity = (pid, quantity, initCheck) => {
   const [chack, setCheck] = useState(initCheck);
   const [state, setState] = useState();
   const { post } = useFetch('http://localhost:4040');
   const pidRef = useRef(pid);

   useEffect(() => {
      const handler = setTimeout(
         async () => {
            if (!chack) {
               setCheck(true);
               return;
            }

            try {
               const response = await post('/api/product/check', { pid: pidRef.current, quantity });
               setState(response);
            } catch (error) {
               setState(error);
            }
         },
         200);

      return () => {
         clearTimeout(handler);
      };
   }, [quantity]);

   return state;
}