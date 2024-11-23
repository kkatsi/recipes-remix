# Tasty Recipes Web App

Tasty Recipes is a recipe discovery web app built with Remix, React, Tailwind CSS, Express, and enhanced with the View Transition API for smooth transitions between pages. It leverages React Query for efficient data fetching, caching, and state management, providing a seamless experience for exploring delicious recipes.

You can explore the app [here](https://tasty-recipes-dzl9.onrender.com/)

## Features

- Recipe Listings: Displays a paginated list of recipes with images, descriptions, and basic information.
- Recipe Details: Show detailed information for each recipe, including ingredients, instructions, prep time, calories, and more.
- Dynamic Metadata: SEO-friendly meta tags (Open Graph, Twitter Cards) that are dynamically generated based on the recipe data.
- Efficient Data Fetching: Uses React Query to prefetch data, cache responses, and avoid redundant network requests.
- Smooth Page Transitions: Powered by the View Transition API, enabling smooth and visually appealing transitions when navigating between pages.
- Responsive Design: Fully responsive layout powered by Tailwind CSS, optimized for both desktop and mobile devices.
- Server-Side Rendering (SSR) for the initial page load and Client-Side Rendering (CSR) for smooth navigation between pages.

## Tech Stack

- Frontend: Built with React and Tailwind CSS, using Remix as the framework for handling routing, data loading, and server-side rendering.
- Backend: Express.js server for handling API routes and server-side logic.
- Data Fetching & State Management: React Query for efficient data management, including caching, background syncing, and pagination.
- View Transitions: View Transition API for smooth transitions between pages, making the user experience more dynamic and engaging.
- Meta Tags: Dynamic SEO meta tags for Open Graph and Twitter cards to enhance social media sharing and search engine discoverability.

## SSR (Server-Side Rendering) and CSR (Client-Side Rendering)
- Server-Side Rendering (SSR): When a page is first loaded, Remix fetches the necessary data on the server, renders the page, and sends it to the browser. This ensures that the initial page load is fast, SEO-friendly, and ready for search engine indexing.
- Client-Side Rendering (CSR): Once the initial page is loaded, the app takes advantage of React and React Query to handle all subsequent page navigations on the client side. This means that when a user navigates to a different page, only the necessary data is fetched, and the page updates without a full page reload, ensuring a fast and fluid experience.

This setup allows for hybrid rendering, where you get the benefits of SSR for the initial load and CSR for seamless in-app navigation.

## License

[MIT](https://choosealicense.com/licenses/mit/)
