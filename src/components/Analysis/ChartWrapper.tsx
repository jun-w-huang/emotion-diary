interface ChartWrapperProps {
  title?: string;
  child: JSX.Element;
}

export const ChartWrapper = (props: ChartWrapperProps) => {
  return (
    <div className="m-1 flex h-96 w-96 flex-col border border-black bg-slate-200 text-center">
      <h2>{props.title}</h2>
      <div className="flex flex-1 items-center justify-center">
        {props.child}
      </div>
    </div>
  );
};
