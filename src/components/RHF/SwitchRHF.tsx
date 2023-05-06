import { Switch } from "@headlessui/react";
import { Control, Controller } from "react-hook-form";
import { CreateEmotionFormInputs } from "./CreateEmotionRHF";

interface SwitchRHFProps {
    control: Control<CreateEmotionFormInputs>;
    name: "isReflective";
    placeholder?: string;
    value?: Date;
  }

const SwitchRHF = (props: SwitchRHFProps) => {
//   const [enabled, setEnabled] = useState(false);

  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field: { ref, ...fieldProps }, fieldState }) => (
        <Switch
          checked={fieldProps.value}
          onChange={fieldProps.onChange}
          className={`${
            fieldProps.value ? "bg-blue-600" : "bg-gray-200"
          } relative inline-flex h-6 w-11 items-center rounded-full`}
        >
          <span className="sr-only">Enable notifications</span>
          <span
            className={`${
                fieldProps.value ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </Switch>
      )}
    />
  );
};

export default SwitchRHF;
