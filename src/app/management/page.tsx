"use client";
import { AuthContext } from "@/components/ContextProvider";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";

type Props = {};

const page = (props: Props) => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const userPageSelect = () => {
    if (user?.role === 0) {
      router.push("/management/dashboard/admin");
    } else {
      router.push("/management/dashboard/employee");
    }
  };
  useEffect(() => {
    userPageSelect();
  }, [user]);
  return <div>page</div>;
};

export default page;
