"use client";
import React, { memo, useEffect, useState } from "react";
import Select from "react-select";
import Pagination from "../Pagination";
import axios from "axios";
import { EndPoint } from "@/utils/api";
import { format, formatDate } from "date-fns";
import SupportDropdown from "./SupportDropdown";
import { useRouter, useSearchParams } from "next/navigation";
import { customStyles } from "@/utils/staticData";
import Image from "next/image";

type Props = {};

const SupportSummaryDetails = (props: Props) => {
  const params = useSearchParams();
  const statusCheck = params.get("status");
  const numberCheck = params.get("teacherNumber");
  const dateCheck = params.get("selectedDate");
  const nameCheck = params.get("name");
  const [pageNo, setPageNo] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [totalDataSet, setTotalDataSet] = useState(0);
  const [departmentInput, setDepartmentInput] = useState("");
  const [departmentList, setDepartmentList] = useState([]);

  const [subjectInput, setSubjectInput] = useState("");
  const [subjectList, setSubjectList] = useState([]);
  const [supportTeacher, setSupportTeacher] = useState([]);
  const [categoryList, setCategoryList] = useState<any>([]);

  const [supportList, setSupportList] = useState([]);

  const [supportInfo, setSupportInfo] = useState<any>({
    status: statusCheck,
    department: "",
    student_phone_number: "",
    teacher_id: numberCheck,
    subject: "",
    category: "",
    package: "",
    semester: "",
    support_id: "",
  });

  const currentDate = formatDate(new Date(), "yyyy-MM-dd");
  const [selectedDataSupport, setSelectedDataSupport] =
    useState<any>(dateCheck);
  const [startDateSupportSummary, setStartDateSupportSummary] =
    useState("2024-04-05");
  const [endDateSupportSummary, setEndDateSupportSummary] = useState(
    formatDate(new Date(), "yyyy-MM-dd")
  );

  const getSupportList = async () => {
    try {
      const res = await axios.get(EndPoint.SUPPORT_DETAILS_ADMIN, {
        params: {
          limit: pageSize,
          offset: pageNo * pageSize,
          status: supportInfo?.status,
          teacher: supportInfo?.teacher_id,
          phone_number: supportInfo?.student_phone_number,
          subject: supportInfo?.subject,
          category: supportInfo?.category,
          department: supportInfo?.department,
          package: supportInfo?.package,
          support_id: supportInfo?.support_id,
          start_date: selectedDataSupport ? "" : startDateSupportSummary,
          end_date: selectedDataSupport ? "" : endDateSupportSummary,
          options: selectedDataSupport,
        },
      });
      const result = await res.data;

      setSupportList(result.results);
      setTotalDataSet(result?.count);
    } catch (error) {
      console.log(error);
    }
  };

  const getSupportTeacher = async () => {
    try {
      const res = await axios.get(EndPoint.SUPPORT_TEACHER);
      const result = await res.data;

      setSupportTeacher(result.results);
    } catch (error) {
      console.log(error);
    }
  };

  const departmentFilter = async () => {
    if (supportInfo?.category !== "" && departmentInput !== "") {
      const res = await axios.get(
        EndPoint.GET_ALL_DEPARTMENT_LIST +
          `?name=${departmentInput}&category=${supportInfo?.category}`
      );
      const result = await res.data;
      setDepartmentList(result?.results);
    }
    const res = await axios.get(
      EndPoint.GET_ALL_DEPARTMENT_LIST +
        `?name=${departmentInput}&category=${supportInfo?.category}`
    );
    const result = await res.data;
    setDepartmentList(result?.results);
  };

  const getCategoryList = async () => {
    const res = await axios.get(EndPoint.SUPPORT_CATEGORY);
    const result = await res.data;

    setCategoryList([{ label: "All", value: "" }, ...result?.results]);
  };

  const subjectFilter = async () => {
    if (supportInfo?.category !== "" && subjectInput !== "") {
      const res = await axios.get(
        EndPoint.GET_ALL_SUBJECT_LIST +
          `?name=${subjectInput}&category=${supportInfo?.category}`
      );
      const result = await res.data;
      setSubjectList(result?.results);
    }
  };
  const urlRouter = useRouter();
  const nevigateToDetials = async (supportId: any, supportStatus: string) => {
    urlRouter.push(`/management/support-view/${supportId}`);
  };

  useEffect(() => {
    getCategoryList();
    getSupportTeacher();
  }, []);
  useEffect(() => {
    departmentFilter();
  }, [departmentInput, supportInfo]);

  useEffect(() => {
    subjectFilter();
  }, [subjectInput, supportInfo]);

  useEffect(() => {
    getSupportList();
  }, [pageSize, pageNo, supportInfo]);

  useEffect(() => {
    getSupportList();
  }, [
    pageNo,
    pageSize,
    supportInfo,
    startDateSupportSummary,
    endDateSupportSummary,
    selectedDataSupport,
  ]);
  return (
    <div>
      <div className=" grid grid-cols-4 gap-[20px]">
        <div className=" flex flex-col gap-[4px]">
          <p className=" text-[16px] font-semibold ">Status:</p>
          <div className=" w-full  cursor-pointer">
            <Select
              isSearchable
              placeholder={statusCheck?.toUpperCase() || "Select status..."}
              onChange={(e: any) =>
                setSupportInfo({ ...supportInfo, status: e.value })
              }
              options={[
                {
                  label: "All",
                  value: "",
                },
                {
                  label: "Created",
                  value: "created",
                },
                {
                  label: "Procesing",
                  value: "processing",
                },
                {
                  label: "Completed",
                  value: "completed",
                },
              ]}
              className=" z-40"
            />
          </div>
        </div>
        <div className=" flex flex-col gap-[4px]">
          <p className=" text-[16px] font-semibold ">Teacher:</p>
          <div className=" w-full  cursor-pointer">
            <Select
              isSearchable
              onChange={(data: any) =>
                setSupportInfo({ ...supportInfo, teacher_id: data.value })
              }
              options={supportTeacher}
              className=" w-full h-[28px] cursor-pointer z-30"
              placeholder={nameCheck || "Select teacher..."}
            />
          </div>
        </div>

        <div className=" flex flex-col gap-[4px] text-[16px] ">
          <p className=" text-[16px] font-semibold">Student:</p>
          <input
            type="text"
            onChange={(e) =>
              setSupportInfo({
                ...supportInfo,
                student_phone_number: e.target.value,
              })
            }
            placeholder="Enter phone number"
            className=" w-full px-[8px] h-[40px] text-[16px] rounded-[8px] border-[1px] border-gray_light  outline-none "
          />
        </div>
        <div className=" flex flex-col gap-[4px]">
          <p className=" text-[16px] font-semibold ">Semester:</p>
          <div className=" w-full  cursor-pointer">
            <Select
              isSearchable
              placeholder="Select semester..."
              isMulti
              maxMenuHeight={150}
              options={[
                {
                  label: "1st",
                  value: 1,
                },
                {
                  label: "12nd",
                  value: 2,
                },
                {
                  label: "3n",
                  value: 3,
                },
                {
                  label: "4th",
                  value: 4,
                },
                {
                  label: "5th",
                  value: 5,
                },
                {
                  label: "6th",
                  value: 6,
                },
                {
                  label: "7th",
                  value: 7,
                },
                {
                  label: "8th",
                  value: 8,
                },
              ]}
              className=" w-full text-[16px] z-30 text-black cursor-pointer"
            />
          </div>
        </div>

        <div className=" flex flex-col gap-[4px]">
          <p className=" text-[16px] font-semibold ">Category:</p>
          <div className=" w-full  cursor-pointer">
            <Select
              onChange={(data: any) =>
                setSupportInfo({ ...supportInfo, category: data.value })
              }
              options={categoryList}
              className=" w-full z-20 h-[28px] cursor-pointer"
              placeholder="Select category..."
            />
          </div>
        </div>
        <div className=" flex flex-col gap-[4px]">
          <p className=" text-[16px] font-semibold ">Department:</p>
          <div className=" w-full  cursor-pointer">
            <Select
              onInputChange={(e) => setDepartmentInput(e)}
              onChange={(data: any) =>
                setSupportInfo({ ...supportInfo, department: data.value })
              }
              isDisabled={supportInfo?.category === "" ? true : false}
              options={departmentList}
              className=" w-full z-20 h-[28px] cursor-pointer"
              placeholder="Select department..."
            />
          </div>
        </div>

        <div className=" flex flex-col gap-[4px]">
          <p className=" text-[16px] font-semibold ">Subject:</p>
          <div className=" w-full  cursor-pointer">
            <Select
              onInputChange={(e) => setSubjectInput(e)}
              onChange={(data: any) =>
                setSupportInfo({ ...supportInfo, subject: data.value })
              }
              isDisabled={supportInfo?.category === "" ? true : false}
              options={subjectList}
              className=" w-full h-[28px] z-20 cursor-pointer"
              placeholder="Select subject..."
            />
          </div>
        </div>
        <div className=" flex flex-col gap-[4px]">
          <p className=" text-[16px] font-semibold ">Package:</p>
          <div className=" w-full  cursor-pointer">
            <Select
              placeholder="Select package..."
              onChange={(e: any) =>
                setSupportInfo({ ...supportInfo, package: e.value })
              }
              options={[
                {
                  label: "All",
                  value: "",
                },
                {
                  label: "Basic",
                  value: "basic",
                },
                {
                  label: "Premium",
                  value: "premium",
                },
                {
                  label: "Daimond",
                  value: "dimond",
                },
                {
                  label: "Free",
                  value: "free",
                },
              ]}
              className=" w-full z-20 text-[16px] text-black cursor-pointer"
            />
          </div>
        </div>
      </div>
      <div className=" flex justify-between items-center pt-[16px] ">
        <div className=" flex items-center  className= h-[41px]  ">
          <input
            type="text"
            onChange={(e) =>
              setSupportInfo({ ...supportInfo, support_id: e.target.value })
            }
            className=" h-full w-[653px] border-[1px] rounded-tr-none rounded-br-none rounded-[8px] px-[16px] outline-none "
            placeholder=" Search by support id"
          />
          <div className=" bg-title h-[40px] w-[40px] flex justify-center items-center rounded-tr-[8px] rounded-br-[8px] ">
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

        <SupportDropdown
          selectedData={dateCheck ? dateCheck : selectedDataSupport}
          setSelectedData={setSelectedDataSupport}
          setStartDate={setStartDateSupportSummary}
          setEndDate={setEndDateSupportSummary}
          startDate={startDateSupportSummary}
          endDate={endDateSupportSummary}
        />
      </div>
      <div className=" border-[1px] border-gray_light my-[16px]">
        <table className="w-full text-center">
          <thead className="bg-[#DBDDE2] sticky top-0 z-10">
            <tr className=" align-top">
              <th className="px-4 py-2 text-[13px] font-semibold">Date</th>
              <th className="px-4 py-2 text-[13px] font-semibold">
                Support ID
              </th>
              <th className="px-4 py-2 text-[13px] font-semibold">Student</th>
              <th className="px-4 py-2 text-[13px] font-semibold">
                Support Teacher
              </th>
              <th className="px-4 py-2 text-[13px] font-semibold">Category</th>
              <th className="px-4 py-2 text-[13px] font-semibold">
                Department
              </th>
              <th className="px-4 py-2 text-[13px] font-semibold">Package</th>
              <th className="px-4 py-2 text-[13px] font-semibold">Semester</th>
              <th className="px-4 py-2 text-[13px] font-semibold">Subject</th>
              <th className="px-4 py-2 text-[13px] font-semibold">Status</th>
              <th className="px-4 py-2 text-[13px] font-semibold">Review</th>
            </tr>
          </thead>
          <tbody>
            {supportList?.map((item: any, index: any) => (
              <tr
                onClick={() => nevigateToDetials(item?.id, item?.status)}
                key={index}
                className=" border-b-[1px] border-gray_light align-top hover:bg-bg_card cursor-pointer text-[12px]"
              >
                <td className="px-4 py-2 ">{item?.created_at}</td>
                <td className="px-4 py-2 ">{item?.id}</td>
                <td className="px-4 py-2 ">{item?.user}</td>
                <td className="px-4 py-2 ">{item?.teacher}</td>
                <td className="px-4 py-2 ">{item?.category}</td>
                <td className="px-4 py-2 ">{item?.department}</td>
                <td className="px-4 py-2 ">{item?.package}</td>

                <td className="px-4 py-2 ">1st</td>
                <td className="px-4 py-2 ">{item?.subject}</td>
                <td className="px-4 py-2 ">{item?.status}</td>
                <td className="px-4 py-2  ">{item?.comment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        pageNo={pageNo}
        pageSize={pageSize}
        setPageNo={setPageNo}
        setPageSize={setPageSize}
        totalPage={totalDataSet}
      />
    </div>
  );
};

export default memo(SupportSummaryDetails);
