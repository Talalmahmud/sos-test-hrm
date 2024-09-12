"use client";

import { EndPoint } from "@/utils/api";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { AuthContext } from "../ContextProvider";
import { useContext, useState } from "react";
import Link from "next/link";
import TableRowSkeleton from "../skeleton/TabelRowSkeleton";
import DeleteCaution from "../DeleteCaution";

type Props = { studentList: any; listUpdate: any; isLoading: any };

const StudentList = ({ studentList, listUpdate, isLoading }: Props) => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const pathName = usePathname();
  const [deleteWarn, setDeleteWarn] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  const navigatationHandle = (sId: any) => {
    router.push(`/management/student/portal/${sId}/student/`);
  };

  const clikOndeleteButton = (item_id: any) => {
    setDeleteId(item_id);
    setDeleteWarn(true);
  };

  const deleteStudent = async () => {
    try {
      const res = await axios.delete(EndPoint.DELETE_STUDENT + deleteId, {
        headers: { Authorization: "Bearer " + user?.access_token },
      });
      const result = await res.data;
      listUpdate();
      setDeleteWarn(false);
      toast.success("Studen is Deleted.");
    } catch (error: any) {
      if (error?.response) {
        toast.error(Object.values(error.response.data).join(""));
        setDeleteWarn(false);
      } else {
        toast.error("An unexpected error occurred.");
        setDeleteWarn(false);
      }
    }
  };

  return (
    <div className=" w-full">
      <table className="w-full text-[#121212]">
        <thead className=" bg-[#DBDDE2] sticky top-0">
          <tr className=" text-left">
            <th className=" py-2 text-[14px] font-semibold hidden md:block ">
              Type
            </th>
            <th className=" px-1 py-2 text-[14px] font-semibold ">
              Student Name
            </th>

            <th className=" px-1 py-2 text-[14px] font-semibold ">
              Mobile Number
            </th>
            <th
              className={` px-1 py-2 text-[14px] font-semibold ${
                pathName === "/management/student/list/my" && "hidden"
              } `}
            >
              Mentor
            </th>

            <th className=" px-1 hidden md:block py-2 text-[14px] font-semibold ">
              Session/Passing Year
            </th>
            <th className=" py-2 text-[14px] font-semibold ">Status</th>
            <th className=" px-1 py-2 text-[14px] font-semibold ">Action</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <>
              <TableRowSkeleton colomNumber={7} />
              <TableRowSkeleton colomNumber={7} />
              <TableRowSkeleton colomNumber={7} />
              <TableRowSkeleton colomNumber={7} />
              <TableRowSkeleton colomNumber={7} />
              <TableRowSkeleton colomNumber={7} />
            </>
          ) : (
            studentList?.map((item: any, index: any) => (
              <tr
                key={index}
                className=" shadow-sm text-[14px] text-left hover:bg-bg_orange"
              >
                <td className=" hidden md:block py-2">{`${item?.student_type}`}</td>
                <td
                  onClick={() => navigatationHandle(item?.id)}
                  className=" px-1 py-2 font-semibold cursor-pointer text-[#4a9d5c] text-left"
                >
                  {item?.name}
                </td>
                <td className=" px-1 py-2">{`${item?.phone_number}`}</td>
                <td
                  className={` px-1 py-2 ${
                    pathName === "/management/student/list/my" && "hidden"
                  } `}
                >
                  {item?.mentor}
                </td>

                <td className=" hidden md:block px-1 py-2">
                  {item?.student_type === "Polytechnic"
                    ? item?.session_info?.session_year
                    : item?.general_passing_year}
                </td>
                <td className="  py-2">{item?.current_status}</td>
                <div className=" flex py-2 px-1  gap-[16px] items-center justify-start  cursor-pointer ">
                  <div>
                    <Link
                      href={`/management/student/portal/${item?.id}/student`}
                    >
                      <svg
                        width="24"
                        height="16"
                        viewBox="0 0 24 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className=" hover:stroke-blue"
                      >
                        <path
                          d="M12 0.846863C7.41454 0.846863 3.25621 3.35561 0.187788 7.43048C-0.0625959 7.76432 -0.0625959 8.23072 0.187788 8.56457C3.25621 12.6443 7.41454 15.1531 12 15.1531C16.5855 15.1531 20.7438 12.6443 23.8122 8.56948C24.0626 8.23563 24.0626 7.76923 23.8122 7.43539C20.7438 3.35561 16.5855 0.846863 12 0.846863ZM12.3289 13.0371C9.28506 13.2286 6.7714 10.7198 6.96287 7.67104C7.11998 5.15739 9.15741 3.11995 11.6711 2.96285C14.7149 2.77138 17.2286 5.28012 17.0371 8.32891C16.8751 10.8377 14.8377 12.8751 12.3289 13.0371ZM12.1767 10.71C10.537 10.8131 9.18196 9.463 9.28997 7.82324C9.37343 6.46822 10.4732 5.3734 11.8282 5.28503C13.4679 5.18193 14.823 6.53204 14.7149 8.17181C14.6266 9.53174 13.5268 10.6265 12.1767 10.71Z"
                          fill="#081D14"
                          fill-opacity="0.5"
                        />
                      </svg>
                    </Link>
                  </div>
                  {user?.role === 0 &&
                    pathName === "/management/student/list/all" && (
                      <div onClick={() => clikOndeleteButton(item?.id)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="19"
                          height="22"
                          viewBox="0 0 19 22"
                          fill="none"
                          stroke-width="0.2"
                          stroke="currentColor"
                          className="hover:text-red"
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
                    )}
                  <div>
                    <Link href={`/management/enrollment/${item?.id}`}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="2.5"
                        stroke="currentColor"
                        className="size-5 hover:text-red"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M12 4.5v15m7.5-7.5h-15"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {deleteWarn && (
        <DeleteCaution
          close={() => setDeleteWarn(false)}
          okfunction={() => deleteStudent()}
        />
      )}
    </div>
  );
};

export default StudentList;
