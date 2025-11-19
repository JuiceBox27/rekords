import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { Fragment } from "react";
import { Button } from "./Button"; // adjust relative path

interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedMethod?: string | null;
}

export default function ImportModal({ isOpen, onClose, selectedMethod }: ImportModalProps) {
  const handleXMLImport = () => {
    // your XML import logic
  };
  const handleSpotifyImport = () => {
    // your Spotify import logic
  };
  const handleSoundCloudImport = () => {
    // your SoundCloud import logic
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Overlay */}
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-30"
          leave="ease-in duration-200"
          leaveFrom="opacity-30"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black" />
        </TransitionChild>

        {/* Modal content */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPanel className="bg-white rounded-lg p-6 w-80">
              <DialogTitle className="text-lg font-bold mb-4">
                {selectedMethod ? `Import - ${selectedMethod}` : "Import Tracks"}
              </DialogTitle>
              <Button onClick={handleXMLImport} className="mb-2 w-full">
                Rekordbox XML
              </Button>
              <Button onClick={handleSpotifyImport} className="mb-2 w-full">
                Spotify
              </Button>
              <Button onClick={handleSoundCloudImport} className="w-full">
                SoundCloud
              </Button>
              <Button variant="ghost" onClick={onClose} className="mt-4 w-full">
                Cancel
              </Button>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}
