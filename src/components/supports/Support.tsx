"use client";
import React, { useContext, useEffect, useState } from "react";
import SupportTable from "./SupportTable";
import SupportTableWithTitle from "./SupportTableWithTitle";
import { AuthContext } from "../ContextProvider";
import axios from "axios";
import { EndPoint } from "@/utils/api";
import Calendar from "../Calendar";
import { formatDate } from "date-fns";
import SupportDropdown from "./SupportDropdown";
import { usePathname, useRouter } from "next/navigation";

type Props = {
  status: any;
};

const Support = ({ status }: Props) => {
  const { user } = useContext(AuthContext);
  const [polytechnicList, setPolytechnicList] = useState<any>(null);
  const [jobList, setJobList] = useState<any>(null);
  const [duetList, setDuetList] = useState<any>(null);
  const [dropList, setDropList] = useState([]);
  const [searchId, setSearchId] = useState<any>("");

  const [filterType, setFilterType] = useState("All");
  const currentDate = formatDate(new Date(), "yyyy-MM-dd");
  const [selectedDataSupport, setSelectedDataSupport] =
    useState<any>(currentDate);
  const [startDateSupportSummary, setStartDateSupportSummary] =
    useState("2024-04-05");
  const [endDateSupportSummary, setEndDateSupportSummary] = useState(
    formatDate(new Date(), "yyyy-MM-dd")
  );

  const fitlerSelected = (item: string) => {
    setFilterType(item);
  };

  const getPolytechnicSupport = async () => {
    if (user) {
      const parmasData: any = {
        phone_number: user?.phone_number,
        category: "1",
        status: status,
        start_date: selectedDataSupport ? "" : startDateSupportSummary,
        end_date: selectedDataSupport ? "" : endDateSupportSummary,
        options: selectedDataSupport,
        support_id: searchId,
      };
      try {
        const res = await axios.get(EndPoint.Category_SUPPORT, {
          params: parmasData,
        });
        const resResult = await res.data;
        setPolytechnicList(resResult);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getJobSupport = async () => {
    if (user) {
      const parmasData: any = {
        phone_number: user?.phone_number,
        category: "3",
        status: status,

        start_date: selectedDataSupport ? "" : startDateSupportSummary,
        end_date: selectedDataSupport ? "" : endDateSupportSummary,
        options: selectedDataSupport,
        support_id: searchId,
      };
      try {
        const res = await axios.get(EndPoint.Category_SUPPORT, {
          params: parmasData,
        });
        const resResult = await res.data;

        setJobList(resResult);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getDuetSupport = async () => {
    if (user) {
      const parmasData: any = {
        phone_number: user?.phone_number,
        category: "2",
        status: status,
        start_date: selectedDataSupport ? "" : startDateSupportSummary,
        end_date: selectedDataSupport ? "" : endDateSupportSummary,
        options: selectedDataSupport,
        support_id: searchId,
      };
      try {
        const res = await axios.get(EndPoint.Category_SUPPORT, {
          params: parmasData,
        });
        const resResult = await res.data;
        setDuetList(resResult);
      } catch (error: any) {
        console.log(error);
      }
    }
  };
  const router = useRouter();
  const path = usePathname();

  const getDropDownList = async () => {
    const res = await axios.get(EndPoint.SUPPORT_DROPDOWN_LIST);
    const result = await res.data;
    setSelectedDataSupport(result[1].value);
    setDropList(result);
  };

  useEffect(() => {
    getDropDownList();
  }, []);

  useEffect(() => {
    getPolytechnicSupport();
    getDuetSupport();
    getJobSupport();
  }, [selectedDataSupport, user, status, searchId]);
  return (
    <>
      <div className=" w-full flex items-center justify-center gap-[16px] py-[16px]">
        <button
          className={` ${
            filterType === "All" ? "bg-green" : "bg-orange"
          }  h-[35px] w-[200px] text-white rounded-[50px] text-[16px] `}
          onClick={() => fitlerSelected("All")}
        >
          All
        </button>
        <button
          className={` ${
            filterType === "Polytechnic" ? "bg-green" : "bg-orange"
          }  h-[35px] w-[200px] text-white rounded-[50px] text-[16px] `}
          onClick={() => fitlerSelected("Polytechnic")}
        >
          Polytechnic
        </button>
        <button
          className={` ${
            filterType === "Job" ? "bg-green" : "bg-orange"
          }  h-[35px] w-[200px] text-white rounded-[50px] text-[16px] `}
          onClick={() => fitlerSelected("Job")}
        >
          Job
        </button>
        <button
          className={` ${
            filterType === "Duet" ? "bg-green" : "bg-orange"
          }  h-[35px] w-[200px] text-white rounded-[50px] text-[16px] `}
          onClick={() => fitlerSelected("Duet")}
        >
          DUET
        </button>
      </div>

      <div className=" w-full flex justify-between items-center">
        <input
          type="text"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className=" border-[1px] border-gray_light rounded-[4px] outline-none py-[4px] px-[16px] text-[20px]"
          placeholder=" Search by support id"
        />
        <SupportDropdown
          selectedData={selectedDataSupport}
          setSelectedData={setSelectedDataSupport}
          setStartDate={setStartDateSupportSummary}
          setEndDate={setEndDateSupportSummary}
          startDate={startDateSupportSummary}
          endDate={endDateSupportSummary}
        />
        {/* <div className=" relative max-w-[240px] min-w-[240px] rounded-[8px] ">
          <div
            className=" flex h-[37px] items-center justify-center gap-[4px] cursor-pointer "
            onClick={() => setToggleCalendar(!toogleCalendar)}
          >
            <p className=" text-[24px] text-black select-none">
              {formatDate(selectDate, "MMMM dd, yyyy")}
            </p>

            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="10"
                viewBox="0 0 16 10"
                fill="none"
              >
                <path
                  d="M0.846963 1.0225C1.05793 0.811595 1.34403 0.693115 1.64234 0.693115C1.94065 0.693115 2.22674 0.811595 2.43771 1.0225L8.00646 6.59125L13.5752 1.0225C13.7874 0.817572 14.0716 0.704178 14.3665 0.706741C14.6615 0.709305 14.9437 0.82762 15.1523 1.0362C15.3608 1.24479 15.4792 1.52695 15.4817 1.82192C15.4843 2.11689 15.3709 2.40107 15.166 2.61325L8.80184 8.97738C8.59087 9.18828 8.30477 9.30676 8.00646 9.30676C7.70815 9.30676 7.42206 9.18828 7.21109 8.97738L0.846963 2.61325C0.636058 2.40228 0.517578 2.11618 0.517578 1.81787C0.517578 1.51957 0.636058 1.23347 0.846963 1.0225Z"
                  fill="black"
                />
              </svg>
            </div>
          </div>
          {toogleCalendar && (
            <div className=" absolute top-[42px] z-10 left-0">
              <Calendar
                startDate={selectDate}
                setStartDate={setSelectDate}
                setToggleCalendar={setToggleCalendar}
                showMonthYear={false}
              />
            </div>
          )}
        </div> */}
      </div>
      <div className=" w-full flex flex-col gap-[32px]">
        {(filterType === "All" || filterType === "Polytechnic") && (
          <SupportTableWithTitle
            title=" Polytechnic Support Dashboard"
            allList={polytechnicList}
          />
        )}

        {(filterType === "All" || filterType === "Job") && (
          <SupportTableWithTitle
            title=" JOB Support Dashboard"
            allList={jobList}
          />
        )}

        {(filterType === "All" || filterType === "Duet") && (
          <SupportTableWithTitle
            title=" DUET Support Dashboard"
            allList={duetList}
          />
        )}
      </div>
    </>
  );
};

export default Support;
