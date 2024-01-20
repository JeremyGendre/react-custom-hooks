import { useEffect, useRef } from 'react';

export default function usePrevious(value: any) {
  const ref = useRef<any>();

  useEffect(() => {
    ref.current = value; // assign the value of ref to the argument
  },[value]); // will run when the value of 'value' changes
  
  return ref.current; // return the current ref value.
}