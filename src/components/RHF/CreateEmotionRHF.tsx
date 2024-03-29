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
import { EmotionButton } from "../EmotionButton";
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import ControlledDatePicker from "./ControlledDatePicker";
import MentalHealthResourcesModal from "./MentalHealthResourcesModal";
dayjs.extend(utc);

interface CreateEmotionRHFProps {
  closeModal: () => void;
  existingEvent?: EmotionEvent;
  date: Date;
}

export type CreateEmotionFormInputs = {
  id: string;
  title: string;
  emotion: Emotion;
  psymptom: PhysicalSymptom;
  pobject: string;
  cause: string;
  isReflective: boolean;
  date: Date;
  start: Date;
  end: Date;
  description: string;
};

export const CreateEmotionSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Cannot be empty"),
  emotion: z.nativeEnum(Emotion),
  psymptom: z.nativeEnum(PhysicalSymptom),
  pobject: z.string().optional(),
  cause: z.string().optional(),
  isReflective: z.boolean(),
  date: z.date(),
  start: z.date(),
  end: z.date().optional(),
  description: z.string().optional(),
});

export const DeleteSchema = z.object({ id: z.string() });

const CreateEmotionRHF = (props: CreateEmotionRHFProps): JSX.Element => {
  const ctx = api.useContext();
  const [showMentalHealthModal, setShowMentalHealthModal] = useState(false);
  const { mutate: create, isLoading: isCreating } =
    api.emotionEvent.create.useMutation({
      onSuccess: (data) => {
        console.log(data);
        if (data.containsSuicidalContent) {
          console.log("contains suicidal content");
          setShowMentalHealthModal(true);
        } else {
          closeModal();
        }
        void ctx.emotionEvent.getMyEvents.invalidate();
      },
      onError: (error) => {
        toast.error(`Something went wrong: ${error.message}`);
      },
    });

  const { mutate: update, isLoading: isUpdating } =
    api.emotionEvent.update.useMutation({
      onSuccess: (data) => {
        console.log(data);
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
      date: props.date ?? new Date(),
      // if there's no existing event, then default start Date time is 9AM
      start: props.existingEvent?.start ?? new Date(props.date),
      // if there's no existing event, then default end Date time is 10AM
      end: props.existingEvent?.end ?? undefined,
      description: props.existingEvent?.description ?? "",
    },
    resolver: zodResolver(CreateEmotionSchema),
  });

  const onSubmit = (values: CreateEmotionFormInputs) => {
    if (props.existingEvent) {
      update({
        ...values,
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
        date: values.date,
        start: new Date(values.start.setUTCDate(values.date.getUTCDate())),
        end: values.end
          ? new Date(values.end.setUTCDate(values.date.getUTCDate()))
          : undefined,
        description: values.description,
      });
    }
  };

  const isSubmitting = isCreating || isUpdating || isDeleting;

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

  const closeMentalHealthModal = () => {
    setShowMentalHealthModal(false);
    closeModal();
  };

  if (showMentalHealthModal) {
    return (
      <MentalHealthResourcesModal
        isOpen={showMentalHealthModal}
        onClose={closeMentalHealthModal}
      />
    );
  }

  return (
    <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        {/* The actual dialog panel  */}
        <Dialog.Panel className="mx-auto flex min-h-fit w-10/12 flex-col gap-4 rounded-2.5xl bg-white p-6">
          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className="flex flex-col"
          >
            <div className="flex flex-row gap-10 p-4">
              {/* first column */}
              <div className="flex h-full w-full flex-col gap-4">
                <h1 className={""}>Create a new event</h1>
                <div>
                  <EntryLabel
                    required
                    error={errors.title}
                    label={"Event Title"}
                  />
                  <InputFieldRHF {...register("title")} />
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
                    label={"What is your emotion about?"}
                  />
                  <InputFieldRHF {...register("pobject")} />
                </div>
                <div>
                  <EntryLabel
                    error={errors.psymptom}
                    label={"Do you have any bodily sensations?"}
                    required
                  />
                  <ComboBoxRHF
                    control={control}
                    name="psymptom"
                    autocompleteOptions={Object.values(PhysicalSymptom)}
                  />
                </div>
              </div>
              {/* second column */}
              <div className="flex h-full w-full flex-col gap-4">
                <div>
                  <EntryLabel
                    error={errors.cause}
                    label={"What caused the emotion?"}
                  />
                  <InputFieldRHF {...register("cause")} />
                </div>
                <div>
                  <EntryLabel
                    error={errors.isReflective}
                    label={
                      "Do you think this emotion is reflective of who you are?"
                    }
                    required
                  />
                  <SwitchRHF control={control} name="isReflective" />
                </div>
                <div>
                  <div>
                    <EntryLabel error={errors.date} label={"Date"} />
                    <ControlledDatePicker
                      value={getValues().date}
                      control={control}
                      name="date"
                    />
                  </div>
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
                    <EntryLabel error={errors.end} label={"End time?"} />
                    <ControlledTimePickerRHF
                      value={getValues().end}
                      control={control}
                      name="end"
                    />
                  </div>
                </div>
                <div>
                  <EntryLabel
                    error={errors.description}
                    label={"Description"}
                  />
                  <textarea
                    className={`form-input h-full w-full rounded-lg bg-emotionLightGray p-3`}
                    maxLength={1000}
                    {...register("description")}
                  />
                </div>
              </div>
            </div>

            <div className="flex w-full justify-between self-end px-4">
              <div>
                {props.existingEvent && (
                  <EmotionButton
                    onClick={() => remove({ id: props.existingEvent!.id })}
                    type="button"
                    label="Delete"
                  />
                )}
              </div>
              <div className="flex gap-3 self-end">
                {props.existingEvent && (
                  <EmotionButton
                    onClick={() => props.closeModal()}
                    type="button"
                    label="Cancel"
                  />
                )}
                <EmotionButton
                  onClick={() => console.log("submit")}
                  type="submit"
                  label="Done"
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default CreateEmotionRHF;
