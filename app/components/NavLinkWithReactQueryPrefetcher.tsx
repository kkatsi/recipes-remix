import { NavLink, NavLinkProps } from '@remix-run/react';
import { FetchQueryOptions, useQueryClient } from '@tanstack/react-query';
import React, { useRef } from 'react';
import useOnScreen from '~/hooks/useOnScreen';
import { isBrowser } from '~/utils';

interface NavLinkWithReactQueryPrefetcherProps extends Omit<NavLinkProps, 'prefetch'> {
  prefetchOptions: FetchQueryOptions;
}

const NavLinkWithReactQueryPrefetcher: React.FC<NavLinkWithReactQueryPrefetcherProps> = ({
  prefetchOptions,
  children,
  ...props
}) => {
  const isMobile = isBrowser() ? window.mobileAndTabletCheck() : undefined;

  const linkRef = useRef<HTMLAnchorElement>(null);

  useOnScreen(linkRef, () => {
    if (isMobile) handlePrefetch();
  });

  const queryClient = useQueryClient();
  const handlePrefetch = () => {
    queryClient.prefetchQuery({
      ...prefetchOptions,
    });
  };

  return (
    <NavLink {...props} ref={linkRef} onMouseEnter={handlePrefetch}>
      {children}
    </NavLink>
  );
};

export default NavLinkWithReactQueryPrefetcher;
