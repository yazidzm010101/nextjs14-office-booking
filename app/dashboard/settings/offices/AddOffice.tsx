"use client";

import { addOffice } from "@/actions/office";
import Button from "@/components/Button";
import FilePicker from "@/components/FilePicker";
import Input from "@/components/Input";
import TextArea from "@/components/TextArea";
import { Dialog, Transition } from "@headlessui/react";
import { IconAlphabetLatin, IconClockMinus, IconClockPlus, IconLocation, IconMap, IconMap2, IconPlus, IconTextCaption, IconTimeDuration0 } from "@tabler/icons-react";
import { Fragment, useEffect, useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useToast } from "~/_lib/state/toast-state";

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
  const [timeMinVal, setTimeMinVal] = useState("");

  const timeStrToMs = (value: string) => {
    let matches =
      /^([0-9]+h(?:\s)){0,1}([0-9]+m(?:\s){0,1}){0,1}$/g
        .exec(value + " ")
        ?.slice(1)
        .reduce((store: string[], value: any) => {
          if (!!value && typeof value == "string" && !store.includes(value)) {
            store.push(value);
          }
          return store;
        }, []) || [];
    console.log({ matches });
    let time_ms = 0;
    matches.forEach((x) => {
      if (x.includes("h")) {
        time_ms += Number((x.match(/[0-9]+/g) || [])[0] || 0) * 3600 * 1000;
      } else if (x.includes("m")) {
        time_ms += Number((x.match(/[0-9]+/g) || [])[0] || 0) * 60 * 1000;
      }
    });
    return time_ms;
  };

  const timeValidator = (value: string) => {
    const matches =
      /^([0-9]+h(?:\s)){0,1}([0-9]+m(?:\s){0,1}){0,1}$/g
        .exec(value + " ")
        ?.filter((x) => !!x) || [];
    const minuteValid = matches.reduce((store, x) => {
      if (x.includes("m")) {
        store = Number((x.match(/[0-9]+/g) || [])[0] || 0) <= 59;
      }
      return store;
    }, true);
    return (
      (matches.length == 0 && `Example valid format: "1h", "2h 3m" or "4m"`) ||
      (!minuteValid && "Maximum minute is 59") ||
      ""
    );
  };

  const timeMaxValidator = (value: string) => {
    const isValid =
      timeStrToMs(value) > timeStrToMs(timeMinVal)
        ? ""
        : "Max duration can't be smaller than min duration";
    return isValid;
  };

  const { showToast } = useToast();

  useEffect(() => {
    if (state?.success == true) {
      ref.current?.reset();
      onClose();
      showToast({
        type: "success",
        message: `Success adding new office "${state?.data?.name}"!`,
        title: "Success",
      });
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
                    className="grid grid-cols-12 gap-4 mt-8"
                    action={dispatch}
                    ref={ref}
                  >
                    <Input icon={<IconAlphabetLatin/>} wrapperClassName="col-span-12" label="Name" id="name" name="name" type="text" />
                    <TextArea icon={<IconMap2/>}  wrapperClassName="col-span-12" label="Address" id="address" name="address" />
                    
                    <fieldset className="flex flex-col w-full max-w-full col-span-12 gap-1">
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
                        wrapperClassName="col-span-12"
                        icon={<IconTextCaption/>}
                      />
                    <Input
                      label="Min. duration"
                      id="room_duration_min"
                      name="room_duration_min"
                      type="text"
                      wrapperClassName="col-span-12 md:col-span-6"
                      onChange={(e) => setTimeMinVal(e.target.value)}
                      validator={timeValidator}
                      icon={<IconClockMinus/>}
                    />
                    <Input
                      required
                      label="Max. duration"
                      id="room_duration_max"
                      name="room_duration_max"
                      type="text"
                      wrapperClassName="col-span-12 md:col-span-6"
                      validator={(value) =>
                        timeValidator(value) || timeMaxValidator(value)
                      }
                    icon={<IconClockPlus/>}
                    />
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
    </>
  );
}

export default AddOffice;
