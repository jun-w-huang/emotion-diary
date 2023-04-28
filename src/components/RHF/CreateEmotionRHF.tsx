import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { Emotion, PhysicalSymptom } from "@prisma/client";
import { z } from "zod";
import ComboBoxRHF from "./ComboBoxRHF";
import ControlledTimePickerRHF from "./ControlledTimePickerRHF";
import { useUser } from "@clerk/nextjs";
import { api } from "~/utils/api";
import toast from "react-hot-toast";
import { EntryLabel } from "./EntryLabel";
import InputFieldRHF from "./InputFieldRHF";
import SwitchRHF from "./SwitchRHF";

interface CreateEmotionRHFProps {
  closeModal: () => void;
}

export type CreateEmotionFormInputs = {
  title: string;
  emotion: Emotion;
  psymptom: PhysicalSymptom;
  pobject: string;
  cause: string;
  isReflective: boolean;
  start: Date;
  end: Date | undefined;
};

export const CreateEmotionSchema = z.object({
  title: z.string().min(1, "Cannot be empty"),
  emotion: z.nativeEnum(Emotion),
  psymptom: z.nativeEnum(PhysicalSymptom),
  pobject: z.string().min(1, "Cannot be empty"),
  cause: z.string().optional(),
  isReflective: z.boolean(),
  start: z.date(),
  end: z.date().optional(),
});



const CreateEmotionRHF = (props: CreateEmotionRHFProps): JSX.Element => {
  const { user } = useUser()

  if (!user) throw Error("user not found!!!")

  const ctx = api.useContext();

  const { mutate, isLoading : isCreating } = api.emotionEvent.create.useMutation({
    onSuccess: () => {
      closeModal();
      void ctx.emotionEvent.getAll.invalidate();
    },
    onError: (error) => {
      toast.error(`Something went wrong: ${error.message}`);
    },

  });

  const {
    register,
    formState: { errors },
    getValues,
    watch,
    handleSubmit,
    reset,
    control,
  } = useForm<CreateEmotionFormInputs>({
    mode: "onSubmit",
    defaultValues: {
      title: "",
      emotion: Emotion.Despair,
      psymptom: PhysicalSymptom.None,
      pobject: "",
      cause: "",
      isReflective: true,
      start: undefined,
      end: undefined,
    },
    resolver: zodResolver(CreateEmotionSchema),
  });

  const onSubmit = (values: CreateEmotionFormInputs) => {
    mutate({
      title: values.title,
      emotion: values.emotion,
      psymptom: values.psymptom,
      pobject: values.pobject,
      cause: values.cause,
      isReflective: values.isReflective,
      start: values.start,
      end: values.end,
    });
  };

  const onError = (errors: any, e: any) => {
    console.log("in errors");
    console.log(errors);
    console.log(getValues());
  };

  const [isOpen, setIsOpen] = useState(true);

  const closeModal = () => {
    setIsOpen(false)
    props.closeModal();
  }

  return (
    <Dialog
      open={isOpen}
      onClose={closeModal}
      className="relative z-50"
    >
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        {/* The actual dialog panel  */}
        <Dialog.Panel className="mx-auto flex min-h-fit w-6/12 flex-col gap-4 rounded border-8 bg-white p-6">
          <Dialog.Title className={"text-xl font-bold"}>
            Create a new Event
          </Dialog.Title>
          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className="flex flex-col gap-4"
          >
            <div>
              <EntryLabel error={errors.title} label={"title"} required />
              <InputFieldRHF
                placeholder="Coursework!!!"
                {...register("title")}
              />
            </div>
            <div>
              <EntryLabel
                error={errors.emotion}
                label={"Enter in an emotion"}
                required
              />
              <ComboBoxRHF
                control={control}
                name="emotion"
                autocompleteOptions={Object.values(Emotion)}
              />
            </div>
            <div>
              <EntryLabel
                error={errors.pobject}
                label={"Particular object"}
                required
              />
              <InputFieldRHF
                placeholder="PHIL3305 Final Project Deadline ):"
                {...register("pobject")}
              />
            </div>
            <div>
              <EntryLabel
                error={errors.psymptom}
                label={"Do you have any physical symptoms?"}
                required
              />
              <ComboBoxRHF
                control={control}
                name="psymptom"
                autocompleteOptions={Object.values(PhysicalSymptom)}
              />
            </div>
            <div>
              <EntryLabel
                error={errors.cause}
                label={"Cause of event"}
              />
              <InputFieldRHF
                placeholder="Bad sleep ):"
                {...register("cause")}
              />
            </div>
            <div>
              <EntryLabel
                error={errors.isReflective}
                label={"Is this emotion reflective of your self conception?"}
                required
              />
              <SwitchRHF control={control} name="isReflective" />
            </div>
            <div className="flex gap-6">
              <div>
                <EntryLabel
                  error={errors.start}
                  label={"Start time"}
                  required
                />
                <ControlledTimePickerRHF control={control} name="start" />
              </div>
              <div>
                <EntryLabel error={errors.end} label={"Ended?"} />
                <ControlledTimePickerRHF control={control} name="end" />
              </div>
            </div>
            <button
              onClick={() => console.log("submit")}
              type="submit"
              className="flex h-12 w-24 items-center justify-center self-end rounded-md bg-slate-300 p-2"
            >
              Create
            </button>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default CreateEmotionRHF;
