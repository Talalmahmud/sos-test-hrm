"use client";
import React, { useEffect, useState } from "react";
import CustomizedTables from "./CustomizedTables";
import Select from "react-select";
import CustomModal from "../CustomModal";
import MemeberForm from "./MemeberForm";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { getEmployees } from "@/utils/commonfunction";
import LoadingProgressBar from "../LoadingProgressBar";
import { EndPoint } from "@/utils/api";
import axios from "axios";
import { ApiGet } from "@/app/action";

type Props = {};
const options = [
  {
    label: "All",
    value: "",
  },
  {
    label: "MARKETER",
    value: "MARKETER",
  },
  {
    label: "CONTENT WRITER",
    value: "CONTENT WRITER",
  },
  {
    label: "SUPPORT TEACHER",
    value: "SUPPORT TEACHER",
  },
  {
    label: "VIDEO EDITOR",
    value: "VIDEO EDITOR",
  },
  {
    label: "COMPUTER OPERATOR",
    value: "COMPUTER OPERATOR",
  },
  {
    label: "SOFTWARE ENGINEER",
    value: "SOFTWARE ENGINEER",
  },
];

const UserPage = (props: Props) => {
  const [selectedOption, setSelectedOption] = useState<any>("Admin");
  const [memberToggle, setMemberToggle] = useState(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [totalDataSet, setTotalDataSet] = useState(0);
  const pathName = usePathname();
  const searchParmas = useSearchParams();
  const router = useRouter();
  const [pageNo, setPageNo] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState<any>({ label: "All", value: "" });

  const [rows, setRows] = useState([]);
  const getAll = async () => {
    setIsLoading(true);
    // const res = await axios.get(EndPoint.GET_ALL_EMPLOY, {
    //   params: {
    //     limit: pageSize,
    //     offset: pageSize * pageNo,
    //     role: userRole?.value,
    //     name: userName,
    //   },
    // });

    const { resData, success } = await ApiGet(EndPoint.GET_ALL_EMPLOY, {
      limit: pageSize,
      offset: pageSize * pageNo,
      role: userRole?.value,
      name: userName,
    });
    setRows(resData?.results);
    setTotalDataSet(resData?.count);
    setIsLoading(false);
  };

  // const getAllByPage = async () => {
  //   setIsLoading(false);
  //   const res = await axios.get(
  //     EndPoint.GET_ALL_EMPLOY + `?limit=${pageSize}&offset=${pageSize * pageNo}`
  //   );
  //   const resData = await res.data;

  //   setRows(resData?.results);
  //   setTotalDataSet(resData?.count);
  //   setIsLoading(false);
  // };

  // useEffect(() => {
  //   getAllByPage();
  // }, [pageSize, pageNo]);

  useEffect(() => {
    getAll();
  }, [pageSize, pageNo, userName, userRole]);
  return (
    <div>
      <div className=" flex items-center justify-between pb-[24px]">
        <Select
          value={userRole}
          isClearable
          onChange={(e) => setUserRole(e)}
          options={options}
          className=" w-[300px] h-[40px] z-20 cursor-pointer"
        />
        <div className=" flex items-center">
          <input
            value={userName}
            onChange={(e: any) => setUserName(e.target.value)}
            type="text"
            className=" border-[1px] outline-none rounded-bl-[8px] rounded-tl-[8px] w-[518px] px-[24px] h-[40px] text-center"
            placeholder="Search user..."
          />
          <div className=" h-[40px] w-[40px] flex items-center justify-center rounded-tr-[8px] rounded-br-[8px] bg-orange ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M23.7723 22.6943L17.5759 16.5969C19.1985 14.834 20.1955 12.5024 20.1955 9.93682C20.1947 4.44852 15.6742 0 10.0974 0C4.52055 0 0 4.44852 0 9.93682C0 15.4251 4.52055 19.8736 10.0974 19.8736C12.5069 19.8736 14.7169 19.0402 16.4529 17.6546L22.6733 23.776C22.9764 24.0746 23.4685 24.0746 23.7716 23.776C23.8437 23.7056 23.901 23.6215 23.9401 23.5287C23.9792 23.4358 23.9994 23.3361 23.9995 23.2353C23.9996 23.1345 23.9795 23.0348 23.9405 22.9419C23.9015 22.849 23.8443 22.7648 23.7723 22.6943ZM10.0974 18.3448C5.37877 18.3448 1.55362 14.5804 1.55362 9.93682C1.55362 5.29321 5.37877 1.52884 10.0974 1.52884C14.816 1.52884 18.6411 5.29321 18.6411 9.93682C18.6411 14.5804 14.816 18.3448 10.0974 18.3448Z"
                fill="white"
              />
            </svg>
          </div>
        </div>

        <button
          className=" h-[42px] w-[170px] rounded-[8px] border-[1px] bg-orange text-white outline-none "
          onClick={() => setMemberToggle(true)}
        >
          Add Member
        </button>
      </div>

      <CustomizedTables
        isLoading={isLoading}
        pageNo={pageNo}
        pageSize={pageSize}
        setPageNo={setPageNo}
        setPageSize={setPageSize}
        searchOption={searchValue}
        getAll={getAll}
        rows={rows}
        total={totalDataSet}
      />

      {memberToggle && (
        <CustomModal setClose={setMemberToggle}>
          <MemeberForm getAll={getAll} modalHide={setMemberToggle} />
        </CustomModal>
      )}
    </div>
  );
};

export default UserPage;
