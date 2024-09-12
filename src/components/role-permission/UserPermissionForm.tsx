import { EndPoint } from "@/utils/api";
import axios from "axios";
import React, { memo, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../ContextProvider";
import Select from "react-select";

type Props = {
  formClose: any;
  editToggle?: any;
  listUpdate?: any;
  permission_id?: number;
};

const UserPermissionForm = ({
  listUpdate,
  editToggle,
  formClose,
  permission_id,
}: Props) => {
  const { user } = useContext(AuthContext);
  const [emptyCheck, setEmptyCheck] = useState(false);
  const [userList, setUserList] = useState<any>([]);

  const [selectedUser, setSelectedUser] = useState<any>([]);
  const [groupList, setgroupList] = useState<any>([]);
  const [selectGroup, setSelectGroup] = useState<any>("");

  const getUserList = async () => {
    if (user) {
      try {
        const res = await axios.get(EndPoint.EMPLOYEE_DROPDOWN_LIST, {
          params: { limit: 200 },
        });
        const resResult = await res.data;

        setUserList(resResult?.results);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getGroupList = async () => {
    if (user) {
      try {
        const res = await axios.get(EndPoint.GET_DROPDOWN_GROUP, {
          params: { limit: 200 },

          headers: { Authorization: "Bearer " + user?.access_token },
        });
        const resResult = await res.data;

        setgroupList(resResult?.results);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getPermisiion = async () => {
    if (permission_id) {
      try {
        const res = await axios.get(
          EndPoint.GET_EMPLOYEE_PERMISSION_BY_ID + permission_id,
          {
            headers: { Authorization: "Bearer " + user?.access_token },
          }
        );
        const resResult = await res.data;

        setSelectGroup({
          label: resResult?.group?.name,
          value: resResult?.group?.id,
        });
        setSelectedUser(resResult?.user);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const addEmployeePermission = async () => {
    try {
      if (selectGroup && selectedUser) {
        const res = await axios.post(
          EndPoint.ADD_EMPLOYEE_PERMISSION,
          {
            group: selectGroup?.map((item: any) => item?.value),
            user: selectedUser?.value,
          },
          {
            headers: { Authorization: "Bearer " + user?.access_token },
          }
        );

        toast.success("Permission is added.");
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
  const updateEmployeePermission = async () => {
    try {
      const res = await axios.patch(
        EndPoint.UPDATE_EMPLOYEE_PERMISSION + permission_id,
        {
          user: selectedUser?.map((item: any) => item?.value),
          group: selectGroup?.value,
        },

        {
          headers: { Authorization: "Bearer " + user?.access_token },
        }
      );

      toast.success("Permission assign is updated.");
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

  useEffect(() => {
    getPermisiion();
  }, [permission_id]);

  useEffect(() => {
    getGroupList();
  }, [user]);
  useEffect(() => {
    getUserList();
  }, []);
  return (
    <div className=" w-[50%] rounded-[16px] bg-white  p-[16px] flex flex-col justify-center gap-[16px]">
      <div className=" flex flex-col gap-[4px]">
        <p className=" text-left   font-semibold ">Selected User:</p>
        <div className="w-full]">
          <Select
            isClearable
            isSearchable
            placeholder="Select employees..."
            value={selectedUser}
            onChange={(e) => setSelectedUser(e)}
            options={userList}
          />
        </div>
      </div>
      <div className=" flex flex-col gap-[4px] text-[16px] ">
        <p className=" text-left ">Selected Group List:</p>
        <Select
          value={selectGroup}
          options={groupList}
          isMulti
          isClearable
          onChange={(e) => setSelectGroup(e)}
          className=" w-full text-left"
          placeholder="Select group..."
        />
      </div>
      <div className=" flex justify-end items-center gap-[16px]">
        <button
          onClick={() => formClose(false)}
          className=" flex justify-center items-center   w-[115px] h-[39px] border-[1px] border-gray rounded-[8px]"
        >
          Cancel
        </button>
        {permission_id ? (
          <button
            onClick={() => updateEmployeePermission()}
            className=" flex justify-center items-center bg-border_orange text-white w-[116px] h-[40px] rounded-[8px]"
          >
            Update
          </button>
        ) : (
          <button
            onClick={() => addEmployeePermission()}
            className=" flex justify-center items-center bg-border_orange text-white w-[116px] h-[40px] rounded-[8px]"
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
};

export default memo(UserPermissionForm);
