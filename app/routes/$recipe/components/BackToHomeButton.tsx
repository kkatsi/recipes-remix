import { useNavigate } from '@remix-run/react';
import BackButton from '~/assets/arrow-back.svg?react';
import NavLinkWithReactQueryPrefetcher from '~/components/NavLinkWithReactQueryPrefetcher';
import useHasArrivedFromHome from '~/hooks/useHasArrivedFromHome';
import { fetchRecipes } from '~/routes/_index/service';

const BackToHomeButton = () => {
  const navigate = useNavigate();
  const hasArrivedFromHome = useHasArrivedFromHome();

  return hasArrivedFromHome ? (
    <button
      onClick={() => navigate(-1)}
      className="container bg-transparent outline-0 border-0 flex items-center gap-2 w-fit underline"
    >
      <BackButton className="w-6 h-6" />
      <span className="text-sm">Back to home</span>
    </button>
  ) : (
    <NavLinkWithReactQueryPrefetcher
      viewTransition
      to="/"
      prefetchQueryOptions={{ queryKey: ['recipes'], queryFn: fetchRecipes }}
      className="container bg-transparent outline-0 border-0 flex items-center gap-2 w-fit underline"
    >
      <BackButton className="w-6 h-6" />
      <span className="text-sm">Back to home</span>
    </NavLinkWithReactQueryPrefetcher>
  );
};

export default BackToHomeButton;
