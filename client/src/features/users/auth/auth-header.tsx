import React, { ReactNode } from "react";

interface AuthHeaderProps {
  children: ReactNode;
}

const AuthHeader: React.FC<AuthHeaderProps> = ({ children }) => {
  return <h1 className="text-center text-2xl font-bold mb-6">{children}</h1>;
};

export default AuthHeader;
