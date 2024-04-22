import clsx from "clsx";
import Link from "next/link";
import {
  JSXElementConstructor,
  ReactElement,
  cloneElement
} from "react";
import { Url } from "url";

interface Props
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "disabled"> {
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "danger";
  shadow?: boolean;
  icon?: ReactElement<any, string | JSXElementConstructor<any>>;
  href: Url | string;
  disabled?: boolean;
}

function ButtonLink({
  size = "md",
  variant = "primary",
  shadow,
  className,
  icon,
  children,
  href,
  disabled,
  ...props
}: Props) {
  return (
    <Link
      href={href}
      className={clsx(
        "font-bold outline outline-1 outline-transparent transition-all duration-200",
        variant == "primary" &&
          "bg-emerald-600 text-white hover:outline-emerald-400",
        variant == "secondary" &&
          "bg-slate-700 text-white hover:outline-slate-400",
        size == "sm" && "btn-sm",
        size == "md" && "btn-md",
        size == "lg" && "btn-lg",
        shadow && "shadow-xl",
        disabled && "grayscale-[0.8] hover:cursor-not-allowed pointer-events-none",
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
    </Link>
  );
}

export default ButtonLink;
