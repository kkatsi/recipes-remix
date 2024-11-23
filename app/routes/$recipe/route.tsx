import { LoaderFunctionArgs } from '@remix-run/node';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { fetchRecipe } from './service';
import { MetaFunction, useParams } from '@remix-run/react';
import { extractIdFromRecipeParameter } from '~/utils';
import BackButton from '~/assets/arrow-back.svg?react';
import NavLinkWithReactQueryPrefetcher from '~/components/NavLinkWithReactQueryPrefetcher';
import { fetchRecipes } from '../_index/service';
import { formatMeta } from './meta';

export async function loader({ params }: LoaderFunctionArgs) {
  const queryClient = new QueryClient();
  const recipeId = extractIdFromRecipeParameter(params.recipe ?? '');
  await queryClient.prefetchQuery({
    queryKey: [`recipe${recipeId}`],
    queryFn: () => fetchRecipe(Number(recipeId)),
  });

  return { dehydratedState: dehydrate(queryClient) };
}

export const meta: MetaFunction<typeof loader> = ({ data, params }) => {
  const recipeId = extractIdFromRecipeParameter(params.recipe ?? '');
  const recipeQuery = data?.dehydratedState?.queries?.find(
    (query) => query.queryKey[0] === `recipe${recipeId}`
  );
  const recipe = recipeQuery?.state?.data;
  return formatMeta(recipe);
};

export function clientLoader() {
  return null;
}

const Recipe = () => {
  const params = useParams();
  const recipeId = extractIdFromRecipeParameter(params.recipe ?? '');

  const { data: recipe, isFetching } = useQuery({
    staleTime: Infinity,
    queryKey: [`recipe${recipeId}`],
    queryFn: () => fetchRecipe(Number(recipeId)),
  });

  if (isFetching || !recipe) return <>loading...</>;

  return (
    <div className="main-background flex justify-center min-h-screen w-full p-6 sm:p-12">
      <div className="container justify-center margin-auto flex flex-col gap-4">
        <NavLinkWithReactQueryPrefetcher
          viewTransition
          to="/"
          prefetchQueryOptions={{ queryKey: ['recipes'], queryFn: fetchRecipes }}
          className="container bg-transparent outline-0 border-0 flex items-center gap-2 w-fit underline"
        >
          <BackButton className="w-6 h-6" />
          <span className="text-sm">Back to home</span>
        </NavLinkWithReactQueryPrefetcher>
        <div
          className="overflow-hidden relative border-[0.5px] border-zinc-100"
          style={{ viewTransitionName: 'recipe-image' }}
        >
          <img
            src={recipe.image}
            alt={recipe?.tags.join(',')}
            className="aspect-[1/1] sm:aspect-[3/1] w-full h-auto object-cover object-center"
          />
          <div className="absolute bg-black opacity-20 top-0 left-0 w-full h-full" />
          <h1 className="absolute w-full top-1/2 left-1/2 text-center sm:text-left sm:left-0 transform -translate-y-1/2 -translate-x-1/2 sm:translate-x-0 text-[2rem] lg:text-[4rem] font-playfair font-extrabold max-w-[80%] sm:max-w-[50%]">
            <span className="leading-snug bg-zinc-200 px-2">{recipe.name}</span>
          </h1>
        </div>
        <div className="content mt-6 flex flex-col-reverse gap-4 sm:flex-row justify-between w-full">
          <div className="instructions flex flex-col gap-4 sm:max-w-[60%]">
            <h2 className="text-xl font-semibold">Instructions</h2>
            <ol className="list-none flex flex-col gap-4" style={{ counterReset: 'item' }}>
              {recipe.instructions.map((instruction, index) => (
                <li
                  key={index}
                  className="grid justify-start before:content-[counter(item)] before:mr-2 before:inline-flex before:items-center before:justify-center before:w-8 before:h-8 before:rounded-full before:border before:border-gray-50 before:font-playfair before:font-black"
                  style={{ counterIncrement: 'item', gridTemplateColumns: 'auto auto' }}
                >
                  <span className="text-base font-light">{instruction}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="indredients">
            <div className="container border-[0.5px] border-zinc-100 backdrop-blur-md w-full bg-zinc-200 bg-opacity-50 p-4 sm:w-[250px] flex flex-col gap-3">
              <h2 className="text-xl font-semibold">Ingredients</h2>
              <div className="flex w-full justify-between">
                <div className="flex flex-col">
                  <span className="text-xs font-light">Difficulty</span>
                  <span className="font-medium text-sm">{recipe.difficulty}</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs font-light">Servings</span>
                  <span className="font-medium text-sm">{recipe.servings}</span>
                </div>
              </div>
              <hr className="h-[1px] border-0 w-full bg-gray-300" />
              <div className="flex flex-col gap-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <span key={index} className="text-sm font-light">
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recipe;
