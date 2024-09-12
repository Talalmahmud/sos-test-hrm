import { EndPoint } from "@/utils/api";
import axios from "axios";
import React, { memo, useEffect, useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";

type Props = {
  formClose: any;
  editToggle?: any;
  listUpdate?: any;
  independent_id?: number;
};

const CustomForm = ({
  listUpdate,
  editToggle,
  formClose,
  independent_id,
}: Props) => {
  const [emptyCheck, setEmptyCheck] = useState(false);
  const [independent, setIndependent] = useState({
    title: "",
    days_quantity: 1,
  });

  const getCatagory = async () => {
    if (independent_id) {
      try {
        const res = await axios.get(
          EndPoint.GET_INDEPENDENT_DATE_BY_ID + independent_id
        );
        const resResult = await res.data;
        setIndependent({
          title: resResult?.title,

          days_quantity: resResult?.days_quantity,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const addCustomDate = async () => {
    if (independent?.title !== "" && independent?.days_quantity > 0) {
      try {
        if (independent.title !== "") {
          const res = await axios.post(
            EndPoint.ADD_INDEPENDENT_DATE,
            independent
          );
          setIndependent({
            title: "",
            days_quantity: 1,
          });
          setEmptyCheck(false);
          toast.success("Independent Day is added.");
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
      if (independent.title !== "") {
        const res = await axios.patch(
          EndPoint.UPDATE_INDEPENDENT_DATE + independent_id,
          independent
        );
        setIndependent({
          title: "",
          days_quantity: 1,
        });
        toast.success("Independent Day is updated.");
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
  }, [independent_id]);
  return (
    <div className=" w-[461px] rounded-[16px] bg-button_bg text-white p-[16px] flex flex-col justify-center gap-[16px]">
      <div className=" flex flex-col gap-[4px] text-[16px] ">
        <p className=" text-white">Title:</p>
        <input
          value={independent.title}
          onChange={(e) =>
            setIndependent({ ...independent, title: e.target.value })
          }
          type="text"
          placeholder="Enter title"
          className=" px-[8px] h-[40px] rounded-[8px] text-black"
        />
        {independent.title === "" && emptyCheck && (
          <p className=" text-[#FFCC00] font-semibold text-[12px]">
            {" "}
            Independent name is empty.
          </p>
        )}
      </div>
      <div className=" flex flex-col gap-[4px] text-[16px] ">
        <p className=" text-white">Days:</p>
        <input
          value={independent.days_quantity}
          onChange={(e: any) =>
            setIndependent({ ...independent, days_quantity: e.target.value })
          }
          type="numeric"
          placeholder="Enter days"
          className=" px-[8px] h-[40px] rounded-[8px] text-black"
        />
        {independent.days_quantity <= 1 && emptyCheck && (
          <p className=" text-[#FFCC00] font-semibold text-[12px]">
            Independent days is should be greater then zero.
          </p>
        )}
      </div>

      <div className=" flex justify-end items-center gap-[16px]">
        <button
          onClick={() => formClose(false)}
          className=" flex justify-center items-center  text-white w-[115px] h-[39px] border-[1px] border-white rounded-[8px]"
        >
          Cancel
        </button>
        {independent_id ? (
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
