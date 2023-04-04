import { createPortal } from 'react-dom';

export const IsomorphicPortal = ({
  selector,
  children,
}: {
  selector: string;
  children: JSX.Element | JSX.Element[];
}) => {
  if (import.meta.env.SSR) return null;

  return createPortal(
    children,
    document.querySelector(selector) as HTMLElement
  );
};
