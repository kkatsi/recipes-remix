import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { fetchRecipes } from './service';
import RecipeCard from './components/RecipeCard';

export async function loader() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['recipes'],
    queryFn: fetchRecipes,
  });

  return Response.json({ dehydratedState: dehydrate(queryClient) });
}

export function clientLoader() {
  return null;
}

export default function Index() {
  const { data, isFetching } = useQuery({
    staleTime: Infinity,
    queryKey: ['recipes'],
    queryFn: fetchRecipes,
  });

  if (isFetching || !data) return <>loading...</>;

  return (
    <div className="main-background flex min-h-screen items-center justify-center flex-col gap-4 py-4">
      <h1 className="font-playfair text-[3rem] sm:text-[6rem] font-extrabold text-center leading-none tracking-wide px-4">
        Simple and
        <br />
        Tasty Recipes
      </h1>
      <span className="max-w-[500px] text-center text-gray-700 text-sm px-4">
        Explore a world of delicious, easy-to-make recipes crafted to delight your taste buds. From
        wholesome meals to decadent treats, find inspiration for every occasion and share the joy of
        cooking with your loved ones. Perfect for foodies and beginners alike!
      </span>
      <div className="flex sm:flex-row w-full my-0 -mx-8 sm:overflow-x-auto mt-4">
        <div className="flex flex-col sm:flex-row space-y-8 sm:space-y-0 sm:space-x-8 w-full sm:w-auto sm:my-0 sm:mx-8 p-0 items-center sm:items-stretch pb-4">
          {data.recipes.map((recipe) => (
            <RecipeCard recipe={recipe} key={recipe.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
