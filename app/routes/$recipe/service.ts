import { Recipe } from '~/types';
import { fetchWithErrorAndStatus } from '~/utils';

export const fetchRecipe = async (id: number) => {
  const { body, error } = await fetchWithErrorAndStatus<Recipe>(
    `https://dummyjson.com/recipes/${id}`
  );
  if (error) {
    console.log(body);
    return null;
  }
  return body;
};
