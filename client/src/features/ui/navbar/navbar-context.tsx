import React, { ReactNode, useContext } from "react";

interface INavbarContext {
  close: () => any;
  open: () => any;
  isOpen: boolean;
}

export const NavbarContext = React.createContext<INavbarContext>(
  {} as INavbarContext
);

type NavbarProviderProps = { children: ReactNode } & INavbarContext;

const NavbarProvider = ({
  children,
  close,
  open,
  isOpen,
}: NavbarProviderProps) => {
  return (
    <NavbarContext.Provider value={{ close, open, isOpen }}>
      {children}
    </NavbarContext.Provider>
  );
};

const useNavbar = (): INavbarContext => {
  const context = useContext(NavbarContext);

  if (context === undefined) {
    throw new Error("useNavbar must be used within a NavbarProvider");
  }

  return context;
};

export { NavbarProvider, useNavbar };
