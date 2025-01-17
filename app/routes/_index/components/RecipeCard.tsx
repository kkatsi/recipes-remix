import React from 'react';
import NavLinkWithReactQueryPrefetcher from '~/components/NavLinkWithReactQueryPrefetcher';
import { Recipe } from '~/types';
import { pluralize, replaceSpacesWithHyphensAndMakeLowercase } from '~/utils';

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <NavLinkWithReactQueryPrefetcher
      className="w-[250px] sm:w-[200px] flex flex-col items-center relative"
      to={`/${replaceSpacesWithHyphensAndMakeLowercase(recipe.name)}-${recipe.id}`}
      setQueryOptions={{ queryKey: [`recipe${recipe.id}`], updater: recipe }}
      viewTransition
    >
      {({ isTransitioning }) => (
        <>
          <img
            src={recipe.image}
            alt={recipe.tags.join(',')}
            className="w-36 h-36 rounded-full shadow-3xl absolute z-10"
            style={isTransitioning ? { viewTransitionName: 'recipe-image' } : undefined}
          />
          <div className="border-[0.5px] border-zinc-100 backdrop-blur-md w-full px-4 pb-4 flex flex-1 flex-col items-center mt-[72px] bg-zinc-200 bg-opacity-50">
            <div className="flex flex-col items-center max-w-36 pt-24 gap-1">
              <span className="text-base font-medium text-center min-h-12">{recipe.name}</span>
              <span className="text-xs text-gray-400 font-medium">
                {recipe.caloriesPerServing} calories
              </span>
            </div>
            <hr className="h-[1px] border-0 bg-gray-300 w-full my-4" />
            <div className="flex w-full justify-between mt-auto">
              <div className="flex flex-col">
                <span className="text-xs text-gray-400">Time</span>
                <span className="text-xs font-medium">
                  {recipe.prepTimeMinutes + recipe.cookTimeMinutes} mins
                </span>
              </div>
              <div className="flex flex-col text-end">
                <span className="text-xs text-gray-400">Yield</span>
                <span className="text-xs font-medium">
                  {recipe.servings} {pluralize('serving', recipe.servings)}
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </NavLinkWithReactQueryPrefetcher>
  );
};

export default RecipeCard;
