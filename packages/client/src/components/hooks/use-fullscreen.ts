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

const vendorDocument = document as VendorDocument;
const vendorDocumentElement = vendorDocument.documentElement as VendorElement;

function isFullScreenElement(el?: Nullable<VendorElement>) {
  if (el) {
    return Boolean(
      vendorDocument.fullscreenElement === el ||
        vendorDocument.mozFullScreenElement === el ||
        vendorDocument.webkitFullscreenElement === el ||
        vendorDocument.msFullscreenElement === el
    );
  }

  return Boolean(
    vendorDocument.fullscreenElement ||
      vendorDocument.mozFullScreenElement ||
      vendorDocument.webkitFullscreenElement ||
      vendorDocument.msFullscreenElement ||
      vendorDocument.mozFullScreen ||
      vendorDocument.webkitIsFullScreen ||
      vendorDocument.fullScreenMode
  );
}

export const useFullScreen = (fsEl: Nullable<VendorElement>) => {
  const initialState = window ? false : isFullScreenElement(fsEl);
  const [isFullScreen, setIsFullScreen] = useState(initialState);

  const openFullScreen = () => {
    const el = fsEl || vendorDocumentElement;
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
      vendorDocument.exitFullscreen ||
      vendorDocument.webkitExitFullscreen ||
      vendorDocument.mozCancelFullScreen ||
      vendorDocument.msExitFullscreen;

    return exitFullScreen.call(document);
  };

  const handleChange = useCallback(() => {
    setIsFullScreen(isFullScreenElement(fsEl));
  }, [fsEl]);

  useEffect(() => {
    vendorDocument.addEventListener(
      'webkitfullscreenchange',
      handleChange,
      false
    );
    vendorDocument.addEventListener('mozfullscreenchange', handleChange, false);
    vendorDocument.addEventListener('msfullscreenchange', handleChange, false);
    vendorDocument.addEventListener('MSFullscreenChange', handleChange, false);
    vendorDocument.addEventListener('fullscreenchange', handleChange, false);

    return () => {
      vendorDocument.removeEventListener(
        'webkitfullscreenchange',
        handleChange,
        false
      );
      vendorDocument.removeEventListener(
        'mozfullscreenchange',
        handleChange,
        false
      );
      vendorDocument.removeEventListener(
        'msfullscreenchange',
        handleChange,
        false
      );
      vendorDocument.removeEventListener(
        'MSFullscreenChange',
        handleChange,
        false
      );
      vendorDocument.removeEventListener(
        'fullscreenchange',
        handleChange,
        false
      );
    };
  }, [fsEl, handleChange]);

  return {
    isFullScreen,
    open: openFullScreen,
    close: closeFullScreen,
    toggleFullScreen: isFullScreen ? closeFullScreen : openFullScreen,
  };
};
