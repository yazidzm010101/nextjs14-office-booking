"use client";

import { addOffice } from "@/actions/office";
import Button from "@/components/Button";
import FilePicker from "@/components/FilePicker";
import Input from "@/components/Input";
import TextArea from "@/components/TextArea";
import { Dialog, Transition } from "@headlessui/react";
import { IconPlus } from "@tabler/icons-react";
import { Fragment, useEffect, useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} variant="primary">
      Submit
    </Button>
  );
}

function AddOffice() {
  const [shown, setShown] = useState(false);
  const ref = useRef<HTMLFormElement>(null);

  const onClose = () => setShown(false);
  const onOpen = () => setShown(true);

  const [state, dispatch] = useFormState(addOffice, undefined);

  useEffect(() => {
    if (state?.success == true) {
      ref.current?.reset();
      onClose();
    }
  }, [state]);

  return (
    <>
      <div className="fixed right-0 flex w-full px-4 bottom-24 sm:bottom-4">
        <Button
          size="lg"
          variant="primary"
          className="ms-auto"
          icon={<IconPlus />}
          onClick={() => onOpen()}
        >
          Add Office
        </Button>
      </div>
      <Transition appear show={shown} as={Fragment}>
        <Dialog onClose={onClose} as="div" className={"relative z-10"}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                unmount={false}
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform shadow-xl dark:bg-slate-800 rounded-2xl">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-medium leading-6 dark:text-gray-300"
                  >
                    Add new office
                  </Dialog.Title>
                  <form
                    className="grid grid-cols-1 gap-4 mt-8"
                    action={dispatch}
                    ref={ref}
                  >
                    <Input label="Name" id="name" name="name" type="text" />
                    <TextArea
                      label="Address"
                      id="address"
                      name="address"
                      type="text"
                    />
                    <fieldset className="flex flex-col w-full max-w-full col-span-1 gap-1">
                      <label htmlFor="photo" className="dark:text-gray-400">
                        Photo
                      </label>
                      <FilePicker
                        id="photo"
                        name="photo"
                        className="w-full max-w-full"
                      />
                    </fieldset>
                    <TextArea
                      label="Description"
                      id="description"
                      name="description"
                    />
                    <div className="mt-4 text-end">
                      <SubmitButton />
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default AddOffice;
