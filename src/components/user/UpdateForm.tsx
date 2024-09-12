"use client";
import { EndPoint } from "@/utils/api";
import axios from "axios";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import React, { useContext, useEffect, useId, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../ContextProvider";
import Select from "react-select";
import { ApiUpdate } from "@/app/action";

type Props = {
  userId: any;
};

const UpdateForm = ({ userId }: Props) => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<any>({
    email: "",
    name: "",
    phone_number: "",
    NID: 0,
    address: null,
    qualification: null,
  });

  const [userPassword, setUserPassword] = useState({
    new_password: "",
    confirm_password: "",
  });

  const getUserData = async () => {
    try {
      const res = await axios.get(EndPoint.GET_ALL_EMPLOY + userId);
      const resData = await res.data;
      setUserInfo(resData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    const { resData, success } = await ApiUpdate(
      EndPoint.EMPLOYEE_UPDATE + userId,
      "",
      userInfo
    );

    if (success) {
      toast.success("Employee data is updated.");
      setUserInfo({
        email: "",
        name: "",
        phone_number: "",
        NID: 0,
        address: null,
        qualification: null,
      });
      router.push("/management/user/" + userId);
    } else {
      toast.error(resData);
    }
  };

  const handlePasswordUpdate = async () => {
    if (
      userPassword.new_password !== "" &&
      userPassword.confirm_password !== ""
    ) {
      try {
        const res = await axios.patch(
          EndPoint.EMPLOYEE_PASSWORD_UPDATE + userId,
          userPassword,
          {
            headers: {
              Authorization: "Bearer " + user?.access_token,
            },
          }
        );
        toast.success(res.data?.message || "Employee password is updated.");
        setUserPassword({
          new_password: "",
          confirm_password: "",
        });
        // router.push("/management/user/" + userId);
      } catch (error: any) {
        if (error?.response) {
          toast.error(Object.values(error.response.data).join(" "));
        } else {
          toast.error("An unexpected error occurred.");
        }
      }
    } else {
      toast.error("New password or confirm password should not be empty.");
    }
  };

  useEffect(() => {
    getUserData();
  }, [userId]);

  return (
    <div className="grid grid-cols-2 gap-[24px]">
      <div className=" flex flex-col gap-[16px] rounded-[16px] border-[#A6ABB7] border-[1px]">
        <div className=" flex flex-col gap-[16px] p-[32px]">
          <p className=" text-[31px]">Personal Information</p>
          <div className=" flex flex-col gap-[4px]">
            <label htmlFor="name" className=" font-bold text-[16px]">
              Name
            </label>
            <input
              type="text"
              value={userInfo?.name}
              onChange={(e) =>
                setUserInfo({ ...userInfo, name: e.target.value })
              }
              className=" w-full rounded-[4px] px-[16px] bg-[#FBFBFB] text-[16px] h-[32px] outline-none border-[1px] border-[#A6ABB7] "
              placeholder="Enter name"
            />
          </div>
          {/* <div className=" flex flex-col gap-[4px]">
            <label htmlFor="name" className=" font-bold text-[16px]">
              Company:
            </label>
            <input
              type="text"
              className=" w-full rounded-[4px] px-[16px] bg-[#FBFBFB] text-[16px] h-[32px] outline-none border-[1px] border-[#A6ABB7] "
              placeholder="Enter name"
            />
          </div> */}
          {/* <div className=" flex flex-col gap-[4px]">
            <label htmlFor="name" className=" font-bold text-[16px]">
              Post:
            </label>
            <input
              type="text"
              className=" w-full rounded-[4px] px-[16px] bg-[#FBFBFB] text-[16px] h-[32px] outline-none border-[1px] border-[#A6ABB7] "
              placeholder="Enter name"
            />
          </div> */}
          <div className=" flex flex-col gap-[4px]">
            <label htmlFor="name" className=" font-bold text-[16px]">
              Mobile Number:
            </label>
            <input
              type="text"
              value={userInfo?.phone_number}
              onChange={(e) =>
                setUserInfo({ ...userInfo, phone_number: e.target.value })
              }
              className=" w-full rounded-[4px] px-[16px] bg-[#FBFBFB] text-[16px] h-[32px] outline-none border-[1px] border-[#A6ABB7] "
              placeholder="Enter phone number"
            />
          </div>
          <div className=" flex flex-col gap-[4px]">
            <label htmlFor="name" className=" font-bold text-[16px]">
              E-mail:
            </label>
            <input
              type="text"
              value={userInfo?.email}
              onChange={(e) =>
                setUserInfo({ ...userInfo, email: e.target.value })
              }
              className=" w-full rounded-[4px] px-[16px] bg-[#FBFBFB] text-[16px] h-[32px] outline-none border-[1px] border-[#A6ABB7] "
              placeholder="Enter email"
            />
          </div>
          <div className=" flex flex-col gap-[4px]">
            <label htmlFor="name" className=" font-bold text-[16px]">
              NID Number:
            </label>
            <input
              type="number"
              value={userInfo?.NID}
              onChange={(e) =>
                setUserInfo({ ...userInfo, NID: e.target.value })
              }
              className=" w-full rounded-[4px] px-[16px] bg-[#FBFBFB] text-[16px] h-[32px] outline-none border-[1px] border-[#A6ABB7] "
              placeholder="Enter name"
            />
          </div>
          <div className=" flex flex-col gap-[4px]">
            <label htmlFor="name" className=" font-bold text-[16px]">
              Address:
            </label>
            <input
              type="text"
              value={userInfo?.address}
              onChange={(e) =>
                setUserInfo({ ...userInfo, address: e.target.value })
              }
              className=" w-full rounded-[4px] px-[16px] bg-[#FBFBFB] text-[16px] h-[32px] outline-none border-[1px] border-[#A6ABB7] "
              placeholder="Enter your address"
            />
          </div>

          <div className=" flex flex-col gap-[4px]">
            <label htmlFor="name" className=" font-bold text-[16px]">
              Educational Qualification:
            </label>
            <input
              type="text"
              value={userInfo?.qualification}
              onChange={(e) =>
                setUserInfo({ ...userInfo, qualification: e.target.value })
              }
              className=" w-full rounded-[4px] px-[16px] bg-[#FBFBFB] text-[16px] h-[32px] outline-none border-[1px] border-[#A6ABB7] "
              placeholder="Enter name"
            />
          </div>

          <div className=" grid grid-cols-2 gap-[16px]">
            <Link href={"/management/user/" + userId}>
              {" "}
              <div className=" h-[46px] border-[1px] border-[#A6ABB7] flex justify-center items-center text-[25px] rounded-[8px]">
                Cancel
              </div>
            </Link>
            <div
              onClick={() => handleUpdate()}
              className=" h-[46px] cursor-pointer text-white hover:bg-border_orange hover:text-white bg-orange  border-[1px] border-[#A6ABB7] flex justify-center items-center text-[25px]  rounded-[8px]"
            >
              Update
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className=" flex flex-col gap-[16px] rounded-[16px] border-[#A6ABB7] border-[1px]">
          <div className=" flex flex-col gap-[16px] p-[32px]">
            <p className=" text-[31px] flex items-center justify-center">
              Change Password
            </p>
            <div className=" flex flex-col gap-[4px]">
              <label htmlFor="name" className=" font-bold text-[16px]">
                New Password:
              </label>
              <input
                type="text"
                value={userPassword.new_password}
                onChange={(e) =>
                  setUserPassword({
                    ...userPassword,
                    new_password: e.target.value,
                  })
                }
                className=" w-full rounded-[4px] px-[16px] bg-[#FBFBFB] text-[16px] h-[32px] outline-none border-[1px] border-[#A6ABB7] "
                placeholder="Enter name"
              />
            </div>
            <div className=" flex flex-col gap-[4px]">
              <label htmlFor="name" className=" font-bold text-[16px]">
                Confirm New Password:
              </label>

              <input
                type="text"
                value={userPassword.confirm_password}
                onChange={(e) =>
                  setUserPassword({
                    ...userPassword,
                    confirm_password: e.target.value,
                  })
                }
                className=" w-full rounded-[4px] px-[16px] bg-[#FBFBFB] text-[16px] h-[32px] outline-none border-[1px] border-[#A6ABB7] "
                placeholder="Enter name"
              />
            </div>

            <div
              onClick={() => handlePasswordUpdate()}
              className=" h-[46px] border-[1px] cursor-pointer hover:bg-green/80  bg-green text-white border-[#A6ABB7] flex justify-center items-center text-[25px] rounded-[8px]"
            >
              Change
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateForm;
