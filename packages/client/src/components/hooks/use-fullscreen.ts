import { useState, useEffect, useCallback } from 'react';

interface VendorDocument extends Document {
  mozFullScreenElement?: Nullable<Element>;
  webkitFullscreenElement?: Nullable<Element>;
  msFullscreenElement?: Nullable<Element>;
  mozFullScreen?: boolean;
  webkitIsFullScreen?: boolean;
  fullScreenMode?: boolean;
  webkitExitFullscreen?: () => void;
  mozCancelFullScreen?: () => void;
  msExitFullscreen?: () => void;
}

interface VendorElement extends HTMLElement {
  webkitRequestFullScreen?: () => void;
  mozRequestFullScreen?: () => void;
  msRequestFullscreen?: () => void;
}

const d = document as VendorDocument;
const dEl = d.documentElement as VendorElement;

function isFullScreenElement(el?: Nullable<VendorElement>) {
  if (el) {
    return Boolean(
      d.fullscreenElement === el ||
        d.mozFullScreenElement === el ||
        d.webkitFullscreenElement === el ||
        d.msFullscreenElement === el
    );
  }

  return Boolean(
    d.fullscreenElement ||
      d.mozFullScreenElement ||
      d.webkitFullscreenElement ||
      d.msFullscreenElement ||
      d.mozFullScreen ||
      d.webkitIsFullScreen ||
      d.fullScreenMode
  );
}

export const useFullScreen = (fsEl: Nullable<VendorElement>) => {
  const initialState = window ? false : isFullScreenElement(fsEl);
  const [isFullScreen, setIsFullScreen] = useState(initialState);

  const openFullScreen = () => {
    const el = fsEl || dEl;
    if (!el) return;

    const requestFullscreen =
      el.requestFullscreen ||
      el.webkitRequestFullScreen ||
      el.mozRequestFullScreen ||
      el.msRequestFullscreen;

    return requestFullscreen.call(el);
  };

  const closeFullScreen = () => {
    const exitFullScreen =
      d.exitFullscreen ||
      d.webkitExitFullscreen ||
      d.mozCancelFullScreen ||
      d.msExitFullscreen;

    return exitFullScreen.call(document);
  };

  const handleChange = useCallback(() => {
    setIsFullScreen(isFullScreenElement(fsEl));
  }, [fsEl]);

  useEffect(() => {
    d.addEventListener('webkitfullscreenchange', handleChange, false);
    d.addEventListener('mozfullscreenchange', handleChange, false);
    d.addEventListener('msfullscreenchange', handleChange, false);
    d.addEventListener('MSFullscreenChange', handleChange, false);
    d.addEventListener('fullscreenchange', handleChange, false);

    return () => {
      d.removeEventListener('webkitfullscreenchange', handleChange);
      d.removeEventListener('mozfullscreenchange', handleChange);
      d.removeEventListener('msfullscreenchange', handleChange);
      d.removeEventListener('MSFullscreenChange', handleChange);
      d.removeEventListener('fullscreenchange', handleChange);
    };
  }, [fsEl, handleChange]);

  return {
    isFullScreen,
    open: openFullScreen,
    close: closeFullScreen,
    toggleFullScreen: isFullScreen ? closeFullScreen : openFullScreen,
  };
};
