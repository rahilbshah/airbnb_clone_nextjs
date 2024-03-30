import { useEffect } from 'react';

export const useEvent = (event: any, handler: any, passive = false) => {
  useEffect(() => {
    window.addEventListener(event, handler, passive);

    return () => {
      window.removeEventListener(event, handler, passive);
    };
  }, [handler, event, passive]);
};
