import { useEffect, useState } from 'react';

export const useWindowSize = () => {
  const isSSR = typeof window === 'undefined';

  const [windowSize, setWindowSize] = useState({
    width: isSSR ? 1440 : window.innerWidth,
    height: isSSR ? 1024 : window.innerHeight,
  });

  const changeWindowSize = () => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  };

  useEffect(() => {
    changeWindowSize();

    const devices =
      /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;

    if (!devices.test(navigator.userAgent)) {
      window.addEventListener('resize', changeWindowSize);

      return () => {
        window.removeEventListener('resize', changeWindowSize);
      };
    }
  }, []);

  return windowSize;
};
