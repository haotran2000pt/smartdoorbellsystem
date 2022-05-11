import React, { ReactNode, useContext } from "react";

interface IModalContext {
  close: () => any;
}

export const ModalContext = React.createContext<IModalContext>(
  {} as IModalContext
);

type ModalProviderProps = { children: ReactNode; close: () => any };

const ModalProvider = ({ children, close }: ModalProviderProps) => {
  return (
    <ModalContext.Provider value={{ close }}>{children}</ModalContext.Provider>
  );
};

const useModal = (): IModalContext => {
  const context = useContext(ModalContext);

  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }

  return context;
};

export { ModalProvider, useModal };
