import axios from "axios";
import _ from "lodash";
import React, { ReactNode, useContext } from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import { useState } from "react";
import { IAuthResponse, User } from "src/@types/user.type";
import axiosApi from "src/features/api/axiosApi";
import { setAccessToken } from "src/utils/token.utils";

type AuthStatus = "unauthenticated" | "authenticated" | "loading";

interface IAuthContext {
  user: User | null;
  updateUser: (user: IAuthResponse) => any;
  updateUserField: (user: Partial<User>) => any;
  status: AuthStatus;
  logout: () => any;
}

const AuthContext = React.createContext<IAuthContext>({} as IAuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [initialized, setInitialized] = useState(false);

  const status = useMemo<AuthStatus>(() => {
    if (user) {
      return "authenticated";
    }
    if (!initialized) {
      return "loading";
    }
    return "unauthenticated";
  }, [user, initialized]);

  const updateUser = (response: IAuthResponse) => {
    setUser(response.user);
    if (response.tokens) {
      setAccessToken(response.tokens.access);
    }
  };

  const updateUserField = (fields: Partial<User>) => {
    if (user) setUser({ ...user, ...fields });
  };

  const logout = async () => {
    setUser(null);
    window.localStorage.removeItem("token");
    await axios.post("logout", {}, { withCredentials: true });
  };

  useEffect(() => {
    (async () => {
      try {
        const me = (await axiosApi.get<User>("/users/@me")).data;
        setUser(me);
      } catch (e: any) {
        console.log(e?.response ?? e.message);
      }
      setInitialized(true);
    })();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, updateUser, status, logout, updateUserField }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext);

  if (_.isUndefined(context)) {
    throw new Error("useModal must be used within a ModalProvider");
  }

  return context;
};

export { AuthContext, AuthProvider, useAuth };
