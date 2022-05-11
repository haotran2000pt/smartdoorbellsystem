import classNames from "classnames";
import React, { HTMLAttributes } from "react";

interface TabButtonProps extends HTMLAttributes<HTMLButtonElement> {
  active: boolean;
}

const TabButton = React.forwardRef<HTMLButtonElement, TabButtonProps>(
  ({ active, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={classNames("p-2 font-semibold rounded-lg flex-center transition-colors my-1 min-w-[60px] text-xs", {
          "text-indigo-500 bg-indigo-100": active,
          "hover:bg-gray-100": !active,
        })}
        {...props}
      />
    );
  }
);

export default TabButton;
