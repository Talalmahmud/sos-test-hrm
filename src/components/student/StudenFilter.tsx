"use client";
import React, { useContext, useEffect, useState } from "react";

import Select from "react-select";
import CustomModal from "../CustomModal";
import axios from "axios";
import { EndPoint } from "@/utils/api";
import { AuthContext } from "../ContextProvider";
import { usePathname, useRouter } from "next/navigation";
import FollowUpForm from "./FollowUpForm";
import { semesterList } from "../../utils/staticData";

type Props = {
  setBoardRoll?: any;
  boardRoll?: any;
  institute: any;
  setInstitute: any;
  sessionList: any;
  selectedSession: any;
  setSelectedSession: any;
  phone: any;
  setPhone: any;
  semester: any;
  setSemester: any;
  department: any;
  deprtmentList: any;
  selectedDepartment: any;
  setSelectedDepartment: any;
  selectedStatus?: any;
  setSelectedStatus?: any;
};
const options = [
  { value: "pending", label: "Pending" },
  { value: "due", label: "Due" },
  { value: "acttive", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

const customStyles = {
  control: (provided: any) => ({
    ...provided,
    backgroundColor: "#f2f2f2", // Set background color of the control to green
    color: "black", // Set text color to white
  }),

  menu: (provided: any) => ({
    ...provided,
    backgroundColor: "white", // Set background color of the menu to green
    color: "white", // Ensure text color is white for contrast
  }),

  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "orange"
      : state.isFocused
      ? "darkorange"
      : "white", // Different shades of green for different states
    color: "black", // Set text color to white
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: "black", // Set the color of the selected value text to white
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: "black", // Set placeholder text color to white
  }),
};

const StudenFilter = ({
  setBoardRoll,
  boardRoll,
  institute,
  setInstitute,
  sessionList,
  selectedSession,
  setSelectedSession,
  phone,
  setPhone,
  semester,
  setSemester,
  department,
  deprtmentList,
  selectedDepartment,
  setSelectedDepartment,
  selectedStatus,
  setSelectedStatus,
}: Props) => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const patnName = usePathname();
  const [selectedOption, setSelectedOption] = useState<any>("");
  const [toggle, setToggle] = useState(false);
  const [phoneList, setPhoneList] = useState<any>([]);
  const [studentNumber, setStudentNumber] = useState<any>("");

  const getPhoneList = async () => {
    if (phone !== "") {
      const res = await axios.get(
        EndPoint.STUDENT_PHONE_NUMBER + `?partial_number=${phone}`,
        {
          headers: { Authorization: "Bearer " + user?.access_token },
        }
      );
      const result = await res?.data;
      setPhoneList(result?.results);
    }
  };

  const handleKeyPress = async (event: any) => {
    // Check if the pressed key is "Enter"
    if (event.key === "Enter") {
      const res = await axios.get(EndPoint.STUDENT_PHONE_NUMBER, {
        headers: { Authorization: "Bearer " + user?.access_token },
        params: {
          exact_number: phone,
        },
      });
      const resData = await res.data;
      const resResult = await resData?.results[0];
      if (resResult?.label) {
        setToggle(true);
      } else {
        router.push(`/management/student/register?phone=${phone}`);
      }
      setStudentNumber(phone);

      // Log the input value to the console
      // if (phoneList?.length === 0) {
      //   setToggle(true);
      // } else {
      //   setToggle(false);
      // }
    }
  };

  const navigatationHandle = (sId: any) => {
    setToggle(true);
    setStudentNumber(sId);
    // router.push(`/management/student/list/due?phone=${sId}`);
  };

  useEffect(() => {
    getPhoneList();
  }, [phone]);

  return (
    <div className=" w-full flex flex-col gap-[16px] ">
      <div className=" grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-[4px] gap-x-[16px]">
        {patnName !== "/management/student/list/paid" && (
          <div className=" flex flex-col gap-[4px]">
            <p className=" text-[16px] font-semibold ">Status:</p>
            <div className=" w-full  cursor-pointer">
              <Select
                styles={customStyles}
                isSearchable
                isClearable
                defaultValue={selectedStatus}
                onChange={(e) => setSelectedStatus(e)}
                options={[
                  { label: "Un-Paid", value: "Un-Paid" },
                  { label: "Paid", value: "Paid" },
                  { label: "Pending", value: "Pending" },
                  { label: "Inactive", value: "Inactive" },
                  { label: "Due", value: "Due" },
                ]}
                className="  h-[41px] text-[16px] cursor-pointer"
                placeholder="Select Status.."
              />
            </div>
          </div>
        )}
        <div className=" flex flex-col gap-[4px]">
          <p className=" text-[16px] font-semibold ">Department:</p>
          <div className=" w-full  cursor-pointer">
            <Select
              styles={customStyles}
              isSearchable
              value={selectedDepartment}
              isClearable
              onChange={(e) => setSelectedDepartment(e)}
              options={deprtmentList}
              className=" h-[41px] text-[16px] cursor-pointer"
              placeholder="Select department"
            />
          </div>
        </div>

        <div className=" flex flex-col gap-[4px] text-[16px] ">
          <p className=" text-[16px] font-semibold">Board Roll:</p>
          <input
            type="number"
            value={boardRoll}
            placeholder=" Enter Board Roll"
            onChange={(e) => setBoardRoll(e.target.value)}
            className=" w-full px-[8px] h-[36px] text-[16px] rounded-[4px] outline-none border-[1px] border-gray_light"
          />
        </div>

        <div className=" flex flex-col gap-[4px]">
          <p className=" text-[16px] font-semibold ">Semester:</p>
          <div className=" w-full  cursor-pointer">
            <Select
              styles={customStyles}
              value={semester}
              isClearable
              onChange={(e) => setSemester(e)}
              maxMenuHeight={150}
              options={semesterList}
              className="  h-[41px] text-[16px] cursor-pointer"
              placeholder="Select Semester..."
            />
          </div>
        </div>

        <div className=" flex flex-col gap-[4px]">
          <p className=" text-[16px] font-semibold ">Session:</p>
          <div className=" w-full  cursor-pointer">
            <Select
              styles={customStyles}
              value={selectedSession}
              options={sessionList}
              isClearable
              className="  h-[41px] text-[16px] cursor-pointer"
              placeholder="Select session..."
              onChange={(e) => setSelectedSession(e)}
            />
          </div>
        </div>
        <div className=" flex flex-col gap-[4px] text-[16px] ">
          <p className=" text-[16px] font-semibold">Phone:</p>
          <div className=" relative">
            <input
              type="text"
              onKeyDown={handleKeyPress}
              value={phone}
              placeholder="Enter student phone number"
              onChange={(e) => setPhone(e.target.value)}
              className=" w-full px-[8px] h-[36px] text-[16px] outline-none border-[1px] border-gray_light rounded-[4px] "
            />
            {phone !== "" && phoneList?.length !== 0 && (
              <div className=" absolute py-[4px] flex flex-col max-h-[100px] top-[42px] z-30 left-0 w-full  border-[1px] shadow-md bg-white rounded-md overflow-auto ">
                {phoneList?.map((item: any, index: number) => (
                  <p
                    key={index}
                    onClick={() => navigatationHandle(item?.label)}
                    className=" cursor-pointer hover:bg-orange hover:text-white py-[4px] px-[8px]"
                  >
                    {item?.label}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* <div className=" flex flex-col gap-[4px]">
          <p className=" text-[16px] font-semibold ">Department:</p>
          <div className=" w-full  cursor-pointer">
            <Select
              
              onInputChange={(e) => setDepartmentInput(e)}
              onChange={(data: any) =>
                setSupportInfo({ ...supportInfo, department: data.value })
              }
              options={departmentList}
              className=" w-full h-[28px] cursor-pointer"
              placeholder="Select department..."
            />
          </div>
        </div> */}
      </div>
      {toggle && (
        <CustomModal setClose={() => setToggle(false)}>
          <div className=" max-w-[1100px]">
            <FollowUpForm studentId={studentNumber} />
          </div>
        </CustomModal>
      )}
      {/* <div>
        <div className=" flex items-center gap-x-[24px]">
          <button className=" border-[1px]  rounded-[8px] h-[34px] w-[98px] flex justify-center items-center">
            Reset
          </button>
          <button className=" border-[1px] bg-orange text-white rounded-[8px] h-[34px] w-[98px] flex justify-center items-center">
            Find
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default StudenFilter;
