import { EndPoint } from "@/utils/api";
import axios from "axios";
import React, { memo, useEffect, useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";

type Props = {
  formClose: any;
  editToggle?: any;
  listUpdate?: any;
  plan_id?: number;
};

const PlanForm = ({ listUpdate, editToggle, formClose, plan_id }: Props) => {
  const [emptyCheck, setEmptyCheck] = useState(false);
  const [planData, setPlanData] = useState({
    status: false,
    plan_name: "",
  });

  const getCatagory = async () => {
    if (plan_id) {
      try {
        const res = await axios.get(EndPoint.GET_PLAN_BY_ID + plan_id);
        const resResult = await res.data;

        setPlanData({
          plan_name: resResult?.plan_name,
          status: resResult?.status,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const addCatagory = async () => {
    if (
      planData.status === true ||
      (planData.status === false && planData.plan_name !== "")
    ) {
      try {
        const res = await axios.post(EndPoint.ADD_PLAN, planData);
        setPlanData({
          status: false,
          plan_name: "",
        });
        setEmptyCheck(false);
        toast.success("Plan is added.");
        listUpdate();
        formClose(false);
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
        planData.status === true ||
        (planData.status === false && planData.plan_name !== "")
      ) {
        const res = await axios.patch(EndPoint.UPDATE_PLAN + plan_id, planData);
        setPlanData({
          status: false,
          plan_name: "",
        });
        toast.success("Plan is updated.");
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
  }, [plan_id]);
  return (
    <div className=" w-[461px] rounded-[16px] bg-button_bg text-white p-[16px] flex flex-col justify-center gap-[16px]">
      <div className=" flex flex-col gap-[4px] text-[16px] ">
        <p className=" text-white">Course Name:</p>
        <input
          value={planData.plan_name}
          onChange={(e) =>
            setPlanData({ ...planData, plan_name: e.target.value })
          }
          type="text"
          placeholder="Enter Plan Name"
          className=" px-[8px] h-[40px] rounded-[8px] text-black"
        />
        {planData.plan_name === "" && emptyCheck && (
          <p className=" text-[#FFCC00] font-semibold text-[12px]">
            {" "}
            Plan name is empty.
          </p>
        )}
      </div>
      <div className=" flex flex-col gap-[4px]">
        <p className=" text-white text-[16px] font-semibold ">Status:</p>
        <div className=" w-full  cursor-pointer">
          <Select
            onChange={(e: any) => setPlanData({ ...planData, status: e.value })}
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
            placeholder={planData?.status ? "Active" : "Inactive"}
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
        {plan_id ? (
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

export default memo(PlanForm);
