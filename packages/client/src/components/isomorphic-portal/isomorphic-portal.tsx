import { FC, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export const IsomorphicPortal: FC<{
  selector: string;
  children: JSX.Element | JSX.Element[];
}> = ({ selector, children }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return createPortal(
    children,
    document.querySelector(selector) as HTMLElement
  );
};
