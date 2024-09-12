import { EndPoint } from "@/utils/api";
import axios from "axios";
import React, { memo, useEffect, useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";

type Props = {
  formClose: any;
  editToggle?: any;
  listUpdate?: any;
  custom_id?: number;
};

const CustomForm = ({
  listUpdate,
  editToggle,
  formClose,
  custom_id,
}: Props) => {
  const [emptyCheck, setEmptyCheck] = useState(false);
  const [customData, setCustomData] = useState({
    status: false,
    title: "",
    custom_date: "",
  });

  const getCatagory = async () => {
    if (custom_id) {
      try {
        const res = await axios.get(EndPoint.GET_CUSTOM_DATE_BY_ID + custom_id);
        const resResult = await res.data;
        setCustomData({
          title: resResult?.title,
          status: resResult?.status,
          custom_date: resResult?.custom_date,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const addCustomDate = async () => {
    if (customData?.title !== "") {
      try {
        if (
          customData.status === true ||
          (customData.status === false && customData.title !== "")
        ) {
          const res = await axios.post(EndPoint.ADD_CUSTOM_DATE, customData);
          setEmptyCheck(false);
          setCustomData({
            status: false,
            title: "",
            custom_date: "",
          });
          toast.success("Custom is added.");
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
    } else {
      setEmptyCheck(true);
    }
  };
  const updateCatagory = async () => {
    try {
      if (
        customData.status === true ||
        (customData.status === false && customData.title !== "")
      ) {
        const res = await axios.patch(
          EndPoint.UPDATE_CUSTOM_DATE + custom_id,
          customData
        );
        setCustomData({
          status: false,
          title: "",
          custom_date: "",
        });
        toast.success("Custom is updated.");
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
  }, [custom_id]);
  return (
    <div className=" w-[461px] rounded-[16px] bg-green text-white p-[16px] flex flex-col justify-center gap-[16px]">
      <div className=" flex flex-col gap-[4px] text-[16px] ">
        <p className=" text-white">Title:</p>
        <input
          value={customData.title}
          onChange={(e) =>
            setCustomData({ ...customData, title: e.target.value })
          }
          type="text"
          placeholder="Enter title"
          className=" px-[8px] h-[40px] rounded-[8px] text-black"
        />
        {customData.title === "" && emptyCheck && (
          <p className=" text-[#FFCC00] font-semibold text-[12px]">
            {" "}
            Title is empty.
          </p>
        )}
      </div>
      <div className=" flex flex-col gap-[4px] text-[16px] ">
        <p className=" text-white">Date:</p>
        <input
          value={customData.custom_date}
          onChange={(e) =>
            setCustomData({ ...customData, custom_date: e.target.value })
          }
          type="date"
          placeholder="Enter date"
          className=" px-[8px] h-[40px] rounded-[8px] text-black"
        />
        {customData.custom_date === "" && emptyCheck && (
          <p className=" text-[#FFCC00] font-semibold text-[12px]">
            {" "}
            Date is empty.
          </p>
        )}
      </div>
      <div className=" flex flex-col gap-[4px]">
        <p className=" text-white text-[16px] font-semibold ">Status:</p>
        <div className=" w-full  cursor-pointer">
          <Select
            onChange={(e: any) =>
              setCustomData({ ...customData, status: e.value })
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
            placeholder={customData?.status ? "Active" : "Inactive"}
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
        {custom_id ? (
          <button
            onClick={() => updateCatagory()}
            className=" flex justify-center items-center bg-border_orange text-white w-[116px] h-[40px] rounded-[8px]"
          >
            Update
          </button>
        ) : (
          <button
            onClick={() => addCustomDate()}
            className=" flex justify-center items-center bg-border_orange text-white w-[116px] h-[40px] rounded-[8px]"
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
};

export default memo(CustomForm);
