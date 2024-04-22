import clsx from "clsx";
import {
  ChangeEvent,
  InputHTMLAttributes,
  JSXElementConstructor,
  ReactElement,
  cloneElement,
  useRef,
  useState,
} from "react";

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  size?: "sm" | "md" | "lg";
  icon?: ReactElement<any, string | JSXElementConstructor<any>>;
  wrapperClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
  validator?: (value: string) => string;
}

function Input({
  label,
  icon,
  wrapperClassName,
  inputClassName,
  labelClassName,
  size = "md",
  validator,
  onChange,
  ...props
}: Props) {
  const ref = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const errMessage =
      (validator && validator(ref?.current?.value || "")) || "";
    console.log(ref?.current?.value?.match(/([0-9]+h){0,1}([0-9]+m){0,1}/g));
    console.log({ errMessage });
    e.currentTarget.setCustomValidity(errMessage);
    setMessage(errMessage);
    onChange && onChange(e);
  };

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
        <input
          ref={ref}
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
          onChange={handleChange}
          {...props}
        />
      </div>
      {message && (
        <div
          className={clsx(
            "text-xs text-red-600 transition-all duration-100 py-1 px-1"
          )}
        >
          {message}
        </div>
      )}
    </fieldset>
  );
}

export default Input;
