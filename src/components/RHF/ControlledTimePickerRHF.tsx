import { TimePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
import { ReactNode, useState } from "react";
import { Control, Controller } from "react-hook-form";
import { CreateEmotionFormInputs } from "./CreateEmotionRHF";

interface ControlledTimePickerRHFProps {
  control: Control<CreateEmotionFormInputs>;
  name: "start" | "end";
  placeholder?: string;
  value: Date;
}

const ControlledTimePickerRHF = (props: ControlledTimePickerRHFProps) => {
  const [displayedTime, setDisplayedTime] = useState<Dayjs>(
    dayjs(props.value)
  );

  const customSuffixIcon = (): ReactNode => {
    return (
      <div className="h-1/12 text-northeastern-red flex w-1/12 justify-center text-center text-xs">
        ▼
      </div>
    );
  };

  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field: { ref, ...fieldProps }, fieldState }) => (
          <TimePicker
            className="form-input w-full rounded-lg bg-emotionLightGray p-3"
            format="h:mm A"
            suffixIcon={customSuffixIcon()}
            ref={ref}
            status={fieldState.error ? "error" : undefined}
            placeholder={props.placeholder}
            showNow={false}
            minuteStep={15}
            use12Hours={true}
            value={displayedTime}
            onSelect={(date) => {
              setDisplayedTime(dayjs(date));
              fieldProps.onChange(date.toDate());
            }}
          />
      )}
    />
  );
};

export default ControlledTimePickerRHF;
