import { EndPoint } from "@/utils/api";
import axios from "axios";
import React, { memo, useContext, useEffect, useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import { AuthContext } from "../ContextProvider";

type Props = {
  formClose: any;
  editToggle?: any;
  listUpdate?: any;
  group_id?: number;
};

const GroupForm = ({ listUpdate, editToggle, formClose, group_id }: Props) => {
  const { user } = useContext(AuthContext);
  const [emptyCheck, setEmptyCheck] = useState(false);
  const [gruopData, setgruopData] = useState({
    active: false,
    name: "",
  });

  const getGroup = async () => {
    if (group_id) {
      try {
        const res = await axios.get(EndPoint.GET_GROUP_BY_ID + group_id, {
          headers: { Authorization: "Bearer " + user?.access_token },
        });
        const resResult = await res.data;

        setgruopData({
          name: resResult?.name,
          active: resResult?.active,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const addGroup = async () => {
    try {
      if (
        gruopData.active === true ||
        (gruopData.active === false && gruopData.name !== "")
      ) {
        const res = await axios.post(EndPoint.ADD_GROUP, gruopData, {
          headers: { Authorization: "Bearer " + user?.access_token },
        });
        setgruopData({
          active: false,
          name: "",
        });
        toast.success("Group is added.");
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
  const updateGroup = async () => {
    try {
      if (
        gruopData.active === true ||
        (gruopData.active === false && gruopData.name !== "")
      ) {
        const res = await axios.patch(
          EndPoint.UPDATE_GROUP + group_id,
          gruopData,
          {
            headers: { Authorization: "Bearer " + user?.access_token },
          }
        );
        setgruopData({
          active: false,
          name: "",
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
    getGroup();
  }, [group_id]);
  return (
    <div className=" w-[461px] rounded-[16px] bg-button_bg text-white p-[16px] flex flex-col justify-center gap-[16px]">
      <div className=" flex flex-col gap-[4px] text-[16px] ">
        <p className=" text-white">Group Name:</p>
        <input
          value={gruopData.name}
          onChange={(e) => setgruopData({ ...gruopData, name: e.target.value })}
          type="text"
          placeholder="Enter Catagory Name"
          className=" px-[8px] h-[40px] rounded-[8px] text-black"
        />
        {gruopData.name === " " && emptyCheck && (
          <p className=" text-red text-[10px]"> Course name is empty.</p>
        )}
      </div>
      <div className=" flex flex-col gap-[4px]">
        <p className=" text-white text-[16px] font-semibold ">active:</p>
        <div className=" w-full  cursor-pointer">
          <Select
            onChange={(e: any) =>
              setgruopData({ ...gruopData, active: e.value })
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
            placeholder={gruopData?.active ? "Active" : "Inactive"}
            className=" w-full text-[16px] h-[40px] text-black cursor-pointer"
          />
        </div>
      </div>

      <div className=" flex justify-end items-center gap-[16px]">
        <button
          onClick={() => formClose(false)}
          className=" flex justify-center items-center w-[115px] h-[39px] border-[1px] border-gray rounded-[8px]"
        >
          Cancel
        </button>
        {group_id ? (
          <button
            onClick={() => updateGroup()}
            className=" flex justify-center items-center bg-border_orange text-white w-[116px] h-[40px] rounded-[8px]"
          >
            Update
          </button>
        ) : (
          <button
            onClick={() => addGroup()}
            className=" flex justify-center items-center bg-border_orange text-white w-[116px] h-[40px] rounded-[8px]"
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
};

export default memo(GroupForm);
