"use client";
import React, { useContext, useEffect, useState } from "react";
import UserInfo from "./UserInfo";
// import UserYearlyStatus from "./UserYearlyStatus";
// import UserMonthlyStatus from "./UserMonthlyStatus";
import axios from "axios";
import { EndPoint } from "@/utils/api";
import { ApiGet } from "@/app/action";
import { AuthContext } from "../ContextProvider";
import Select from "react-select";
import { toast } from "react-toastify";

type Props = {
  userId: any;
};

const UserDetails = ({ userId }: Props) => {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [groupList, setgroupList] = useState<any>([]);
  const [selectGroup, setSelectGroup] = useState<any>("");
  const { user } = useContext(AuthContext);
  const [isEdit, setIsEdit] = useState(false);

  const getGroupList = async () => {
    try {
      const res = await axios.get(
        EndPoint.EMPLOYEE_GROUP_PERMISSION_DROPDOWN_LIST,
        {
          params: { limit: 200 },
        }
      );
      const resResult = await res.data;
      // console.log(resResult);

      setgroupList(resResult?.results);
    } catch (error) {
      console.log(error);
    }
  };

  const getPermisiion = async () => {
    if (user) {
      try {
        const res = await axios.get(
          EndPoint.GET_EMPLOYEE_PERMISSION_BY_ID +
            `${userId}/group-permissions/`,
          { headers: { Authorization: "Bearer " + user?.access_token } }
        );
        const resResult = await res.data;

        setSelectGroup(resResult?.group_permission);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const updateUserPermission = async () => {
    try {
      const res = await axios.patch(
        EndPoint.UPDATE_EMPLOYEE_PERMISSION + userId,
        { group_permission: selectGroup?.value }
      );

      toast.success("Updated user group permissions.");
    } catch (error) {
      toast.error("User group permissions are not updated.");
    }
  };

  const getUserData = async () => {
    try {
      const resData = await ApiGet(EndPoint.GET_ALL_EMPLOY + userId);
      setUserInfo(resData?.resData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPermisiion();
    getGroupList();
    getUserData();
  }, []);

  useEffect(() => {
    getPermisiion();
  }, [user]);

  return (
    <div className=" flex flex-col gap-[24px]">
      <UserInfo userId={userId} userDetails={userInfo} />
      {/* <UserYearlyStatus /> */}

      {/* <UserMonthlyStatus /> */}

      <div className=" relative flex-col flex gap-[16px] mb-[200px] bg-orange/10 p-4 rounded-md ">
        <p className=" text-center underline font-semibold">
          User Group Permissions
        </p>
        {user?.role === 0 && (
          <div
            onClick={() => setIsEdit(!isEdit)}
            className=" cursor-pointer absolute  top-4 right-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="28"
              viewBox="0 0 23 22"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21.5993 5.42917C19.4733 7.55517 14.4833 12.5442 13.2663 13.7572C13.0057 14.0174 12.6956 14.2228 12.3543 14.3612C11.3783 14.7662 8.99727 15.7002 8.29727 15.7472C8.09092 15.761 7.884 15.7306 7.69038 15.6579C7.49676 15.5852 7.32093 15.472 7.1747 15.3257C7.02846 15.1795 6.91519 15.0037 6.84251 14.8101C6.76982 14.6164 6.73939 14.4095 6.75327 14.2032C6.80027 13.5032 7.73427 11.1242 8.13227 10.1522C8.27127 9.80717 8.47827 9.49417 8.74127 9.23217L17.0713 0.901172C17.4749 0.498263 18.0219 0.271973 18.5923 0.271973C19.1626 0.271973 19.7096 0.498263 20.1133 0.901172L21.5993 2.38717C22.0022 2.79082 22.2285 3.33785 22.2285 3.90817C22.2285 4.4785 22.0022 5.02552 21.5993 5.42917ZM8.25627 14.2442C8.94027 14.1582 10.9393 13.3242 11.7793 12.9752C11.9389 12.9124 12.0839 12.8174 12.2053 12.6962L12.2063 12.6952C14.9855 9.92141 17.7628 7.14574 20.5383 4.36817C20.5987 4.3078 20.6467 4.2361 20.6794 4.15717C20.7122 4.07823 20.729 3.99362 20.729 3.90817C20.729 3.82272 20.7122 3.73811 20.6794 3.65918C20.6467 3.58025 20.5987 3.50854 20.5383 3.44817L19.0523 1.96217C18.9919 1.9017 18.9202 1.85373 18.8413 1.82099C18.7623 1.78826 18.6777 1.77141 18.5923 1.77141C18.5068 1.77141 18.4222 1.78826 18.3433 1.82099C18.2643 1.85373 18.1926 1.9017 18.1323 1.96217L9.80127 10.2932C9.68132 10.4125 9.58705 10.5551 9.52427 10.7122L9.52227 10.7162C9.17727 11.5582 8.34227 13.5592 8.25627 14.2442Z"
                fill="black"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M19.6175 6.34934C19.6872 6.419 19.7425 6.50171 19.7802 6.59273C19.8179 6.68376 19.8373 6.78131 19.8373 6.87984C19.8373 6.97836 19.8179 7.07592 19.7802 7.16694C19.7425 7.25797 19.6872 7.34067 19.6175 7.41034C19.5479 7.48 19.4652 7.53527 19.3741 7.57297C19.2831 7.61067 19.1856 7.63008 19.087 7.63008C18.9885 7.63008 18.891 7.61067 18.7999 7.57297C18.7089 7.53527 18.6262 7.48 18.5565 7.41034L15.0895 3.94334C14.9488 3.80264 14.8698 3.61181 14.8698 3.41284C14.8698 3.21386 14.9488 3.02304 15.0895 2.88234C15.2302 2.74164 15.4211 2.6626 15.62 2.6626C15.819 2.6626 16.0098 2.74164 16.1505 2.88234L19.6175 6.34934ZM13.4965 12.4703C13.5661 12.5399 13.6213 12.6226 13.659 12.7135C13.6967 12.8044 13.7161 12.9019 13.7161 13.0003C13.7161 13.0988 13.6967 13.1962 13.659 13.2872C13.6213 13.3781 13.5661 13.4607 13.4965 13.5303C13.4269 13.5999 13.3443 13.6551 13.2534 13.6928C13.1624 13.7305 13.065 13.7499 12.9665 13.7499C12.8681 13.7499 12.7706 13.7305 12.6797 13.6928C12.5888 13.6551 12.5061 13.5999 12.4365 13.5303L8.96953 10.0633C8.89993 9.99374 8.84472 9.91111 8.80706 9.82017C8.76939 9.72923 8.75 9.63177 8.75 9.53334C8.75 9.43491 8.76939 9.33744 8.80706 9.2465C8.84472 9.15557 8.89993 9.07294 8.96953 9.00334C9.03913 8.93374 9.12176 8.87853 9.2127 8.84086C9.30364 8.80319 9.4011 8.7838 9.49953 8.7838C9.59796 8.7838 9.69543 8.80319 9.78637 8.84086C9.87731 8.87853 9.95993 8.93374 10.0295 9.00334L13.4965 12.4703Z"
                fill="black"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8 2.25C8.19891 2.25 8.38968 2.32902 8.53033 2.46967C8.67098 2.61032 8.75 2.80109 8.75 3C8.75 3.19891 8.67098 3.38968 8.53033 3.53033C8.38968 3.67098 8.19891 3.75 8 3.75H4.5C3.90326 3.75 3.33097 3.98705 2.90901 4.40901C2.48705 4.83097 2.25 5.40326 2.25 6V18C2.25 18.5967 2.48705 19.169 2.90901 19.591C3.33097 20.0129 3.90326 20.25 4.5 20.25H17.5C18.0967 20.25 18.669 20.0129 19.091 19.591C19.5129 19.169 19.75 18.5967 19.75 18V14.5C19.75 14.3011 19.829 14.1103 19.9697 13.9697C20.1103 13.829 20.3011 13.75 20.5 13.75C20.6989 13.75 20.8897 13.829 21.0303 13.9697C21.171 14.1103 21.25 14.3011 21.25 14.5V18C21.2495 18.9944 20.8542 19.9479 20.1511 20.6511C19.4479 21.3542 18.4944 21.7495 17.5 21.75H4.5C3.5056 21.7495 2.55208 21.3542 1.84893 20.6511C1.14579 19.9479 0.75053 18.9944 0.75 18V6C0.75 5.00544 1.14509 4.05161 1.84835 3.34835C2.55161 2.64509 3.50544 2.25 4.5 2.25H8Z"
                fill="black"
              />
            </svg>
          </div>
        )}
        <div className=" flex flex-col gap-[4px] text-[16px] ">
          <p className=" select-none text-left ">Selected Group List:</p>
          <Select
            value={selectGroup}
            options={groupList}
            isClearable
            isDisabled={!isEdit}
            onChange={(e) => setSelectGroup(e)}
            className=" w-full text-left"
            placeholder="Select group..."
          />
        </div>
        {isEdit && (
          <button
            onClick={updateUserPermission}
            className=" bg-border_orange text-white rounded-[8px] px-2 py-1"
          >
            Update permissions
          </button>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
