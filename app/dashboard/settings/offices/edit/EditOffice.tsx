"use client";

import { IconAlphabetLatin, IconCheck, IconChevronLeft, IconClockMinus, IconClockPlus, IconMap, IconPencil, IconTextCaption } from "@tabler/icons-react";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { editOffice } from "~/_lib/actions/office";
import Button from "~/_lib/components/Button";
import Input from "~/_lib/components/Input";
import ButtonLink from "~/_lib/components/ButtonLink";
import TextArea from "~/_lib/components/TextArea";
import EditOfficePhoto from "./EditOfficePhoto";
import { useToast } from "~/_lib/state/toast-state";

function ActionButtons({ isEdit, toggleEdit, setEdit }: any) {
  const { pending } = useFormStatus();
  useEffect(() => {
    if (pending) {
      setEdit(false);
    }
  }, [pending]);
  return (
    <div className="flex gap-2 mb-4">
      <ButtonLink
        className="me-auto"
        icon={<IconChevronLeft />}
        href={"/dashboard/settings/offices"}
        variant="secondary"
        disabled={pending}
      >
        Back
      </ButtonLink>

      {!isEdit && (
        <Button
          icon={<IconPencil />}
          onClick={toggleEdit}
          type="button"
          disabled={pending}
        >
          Edit
        </Button>
      )}
      {isEdit && (
        <>
          <Button
            onClick={() => {setEdit(false)}}
            type="button"
            variant="secondary"
            disabled={pending}
          >
            Cancel
          </Button>
          <Button icon={<IconCheck />} type="submit" disabled={pending}>
            Save
          </Button>
        </>
      )}
    </div>
  );
}

function EditOffice({
  office,
}: {
  office: {
    id: string;
    name: string;
    address: string;
    description: string;
    room_duration_min: string;
    room_duration_max: string;
    photo: string;
  };
}) {
  const [isEdit, setEdit] = useState(false);
  const toggleEdit = () => setEdit((prevVal) => !prevVal);
  const handleUpdate = editOffice.bind(null, office.id);
  const [state, dispatch] = useFormState(handleUpdate, undefined);

  const [timeMinVal, setTimeMinVal] = useState(office.room_duration_min);

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
    let time_ms = 0;
    matches.forEach((x) => {
      if (x.includes("h")) {
        time_ms += Number((x.match(/[0-9]+/g) || [])[0] || 0) * 3600 * 1000;
      } else if (x.includes("m")) {
        time_ms += Number((x.match(/[0-9]+/g) || [])[0] || 0) * 60 * 1000;
      }
    });
    console.log({ time_ms });
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

  const ref = useRef<HTMLFormElement>(null);

  const { showToast } = useToast();

  useEffect(() => {
    if (state?.success) {
      ref?.current?.reset();
      showToast({
        type: "success",
        message: `"${state?.data?.name}" successfully updated!`,
        title: "Success",
      });
    }
  }, [state]);

  useEffect(() => {
    if (isEdit == false) {
      ref?.current?.reset();
    }
  }, [isEdit])

  return (
    <form className="my-3 mb-10" action={dispatch} ref={ref}>
      <ActionButtons
        toggleEdit={toggleEdit}
        isEdit={isEdit}
        setEdit={setEdit}
      />
      <div className="flex flex-wrap items-start gap-4 sm:flex-nowrap">
        <div
          className={"w-full sm:w-48 md:w-52 relative aspect-square rounded-lg flex-shrink-0"}
        >
          <EditOfficePhoto
            id={office.id}
            photo={office?.photo}
            name={office?.name}
          />
        </div>
        <div
          className={clsx(
            "grid flex-grow grid-cols-12 px-2 py-3 bg-gray-800 rounded-xl transition-all duration-200",
            (isEdit && "gap-5 pt-4") || "gap-0"
          )}
        >
          <Input
            size="lg"
            icon={<IconAlphabetLatin/>}
            readOnly={!isEdit}
            id="name"
            name="name"
            wrapperClassName={clsx("col-span-12 -mt-2")}
            inputClassName={clsx("text-gray-300")}
            placeholder="Enter the office name"
            required
            defaultValue={office?.name}
          />
          <TextArea
            readOnly={!isEdit}
            id="address"
            name="address"
            size="lg"
            icon={<IconMap/>}
            placeholder="Address"
            wrapperClassName={clsx("col-span-12 -mt-2")}
            inputClassName={clsx("text-gray-300")}
            required
            defaultValue={office?.address}
          />
          <TextArea
            readOnly={!isEdit}
            icon={<IconTextCaption/>}
            id="description"
            name="description"
            size="lg"
            placeholder="Description"
            wrapperClassName={clsx("col-span-12 -mt-2")}
            inputClassName={clsx("text-gray-300")}
            required
            defaultValue={office?.description}
          />
          <div className="flex flex-wrap col-span-12 md:col-span-6 md:flex-nowrap">
            <Input
              size="lg"
              id="room_duration_min"
              name="room_duration_min"
              type="text"
              readOnly={!isEdit}
              icon={<IconClockMinus/>}
              wrapperClassName="flex-grow -mt-2"
              onChange={(e) => setTimeMinVal(e.target.value)}
              defaultValue={office?.room_duration_min}
              validator={timeValidator}
            />
            <div className="items-center justify-center flex-shrink-0 hidden px-4 text-lg font-bold text-gray-300 md:block w-fit">
              <span>-</span>
            </div>
              <Input
                size="lg"
                required
                icon={<IconClockPlus/>}
                wrapperClassName="flex-grow -mt-2"
                id="room_duration_max"
                name="room_duration_max"
                readOnly={!isEdit}
                type="text"
                defaultValue={office?.room_duration_max}
                validator={(value) =>
                  timeValidator(value) || timeMaxValidator(value)
                }
              />
          </div>
        </div>
      </div>
    </form>
  );
}

export default EditOffice;
