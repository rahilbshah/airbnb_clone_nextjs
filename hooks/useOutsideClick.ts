import { useEvent } from './useEvent';

export const useOutsideClick = (elementId: string, handler: any) => {
  const onClickOutside = (event: any) => {
    const element = document.querySelector(elementId);
    const targetElement = event.target;

    // Check if the clicked element is not the particular element or its descendants
    if (!element?.contains(targetElement)) {
      // User clicked outside of the particular element
      if (handler) handler();
    }
  };
  useEvent('click', onClickOutside);
};
