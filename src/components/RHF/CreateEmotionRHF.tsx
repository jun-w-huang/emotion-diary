import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { Emotion, EmotionEvent, PhysicalSymptom } from "@prisma/client";
import { z } from "zod";
import ComboBoxRHF from "./ComboBoxRHF";
import ControlledTimePickerRHF from "./ControlledTimePickerRHF";
import { api } from "~/utils/api";
import toast from "react-hot-toast";
import { EntryLabel } from "./EntryLabel";
import InputFieldRHF from "./InputFieldRHF";
import SwitchRHF from "./SwitchRHF";

interface CreateEmotionRHFProps {
  closeModal: () => void;
  existingEvent?: EmotionEvent;
  date? : Date;
}

export type CreateEmotionFormInputs = {
  id: string;
  title: string;
  emotion: Emotion;
  psymptom: PhysicalSymptom;
  pobject: string;
  cause: string;
  isReflective: boolean;
  start: Date;
  end: Date | null;
};

export const CreateEmotionSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Cannot be empty"),
  emotion: z.nativeEnum(Emotion),
  psymptom: z.nativeEnum(PhysicalSymptom),
  pobject: z.string().min(1, "Cannot be empty"),
  cause: z.string().optional(),
  isReflective: z.boolean(),
  start: z.date(),
  end: z.date().optional().nullable(),
});

export const DeleteSchema = z.object({id: z.string()})

const CreateEmotionRHF = (props: CreateEmotionRHFProps): JSX.Element => {
  const ctx = api.useContext();

  const { mutate: create, isLoading: isCreating } =
    api.emotionEvent.create.useMutation({
      onSuccess: () => {
        closeModal();
        void ctx.emotionEvent.getMyEvents.invalidate();
      },
      onError: (error) => {
        toast.error(`Something went wrong: ${error.message}`);
      },
    });

  const { mutate: update, isLoading: isUpdating } =
    api.emotionEvent.update.useMutation({
      onSuccess: () => {
        closeModal();
        void ctx.emotionEvent.getMyEvents.invalidate();
      },
      onError: (error) => {
        toast.error(`Something went wrong: ${error.message}`);
      },
    });

  const { mutate: remove, isLoading: isDeleting } =
    api.emotionEvent.delete.useMutation({
      onSuccess: () => {
        closeModal();
        void ctx.emotionEvent.getMyEvents.invalidate();
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
      id: props.existingEvent?.id ?? undefined,
      title: props.existingEvent?.title ?? "",
      emotion: props.existingEvent?.emotion ?? Emotion.Despair,
      psymptom: props.existingEvent?.psymptom ?? PhysicalSymptom.None,
      pobject: props.existingEvent?.pobject ?? "",
      cause: props.existingEvent?.cause ?? "",
      isReflective: props.existingEvent?.reflective ?? true,
      start: props.existingEvent?.start ?? undefined,
      end: props.existingEvent?.end ?? null,
    },
    resolver: zodResolver(CreateEmotionSchema),
  });

  const onSubmit = (values: CreateEmotionFormInputs) => {
    if (props.existingEvent) {
      update({
        ... values
      });
    } else {
      create({
        // change to spread values?
        title: values.title,
        emotion: values.emotion,
        psymptom: values.psymptom,
        pobject: values.pobject,
        cause: values.cause,
        isReflective: values.isReflective,
        start: values.start,
        end: values.end,
      });
    }
  };

  const onError = (errors: any, e: any) => {
    console.log("in errors");
    console.log(errors);
    console.log(getValues());
  };

  const [isOpen, setIsOpen] = useState(true);

  const closeModal = () => {
    setIsOpen(false);
    props.closeModal();
  };

  return (
    <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
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
              <EntryLabel error={errors.title} label={"Event Title"} required />
              <InputFieldRHF
                placeholder="Coursework!!!"
                {...register("title")}
              />
            </div>
            <div>
              <EntryLabel
                error={errors.emotion}
                label={"What emotion are you feeling?"}
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
                label={"What is your emotion towards or about?"}
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
                label={"What caused the emotion?"}
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
                <ControlledTimePickerRHF
                  value={getValues().start}
                  control={control}
                  name="start"
                />
              </div>
              <div>
                <EntryLabel error={errors.end} label={"Ended?"} />
                <ControlledTimePickerRHF
                  value={getValues().end ?? undefined}
                  control={control}
                  name="end"
                />
              </div>
            </div>
            <div className="flex w-full justify-between self-end">
              <div>
                {props.existingEvent && (
                  <button
                    onClick={() => remove({id: props.existingEvent!.id})}
                    className="flex h-12 w-24 items-center justify-center rounded-md bg-slate-300 p-2 text-red-600"
                  >
                    Delete
                  </button>
                )}
              </div>
              <div className="flex gap-3 self-end">
                {props.existingEvent && (
                  <button
                    onClick={() => props.closeModal()}
                    className="flex h-12 w-24 items-center justify-center rounded-md bg-slate-300 p-2"
                  >
                    Cancel
                  </button>
                )}
                <button
                  onClick={() => console.log("submit")}
                  type="submit"
                  className="flex h-12 w-24 items-center justify-center rounded-md bg-slate-300 p-2"
                >
                  Done
                </button>
              </div>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default CreateEmotionRHF;
