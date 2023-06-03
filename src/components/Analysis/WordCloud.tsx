import React from "react";
import ReactWordcloud from "react-wordcloud";

interface Word {
  text: string;
  value: number;
}

interface WordCloudProps {
  words: Word[];
  title?: string;
}

type Options = {
  rotations: number;
  rotationAngles: [number, number];
};

export const WordCloud = (props: WordCloudProps) => {
  const options: Options = {
    rotations: 2,
    rotationAngles: [-90, 0],
  };
  //   const size = [600, 400];
  return <ReactWordcloud options={options} words={props.words} />;
};
