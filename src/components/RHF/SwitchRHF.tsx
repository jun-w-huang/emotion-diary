import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { CreateEmotionFormInputs } from './CreateEmotionRHF';

interface SwitchRHFProps {
  control: Control<CreateEmotionFormInputs>;
  name: "isReflective";
}

const SwitchRHF = (props: SwitchRHFProps) => {
  return (
    <div>
      <Controller
        name={props.name}
        control={props.control}
        render={({ field: { ref, ...fieldProps }}) => {
          const value = fieldProps.value;
          return (
            <div className='flex gap-5'>
              <button
                type="button"
                className={`form-input rounded-md p-3 text-white w-16 ${value === true ? 'bg-emotionDarkBlue' : 'bg-emotionLightBlue'}`}
                onClick={() => fieldProps.onChange(true)}
              >
                Yes
              </button>
              <button
                type="button"
                className={`form-input rounded-md p-3 text-white w-16 ${value === false ? 'bg-emotionDarkBlue' : 'bg-emotionLightBlue'}`}
                onClick={() => fieldProps.onChange(false)}
              >
                No
              </button>
            </div>
          );
        }}
      />
    </div>
  );
};

export default SwitchRHF;
