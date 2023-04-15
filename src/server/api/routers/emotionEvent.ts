import { Emotion, PhysicalSymptom } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const emotionEventRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const events = await ctx.prisma.emotionEvent.findMany({
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
  
  getMostCommonEmotions: privateProcedure
  .query(async ({ ctx }) => {
    const userId = ctx.userId;
    
    // Find all the user's EmotionEvents
    const events = await ctx.prisma.emotionEvent.findMany({
      where: { userId },
    });
  
    // Count the occurrences of each emotion
    const counts = events.reduce((acc, event) => {
      const emotion = event.emotion;
      acc[emotion] = acc[emotion] ? acc[emotion] + 1 : 1;
      return acc;
    }, {} as Record<Emotion, number>);
  
    // Sort the emotions by their occurrence counts
    const sortedEmotions = Object.entries(counts).sort(([, a], [, b]) => b - a);
  
    // Take the top 10 emotions with their frequencies
    const topEmotions = sortedEmotions.slice(0, 10).map(([emotion, count]) => ({ emotion, count }));

    return topEmotions;

  }),
});
