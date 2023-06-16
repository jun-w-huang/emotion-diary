import React from "react";
import { Group } from "@visx/group";
import genBins, { Bin, Bins } from "@visx/mock-data/lib/generators/genBins";
import { scaleLinear } from "@visx/scale";
import { HeatmapRect } from "@visx/heatmap";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { EmotionEvent } from "@prisma/client";
import { startOfDay, endOfDay, getDay, getHours } from "date-fns";

/* https://github.com/airbnb/visx/issues/1637
TLDR: VisX ^3.0.0 changed to new D-3 version. This new d-3 version is pure ESM, but 
Next.JS has some issues with Pure ESM, something like that. Hopefully, future updates will fix
For temporary workaround see: korompaiistvan commented on Apr 23.
Packages should be fixed even after NPM install through patch-package lib **/

const cool1 = "#122549";
const cool2 = "#b4fbde";
const background = "#C5C5C5";

function generateHeatMapData(events: EmotionEvent[]) {
  const dayBins: number[][] = [];

  for (let day = 0; day < 7; day++) {
    const hourBins = [];

    for (let hour = 0; hour < 24; hour++) {
      const count = events.filter((event) => {
        const eventStart = startOfDay(event.start);
        const eventEnd = endOfDay(event.start);
        return (
          getDay(eventStart) === day &&
          getHours(eventStart) === hour &&
          eventStart >= eventStart &&
          eventStart <= eventEnd
        );
      }).length;
      hourBins.push(count || 1);
    }

    dayBins.push(hourBins);
  }

  // i is 0 to 6, x iterates from 0 to 24*7 = 163, and so we use x % 24 to iterate from 0 to 23
  let x = 0;
  return genBins(
    24,
    7,
    (i) => i,
    (i) => {
      x = x + 1;
      const dayBinIndex = x % 24;
      return dayBins[i]![dayBinIndex]!;
    }
  );
}

function max<Datum>(data: Datum[], value: (d: Datum) => number): number {
  return Math.max(...data.map(value));
}

function min<Datum>(data: Datum[], value: (d: Datum) => number): number {
  return Math.min(...data.map(value));
}

interface HeatmapProps {
  width: number;
  height: number;
  emotionEvents: EmotionEvent[];
  margin?: { top: number; right: number; bottom: number; left: number };
  separation?: number;
}

const defaultMargin = { top: 50, left: 50, right: 20, bottom: 110 };

function MatrixChart({
  width,
  height,
  emotionEvents,
  margin = defaultMargin,
  separation = 20,
}: HeatmapProps) {
  // bounds
  const size =
    width > margin.left + margin.right
      ? width - margin.left - margin.right - separation
      : width;
  const xMax = size / 2;
  const yMax = height - margin.bottom - margin.top;

  const binData = generateHeatMapData(emotionEvents);

  // accessors
  const bins = (d: Bins) => d.bins;
  const count = (d: Bin) => d.count;

  const colorMax = max(binData, (d) => max(bins(d), count));
  const bucketSizeMax = max(binData, (d) => bins(d).length);

  // scales
  const xScale = scaleLinear<number>({
    domain: [0, binData.length],
  });
  const yScale = scaleLinear<number>({
    domain: [0, bucketSizeMax],
  });
  const rectColorScale = scaleLinear<string>({
    range: [cool1, cool2],
    domain: [0, colorMax],
  });
  const opacityScale = scaleLinear<number>({
    range: [0.1, 1],
    domain: [0, colorMax],
  });

  const binWidth = xMax / binData.length;
  const binHeight = yMax / bucketSizeMax;

  xScale.range([0, xMax]);
  yScale.range([yMax, 0]);

  return width < 10 ? null : (
    <svg width={width} height={height}>
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        rx={14}
        fill={background}
      />
      <Group top={margin.top} left={margin.left}>
        <AxisBottom
          scale={xScale}
          top={yMax + margin.top}
          tickFormat={(value, index) => `${index}`}
          stroke="white"
          tickStroke="white"
          numTicks={binData.length}
        />
        <AxisLeft
          scale={yScale}
          top={margin.top}
          left={0}
          tickFormat={(value, index) => {
            const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            return dayLabels[index];
          }}
          numTicks={bucketSizeMax}
          stroke="white" // Set the stroke color to white
          tickStroke="white" // Set the tick stroke color to white
        />
        <HeatmapRect
          data={binData}
          xScale={(d) => xScale(d) ?? 0}
          yScale={(d) => yScale(d) ?? 0}
          colorScale={rectColorScale}
          opacityScale={opacityScale}
          binWidth={binWidth}
          binHeight={binHeight}
          gap={7}
        >
          {(heatmap) =>
            heatmap.map((heatmapBins) =>
              heatmapBins.map((bin) => (
                <rect
                  key={`heatmap-rect-${bin.row}-${bin.column}`}
                  className="visx-heatmap-rect"
                  width={bin.width}
                  height={bin.height}
                  x={bin.x}
                  y={bin.y}
                  fill={bin.color}
                  fillOpacity={bin.opacity}
                  onClick={() => {
                    const { row, column } = bin;
                    alert(JSON.stringify({ row, column, bin: bin.bin }));
                  }}
                />
              ))
            )
          }
        </HeatmapRect>
      </Group>
    </svg>
  );
}

export default MatrixChart;
