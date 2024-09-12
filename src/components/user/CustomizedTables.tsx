"use client";
import React, { useContext, useState } from "react";

import Image from "next/image";
import MemberEditForm from "./MemberEditForm";
import CustomModal from "../CustomModal";

import { useRouter } from "next/navigation";
import axios from "axios";
import { EndPoint } from "@/utils/api";
import { toast } from "react-toastify";
import { AuthContext } from "../ContextProvider";
import Pagination from "../Pagination";
import DeleteCaution from "../DeleteCaution";
import { roleArray } from "@/utils/staticData";

// const rows = [
//   createData(
//     "Frozen yoghurt",
//     "1592342423, 213904878342",
//     "talal@gmail.com",
//     "Admin",
//     "Admin-panel",
//     true
//   ),
//   createData(
//     "Frozen yoghurt",
//     "1592342423, 213904878342",
//     "talal@gmail.com",
//     "Admin",
//     "Admin-panel",
//     true
//   ),
//   createData(
//     "Frozen yoghurt",
//     "1592342423, 213904878342",
//     "talal@gmail.com",
//     "Admin",
//     "Admin-panel",
//     true
//   ),
//   createData(
//     "Frozen yoghurt",
//     "1592342423, 213904878342",
//     "talal@gmail.com",
//     "Admin",
//     "Admin-panel",
//     true
//   ),
//   createData(
//     "Frozen yoghurt",
//     "1592342423, 213904878342",
//     "talal@gmail.com",
//     "Admin",
//     "Admin-panel",
//     true
//   ),
//   createData(
//     "Frozen yoghurt",
//     "1592342423, 213904878342",
//     "talal@gmail.com",
//     "Admin",
//     "Admin-panel",
//     true
//   ),
//   createData(
//     "Frozen yoghurt",
//     "1592342423, 213904878342",
//     "talal@gmail.com",
//     "Admin",
//     "Admin-panel",
//     true
//   ),
//   createData(
//     "Frozen yoghurt",
//     "1592342423, 213904878342",
//     "talal@gmail.com",
//     "Admin",
//     "Admin-panel",
//     true
//   ),
// ];
type Props = {
  rows: any;
  getAll: any;
  searchOption: any;
  total: number;
  pageNo: number;
  pageSize: number;
  setPageNo: any;
  setPageSize: any;
  isLoading: boolean;
};
export default function CustomizedTables({
  searchOption,
  isLoading,
  rows,
  getAll,
  total,
  pageSize,
  setPageNo,
  setPageSize,
  pageNo,
}: Props) {
  const [editToggle, setEditToggle] = useState(false);
  const router = useRouter();
  const [employeId, setEmployeId] = useState<any>(null);
  const { user } = useContext(AuthContext);
  const [phone, setPhone] = useState<any>("");
  const [deleteWarn, setDeleteWarn] = useState(false);

  const editAction = (id: any, pNum: any) => {
    setEmployeId(id);
    setPhone(pNum);
    setEditToggle(!editToggle);
  };
  const clickOnDeleteButton = (e_id: any) => {
    setEmployeId(e_id);
    setDeleteWarn(true);
  };
  const deleteUser = async () => {
    try {
      const res = await axios.delete(EndPoint.EMPLOYEE_DELETE + employeId, {
        headers: { Authorization: "Bearer " + user?.access_token },
      });
      const resResult = await res.data;
      getAll();
      setDeleteWarn(false);
      toast.success("User is deleted.");
    } catch (error: any) {
      if (error?.response) {
        toast.error(Object.values(error.response.data).join(""));
      } else {
        toast.error("An unexpected error occurred.");
      }
      setDeleteWarn(false);

      console.log(error);
    }
  };

  return (
    <div>
      <table className="w-full text-center text-[#121212]">
        <thead className=" bg-[#DBDDE2] sticky top-0 z-10">
          <tr className=" text-left">
            <th className=" pl-2 py-2 text-[16px] font-semibold text-left ">
              Name
            </th>
            <th className=" py-2 text-[16px] font-semibold ">Mobile Numbers</th>
            <th className="  py-2 text-[16px] text-left font-semibold ">
              Email
            </th>
            <th className="  py-2 text-[16px] text-left font-semibold ">
              Role
            </th>

            <th className="  py-2 text-[16px] font-semibold ">Status</th>
            {user?.role === 0 && (
              <th className="  py-2 text-[16px] font-semibold ">Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <>
              <tr className="animate-pulse">
                <td className="p-2">
                  <div className="h-[20px] bg-gray_light rounded"></div>
                </td>
                <td className="p-2">
                  <div className="h-[20px] bg-gray_light rounded"></div>
                </td>
                <td className="p-2">
                  <div className="h-[20px] bg-gray_light rounded"></div>
                </td>
                <td className="p-2">
                  <div className="h-[20px] bg-gray_light rounded"></div>
                </td>
                <td className="p-2">
                  <div className="h-[20px] bg-gray_light rounded"></div>
                </td>

                <td className="p-2">
                  <div className="h-[20px] bg-gray_light rounded"></div>
                </td>
              </tr>
              <tr className="animate-pulse">
                <td className="p-2">
                  <div className="h-[20px] bg-gray_light rounded"></div>
                </td>
                <td className="p-2">
                  <div className="h-[20px] bg-gray_light rounded"></div>
                </td>
                <td className="p-2">
                  <div className="h-[20px] bg-gray_light rounded"></div>
                </td>
                <td className="p-2">
                  <div className="h-[20px] bg-gray_light rounded"></div>
                </td>
                <td className="p-2">
                  <div className="h-[20px] bg-gray_light rounded"></div>
                </td>
                <td className="p-2">
                  <div className="h-[20px] bg-gray_light rounded"></div>
                </td>
              </tr>
              <tr className="animate-pulse">
                <td className="p-2">
                  <div className="h-[20px] bg-gray_light rounded"></div>
                </td>
                <td className="p-2">
                  <div className="h-[20px] bg-gray_light rounded"></div>
                </td>
                <td className="p-2">
                  <div className="h-[20px] bg-gray_light rounded"></div>
                </td>
                <td className="p-2">
                  <div className="h-[20px] bg-gray_light rounded"></div>
                </td>
                <td className="p-2">
                  <div className="h-[20px] bg-gray_light rounded"></div>
                </td>

                <td className="p-2">
                  <div className="h-[20px] bg-gray_light rounded"></div>
                </td>
              </tr>
              <tr className="animate-pulse">
                <td className="p-2">
                  <div className="h-[20px] bg-gray_light rounded"></div>
                </td>
                <td className="p-2">
                  <div className="h-[20px] bg-gray_light rounded"></div>
                </td>
                <td className="p-2">
                  <div className="h-[20px] bg-gray_light rounded"></div>
                </td>
                <td className="p-2">
                  <div className="h-[20px] bg-gray_light rounded"></div>
                </td>
                <td className="p-2">
                  <div className="h-[20px] bg-gray_light rounded"></div>
                </td>

                <td className="p-2">
                  <div className="h-[20px] bg-gray_light rounded"></div>
                </td>
              </tr>
            </>
          ) : (
            rows?.map((item: any, index: any) => (
              <tr key={index} className=" hover:bg-bg_card cursor-pointer">
                {/* Your code to render each row */}
                <td
                  className=" pl-2 text-left font-semibold text-[#4a9d5c]"
                  onClick={() => router.push(`/management/user/${item.id}`)}
                >
                  {item.name}
                </td>
                <td className=" text-left">{`0${item.phone_number}`}</td>
                <td className=" text-left">{item.email}</td>
                <td className=" text-left">{roleArray[item.role]}</td>

                <td className="  py-2 flex justify-start items-center ">
                  {item.status ? (
                    <Image
                      src={"/icons/active.svg"}
                      height={24}
                      width={24}
                      alt=""
                    />
                  ) : (
                    <Image
                      src={"/icons/inactive.svg"}
                      height={24}
                      width={24}
                      alt=""
                    />
                  )}
                </td>
                {user?.role === 0 && (
                  <td>
                    <div className=" flex items-center justify-start gap-[8px]">
                      <div
                        className=" flex items-center justify-center  cursor-pointer "
                        onClick={() => editAction(item?.id, item?.phone_number)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="23"
                          height="22"
                          viewBox="0 0 23 22"
                          fill="none"
                          className="  hover:stroke-title rounded-md"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M21.5993 5.42905C19.4733 7.55505 14.4833 12.5441 13.2663 13.7571C13.0057 14.0173 12.6956 14.2227 12.3543 14.3611C11.3783 14.7661 8.99727 15.7001 8.29727 15.7471C8.09092 15.7609 7.884 15.7305 7.69038 15.6578C7.49676 15.5851 7.32093 15.4719 7.1747 15.3256C7.02846 15.1794 6.91519 15.0036 6.84251 14.8099C6.76982 14.6163 6.73939 14.4094 6.75327 14.2031C6.80027 13.5031 7.73427 11.1241 8.13227 10.1521C8.27127 9.80705 8.47827 9.49405 8.74127 9.23205L17.0713 0.90105C17.4749 0.498141 18.0219 0.271851 18.5923 0.271851C19.1626 0.271851 19.7096 0.498141 20.1133 0.90105L21.5993 2.38705C22.0022 2.7907 22.2285 3.33773 22.2285 3.90805C22.2285 4.47838 22.0022 5.0254 21.5993 5.42905ZM8.25627 14.2441C8.94027 14.1581 10.9393 13.3241 11.7793 12.9751C11.9389 12.9123 12.0839 12.8173 12.2053 12.6961L12.2063 12.6951C14.9855 9.92128 17.7628 7.14562 20.5383 4.36805C20.5987 4.30768 20.6467 4.23598 20.6794 4.15704C20.7122 4.07811 20.729 3.9935 20.729 3.90805C20.729 3.8226 20.7122 3.73799 20.6794 3.65906C20.6467 3.58013 20.5987 3.50842 20.5383 3.44805L19.0523 1.96205C18.9919 1.90158 18.9202 1.8536 18.8413 1.82087C18.7623 1.78814 18.6777 1.77129 18.5923 1.77129C18.5068 1.77129 18.4222 1.78814 18.3433 1.82087C18.2643 1.8536 18.1926 1.90158 18.1323 1.96205L9.80127 10.2931C9.68132 10.4124 9.58705 10.5549 9.52427 10.7121L9.52227 10.7161C9.17727 11.5581 8.34227 13.5591 8.25627 14.2441Z"
                            fill="#474D5C"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M19.6175 6.34909C19.6872 6.41876 19.7425 6.50147 19.7802 6.59249C19.8179 6.68351 19.8373 6.78107 19.8373 6.87959C19.8373 6.97812 19.8179 7.07568 19.7802 7.1667C19.7425 7.25772 19.6872 7.34043 19.6175 7.41009C19.5479 7.47976 19.4652 7.53502 19.3741 7.57273C19.2831 7.61043 19.1856 7.62983 19.087 7.62983C18.9885 7.62983 18.891 7.61043 18.7999 7.57273C18.7089 7.53502 18.6262 7.47976 18.5565 7.41009L15.0895 3.94309C14.9488 3.8024 14.8698 3.61157 14.8698 3.41259C14.8698 3.21362 14.9488 3.02279 15.0895 2.88209C15.2302 2.7414 15.4211 2.66235 15.62 2.66235C15.819 2.66235 16.0098 2.7414 16.1505 2.88209L19.6175 6.34909ZM13.4965 12.4701C13.5661 12.5397 13.6213 12.6223 13.659 12.7133C13.6967 12.8042 13.7161 12.9017 13.7161 13.0001C13.7161 13.0985 13.6967 13.196 13.659 13.2869C13.6213 13.3779 13.5661 13.4605 13.4965 13.5301C13.4269 13.5997 13.3443 13.6549 13.2534 13.6926C13.1624 13.7302 13.065 13.7496 12.9665 13.7496C12.8681 13.7496 12.7706 13.7302 12.6797 13.6926C12.5888 13.6549 12.5061 13.5997 12.4365 13.5301L8.96953 10.0631C8.89993 9.99349 8.84472 9.91086 8.80706 9.81993C8.76939 9.72899 8.75 9.63152 8.75 9.53309C8.75 9.43466 8.76939 9.3372 8.80706 9.24626C8.84472 9.15532 8.89993 9.07269 8.96953 9.00309C9.03913 8.93349 9.12176 8.87828 9.2127 8.84062C9.30364 8.80295 9.4011 8.78356 9.49953 8.78356C9.59796 8.78356 9.69543 8.80295 9.78637 8.84062C9.87731 8.87828 9.95993 8.93349 10.0295 9.00309L13.4965 12.4701Z"
                            fill="#474D5C"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M8 2.25C8.19891 2.25 8.38968 2.32902 8.53033 2.46967C8.67098 2.61032 8.75 2.80109 8.75 3C8.75 3.19891 8.67098 3.38968 8.53033 3.53033C8.38968 3.67098 8.19891 3.75 8 3.75H4.5C3.90326 3.75 3.33097 3.98705 2.90901 4.40901C2.48705 4.83097 2.25 5.40326 2.25 6V18C2.25 18.5967 2.48705 19.169 2.90901 19.591C3.33097 20.0129 3.90326 20.25 4.5 20.25H17.5C18.0967 20.25 18.669 20.0129 19.091 19.591C19.5129 19.169 19.75 18.5967 19.75 18V14.5C19.75 14.3011 19.829 14.1103 19.9697 13.9697C20.1103 13.829 20.3011 13.75 20.5 13.75C20.6989 13.75 20.8897 13.829 21.0303 13.9697C21.171 14.1103 21.25 14.3011 21.25 14.5V18C21.2495 18.9944 20.8542 19.9479 20.1511 20.6511C19.4479 21.3542 18.4944 21.7495 17.5 21.75H4.5C3.5056 21.7495 2.55208 21.3542 1.84893 20.6511C1.14579 19.9479 0.75053 18.9944 0.75 18V6C0.75 5.00544 1.14509 4.05161 1.84835 3.34835C2.55161 2.64509 3.50544 2.25 4.5 2.25H8Z"
                            fill="#474D5C"
                          />
                        </svg>
                      </div>

                      <div
                        className=" flex items-center justify-center  cursor-pointer "
                        onClick={() => clickOnDeleteButton(item?.id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="19"
                          height="22"
                          viewBox="0 0 19 22"
                          fill="none"
                        >
                          <path
                            d="M16.1641 6C15.8988 6 15.6445 6.10536 15.457 6.29289C15.2694 6.48043 15.1641 6.73478 15.1641 7V18.191C15.1354 18.6967 14.908 19.1706 14.5316 19.5094C14.1551 19.8482 13.66 20.0246 13.1541 20H5.17406C4.66816 20.0246 4.17305 19.8482 3.79657 19.5094C3.42009 19.1706 3.19275 18.6967 3.16406 18.191V7C3.16406 6.73478 3.05871 6.48043 2.87117 6.29289C2.68363 6.10536 2.42928 6 2.16406 6C1.89885 6 1.64449 6.10536 1.45696 6.29289C1.26942 6.48043 1.16406 6.73478 1.16406 7V18.191C1.19261 19.2272 1.63064 20.2099 2.38224 20.9238C3.13384 21.6378 4.13773 22.0247 5.17406 22H13.1541C14.1904 22.0247 15.1943 21.6378 15.9459 20.9238C16.6975 20.2099 17.1355 19.2272 17.1641 18.191V7C17.1641 6.73478 17.0587 6.48043 16.8712 6.29289C16.6836 6.10536 16.4293 6 16.1641 6ZM17.1641 3H13.1641V1C13.1641 0.734784 13.0587 0.48043 12.8712 0.292893C12.6836 0.105357 12.4293 0 12.1641 0H6.16406C5.89885 0 5.64449 0.105357 5.45696 0.292893C5.26942 0.48043 5.16406 0.734784 5.16406 1V3H1.16406C0.898846 3 0.644492 3.10536 0.456956 3.29289C0.269419 3.48043 0.164063 3.73478 0.164062 4C0.164063 4.26522 0.269419 4.51957 0.456956 4.70711C0.644492 4.89464 0.898846 5 1.16406 5H17.1641C17.4293 5 17.6836 4.89464 17.8712 4.70711C18.0587 4.51957 18.1641 4.26522 18.1641 4C18.1641 3.73478 18.0587 3.48043 17.8712 3.29289C17.6836 3.10536 17.4293 3 17.1641 3ZM7.16406 3V2H11.1641V3H7.16406Z"
                            fill="black"
                          />
                          <path
                            d="M8.16406 16V9C8.16406 8.73478 8.05871 8.48043 7.87117 8.29289C7.68363 8.10536 7.42928 8 7.16406 8C6.89885 8 6.64449 8.10536 6.45696 8.29289C6.26942 8.48043 6.16406 8.73478 6.16406 9V16C6.16406 16.2652 6.26942 16.5196 6.45696 16.7071C6.64449 16.8946 6.89885 17 7.16406 17C7.42928 17 7.68363 16.8946 7.87117 16.7071C8.05871 16.5196 8.16406 16.2652 8.16406 16ZM12.1641 16V9C12.1641 8.73478 12.0587 8.48043 11.8712 8.29289C11.6836 8.10536 11.4293 8 11.1641 8C10.8988 8 10.6445 8.10536 10.457 8.29289C10.2694 8.48043 10.1641 8.73478 10.1641 9V16C10.1641 16.2652 10.2694 16.5196 10.457 16.7071C10.6445 16.8946 10.8988 17 11.1641 17C11.4293 17 11.6836 16.8946 11.8712 16.7071C12.0587 16.5196 12.1641 16.2652 12.1641 16Z"
                            fill="black"
                          />
                        </svg>
                      </div>
                      {deleteWarn && (
                        <DeleteCaution
                          close={() => setDeleteWarn(false)}
                          okfunction={() => deleteUser()}
                        />
                      )}
                    </div>
                    {editToggle && (
                      <CustomModal setClose={setEditToggle}>
                        <MemberEditForm
                          getAll={getAll}
                          modalHide={setEditToggle}
                          employeeId={employeId}
                          userNumber={phone}
                        />
                      </CustomModal>
                    )}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
      <Pagination
        pageNo={pageNo}
        pageSize={pageSize}
        setPageNo={setPageNo}
        setPageSize={setPageSize}
        totalPage={total}
      />
    </div>
  );
}
