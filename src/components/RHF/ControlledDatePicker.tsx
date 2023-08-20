import { DatePicker, TimePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
import { ReactNode, useEffect, useState } from "react";
import { Control, Controller } from "react-hook-form";
import { CreateEmotionFormInputs } from "./CreateEmotionRHF";
interface ControlledDatePickerRHFProps {
  control: Control<CreateEmotionFormInputs>;
  name: "date";
  placeholder?: string;
  value?: Date;
}
const ControlledDatePickerRHF = (props: ControlledDatePickerRHFProps) => {
  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field: { ref, ...fieldProps }, fieldState }) => (
        <div className={"flex flex-col"}>
          <DatePicker
            className="form-input w-full rounded-lg"
            ref={ref}
            status={fieldState.error ? "error" : undefined}
            placeholder={props.placeholder}
            value={dayjs(fieldProps.value)}
            onChange={(date) => {
                console.log(date)
                fieldProps.onChange(date?.toDate())
            }}
          />
        </div>
      )}
    />
  );
};
export default ControlledDatePickerRHF;
