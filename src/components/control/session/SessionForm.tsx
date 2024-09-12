import { EndPoint } from "@/utils/api";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";

type Props = {
  formClose: any;
  session_id?: number;
  editToggle?: any;
  listUpdate?: any;
  probidanList: any;
};

const SessionForm = ({
  formClose,
  editToggle,
  listUpdate,
  session_id,
  probidanList,
}: Props) => {
  const [emptyCheck, setEmptyCheck] = useState(false);

  const [sessionData, setSessionData] = useState<any>({
    probidhan: 0,
    session_year: "",
    status: false,
  });

  const addSession = async () => {
    try {
      if (
        sessionData.status === true ||
        (sessionData.status === false &&
          sessionData.probidhan >= 0 &&
          sessionData.session_year !== "")
      ) {
        const res = await axios.post(EndPoint.ADD_SESSION, sessionData);
        setSessionData({
          probidhan: 0,
          session_year: "",
          status: false,
        });
        toast.success("SESSION year is added.");
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

  return (
    <div>
      <div className=" w-[461px] rounded-[16px] bg-button_bg text-white p-[16px] flex flex-col justify-center gap-[16px]">
        <div>
          <p className=" text-white text-[16px] font-semibold ">Probidan:</p>
          <div className=" w-full  cursor-pointer">
            <Select
              onChange={(e: any) =>
                setSessionData({ ...sessionData, probidhan: e.value })
              }
              options={probidanList}
              className=" w-full text-[16px] h-[40px] text-black cursor-pointer"
              placeholder="Select probidhan"
            />
          </div>
        </div>

        <div className=" flex flex-col gap-[4px] text-[13px] ">
          <p className=" text-[16px] font-semibold text-white">Session:</p>
          <input
            type="text"
            value={sessionData.session_year}
            onChange={(e: any) =>
              setSessionData({ ...sessionData, session_year: e.target.value })
            }
            placeholder="Type session like 2020-2021"
            className=" px-[8px] h-[40px] text-[16px] rounded-[8px] text-black"
          />
        </div>
        <div className=" flex flex-col gap-[4px]">
          <p className=" text-white text-[16px] font-semibold ">Status:</p>
          <div className=" w-full  cursor-pointer">
            <Select
              onChange={(e: any) =>
                setSessionData({ ...sessionData, status: e.value })
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

          <button
            onClick={() => addSession()}
            className=" flex justify-center items-center bg-border_orange text-white w-[116px] h-[40px] rounded-[8px]"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionForm;
