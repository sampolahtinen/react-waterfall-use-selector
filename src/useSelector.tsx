/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState, useRef } from 'react';
import { getState, subscribe, unsubscribe } from './store/index';

type SelectorFunction = (state: any) => any

export function useSelector(selectorFn: SelectorFunction) {
    const [currentStore] = useState(getState())
    const [nextSelectedStateValue, setNextSelectedStateValue] = useState(selectorFn ? selectorFn(currentStore) : undefined)
    
    const latestSelectedState = useRef();
    const latestSelector = useRef(state => state);
    const latestStore = useRef();

    /** After logic, store the values from this round to the refs */
    useEffect(() => {
      latestSelector.current = selectorFn;
      latestStore.current = getState();
      latestSelectedState.current = selectorFn(getState());
    })

    useEffect(() => {
      if (selectorFn !== latestSelector.current || latestSelectedState.current !== nextSelectedStateValue) {
        console.log('different selectors')
        setNextSelectedStateValue(latestSelectedState.current)
      }

      const handleSubscription = () => {
        console.log('sub called')
        const nextState = getState()
        if (selectorFn) {
          const nextStateValue = selectorFn(nextState)
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

    return nextSelectedStateValue;
}