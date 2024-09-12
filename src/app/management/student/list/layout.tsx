"use client";
import { AuthContext } from "@/components/ContextProvider";
import SubLayout from "@/components/SubLayout";
// import Navbar from "@/components/navbar/Navbar";
import { EndPoint } from "@/utils/api";
import axios from "axios";
import { formatDate } from "date-fns";
// import { useRouter, useSearchParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
};

// const menuList = [
//   {
//     title: "Pending Support",
//     imgUrl: "/icons/admin_profile.svg",
//     pageLink: "/management/support/pending",
//     pathMatch: "/management/support/pending",
//   },
//   {
//     title: "Processing Support",
//     imgUrl: "/icons/history-icon.svg",
//     pageLink: "/management/support/processing",
//     pathMatch: "/management/support/processing",
//   },
//   {
//     title: "Completed Support",
//     imgUrl: "/icons/admin_sales.svg",
//     pageLink: "/management/support/completed",
//     pathMatch: "/management/support/completed",
//   },
//   {
//     title: "Support Transfer History",
//     imgUrl: "/icons/history-icon.svg",
//     pageLink: "/management/support/history",
//     pathMatch: "/management/support/history",
//   },
// ];

const SupportLayout = ({ children }: Props) => {
  const { user } = useContext(AuthContext);
  // const params = useSearchParams();

  // const router = useRouter();
  const [menuList, setMenulist] = useState<any>([]);
  const currentDate = formatDate(new Date(), "yyyy-MM-dd");
  // const paramData = params.get("options");
  // console.log(paramData);
  // useEffect(() => {
  //   console.log(paramData);
  // }, []);

  const supportData = async () => {
    if (user) {
      try {
        const res = await axios.get(EndPoint.STUDENT_NAV_DATA + user?.id);
        const result = await res.data;

        setMenulist([
          // {
          //   title: "Due Student",

          //   pageLink: "/management/student/list/due",
          //   pathMatch: "/management/student/list/due",

          // },
          {
            title: "All Student",

            pageLink: "/management/student/list/all",
            pathMatch: "/management/student/list/all",
            role: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          },
          {
            title: "Paid Student",

            pageLink: "/management/student/list/paid",
            pathMatch: "/management/student/list/paid",
            total: result?.paid_student,
            role: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          },
          {
            title: "Follow Student",

            pageLink: "/management/student/list/follow",
            pathMatch: "/management/student/list/follow",
            total: result?.follow_student,
            role: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          },
          {
            title: "My Student",

            pageLink: "/management/student/list/my",
            pathMatch: "/management/student/list/my",
            total: result?.entry_student,
            role: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          },
          // {
          //   title: "Unpaid Student",

          //   pageLink: "/management/student/list/unpaid",
          //   pathMatch: "/management/student/list/unpaid",
          // },
          // {
          //   title: "Inactive Student",

          //   pageLink: "/management/student/list/inactive",
          //   pathMatch: "/management/student/list/inactive",
          // },
          // {
          //   title: "Active Student",

          //   pageLink: "/management/student/list/active",
          //   pathMatch: "/management/student/list/active",
          // },
        ]);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    supportData();
  }, [user]);
  return (
    <div className=" w-full">
      <SubLayout
        dataFetch={supportData}
        itemList={menuList}
        boxWidth={264}
        grridSize={menuList.length - 1}
      />
      {children}
    </div>
  );
};

export default SupportLayout;
