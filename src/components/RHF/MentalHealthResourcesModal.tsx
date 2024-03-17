import React from "react";
import { Dialog } from "@headlessui/react";
import { EmotionButton } from "../EmotionButton";

interface MentalHealthResourcesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MentalHealthResourcesModal: React.FC<MentalHealthResourcesModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto flex min-h-fit w-10/12 flex-col gap-4 rounded-2.5xl bg-white p-6">
          <h1>
            Mental Health Resources
          </h1>
          <p>
            If you or someone you know is feeling suicidal, please reach out to
            one of the following helplines:
          </p>
          <ul>
            <li>National Suicide Prevention Lifeline: 1-800-273-TALK (8255)</li>
            <li>Crisis Text Line: Text "HELLO" to 741741</li>
            <li>
              International Suicide Hotlines:{" "}
              <a href="https://www.opencounseling.com/suicide-hotlines">
                https://www.opencounseling.com/suicide-hotlines
              </a>
            </li>
          </ul>
          <EmotionButton label="Close" onClick={onClose} />
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default MentalHealthResourcesModal;
