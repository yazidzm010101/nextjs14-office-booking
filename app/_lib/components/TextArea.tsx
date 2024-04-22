"use client";

import clsx from "clsx";
import {
  JSXElementConstructor,
  ReactElement,
  TextareaHTMLAttributes,
  cloneElement,
  useEffect,
  useRef,
} from "react";

import autosize from "autosize";

interface Props
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  label?: string;
  size?: "sm" | "md" | "lg";
  icon?: ReactElement<any, string | JSXElementConstructor<any>>;
  wrapperClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
}

function TextArea({
  label,
  icon,
  wrapperClassName,
  inputClassName,
  labelClassName,
  size = "md",
  ...props
}: Props) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (ref.current) {
      autosize(ref.current);
    }
  }, [ref?.current]);

  return (
    <fieldset
      className={clsx("flex flex-col max-w-full gap-1", wrapperClassName)}
    >
      {label && (
        <label
          htmlFor={props.id}
          className={clsx(
            "dark:text-gray-400 px-3",
            size == "sm" && "text-sm",
            size == "md" && "text-md",
            size == "lg" && "text-lg",
            labelClassName
          )}
        >
          {label}
        </label>
      )}
      <div
        className={clsx(
          "relative flex items-center",
          size == "sm" && "text-xs",
          size == "md" && "text-sm",
          size == "lg" && ""
        )}
      >
        {icon && (
          <div className="absolute top-0 left-0 flex items-center justify-center h-[3em] text-white/50 w-14">
            {cloneElement(icon, { className: "w-full" })}
          </div>
        )}
        <textarea
          className={clsx(
            "text-white px-3 py-3  w-full transition-all duration-75 focus:outline-emerald-300 focus:border-0 focus:outline outline-transparent",
            size == "sm" && "text-xs rounded-md",
            size == "md" && " rounded-lg",
            size == "lg" && "text-md rounded-xl",
            "autofill:bg-white/20",
            props.readOnly
              ? "bg-transparent hover:outline-emerald-300/25"
              : "bg-white/5 focus:outline-emerald-300",
            icon && "pl-12",
            inputClassName
          )}
          {...props}
          ref={ref}
          rows={props.rows || 1}
        />
      </div>
    </fieldset>
  );
}

export default TextArea;
