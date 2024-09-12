"use client";
import { AuthContext } from "@/components/ContextProvider";
import Pagination from "@/components/Pagination";
import SubLayout from "@/components/SubLayout";
import { EndPoint } from "@/utils/api";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

// const menuList = [
//   {
//     title: "Pending Access ",
//     pageLink: "/management/course/pending-access",
//     pathMatch: "/management/course/pending-access",
//   },
//   {
//     title: "Due Course ",
//     pageLink: "/management/course/due-course",
//     pathMatch: "/management/course/due-course",
//   },

//   // {
//   //   title: "Today Course ",
//   //   pageLink: "/management/course/today-course",
//   //   pathMatch: "/management/course/today-course",
//   // },
//   {
//     title: "Paid Course",
//     pageLink: "/management/course/paid-course",
//     pathMatch: "/management/course/paid-course",
//   },
//   {
//     title: "My Course",
//     pageLink: "/management/course/my-course",
//     pathMatch: "/management/course/my-course",
//   },
//   {
//     title: "All Course",
//     pageLink: "/management/course/all-course",
//     pathMatch: "/management/course/all-course",
//   },
// ];
type Props = {
  children: React.ReactNode;
};

const CourseLayout = ({ children }: Props) => {
  const { user } = useContext(AuthContext);

  const [menuList, setMenuList] = useState<any>([]);

  const supportData = async () => {
    if (user) {
      try {
        const res = await axios.get(EndPoint.ENROLLMENT_STATISTICS, {
          headers: {
            Authorization: `Bearer ${user?.access_token}`,
          },
        });
        const result = await res.data;
        setMenuList([
          {
            title: "Pending Access ",
            pageLink: "/management/course/pending-access",
            pathMatch: "/management/course/pending-access",
            total: result?.pending_students,
            role: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          },
          {
            title: "Due Payment ",
            pageLink: "/management/course/due-payment",
            pathMatch: "/management/course/due-payment",
            total: result?.due_students,
            role: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          },
          {
            title: "Due Pending ",
            pageLink: "/management/course/due-course",
            pathMatch: "/management/course/due-course",
            total: result?.due_pending_students,
            role: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          },
          {
            title: "Due Complete",
            pageLink: "/management/course/due-complete",
            pathMatch: "/management/course/due-complete",
            total: result?.due_complete_students,
            role: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          },
          {
            title: "Today Enrolled",
            pageLink: "/management/course/today-course",
            pathMatch: "/management/course/today-course",
            total: result?.today_paid_students,
            role: [0],
          },

          // {
          //   title: "Paid Enrolled",
          //   pageLink: "/management/course/paid-course",
          //   pathMatch: "/management/course/paid-course",
          //   total: result?.paid_students,
          //   role: [0],
          // },
          {
            title: "My Enrolled",
            pageLink: "/management/course/my-course",
            pathMatch: "/management/course/my-course",
            total: result?.my_students,
            role: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          },
          {
            title: "All Enrolled",
            pageLink: "/management/course/all-course",
            pathMatch: "/management/course/all-course",
            total: result?.all_students,
            role: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          },
        ]);
        // console.log({ result });
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    supportData();
  }, [user]);
  return (
    <div className=" w-full  ">
      <div className=" w-full">
        <SubLayout
          dataFetch={supportData}
          itemList={menuList}
          boxWidth={264}
          grridSize={menuList.length - 1}
        />
      </div>

      <div> {children}</div>
    </div>
  );
};

export default CourseLayout;
