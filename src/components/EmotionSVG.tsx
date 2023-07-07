import { Emotion } from "@prisma/client";
import { Suspense, lazy } from "react";
import JoySVG from "../../public/emotionSVGs/Joy.svg";

interface EmotionSVGProps {
  emotion: Emotion;
  className?: string;
}

export const DefaultSVG = () => {
  return (
    <div className="">
      {/* should probably change this to a different SVG in the future */}
      <JoySVG className="box-border w-2" />
    </div>
  );
};

const EmotionSVG = (props: EmotionSVGProps) => {
  const SVG = lazy<React.ComponentType<any>>(
    () =>
      import(`../../public/emotionSVGs/${props.emotion}.svg`).catch(
        () => import(`../../public/emotionSVGs/Joy.svg`)
      ) as Promise<{ default: React.ComponentType<any> }>
  );

  return (
    <Suspense fallback={<DefaultSVG />}>
      <SVG className={props.className} />
    </Suspense>
  );
};

export default EmotionSVG;
