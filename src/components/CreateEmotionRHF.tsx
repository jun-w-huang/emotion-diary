import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Combobox, Dialog } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { Emotion, PhysicalSymptom } from "@prisma/client";
import { z } from "zod";

interface CreateEmotionRHFProps {
  closeModal: () => void;
}

export type CreateEmotionFormInputs = {
  title: String;
  emotion: Emotion
  psymptom: PhysicalSymptom
  pobject: String
  cause: String
  isReflective: boolean;
  start: Date | null;
  end: Date | null;
};

const dateErrorMap: z.ZodErrorMap = (issue, ctx) => {
  return { message: "Invalid time" };
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
        <Dialog.Panel className="mx-auto max-w-sm rounded bg-white">
          <Dialog.Title>Create a new Event</Dialog.Title>
          
          
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default CreateEmotionRHF;
