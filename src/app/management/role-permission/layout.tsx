import SubLayout from "@/components/SubLayout";
import React from "react";

const menuList = [
  {
    title: "Add Group",

    pageLink: "/management/role-permission/add-group",
    pathMatch: "/management/role-permission/add-group",
  },

  {
    title: "Add Permission",

    pageLink: "/management/role-permission/add-permission",
    pathMatch: "/management/role-permission/add-permission",
  },
];
type Props = {
  children: React.ReactNode;
};

const PermissionLayout = ({ children }: Props) => {
  return (
    <div>
      <SubLayout
        itemList={menuList}
        boxWidth={364}
        grridSize={menuList.length - 1}
      />
      <div className=" "> {children}</div>
    </div>
  );
};

export default PermissionLayout;
