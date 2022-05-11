import React from "react";

interface DividerProps {
  spacing?: number;
}

const Divider = ({ spacing = 6 }: DividerProps) => {
  return (
    <div
      style={{ marginTop: spacing, marginBottom: spacing }}
      className="h-0 w-full border-t"
    />
  );
};

export default Divider;
