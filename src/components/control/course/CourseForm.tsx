import { EndPoint } from "@/utils/api";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";

type Props = {
  formClose: any;
  probidan_id?: number;
  editToggle?: any;
  listUpdate?: any;
};

const CourseForm = ({
  formClose,
  probidan_id,
  editToggle,
  listUpdate,
}: Props) => {
  const [emptyCheck, setEmptyCheck] = useState(false);

  const [probidanData, setProbidanData] = useState({
    probidhan_year: 2010,
    status: false,
  });
  const getProbidan = async () => {
    if (probidan_id) {
      try {
        const res = await axios.get(EndPoint.GET_PROBIDAN_BY_ID + probidan_id);
        const resResult = await res.data;

        setProbidanData({
          probidhan_year: resResult?.probidhan_year,
          status: resResult?.status,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const addProbidan = async () => {
    if (
      (probidanData.status === true || probidanData.status === false) &&
      probidanData.probidhan_year !== 0
    ) {
      try {
        const res = await axios.post(EndPoint.ADD_PROBIDAN, probidanData);

        listUpdate();
        toast.success("Probidan year is added.");
        formClose(false);
        setProbidanData({
          probidhan_year: 2010,
          status: false,
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
  const updateProbidan = async () => {
    try {
      if (
        (probidanData.status === true || probidanData.status === false) &&
        probidanData.probidhan_year !== 0
      ) {
        const res = await axios.patch(
          EndPoint.UPDATE_PROBIDAN + probidan_id,
          probidanData
        );
        setProbidanData({
          probidhan_year: 2010,
          status: false,
        });
        listUpdate();
        toast.success("Probidan year is updated.");

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
    getProbidan();
  }, [probidan_id]);
  return (
    <div className=" w-[461px] rounded-[16px] bg-button_bg text-white p-[16px] flex flex-col justify-center gap-[16px]">
      <div className=" flex flex-col gap-[4px] text-[16px] ">
        <p className=" text-[16px] font-semibold text-white">Probidan Name:</p>
        <input
          value={probidanData.probidhan_year}
          onChange={(e: any) =>
            setProbidanData({ ...probidanData, probidhan_year: e.target.value })
          }
          type="number"
          placeholder="Enter Probidan Name"
          className=" w-full px-[8px] h-[40px] text-[16px] rounded-[8px] text-black"
        />
      </div>

      <div className=" flex flex-col gap-[4px]">
        <p className=" text-white text-[16px] font-semibold ">Status:</p>
        <div className=" w-full  cursor-pointer">
          <Select
            placeholder={probidanData?.status ? "Active" : "Inactive"}
            defaultValue={probidanData.status}
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
            className=" w-full text-[16px] h-[40px] text-black cursor-pointer"
            onChange={(e: any) =>
              setProbidanData({ ...probidanData, status: e.value })
            }
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
        {probidan_id ? (
          <button
            onClick={() => updateProbidan()}
            className=" flex justify-center items-center bg-border_orange text-white w-[116px] h-[40px] rounded-[8px]"
          >
            Update
          </button>
        ) : (
          <button
            onClick={() => addProbidan()}
            className=" flex justify-center items-center bg-border_orange text-white w-[116px] h-[40px] rounded-[8px]"
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
};

export default CourseForm;
