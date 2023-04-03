import { Combobox } from "@headlessui/react";
import { useState } from "react";
import { Control, Controller } from "react-hook-form";
import { CreateEmotionFormInputs } from "./CreateEmotionRHF";

interface ComboBoxRHFProps {
  control: Control<CreateEmotionFormInputs>;
  name: "emotion" | "psymptom" | "pobject" | "cause";
  autocompleteOptions : string[],
  placeholder?: string;
  value?: Date;
}

const ComboBoxRHF = (props: ComboBoxRHFProps) => {
  const [value, setValue] = useState("");
  const [query, setQuery] = useState("");

  const filteredResult =
    query === ""
      ? props.autocompleteOptions
      : props.autocompleteOptions.filter((emotion) => {
          return emotion.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field: { ref, ...fieldProps }, fieldState }) => (
        <Combobox value={value} onChange={setValue}>
          <Combobox.Input
            className={`w-full rounded-md bg-slate-300 p-3`}
            onChange={(event) => setQuery(event.target.value)}
          />
          <Combobox.Options className={`relative w-full  rounded-md shadow-sm`}>
            {filteredResult.map((emotion) => (
              <Combobox.Option
                className={`w-full bg-slate-400`}
                key={emotion}
                value={emotion}
              >
                {emotion}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </Combobox>
      )}
    />
  );
};

export default ComboBoxRHF;
