import { Emotion, PhysicalSymptom } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  privateProcedure,
  // privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const emotionEventRouter = createTRPCRouter({
  getById: privateProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const events = await ctx.prisma.emotionEvent.findUnique({
        where: { id: input.id },
      });
      if (!events) throw new TRPCError({ code: "NOT_FOUND" });
      return events;
    }),

  create: privateProcedure
    .input(
      z.object({
        title: z.string().min(1, "Cannot be empty"),
        emotion: z.nativeEnum(Emotion),
        psymptom: z.nativeEnum(PhysicalSymptom),
        pobject: z.string().min(1, "Cannot be empty"),
        cause: z.string().min(1, "Cannot be empty"),
        isReflective: z.boolean(),
        start: z.date(),
        end: z.date().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.userId;

      const event = await ctx.prisma.emotionEvent.create({
        data: {
          title: input.title,
          userId,
          emotion: input.emotion,
          psymptom: input.psymptom,
          pobject: input.pobject,
          cause: input.cause,
          reflective: input.isReflective,
          start: input.start,
          end: input.end,
        },
      });
      return event;
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.emotionEvent.findMany();
  }),
});
