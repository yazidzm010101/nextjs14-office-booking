"use client";

import Button from "@/components/Button";
import FilePicker from "@/components/FilePicker";
import Input from "@/components/Input";
import TextArea from "@/components/TextArea";
import { Dialog, Transition } from "@headlessui/react";
import React, {
  Fragment,
  JSXElementConstructor,
  ReactElement,
  cloneElement,
  useEffect,
  useRef,
  useState,
} from "react";
import { useFormState, useFormStatus } from "react-dom";
import { editRoom } from "~/_lib/actions/room";
import { useToast } from "~/_lib/state/toast-state";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} variant="primary">
      Save
    </Button>
  );
}

function EditRoom({
  officeName,
  officeId,
  room,
  children
}: {
  officeName: string;
  officeId: string;
  children: ReactElement<any, string | JSXElementConstructor<any>>;
  room: {
    id: string;
    name: string;
    description: string;
    photo: string;
    office_id: string;
  };
}) {
  const ref = useRef<HTMLFormElement>(null);

  const [shown, setShown] = useState(false);

  const onClose = () => setShown(false);
  const onOpen = () => setShown(true);
  const { showToast } = useToast();

  const handleUpdate = editRoom.bind(null, room.id)

  const [state, dispatch] = useFormState(handleUpdate, undefined);

  useEffect(() => {
    if (state?.success == true) {
      ref.current?.reset();
      onClose();
      showToast({
        type: "success",
        message: `Success adding new room "${state?.data?.name}"!`,
        title: "Success",
      });
    }
  }, [state]);

  return (
    <React.Fragment>
      {
        cloneElement(children, { onClick: (e: any) => {
          onOpen()
          children?.props?.onClick && children?.props?.onClick(e)
        } })
      }
      <Transition appear show={shown} as={Fragment} unmount>
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
                    Edit Room
                  </Dialog.Title>
                  <form
                    className="grid grid-cols-12 gap-4 mt-8"
                    action={dispatch}
                    ref={ref}
                  >
                    <fieldset className="flex flex-col w-full max-w-full col-span-12 gap-1">
                      <input
                        type="hidden"
                        id="office_id"
                        name="office_id"
                        value={officeId}
                      />
                      <Input
                        label="Office"
                        id="office"
                        disabled
                        type="text"
                        defaultValue={officeName}
                      />
                    </fieldset>
                    <fieldset className="flex flex-col w-full max-w-full col-span-12 gap-1">
                      <Input label="Name" id="name" name="name" type="text" defaultValue={room.name}/>
                    </fieldset>
                    <fieldset className="flex flex-col w-full max-w-full col-span-12 gap-1">
                      <label htmlFor="photo" className="dark:text-gray-400">
                        Photo
                      </label>
                      <FilePicker
                        id="photo-room"
                        name="photo"
                        className="w-full max-w-full"
                        defaultValue={room.photo}
                      />
                    </fieldset>
                    <fieldset className="flex flex-col w-full max-w-full col-span-12 gap-1">
                      <TextArea
                        label="Description"
                        id="description"
                        name="description"
                        defaultValue={room.description}
                      />
                    </fieldset>
                    <div className="flex justify-end col-span-12 gap-2 mt-4">
                      <Button
                        type="button"
                        onClick={onClose}
                        variant="secondary"
                      >
                        Cancel
                      </Button>
                      <SubmitButton />
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </React.Fragment>
  );
}

export default EditRoom;
