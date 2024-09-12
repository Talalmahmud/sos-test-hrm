import SubLayoutAdmin from "@/components/SublayoutAdmin";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const menuList = [
  {
    title: "Create Plan",

    pageLink: "/management/package/plan",
    pathMatch: "plan",
    role: [0],
  },
  {
    title: "Custom Date",

    pageLink: "/management/package/custom",
    pathMatch: "custom",
    role: [0],
  },
  {
    title: "Independent Days",
    pageLink: "/management/package/independent",
    pathMatch: "independent",
    role: [0],
  },
  {
    title: "DUET Package",
    pageLink: "/management/package/duet-exam",
    pathMatch: "duet-exam",
    role: [0],
  },
  {
    title: "Polytechnic Package",
    pageLink: "/management/package/semester-exam",
    pathMatch: "semester-exam",
    role: [0],
  },
  {
    title: "Date Package",
    pageLink: "/management/package/custom-package",
    pathMatch: "/management/package/custom-package",
    role: [0],
  },
  {
    title: "Days Package",
    pageLink: "/management/package/independent-package",
    pathMatch: "/management/package/independent-package",
    role: [0],
  },
  {
    title: "Package Price Setup",
    pageLink: "/management/package/package-price",
    pathMatch: "package-price",
    role: [0],
  },
];

const DashBoardLayout = ({ children }: Props) => {
  return (
    <div className=" w-full">
      <SubLayoutAdmin
        itemList={menuList}
        boxWidth={364}
        grridSize={menuList.length - 1}
      />
      {children}
    </div>
  );
};

export default DashBoardLayout;
