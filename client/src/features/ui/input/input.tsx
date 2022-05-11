import classNames from "classnames";
import React, { HTMLProps } from "react";

interface InputProps extends HTMLProps<HTMLInputElement> {
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ error, className, ...props }, ref) => {
    return (
      <div>
        <div
          className={classNames(className, "rounded-lg border transition", {
            "border-red-500": error,
            "hover:border-gray-300 focus-within:!border-indigo-500": !error,
          })}
        >
          <input
            ref={ref}
            className="bg-transparent w-full py-2 px-2.5"
            {...props}
          />
        </div>
        {error && (
          <div className="text-[13px] pl-1.5 text-red-600 font-medium">
            {error}
          </div>
        )}
      </div>
    );
  }
);

export default Input;
