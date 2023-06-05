import { WordCloud } from "@ant-design/charts";
import React from "react";

interface Word {
  text: string;
  value: number;
}

interface WordCloudChartProps {
  words: { text: string; value: number }[];
  title?: string;
}

const WordCloudChart = (props: WordCloudChartProps) => {

  const config = {
    data: props.words,
    wordField: "text",
    weightField: "value",
    colorField: "text",
    wordStyle: {
      fontFamily: "Arial",
      fontSize: [20, 60] as [number, number],
    },
  };

  return <WordCloud {...config} />;
};

export default WordCloudChart;
