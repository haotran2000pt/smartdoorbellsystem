import classNames from "classnames";
import React, { HTMLAttributes, MouseEvent } from "react";
import ThreeDotsLoader from "../loading/three-dots-loader";

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  disabled?: boolean;
  theme?: "primary" | "secondary" | "danger";
}

const Button: React.FC<ButtonProps> = ({
  loading = false,
  disabled = false,
  theme = "primary",
  children,
  onClick,
  className,
  ...props
}) => {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    !loading && !disabled && onClick && onClick(e);
  };

  return (
    <button
      onClick={handleClick}
      className={classNames(
        className,
        "p-2 text-white font-semibold w-full rounded-md transition-colors",
        {
          "bg-indigo-500": theme === "primary",
          "bg-red-500": theme === "danger",
          "hover:bg-indigo-600 active:bg-indigo-700":
            theme === "primary" && !loading && !disabled,
          "hover:bg-red-600 active:bg-red-700":
            theme === "danger" && !loading && !disabled,
          "pointer-events-none": loading,
          "!bg-indigo-300 cursor-not-allowed text-gray-100":
            theme === "primary" && disabled,
          "!bg-red-300 cursor-not-allowed text-gray-100":
            theme === "danger" && disabled,
        }
      )}
      {...props}
    >
      {loading ? <ThreeDotsLoader /> : children}
    </button>
  );
};

export default Button;
