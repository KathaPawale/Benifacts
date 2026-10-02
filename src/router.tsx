import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    // Every page opens at the top (the homepage opens on the hero video); links between pages are full page loads.
    scrollRestoration: false,
    // Static hosting serves service pages from folders (/services/<slug>/), so keep whichever form was requested.
    trailingSlash: "preserve",
    defaultPreloadStaleTime: 0,
  });

  return router;
};
