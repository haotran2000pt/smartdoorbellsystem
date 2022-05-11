import classNames from "classnames";
import React, { HTMLProps } from "react";

interface LabelProps extends HTMLProps<HTMLLabelElement> {}

const Label: React.FC<LabelProps> = ({ className, ...props }) => {
  return (
    <label
      className={classNames(className, "font-semibold mb-1 block")}
      {...props}
    ></label>
  );
};

export default Label;
