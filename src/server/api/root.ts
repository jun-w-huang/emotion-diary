import { createTRPCRouter } from "~/server/api/trpc";
import { emotionEventRouter } from "~/server/api/routers/emotionEvent";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  emotionEvent: emotionEventRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
