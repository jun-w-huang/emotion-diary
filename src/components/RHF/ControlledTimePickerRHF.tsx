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
  const [displayedTime, setDisplayedTime] = useState<Dayjs | null>(null);

  useEffect(() => {
    if (props.value) {
      setDisplayedTime(dayjs.utc(props.value));
    }
  }, [props.value]);

  const customSuffixIcon = (): ReactNode => {
    return (
      <div className="h-1/12 text-northeastern-red flex w-1/12 justify-center text-center text-xs">
        ▼
      </div>
    );
  };

  const convertInputDateToUTC = (inputDate: Date): Date => {
    const inputHours = inputDate.getHours();
    /**
     * this will be the hours difference between GMT-0 and the inputDate's timezone
     * eg: utcOffset for inputDate's that are EST will either -5 or -4 depending on Daylight savings
     *  */
    const utcOffset: number = parseInt(dayjs(inputDate).format("Z"));
    let utcHours: number;
    if (inputHours + utcOffset < 0) {
      utcHours = inputHours + utcOffset + 24;
    } else {
      utcHours = inputHours + utcOffset;
    }
    const result = new Date();
    result.setHours(utcHours);
    result.setMinutes(inputDate.getMinutes());
    return result;
  };

  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field: { ref, ...fieldProps }, fieldState }) => (
        <div className={"flex flex-col"}>
          <TimePicker
            className="form-input w-full rounded-lg"
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
              setDisplayedTime(dayjs(date.valueOf()));
              const convertedDate = convertInputDateToUTC(date.toDate());
              fieldProps.onChange(convertedDate);
            }}
          />
        </div>
      )}
    />
  );
};

export default ControlledTimePickerRHF;
