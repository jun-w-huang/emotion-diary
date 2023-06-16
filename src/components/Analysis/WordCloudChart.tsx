import React, { useState } from "react";
import { Wordcloud } from "@visx/wordcloud";
import { Text } from '@visx/text';
import { scaleLog } from "@visx/scale";

interface WordData {
  text: string;
  value: number;
}

interface WordCloudChartProps {
  words: WordData[];
  title?: string;
}

type Options = {
  rotations: number;
  rotationAngles: [number, number];
};

const colors = ['#143059', '#2F6B9A', '#82a6c2'];

function wordFreq(text: string): WordData[] {
  const words: string[] = text.replace(/\./g, '').split(/\s/);
  const freqMap: Record<string, number> = {};

  for (const w of words) {
    if (!freqMap[w]) freqMap[w] = 0;
    freqMap[w] += 1;
  }
  return Object.keys(freqMap).map((word) => ({ text: word, value: freqMap[word]! }));
}

function getRotationDegree() {
  const rand = Math.random();
  const degree = rand > 0.5 ? 60 : -60;
  return rand * degree;
}

const fixedValueGenerator = () => 0.5;

type SpiralType = 'archimedean' | 'rectangular';

export const WordCloudChart = (props: WordCloudChartProps) => {
  const [spiralType, setSpiralType] = useState<SpiralType>('archimedean');
  const [withRotation, setWithRotation] = useState(false);

  const fontScale = scaleLog({
    domain: [Math.min(...props.words.map((w) => w.value)), Math.max(...props.words.map((w) => w.value))],
    range: [10, 100],
  });

  const fontSizeSetter = (datum: WordData) => fontScale(datum.value);

  const options: Options = {
    rotations: 2,
    rotationAngles: [-90, 0],
  };

  return (
    <div>
      <Wordcloud
        words={props.words}
        width={500}
        height={500}
        fontSize={fontSizeSetter}
        font={'Impact'}
        padding={2}
        spiral={spiralType}
        rotate={withRotation ? getRotationDegree : 0}
        random={fixedValueGenerator}
      >
        {(cloudWords) =>
          cloudWords.map((w, i) => (
            <Text
              key={w.text}
              fill={colors[i % colors.length]}
              textAnchor={'middle'}
              transform={`translate(${w.x!}, ${w.y!}) rotate(${w.rotate!})`}
              fontSize={w.size}
              fontFamily={w.font}
            >
              {w.text}
            </Text>
          ))
        }
      </Wordcloud>
    </div>
  );
};
