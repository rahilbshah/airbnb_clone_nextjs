import { RefObject } from 'react';
import { useEvent } from './useEvent';

export const useOutsideClick = (
  elementId: string,
  handler: () => void,
  modalRef?: RefObject<HTMLDivElement>,
) => {
  const onClickOutside = (event: any) => {
    const element = document.querySelector(elementId);
    const targetElement = event.target;

    // Check if the clicked element is not the particular element or its descendants
    if (!element?.contains(targetElement)) {
      // If modalRef is provided, also check if the clicked target is outside modalRef
      if (
        !modalRef ||
        (modalRef.current && !modalRef.current.contains(targetElement))
      ) {
        handler(); // Call the handler if clicked outside both elementId and modalRef
      }
    }
  };

  // Listen for clicks using useEvent hook
  useEvent('mousedown', onClickOutside);
};
