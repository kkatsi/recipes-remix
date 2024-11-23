import { Link, LinkProps } from '@remix-run/react';
import { FetchQueryOptions, useQueryClient } from '@tanstack/react-query';
import React, { useRef } from 'react';
import useOnScreen from '~/hooks/useOnScreen';
import { isBrowser } from '~/utils';

interface LinkWithReactQueryPrefetcherProps extends Omit<LinkProps, 'prefetch'> {
  prefetchOptions: FetchQueryOptions;
}

const LinkWithReactQueryPrefetcher: React.FC<LinkWithReactQueryPrefetcherProps> = ({
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
    <Link {...props} ref={linkRef} onMouseEnter={handlePrefetch}>
      {children}
    </Link>
  );
};

export default LinkWithReactQueryPrefetcher;
