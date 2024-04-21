import clsx from "clsx";
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  JSXElementConstructor,
  ReactElement,
  cloneElement
} from "react";

interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "danger";
  shadow?: boolean;
  icon?: ReactElement<any, string | JSXElementConstructor<any>>;
}

function Button({
  size = "md",
  variant = "primary",
  shadow,
  className,
  icon,
  children,
  ...props
}: Props) {
  return (
    <button
      className={clsx(
        "font-bold outline outline-1 outline-transparent transition-all duration-200",
        variant == "primary" && "bg-emerald-600 text-white hover:outline-emerald-400",
        variant == "secondary" && "bg-slate-700 text-white hover:outline-slate-400",
        size == "sm" && "btn-sm",
        size == "md" && "btn-md",
        size == "lg" && "btn-lg",
        shadow && "shadow-xl",
        className
      )}
      {...props}
    >
      {icon && (
        <span className="inline-block align-middle me-2">
          {cloneElement(icon, {
            className: "icon",
          })}
        </span>
      )}
      <span className="inline-block align-middle">{children}</span>
    </button>
  );
}

export default Button;
