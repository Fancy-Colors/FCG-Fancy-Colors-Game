import patternImage from 'assets/canvas-fill-pattern.png';
import { useRef } from 'react';

export function usePatternImage() {
  const patternImageRef = useRef<HTMLImageElement | null>(null);
  // NOTE: https://react.dev/reference/react/useRef#avoiding-recreating-the-ref-contents
  if (patternImageRef.current === null) {
    patternImageRef.current = new Image();
    patternImageRef.current.src = patternImage;
  }

  return patternImageRef.current;
}
