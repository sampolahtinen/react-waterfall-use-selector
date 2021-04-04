/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState, useRef } from 'react';
import { getState, subscribe, unsubscribe } from './store/index';

type SelectorFunction = (state: any) => any

export function useSelector(selectorFn: SelectorFunction) {
    const [currentStore, setCurrentStore] = useState(getState())
    const [nextSelectedStateValue, setNextSelectedStateValue] = useState(selectorFn ? selectorFn(currentStore) : undefined)
    
    const prevSelectedState = useRef();
    const prevSelector = useRef(state => state);
    const prevStore = useRef();

    useEffect(() => {
      if (selectorFn !== prevSelector.current) {
        console.log('different selectors')
        setNextSelectedStateValue(selectorFn(getState()))
      }

      const handleSubscription = () => {
        console.log('sub called')
        const nextState = getState()
        if (selectorFn) {
          const nextStateValue = selectorFn(nextState)
          console.log(nextStateValue)
          console.log(nextSelectedStateValue)
          // console.log('NEXT STATE VALUE FROM SUBS: ', nextStateValue)
          if (nextStateValue !== nextSelectedStateValue) {
            // console.log('setting new selected value:', nextStateValue)
            setNextSelectedStateValue(nextStateValue)
          }
        }
      }
      subscribe(handleSubscription, currentStore)
      
      return () => {
        unsubscribe(handleSubscription, currentStore)
      }
    }, [nextSelectedStateValue, currentStore, selectorFn]);

      /** After logic, store the values from this round to the refs */
      useEffect(() => {
        prevSelector.current = selectorFn;
        prevStore.current = getState();
        prevSelectedState.current = nextSelectedStateValue;
      })

    return nextSelectedStateValue;
}