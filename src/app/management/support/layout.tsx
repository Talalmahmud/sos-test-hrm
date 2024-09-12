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
        const res = await axios.get(
          EndPoint.SUPPORT_NAVBAR_DATA + `?teacher_number=${user?.phone_number}`
        );
        const result = await res.data;
        setMenulist([
          {
            title: "Pending Support",
            imgUrl: "/icons/admin_profile.svg",
            pageLink: "/management/support/pending",
            pathMatch: "/management/support/pending",
            total: result.pending,
          },
          {
            title: "Solving Support",
            imgUrl: "/icons/history-icon.svg",
            pageLink: "/management/support/processing",
            pathMatch: "/management/support/processing",
            total: result.processing,
          },
          {
            title: "Solved Support",
            imgUrl: "/icons/admin_sales.svg",
            pageLink: "/management/support/completed",
            pathMatch: "/management/support/completed",
            total: result.completed,
          },
          {
            title: "Support Transfer History",
            imgUrl: "/icons/history-icon.svg",
            pageLink: "/management/support/history",
            pathMatch: "/management/support/history",
            total: result.transfer_sent + "/" + result.transfer_received,
          },
          {
            title: "Support Summary",
            pageLink: "/management/support-summary",
            pathMatch: "/management/support-summary",
          },
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
        itemList={menuList}
        boxWidth={264}
        grridSize={menuList.length - 1}
      />
      {children}
    </div>
  );
};

export default SupportLayout;
