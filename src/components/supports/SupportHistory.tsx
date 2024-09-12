"use client";
import { EndPoint } from "@/utils/api";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../ContextProvider";
import Select from "react-select";
import Calendar from "../Calendar";
import { formatDate } from "date-fns";
import SupportDropdown from "./SupportDropdown";
import { useRouter } from "next/navigation";

type Props = {};

const SupportHistory = (props: Props) => {
  const [historyList, setHistoryList] = useState<any>(null);
  const urlRouter = useRouter();
  const currentDate = formatDate(new Date(), "yyyy-MM-dd");
  const [selectedDataSupport, setSelectedDataSupport] =
    useState<any>(currentDate);
  const [startDateSupportSummary, setStartDateSupportSummary] =
    useState("2024-04-05");
  const [endDateSupportSummary, setEndDateSupportSummary] = useState(
    formatDate(new Date(), "yyyy-MM-dd")
  );
  const [selectedType, setSelectedType] = useState("");

  const { user } = useContext(AuthContext);

  const getHistory = async () => {
    if (user?.phone_number) {
      const paramsData = {
        support_teacher: user?.phone_number,
        type: selectedType,
        start_date: selectedDataSupport ? "" : startDateSupportSummary,
        end_date: selectedDataSupport ? "" : endDateSupportSummary,
        options: selectedDataSupport,
      };
      const res = await axios.get(EndPoint.SUPPORT_HISTORY, {
        params: paramsData,
      });
      const result = await res.data;
      setHistoryList(result.results);
    }
  };
  const getDropDownList = async () => {
    const res = await axios.get(EndPoint.SUPPORT_DROPDOWN_LIST);
    const result = await res.data;
    setSelectedDataSupport(result[1].value);
  };

  const nevigateToDetials = async (supportId: any) => {
    urlRouter.push(`/management/support-view/${supportId}`);
  };

  useEffect(() => {
    getDropDownList();
  }, []);
  useEffect(() => {
    getHistory();
  }, [user, selectedDataSupport, selectedType]);
  return (
    <div>
      <div className=" py-[16px] flex items-center justify-between">
        <Select
          options={[
            {
              value: "",
              label: "All Transfer",
            },
            {
              value: "sent",
              label: "Send",
            },
            {
              value: "received",
              label: "Received",
            },
          ]}
          onChange={(e: any) => setSelectedType(e.value)}
          className=" w-[233px] z-20 text-[16px] h-[40px] text-black cursor-pointer placeholder:text-black"
        />
        <SupportDropdown
          selectedData={selectedDataSupport}
          setSelectedData={setSelectedDataSupport}
          setStartDate={setStartDateSupportSummary}
          setEndDate={setEndDateSupportSummary}
          startDate={startDateSupportSummary}
          endDate={endDateSupportSummary}
        />
      </div>
      <div className=" border-[1px] ">
        <table className="w-full table-fixed text-center text-[#121212] rounded-[16px] ">
          <thead className=" bg-[#DBDDE2] ">
            <tr className=" text-[16px] ">
              <th className=" px-4 py-2 text-[16px] font-normal ">Sender</th>
              <th className=" px-4 py-2 text-[16px] font-normal ">Receiver</th>

              <th className=" px-4 py-2 text-[16px] font-normal ">Time</th>
              <th className=" px-4 py-2 text-[16px] font-normal ">
                Support Id
              </th>

              <th className=" px-4 py-2 text-[16px] font-normal ">Reason</th>
            </tr>
          </thead>
          <tbody>
            {historyList?.map((item: any, index: any) => (
              <tr
                key={index}
                className={` ${
                  item?.sender?.phone_number === user?.phone_number
                    ? " bg-title"
                    : " bg-green"
                } text-[12px] border-b-[1px] text-white border-white hover:bg-blue cursor-pointer `}
                onClick={() => nevigateToDetials(item?.support)}
              >
                <td className=" py-[8px]">{item?.sender?.name}</td>
                <td>{item?.receiver?.name}</td>
                <td>
                  <p>{item?.transfer_date}</p>
                </td>
                <td>{item?.support}</td>
                <td>{item?.transfer_reason.slice(0, 50)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SupportHistory;
