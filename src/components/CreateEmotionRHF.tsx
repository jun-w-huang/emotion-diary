import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { Emotion, PhysicalSymptom } from "@prisma/client";
import { z } from "zod";
import ComboBoxRHF from "./ComboBoxRHF";
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
  start: Date | null;
  end: Date | null;
};

const dateErrorMap: z.ZodErrorMap = (issue, ctx) => {
  return { message: "Invalid Date" };
};

const CreateEmotionSchema = z.intersection(
  z.object({
    title: z.string().min(1, "Cannot be empty"),
    emotion: z.nativeEnum(Emotion),
    psymptom: z.nativeEnum(PhysicalSymptom),
    pobject: z.string().min(1, "Cannot be empty"),
    cause: z.string().min(1, "Cannot be empty"),
    isReflective: z.boolean(),
  }),
  z.union([
    z.object({
      start: z.date({ errorMap: dateErrorMap }),
      end: z.date({ errorMap: dateErrorMap }),
      timeDiffers: z.literal(false),
    }),
    z.object({
      timeDiffers: z.literal(true),
    }),
  ])
);

const CreateEmotionRHF = (props: CreateEmotionRHFProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(true);
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
    reset,
    control,
  } = useForm<CreateEmotionFormInputs>({
    mode: "onSubmit",
    defaultValues: {
      title: "",
      emotion: Emotion.Joy,
      psymptom: PhysicalSymptom.None,
      pobject: "",
      cause: "",
      isReflective: true,
      start: undefined,
      end: undefined,
    },
    resolver: zodResolver(CreateEmotionSchema),
  });

  const onSubmit = () => {
    console.log("in on submit")
  }

  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        setIsOpen(false);
        props.closeModal();
      }}
      className="relative z-50"
    >
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        {/* The actual dialog panel  */}
        <Dialog.Panel className="mx-auto flex h-3/6 w-6/12 flex-col gap-4 rounded border-8 bg-white p-6">
          <Dialog.Title className={"text-xl font-bold"}>
            Create a new Event
          </Dialog.Title>
          <form 
          onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <EntryLabel error={errors.title} label={"title"} required />
              <InputFieldRHF placeholder="Title" {...register("title")} />
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
              <EntryLabel error={errors.cause} label={"Cause of event"} required />
              <InputFieldRHF
                placeholder="Cause of event"
                {...register("cause")}
              />
            </div>
            <div>
              <EntryLabel error={errors.isReflective} label={"Is this emotion reflective of your self conception?"} required />
              <SwitchRHF control={control}
                name="isReflective"
                />
            </div>
            <div>
              
            </div>
            {/*
  start: Date | null;
  end: Date | null; */}
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
