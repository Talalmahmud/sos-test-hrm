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

const PermissionForm = ({
  listUpdate,
  editToggle,
  formClose,
  permission_id,
}: Props) => {
  const { user } = useContext(AuthContext);
  const [emptyCheck, setEmptyCheck] = useState(false);
  const [permissionList, setPermissionList] = useState<any>([]);
  const [gruopData, setgruopData] = useState<any>({
    Permission: "",
    group: "",
  });
  const [selectedPermision, setSelectedPermission] = useState<any>([]);
  const [groupList, setgroupList] = useState<any>([]);
  const [selectGroup, setSelectGroup] = useState<any>("");

  const handleCheckboxChange = (id: any) => {
    setSelectedPermission((prevSelected: any) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((permissionId: any) => permissionId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };
  const getPermissionList = async () => {
    if (user) {
      try {
        const res = await axios.get(EndPoint.PERMISSION_LIST, {
          params: { limit: 200 },
          headers: { Authorization: "Bearer " + user?.access_token },
        });
        const resResult = await res.data;

        setPermissionList(resResult?.results);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getPermisiionList = async () => {
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
          EndPoint.GET_PERMISSION_BY_ID + permission_id,
          {
            headers: { Authorization: "Bearer " + user?.access_token },
          }
        );
        const resResult = await res.data;

        setSelectGroup({
          label: resResult?.group?.name,
          value: resResult?.group?.id,
        });
        setSelectedPermission(
          resResult?.Permission?.map((item: any) => item?.id)
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  const addGroup = async () => {
    try {
      if (selectGroup && selectedPermision) {
        const res = await axios.post(
          EndPoint.ADD_PERMISSION,
          { Permission: selectedPermision, group: selectGroup?.value },
          {
            headers: { Authorization: "Bearer " + user?.access_token },
          }
        );
        setgruopData({
          active: false,
          name: "",
        });
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
  const updateGroup = async () => {
    try {
      const res = await axios.patch(
        EndPoint.UPDATE_PERMISSION + permission_id,
        { Permission: selectedPermision, group: selectGroup?.value },

        {
          headers: { Authorization: "Bearer " + user?.access_token },
        }
      );
      setgruopData({
        active: false,
        name: "",
      });
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
    getPermissionList();
    getPermisiionList();
  }, [user]);
  return (
    <div className=" w-[80%] rounded-[16px] bg-white  p-[16px] flex flex-col justify-center gap-[16px]">
      <div className=" flex flex-col gap-[4px] text-[16px] ">
        <p className=" text-left ">Group Name:</p>
        <Select
          value={selectGroup}
          options={groupList}
          isDisabled={selectGroup ? true : false}
          isClearable
          onChange={(e) => setSelectGroup(e)}
          className=" w-full text-left"
        />
        {gruopData.name === " " && emptyCheck && (
          <p className=" text-red text-[10px]"> Course name is empty.</p>
        )}
      </div>
      <p className=" flex justify-center items-center font-semibold underline">
        All Permission List
      </p>
      <div className=" grid grid-cols-3 gap-[8px]">
        {permissionList?.map((item: any, index: any) => (
          <div className=" flex items-center gap-[2px]">
            <input
              type="checkbox"
              checked={selectedPermision?.includes(item?.id)}
              onChange={() => handleCheckboxChange(item?.id)}
              className=" max-h-[16px] max-w-[16px] min-h-[16px] min-w-[16px] accent-title"
            />
            <p className=" whitespace-nowrap text-black">{item?.name}</p>
          </div>
        ))}
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

export default memo(PermissionForm);
