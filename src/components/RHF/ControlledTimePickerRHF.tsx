import { TimePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
import { ReactNode, useEffect, useState } from "react";
import { Control, Controller } from "react-hook-form";
import { CreateEmotionFormInputs } from "./CreateEmotionRHF";

interface ControlledTimePickerRHFProps {
  control: Control<CreateEmotionFormInputs>;
  name: "start" | "end";
  placeholder?: string;
  value?: Date;
}

const ControlledTimePickerRHF = (props: ControlledTimePickerRHFProps) => {
  const [displayedTime, setDisplayedTime] = useState<Dayjs | undefined>(undefined);

  useEffect(() => {
    if (props.value) {
      setDisplayedTime(dayjs(props.value));
    }
  }, [props.value]);

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
        <div className={""}>
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
            onBlur={fieldProps.onBlur}
            onSelect={(date) => {
              if (props.value) {
                const curVal = props.value
                curVal.setHours(date.hour())
                curVal.setMinutes(date.minute())
                fieldProps.onChange(curVal);
                console.log(curVal)
              }
              setDisplayedTime(dayjs(date));
              fieldProps.onChange(date.toDate());
            }}
            
          />
        </div>
      )}
    />
  );
};

export default ControlledTimePickerRHF;
