import { DependencyList, EffectCallback, useEffect, useRef } from 'react';

export const useRunOnce = (effect: EffectCallback, deps?: DependencyList) => {
  const onceRef = useRef(false);

  useEffect(() => {
    if (onceRef.current) {
      return;
    }
    onceRef.current = true;
    effect();
  }, deps);
};
