import { FC } from 'react';
import { createPortal } from 'react-dom';

export const IsomorphicPortal: FC<{
  selector: string;
  children: JSX.Element | JSX.Element[];
}> = ({ selector, children }) => {
  if (import.meta.env.SSR) return null;

  return createPortal(
    children,
    document.querySelector(selector) as HTMLElement
  );
};
