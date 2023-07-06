import { Combobox } from "@headlessui/react";
import { Fragment, useState } from "react";
import { Control, Controller } from "react-hook-form";
import { CreateEmotionFormInputs } from "./CreateEmotionRHF";

interface ComboBoxRHFProps {
  control: Control<CreateEmotionFormInputs>;
  name: "emotion" | "psymptom" | "pobject" | "cause";
  autocompleteOptions: string[];
  placeholder?: string;
}

const ComboBoxRHF = (props: ComboBoxRHFProps) => {
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
        <Combobox as={"div"} className={'relative'} value={fieldProps.value} onChange={fieldProps.onChange}>
          <Combobox.Input
            className={`w-full rounded-md bg-emotionLightGray p-3`}
            onChange={(event) => setQuery(event.target.value)}
          />
          <Combobox.Options
            className={`absolute max-h-48 w-full cursor-default overflow-scroll rounded-md shadow-sm`}
          >
            {filteredResult.map((emotion) => (
              <Combobox.Option key={emotion} value={emotion} as={Fragment}>
                {({ active, selected }) => (
                  <li
                    className={`relative w-full cursor-default p-3 ${
                      active
                        ? "bg-emotionLightBlue text-white"
                        : "bg-emotionLightGray text-black"
                    }`}
                  >
                    {selected}
                    {emotion}
                  </li>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </Combobox>
      )}
    />
  );
};

export default ComboBoxRHF;
