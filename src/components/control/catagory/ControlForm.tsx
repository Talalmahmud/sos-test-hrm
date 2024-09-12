import { EndPoint } from "@/utils/api";
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

const ControlForm = ({
  listUpdate,
  editToggle,
  formClose,
  catagory_id,
}: Props) => {
  const [emptyCheck, setEmptyCheck] = useState(false);
  const [catagoryData, setCataGoryData] = useState({
    status: false,
    category_name: "",
  });

  const getCatagory = async () => {
    if (catagory_id) {
      try {
        const res = await axios.get(EndPoint.GET_CATAGORY_BY_ID + catagory_id);
        const resResult = await res.data;
        setCataGoryData({
          category_name: resResult?.category_name,
          status: resResult?.status,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const addCatagory = async () => {
    try {
      if (
        catagoryData.status === true ||
        (catagoryData.status === false && catagoryData.category_name !== "")
      ) {
        const res = await axios.post(EndPoint.ADD_CATAGORY, catagoryData);
        setCataGoryData({
          status: false,
          category_name: "",
        });
        toast.success("Catagory is added.");
        listUpdate();
        formClose(false);
      } else {
        setEmptyCheck(true);
      }
    } catch (error: any) {
      if (error?.response) {
        toast.error(Object.values(error.response.data).join(""));
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };
  const updateCatagory = async () => {
    try {
      if (
        catagoryData.status === true ||
        (catagoryData.status === false && catagoryData.category_name !== "")
      ) {
        const res = await axios.patch(
          EndPoint.UPDATE_CATAGORY + catagory_id,
          catagoryData
        );
        setCataGoryData({
          status: false,
          category_name: "",
        });
        toast.success("Catagory is updated.");
        listUpdate();
        formClose(false);
      } else {
        setEmptyCheck(true);
      }
    } catch (error: any) {
      if (error?.response) {
        toast.error(Object.values(error.response.data).join(""));
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  useEffect(() => {
    getCatagory();
  }, [catagory_id]);
  return (
    <div className=" w-[461px] rounded-[16px] bg-button_bg text-white p-[16px] flex flex-col justify-center gap-[16px]">
      <div className=" flex flex-col gap-[4px] text-[16px] ">
        <p className=" text-white">Course Name:</p>
        <input
          value={catagoryData.category_name}
          onChange={(e) =>
            setCataGoryData({ ...catagoryData, category_name: e.target.value })
          }
          type="text"
          placeholder="Enter Catagory Name"
          className=" px-[8px] h-[40px] rounded-[8px] text-black"
        />
        {catagoryData.category_name === " " && emptyCheck && (
          <p className=" text-red text-[10px]"> Course name is empty.</p>
        )}
      </div>
      <div className=" flex flex-col gap-[4px]">
        <p className=" text-white text-[16px] font-semibold ">Status:</p>
        <div className=" w-full  cursor-pointer">
          <Select
            onChange={(e: any) =>
              setCataGoryData({ ...catagoryData, status: e.value })
            }
            options={[
              {
                value: true,
                label: "Active",
              },
              {
                value: false,
                label: "Inactive",
              },
            ]}
            placeholder={catagoryData?.status ? "Active" : "Inactive"}
            className=" w-full text-[16px] h-[40px] text-black cursor-pointer"
          />
        </div>
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

export default memo(ControlForm);
