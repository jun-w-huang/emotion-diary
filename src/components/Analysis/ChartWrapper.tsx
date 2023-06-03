
interface ChartWrapperProps {
    title?: string;
    child: JSX.Element
  }

export const ChartWrapper = (props: ChartWrapperProps) => {
  return (
    <div className="m-1 h-80 w-80">
      <div className="flex flex-col border border-black bg-slate-200 text-center">
        <h2>{props.title}</h2>
        {props.child}
      </div>
    </div>
  );
};
