import { RefObject, useEffect, useMemo, useState } from 'react';
import { isBrowser } from '~/utils';

export default function useOnScreen(ref: RefObject<HTMLElement>, cb: () => void) {
  const [isIntersecting, setIntersecting] = useState(false);

  const observer = useMemo(() => {
    if (isBrowser())
      return new IntersectionObserver(([entry]) => {
        setIntersecting(entry.isIntersecting);
        if (entry.isIntersecting) cb();
      });
    return undefined;
  }, [cb]);

  useEffect(() => {
    if (!ref.current) return;
    observer?.observe(ref.current);
    return () => observer?.disconnect();
  }, [observer, ref]);

  return isIntersecting;
}
