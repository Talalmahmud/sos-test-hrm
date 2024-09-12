"use client";
import { getSession } from "@/utils/commonfunction";
import React, { createContext, useEffect, useMemo, useState } from "react";

type Props = {
  children: React.ReactNode;
};
export const AuthContext = createContext<any>(null);
const ContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<any>(null);
  const [globalToggle, setGolbalToggle] = useState(true);
  const value = useMemo(
    () => ({ user, setUser, globalToggle, setGolbalToggle }),
    [user, globalToggle]
  );
  const setUserData = async () => {
    const d = await getSession();
    setUser(d);
  };

  useEffect(() => {
    setUserData();
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default ContextProvider;
