"use client";
import SubLayoutAdmin from "@/components/SublayoutAdmin";
import { useParams } from "next/navigation";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const StudentLayout = ({ children }: Props) => {
  const params = useParams();
  const menuList = [
    {
      title: "Student Portal",
      imgUrl: "/icons/admin_profile.svg",
      pageLink: `/management/student/portal/${params?.slug}/student`,
      pathMatch: `/management/student/portal/${params?.slug}/student`,
      role: [0, 1, 2, 3, 4, 5, 6, 7, 9, 10],
    },
    {
      title: "Institute Portal",
      imgUrl: "/icons/admin_sales.svg",
      pageLink: `/management/student/portal/${params?.slug}/institute`,
      pathMatch: `/management/student/portal/${params?.slug}/institute`,
      role: [0, 1, 2, 3, 4, 5, 6, 7, 9, 10],
    },
  ];

  return (
    <div className=" w-full">
      <SubLayoutAdmin
        itemList={menuList}
        boxWidth={558}
        grridSize={menuList.length}
      />
      {children}
    </div>
  );
};

export default StudentLayout;
