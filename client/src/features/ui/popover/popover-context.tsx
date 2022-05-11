import React, { ReactNode, useContext } from "react";

interface IPopoverContext {
  close: () => any;
}

export const PopoverContext = React.createContext<IPopoverContext>(
  {} as IPopoverContext
);

type PopoverProviderProps = { children: ReactNode; close: () => any };

const PopoverProvider = ({ children, close }: PopoverProviderProps) => {
  return (
    <PopoverContext.Provider value={{ close }}>
      {children}
    </PopoverContext.Provider>
  );
};

const usePopover = (): IPopoverContext => {
  const context = useContext(PopoverContext);

  if (context === undefined) {
    throw new Error("usePopover must be used within a PopoverProvider");
  }

  return context;
};

export { PopoverProvider, usePopover };
