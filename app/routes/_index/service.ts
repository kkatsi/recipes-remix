import { Recipes } from '~/types';
import { fetchWithErrorAndStatus } from '~/utils';

export const fetchRecipes = async () => {
  const { body, error } = await fetchWithErrorAndStatus<Recipes>('https://dummyjson.com/recipes');
  if (error) {
    console.log(body);
    return null;
  }
  return body;
};
