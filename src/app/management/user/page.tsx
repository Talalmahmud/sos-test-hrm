"use client";
import { AuthContext } from "@/components/ContextProvider";
import UserPage from "@/components/user/UserPage";

import React, { useContext } from "react";

type Props = {};

const page = (props: Props) => {
  const mySession = useContext(AuthContext);

  return (
    <div className="">
      <UserPage />
    </div>
  );
};

export default page;
