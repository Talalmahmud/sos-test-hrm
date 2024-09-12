"use client";
import { AuthContext } from "@/components/ContextProvider";
import SubLayoutAdmin from "@/components/SublayoutAdmin";

import React, { useContext } from "react";

type Props = {
  children: React.ReactNode;
};

const menuList = [
  {
    title: "Admin Dashboard",
    imgUrl: "/icons/admin_profile.svg",
    pageLink: "/management/dashboard/admin",
    pathMatch: "admin",
    role: [0],
  },
  {
    title: "Sales Dashboard",
    imgUrl: "/icons/admin_sales.svg",
    pageLink: "/management/dashboard/sales",
    pathMatch: "sales",
    role: [0],
  },
  {
    title: "Analytics Dashboard",
    imgUrl: "/icons/admin_analysis.svg",
    pageLink: "/management/dashboard/analytics",
    pathMatch: "analytics",
    role: [0],
  },
];

const DashBoardLayout = ({ children }: Props) => {
  const { user } = useContext(AuthContext);

  return (
    <div className=" w-full">
      {user?.role === 0 ? (
        <SubLayoutAdmin
          itemList={menuList}
          boxWidth={364}
          grridSize={menuList.length - 1}
        />
      ) : (
        <></>
      )}
      {/* <SubLayout
        itemList={menuList}
        boxWidth={364}
        grridSize={menuList.length - 1}
      /> */}
      {children}
    </div>
  );
};

export default DashBoardLayout;
