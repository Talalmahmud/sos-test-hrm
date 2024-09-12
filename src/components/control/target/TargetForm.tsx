import { EndPoint } from "@/utils/api";
import { customStyles, monthLabel } from "@/utils/staticData";
import axios from "axios";
import React, { memo, useEffect, useState } from "react";

import Select from "react-select";
import { toast } from "react-toastify";

type Props = {
  formClose: any;
  editToggle?: any;
  listUpdate?: any;
  catagory_id?: number;
};

const TargetForm = ({
  listUpdate,
  editToggle,
  formClose,
  catagory_id,
}: Props) => {
  const [emptyCheck, setEmptyCheck] = useState(false);

  const [categoryList, setCategoryList] = useState<any>([]);
  const [selectedCategory, setSelectedCategory] = useState<any>("");
  const [selectedMonth, setSelectedMonth] = useState<any>("");
  const [targetData, setTargetData] = useState<any>(null);

  const getCatagory = async () => {
    if (catagory_id) {
      try {
        const res = await axios.get(EndPoint.GET_TARGET_BY_ID + catagory_id);
        const resResult = await res.data;

        setSelectedCategory(resResult?.category);
        setSelectedMonth({
          label: monthLabel(resResult?.month),
          value: resResult?.month,
        });
        setTargetData(resResult?.target_value);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const addCatagory = async () => {
    const bodyData = {
      category: selectedCategory?.value,
      target_value: targetData,
      month: selectedMonth?.value,
    };
    try {
      const res = await axios.post(EndPoint.ADD_TARGET, bodyData);

      toast.success("Target is added.");
      listUpdate();
      formClose(false);
    } catch (error: any) {
      if (error?.response) {
        toast.error(Object.values(error.response.data).join(""));
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };
  const updateCatagory = async () => {
    const bodyData = {
      category: selectedCategory?.value,
      target_value: targetData,
      month: selectedMonth?.value,
    };
    try {
      const res = await axios.patch(
        EndPoint.UPDATE_TARGET + catagory_id,
        bodyData
      );

      toast.success("Target is Update.");
      listUpdate();
      formClose(false);
    } catch (error: any) {
      if (error?.response) {
        toast.error(Object.values(error.response.data).join(""));
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  const getCategoryList = async () => {
    const res = await axios.get(EndPoint.GET_DROPDOWN_CATAGORY);
    const result = await res.data;
    setCategoryList(result.results);
  };
  useEffect(() => {
    getCategoryList();
  }, []);
  useEffect(() => {
    getCatagory();
  }, [catagory_id]);
  return (
    <div className=" w-[461px] rounded-[16px] bg-button_bg text-white p-[16px] flex flex-col justify-center gap-[16px]">
      <div className=" flex flex-col gap-[4px] text-[16px] ">
        <p className=" text-white">Category Name:</p>
        <Select
          value={selectedCategory}
          options={categoryList}
          onChange={(e) => setSelectedCategory(e)}
          isClearable
          isSearchable
          placeholder="Select category..."
          className=" text-black"
        />
      </div>
      <div className=" flex flex-col gap-[4px] text-[16px] ">
        <p className=" text-white">Target Month:</p>
        <Select
          value={selectedMonth}
          options={[
            { value: 1, label: "January" },
            { value: 2, label: "February" },
            { value: 3, label: "March" },
            { value: 4, label: "April" },
            { value: 5, label: "May" },
            { value: 6, label: "June" },
            { value: 7, label: "July" },
            { value: 8, label: "August" },
            { value: 9, label: "September" },
            { value: 10, label: "October" },
            { value: 11, label: "November" },
            { value: 12, label: "December" },
          ]}
          onChange={(e) => setSelectedMonth(e)}
          isClearable
          isSearchable
          placeholder="Select category..."
          className=" text-black"
        />
      </div>
      <div className=" flex flex-col gap-[4px] text-[16px] ">
        <p className=" text-[16px] font-semibold text-white">Target Student:</p>
        <input
          type="number"
          value={targetData}
          onChange={(e: any) => setTargetData(e.target.value)}
          placeholder="Enter student quantity"
          className=" w-full px-[8px] h-[40px] text-[16px] rounded-[8px] text-black"
        />
      </div>

      <div className=" flex justify-end items-center gap-[16px]">
        <button
          onClick={() => formClose(false)}
          className=" flex justify-center items-center  text-white w-[115px] h-[39px] border-[1px] border-white rounded-[8px]"
        >
          Cancel
        </button>
        {catagory_id ? (
          <button
            onClick={() => updateCatagory()}
            className=" flex justify-center items-center bg-border_orange text-white w-[116px] h-[40px] rounded-[8px]"
          >
            Update
          </button>
        ) : (
          <button
            onClick={() => addCatagory()}
            className=" flex justify-center items-center bg-border_orange text-white w-[116px] h-[40px] rounded-[8px]"
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
};

export default memo(TargetForm);
