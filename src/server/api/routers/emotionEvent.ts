import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const emotionEventRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.emotionEvent.findMany();
  }),
});
