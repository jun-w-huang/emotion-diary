import type { Emotion, PhysicalSymptom } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { CreateEmotionSchema } from "~/components/RHF/CreateEmotionRHF";

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
      CreateEmotionSchema
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

  getMostCommonPSymptoms: privateProcedure
  .query(async ({ ctx }) => {
    const userId = ctx.userId;
    
    // Find all the user's EmotionEvents
    const events = await ctx.prisma.emotionEvent.findMany({
      where: { userId },
    });
  
    // Count the occurrences of each emotion
    const counts = events.reduce((acc, event) => {
      const psymptom = event.psymptom;
      acc[psymptom] = acc[psymptom] ? acc[psymptom] + 1 : 1;
      return acc;
    }, {} as Record<PhysicalSymptom, number>);
  
    // Sort the emotions by their occurrence counts
    const sortedPsymptoms = Object.entries(counts).sort(([, a], [, b]) => b - a);
  
    // Take the top 10 emotions with their frequencies
    const topPsymptoms = sortedPsymptoms.slice(0, 10).map(([psymptom, count]) => ({ psymptom, count }));

    return topPsymptoms;
  }),

  getAreReflective: privateProcedure
  .query(async ({ ctx }) => {
    const userId = ctx.userId;

    const events = await ctx.prisma.emotionEvent.findMany({
      where: { userId },
    });
    let reflectiveTrueCount = 0;
    let reflectiveFalseCount = 0;
    events.map((event) => {
      if (event.reflective) {
        reflectiveTrueCount++
      } else {
        reflectiveFalseCount++
      }
    })

    return {
      areReflective: reflectiveTrueCount,
      areNotReflective: reflectiveFalseCount
    };
  }),
});
