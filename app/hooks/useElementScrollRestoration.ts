import { useEffect } from 'react';
import { useLocation, useNavigation } from 'react-router-dom';

function getScrollPosition(key: string) {
  const pos = window.sessionStorage.getItem(key);
  return pos ? JSON.parse(pos) : { scrollTop: 0, scrollLeft: 0 };
}

function setScrollPosition(key: string, position: { scrollTop: number; scrollLeft: number }) {
  window.sessionStorage.setItem(key, JSON.stringify(position));
}

/**
 * Given a ref to a scrolling container element, keep track of its scroll
 * position before navigation and restore it on return (e.g., back/forward nav).
 * Note that `location.key` is used in the cache key, not `location.pathname`,
 * so the same path navigated to at different points in the history stack will
 * not share the same scroll position.
 */
export function useElementScrollRestoration(container: React.RefObject<HTMLElement>) {
  const key = `scroll-position-${useLocation().key}`;
  const { state } = useNavigation();

  useEffect(() => {
    if (state === 'loading') {
      setScrollPosition(key, {
        scrollTop: container.current?.scrollTop ?? 0,
        scrollLeft: container.current?.scrollLeft ?? 0,
      });
    } else if (state === 'idle') {
      const position = getScrollPosition(key);
      container.current?.scrollTo(position.scrollLeft, position.scrollTop);
    }
  }, [key, state, container]);
}
