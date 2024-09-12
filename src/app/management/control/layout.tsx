import SubLayoutAdmin from "@/components/SublayoutAdmin";
import React from "react";

const menuList = [
  {
    title: "Add Catagory ",

    pageLink: "/management/control/catagory",
    pathMatch: "/management/control/catagory",
    role: [0],
  },
  {
    title: "Add Target ",

    pageLink: "/management/control/target",
    pathMatch: "/management/control/target",
    role: [0],
  },
  {
    title: "Add Probidan",

    pageLink: "/management/control/course",
    pathMatch: "/management/control/course",
    role: [0],
  },
  {
    title: "Session ",

    pageLink: "/management/control/session",
    pathMatch: "/management/control/session",
    role: [0],
  },
  {
    title: "DUET Schedule",

    pageLink: "/management/control/duet",
    pathMatch: "/management/control/duet",
    role: [0],
  },

  {
    title: "Semester Schedule",

    pageLink: "/management/control/semester",
    pathMatch: "/management/control/semester",
    role: [0],
  },
  {
    title: "Add Department",

    pageLink: "/management/control/department",
    pathMatch: "/management/control/department",
    role: [0],
  },
  {
    title: "Add Institute",

    pageLink: "/management/control/institute",
    pathMatch: "/management/control/institute",
    role: [0],
  },
];
type Props = {
  children: React.ReactNode;
};

const ControlLayout = ({ children }: Props) => {
  return (
    <div className=" w-full">
      <SubLayoutAdmin
        itemList={menuList}
        boxWidth={140}
        grridSize={menuList.length - 1}
      />
      <div className=" py-[24px]"> {children}</div>
    </div>
  );
};

export default ControlLayout;
