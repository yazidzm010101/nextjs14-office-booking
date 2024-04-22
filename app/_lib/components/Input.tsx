import clsx from "clsx";
import { ChangeEvent, InputHTMLAttributes, ReactNode, useRef, useState } from "react";

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  size?: "sm" | "md" | "lg";
  wrapperClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
  validator?: (value: string) => string;
}

function Input({
  label,
  wrapperClassName,
  inputClassName,
  labelClassName,
  size = "md",
  validator,
  onChange,
  ...props
}: Props) {
  const ref = useRef<HTMLInputElement>(null)
  const [message, setMessage] = useState("")
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const errMessage = validator && validator(ref?.current?.value || "") || ""
    console.log(ref?.current?.value?.match(/([0-9]+h){0,1}([0-9]+m){0,1}/g))
    console.log({errMessage})
    e.currentTarget.setCustomValidity(errMessage)
    setMessage(errMessage)
    onChange && onChange(e)
  }

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
      <input
        ref={ref}
        className={clsx(
          size == "sm" && "px-3 py-3 text-xs rounded-md",
          size == "md" && "px-3 py-3 text-sm rounded-lg",
          size == "lg" && "px-3 py-3 text-md rounded-xl",
          "autofill:bg-white/20",
          props.readOnly ? "bg-transparent hover:outline-emerald-300/25" : "bg-white/5 focus:outline-emerald-300",
          "text-white transition-all duration-75 focus:outline-emerald-300 focus:border-0 focus:outline outline-transparent",
          inputClassName
        )}
        onChange={handleChange}
        {...props}
      />
      {
        message && (
          <div className={clsx("text-xs text-red-600 transition-all duration-100 py-1 px-1")}>
            { message }
          </div>
        )
      }
    </>
  );
}

export default Input;
