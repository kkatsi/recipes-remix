import { MetaDescriptor } from '@remix-run/react';
import { Recipe } from '~/types';

export const formatMeta = (data?: Recipe): MetaDescriptor[] => {
  const defaultDescription = 'This recipe does not exist.';

  console.log(data);

  if (!data) {
    return [
      { title: 'Recipe Not Found' },
      { name: 'description', content: defaultDescription },
      { property: 'og:description', content: defaultDescription },
      { name: 'twitter:description', content: defaultDescription },
    ];
  }

  const description = `Discover how to make ${data.name}, a delicious ${
    data.cuisine
  } dish. This ${data.difficulty.toLowerCase()} recipe serves ${data.servings} and takes ${
    data.prepTimeMinutes + data.cookTimeMinutes
  } minutes to prepare.`;

  return [
    { title: `${data.name} | Tasty Recipes` },
    { name: 'description', content: description },
    { property: 'og:type', content: 'article' },
    { property: 'og:title', content: data.name },
    { property: 'og:description', content: description },
    { property: 'og:image', content: data.image },
    { property: 'og:image:alt', content: `Image of ${data.name}` },
    { property: 'og:site_name', content: 'Tasty Recipes' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: data.name },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: data.image },
  ];
};
