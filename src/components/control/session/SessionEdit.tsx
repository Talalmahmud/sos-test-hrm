import { EndPoint } from "@/utils/api";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";

type Props = {
  formClose: any;
  probidhan_id?: number;
  editToggle?: any;
  listUpdate?: any;
  session_id?: any;
  session_year: any;
};

const SessionEdit = ({
  formClose,
  session_year,
  listUpdate,

  session_id,
}: Props) => {
  const [sessionData, setSessionData] = useState<any>(session_year);

  const updateSession = async () => {
    if (sessionData !== "") {
      try {
        const res = await axios.patch(EndPoint.UPDATE_SESSION + session_id, {
          session_year: sessionData,
        });
        setSessionData("");
        listUpdate();
        toast.success("SESSION year is updated.");

        formClose(false);
      } catch (error: any) {
        if (error?.response) {
          toast.error(Object.values(error.response.data).join(""));
        } else {
          toast.error("An unexpected error occurred.");
        }
      }
    } else {
      console.log("Session year is not updated.");
    }
  };

  return (
    <div>
      <div className="  py-[8px] flex  items-center justify-center gap-[16px]">
        <div className=" flex items-center gap-[4px] text-[13px] ">
          <p className=" text-[16px] font-semibold text-white">Session:</p>
          <input
            type="text"
            value={sessionData}
            onChange={(e: any) => setSessionData(e.target.value)}
            placeholder="Type session like 2020-2021"
            className=" px-[8px] h-[40px] text-[16px] rounded-[8px] text-black"
          />
        </div>
        {/* <div className=" flex flex-col gap-[4px]">
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
            </div> */}

        <div className=" flex items-center gap-2">
          <button
            onClick={() => updateSession()}
            className=" flex justify-center items-center bg-border_orange text-white w-[116px] h-[40px] rounded-[8px]"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionEdit;
