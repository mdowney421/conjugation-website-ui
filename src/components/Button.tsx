import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "outline" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const Button = ({
  variant = "primary",
  type = "button",
  className,
  ...rest
}: ButtonProps) => (
  <button
    type={type}
    className={`btn btn-${variant}${className ? ` ${className}` : ""}`}
    {...rest}
  />
);

export default Button;
