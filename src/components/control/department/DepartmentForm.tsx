import { EndPoint } from "@/utils/api";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";

type Props = {
  formClose: any;
  department_id?: number;
  editToggle?: any;
  listUpdate?: any;
};

const DepartmentForm = ({
  formClose,
  department_id,
  editToggle,
  listUpdate,
}: Props) => {
  const [emptyCheck, setEmptyCheck] = useState(false);

  const [departmentData, setDepartmentData] = useState({
    full_name: "",
    short_name: "",
    department_code: 0,
  });
  const getDepartment = async () => {
    if (department_id) {
      try {
        const res = await axios.get(
          EndPoint.GET_DEPARTMENT_BY_ID + department_id
        );
        const resResult = await res.data;

        setDepartmentData(resResult);
        setEmptyCheck(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const addDepartment = async () => {
    if (
      departmentData.full_name !== "" &&
      departmentData.short_name !== "" &&
      departmentData.department_code !== 0
    ) {
      try {
        const res = await axios.post(EndPoint.ADD_DEPARTMENT, departmentData);

        listUpdate();
        toast.success("Department is added.");
        formClose(false);
        setDepartmentData({
          full_name: "",
          short_name: "",
          department_code: 0,
        });
      } catch (error: any) {
        if (error?.response) {
          toast.error(Object.values(error.response.data).join(""));
        } else {
          toast.error("An unexpected error occurred.");
        }
      }
    } else {
      setEmptyCheck(true);
    }
  };
  const updateDepartment = async () => {
    if (
      departmentData.full_name !== "" &&
      departmentData.short_name !== "" &&
      departmentData.department_code !== 0
    ) {
      try {
        const res = await axios.patch(
          EndPoint.UPDATE_DEPARTMENT + department_id,
          departmentData
        );

        listUpdate();
        toast.success("Department is updated.");
        formClose(false);
        setDepartmentData({
          full_name: "",
          short_name: "",
          department_code: 0,
        });
      } catch (error: any) {
        if (error?.response) {
          toast.error(Object.values(error.response.data).join(""));
        } else {
          toast.error("An unexpected error occurred.");
        }
      }
    }
  };

  useEffect(() => {
    getDepartment();
  }, [department_id]);
  return (
    <div className=" w-[461px] rounded-[16px] bg-button_bg text-white p-[16px] flex flex-col justify-center gap-[16px]">
      <div className=" flex flex-col gap-[4px] text-[16px] ">
        <p className=" text-[16px] font-semibold text-white">
          Department Name:
        </p>
        <input
          value={departmentData?.full_name}
          onChange={(e: any) =>
            setDepartmentData({ ...departmentData, full_name: e.target.value })
          }
          type="text"
          placeholder="Enter Department Name"
          className=" w-full px-[8px] h-[40px] text-[16px] rounded-[8px] text-black"
        />
        {emptyCheck && departmentData?.full_name === "" && (
          <p className=" text-red text-[16px]">
            Department full name is empty.
          </p>
        )}
      </div>
      <div className=" flex flex-col gap-[4px] text-[16px] ">
        <p className=" text-[16px] font-semibold text-white">
          Department Short Name:
        </p>
        <input
          value={departmentData?.short_name}
          onChange={(e: any) =>
            setDepartmentData({ ...departmentData, short_name: e.target.value })
          }
          type="text"
          placeholder="Enter Department Name"
          className=" w-full px-[8px] h-[40px] text-[16px] rounded-[8px] text-black"
        />

        {emptyCheck && departmentData?.short_name === "" && (
          <p className=" text-red text-[16px]">
            Department short name is empty.
          </p>
        )}
      </div>

      <div className=" flex flex-col gap-[4px] text-[16px] ">
        <p className=" text-[16px] font-semibold text-white">
          Department Code:
        </p>
        <input
          value={departmentData?.department_code}
          onChange={(e: any) =>
            setDepartmentData({
              ...departmentData,
              department_code: e.target.value,
            })
          }
          type="number"
          placeholder="Enter Department Name"
          className=" w-full px-[8px] h-[40px] text-[16px] rounded-[8px] text-black"
        />
      </div>

      <div className=" flex justify-end items-center gap-[16px]">
        <button
          onClick={() => {
            setEmptyCheck(false);
            formClose(false);
          }}
          className=" flex justify-center items-center  text-white w-[115px] h-[39px] border-[1px] border-white rounded-[8px]"
        >
          Cancel
        </button>
        {department_id ? (
          <button
            onClick={() => updateDepartment()}
            className=" flex justify-center items-center bg-border_orange text-white w-[116px] h-[40px] rounded-[8px]"
          >
            Update
          </button>
        ) : (
          <button
            onClick={() => addDepartment()}
            className=" flex justify-center items-center bg-border_orange text-white w-[116px] h-[40px] rounded-[8px]"
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
};

export default DepartmentForm;
