import clsx from "clsx";
import { InputHTMLAttributes, ReactNode } from "react";

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  size?: "sm" | "md" | "lg";
  wrapperClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
}

function Input({
  label,
  wrapperClassName,
  inputClassName,
  labelClassName,
  size = "md",
  ...props
}: Props) {
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
        className={clsx(
          size == "sm" && "px-3 py-3 text-xs rounded-md",
          size == "md" && "px-3 py-3 text-sm rounded-lg",
          size == "md" && "px-3 py-3 text-md rounded-xl",
          "autofill:bg-white/20",
          "text-white transition-all duration-75 bg-white/5 focus:border-0 focus:outline outline-transparent focus:outline-2 focus:outline-emerald-300",
          inputClassName
        )}
        {...props}
      />
    </>
  );
}

export default Input;
