import { useQueryClient } from '@tanstack/react-query';

const useHasArrivedFromHome = () => {
  const queryClient = useQueryClient();

  const hasRecipesQueryData = !!queryClient.getQueryData(['recipes']);

  return hasRecipesQueryData;
};

export default useHasArrivedFromHome;
