import { MetaDescriptor } from '@remix-run/react';
import { Recipes, Recipe } from '~/types';

export const formatMeta = (data?: Recipes): MetaDescriptor[] => {
  const defaultDescription =
    'Explore a wide variety of recipes from different cuisines and difficulty levels.';
  const title = 'Tasty Recipes | Discover and Share Amazing Recipes';

  const metaTags: MetaDescriptor[] = [
    { title },
    { name: 'description', content: defaultDescription },
    { property: 'og:title', content: title },
    { property: 'og:description', content: defaultDescription },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: 'Tasty Recipes' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: defaultDescription },
  ];

  if (data && data.recipes.length > 0) {
    const recipeNames = data.recipes.map((recipe: Recipe) => recipe.name).join(', ');

    metaTags.push({
      property: 'og:description',
      content: `Explore these amazing recipes: ${recipeNames}`,
    });
    metaTags.push({
      name: 'twitter:description',
      content: `Check out these recipes: ${recipeNames}`,
    });
  }

  return metaTags;
};
