"use client";
import { AuthContext } from "@/components/ContextProvider";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";

type Props = {};

const Page = (props: Props) => {
  // const { user } = useContext(AuthContext);
  // const router = useRouter();
  // useEffect(() => {
  //   user?.role === 0
  //     ? router.push("/management/dashboard/admin")
  //     : router.push("/management/dashboard/employee");
  // }, [user]);
  return <div>dashboard</div>;
};

export default Page;
