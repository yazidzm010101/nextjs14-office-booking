"use client";

import clsx from "clsx";
import {
  ReactNode,
  TextareaHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";

import autosize from "autosize";

interface Props
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  label?: string;
  size?: "sm" | "md" | "lg";
  wrapperClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
}

function TextArea({
  label,
  wrapperClassName,
  inputClassName,
  labelClassName,
  size = "md",
  ...props
}: Props) {
  const ref = useRef<HTMLTextAreaElement>(null);

  const wrapper = (component: ReactNode) =>
    label ? (
      <fieldset
        className={clsx(
          "flex flex-col max-w-full col-span-1 gap-1",
          wrapperClassName
        )}
      >
        {component}
      </fieldset>
    ) : (
      <>{component}</>
    );

  useEffect(() => {
    if (ref.current) {
      autosize(ref.current);
    }
  }, [ref?.current]);

  return wrapper(
    <>
      {label && (
        <label
          htmlFor={props.id}
          className={clsx(
            "dark:text-gray-400",
            size == "sm" && "text-sm",
            size == "md" && "text-md",
            size == "lg" && "text-lg",
            labelClassName
          )}
        >
          {label}
        </label>
      )}
      <textarea
        className={clsx(
          size == "sm" && "px-3 py-3 text-xs rounded-md",
          size == "md" && "px-3 py-3 text-sm rounded-lg",
          size == "lg" && "px-3 py-3 text-md rounded-xl",
          "autofill:bg-white/20 resize-none",
          props.readOnly ? "bg-transparent hover:outline-emerald-300/25" : "bg-white/5 focus:outline-emerald-300",
          "text-white transition-all duration-75 focus:border-0 focus:outline outline-transparent focus:outline-2",
          inputClassName
        )}
        {...props}
        ref={ref}
        rows={1}
      />
    </>
  );
}

export default TextArea;
