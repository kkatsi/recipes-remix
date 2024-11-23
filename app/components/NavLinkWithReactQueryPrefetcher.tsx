import { NavLink, NavLinkProps } from '@remix-run/react';
import { FetchQueryOptions, useQueryClient, SetDataOptions } from '@tanstack/react-query';
import React, { useRef } from 'react';
import useOnScreen from '~/hooks/useOnScreen';
import { isBrowser } from '~/utils';

type PrefetchQueryOptions = {
  prefetchQueryOptions: FetchQueryOptions;
  setQueryOptions?: never;
};

type SetQueryDataOptions = {
  prefetchQueryOptions?: never;
  setQueryOptions: {
    queryKey: FetchQueryOptions['queryKey'];
    updater: unknown;
    options?: SetDataOptions;
  };
};

type NavLinkWithReactQueryPrefetcherProps = Omit<NavLinkProps, 'prefetch'> &
  (PrefetchQueryOptions | SetQueryDataOptions);

const NavLinkWithReactQueryPrefetcher: React.FC<NavLinkWithReactQueryPrefetcherProps> = ({
  prefetchQueryOptions,
  setQueryOptions,
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
    if (prefetchQueryOptions) {
      queryClient.prefetchQuery({
        ...prefetchQueryOptions,
      });
    } else if (setQueryOptions) {
      const { queryKey, updater, options } = setQueryOptions;
      queryClient.setQueryData(queryKey, updater, options);
    }
  };

  return (
    <NavLink {...props} ref={linkRef} onMouseEnter={handlePrefetch}>
      {children}
    </NavLink>
  );
};

export default NavLinkWithReactQueryPrefetcher;
