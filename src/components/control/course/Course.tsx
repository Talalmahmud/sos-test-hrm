"use client";
import React, { useEffect, useState } from "react";
import AddButton from "../AddButton";
import CustomModal from "@/components/CustomModal";
import Image from "next/image";
import CourseForm from "./CourseForm";
import { toast } from "react-toastify";
import axios from "axios";
import { EndPoint } from "@/utils/api";
import TableRowSkeleton from "@/components/skeleton/TabelRowSkeleton";

type Props = {};

const Course = (props: Props) => {
  const [toggle, setToggle] = useState(false);
  const [editToggle, setEditToggle] = useState<boolean>(false);
  const [listData, setListData] = useState([]);
  const [probidanId, setProbidanId] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getAll = async () => {
    setIsLoading(true);
    const res = await axios.get(EndPoint.GET_PROBIDAN);
    const resData = await res.data;
    setListData(resData?.results);
    setIsLoading(false);
  };

  const deleteCatagory = async (catagory_id: any) => {
    try {
      const res = await axios.delete(EndPoint.DELETE_PROBIDAN + catagory_id);
      getAll();
      toast.success("Probidhan is deleted.");
    } catch (error: any) {
      if (error?.response) {
        toast.error(Object.values(error.response.data).join(""));
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };
  const editAction = (pId: any) => {
    setProbidanId(pId);
    setEditToggle(!editToggle);
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <div className=" flex flex-col gap-[24px]">
      <AddButton
        title="Add Probidan"
        boxWidth={230}
        clickFunction={() => setToggle(true)}
      />
      <div className=" border-[1px] border-gray_light ">
        <table className="w-full text-left text-[#121212] ">
          <thead className=" bg-[#DBDDE2] ">
            <tr>
              <th className=" pl-1 py-2 text-[16px] font-semibold ">Name</th>

              <th className=" pl-1 py-2 text-[16px] font-semibold ">Status</th>
              <th className=" pl-1 py-2 text-[16px] font-semibold ">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <>
                <TableRowSkeleton colomNumber={3} />
                <TableRowSkeleton colomNumber={3} />
                <TableRowSkeleton colomNumber={3} />
                <TableRowSkeleton colomNumber={3} />
              </>
            ) : (
              listData?.map((item: any, index: any) => (
                <tr
                  key={index}
                  className={` hover:bg-bg_card text-left cursor-pointer ${
                    index % 2 === 0 && "bg-bg_orange"
                  }`}
                >
                  <td>{item?.probidhan_year}</td>
                  <td className="py-2 ">
                    {item?.status ? (
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
                  <td>
                    {
                      <div className=" flex items-center gap-[10px]">
                        <div
                          className=" flex items-center justify-center  cursor-pointer "
                          onClick={() => editAction(item.id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
                            viewBox="0 0 22 22"
                            fill="none"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M21.2633 5.42917C19.1373 7.55517 14.1473 12.5442 12.9303 13.7572C12.6697 14.0174 12.3596 14.2228 12.0183 14.3612C11.0423 14.7662 8.66133 15.7002 7.96133 15.7472C7.75498 15.761 7.54806 15.7306 7.35444 15.6579C7.16082 15.5852 6.985 15.472 6.83876 15.3257C6.69252 15.1795 6.57926 15.0037 6.50657 14.8101C6.43388 14.6164 6.40346 14.4095 6.41733 14.2032C6.46433 13.5032 7.39833 11.1242 7.79633 10.1522C7.93533 9.80717 8.14233 9.49417 8.40533 9.23217L16.7353 0.901172C17.139 0.498263 17.686 0.271973 18.2563 0.271973C18.8267 0.271973 19.3737 0.498263 19.7773 0.901172L21.2633 2.38717C21.6662 2.79082 21.8925 3.33785 21.8925 3.90817C21.8925 4.4785 21.6662 5.02552 21.2633 5.42917ZM7.92033 14.2442C8.60433 14.1582 10.6033 13.3242 11.4433 12.9752C11.603 12.9124 11.748 12.8174 11.8693 12.6962L11.8703 12.6952C14.6496 9.92141 17.4269 7.14574 20.2023 4.36817C20.2628 4.3078 20.3108 4.2361 20.3435 4.15717C20.3762 4.07823 20.3931 3.99362 20.3931 3.90817C20.3931 3.82272 20.3762 3.73811 20.3435 3.65918C20.3108 3.58025 20.2628 3.50854 20.2023 3.44817L18.7163 1.96217C18.656 1.9017 18.5843 1.85373 18.5053 1.82099C18.4264 1.78826 18.3418 1.77141 18.2563 1.77141C18.1709 1.77141 18.0863 1.78826 18.0073 1.82099C17.9284 1.85373 17.8567 1.9017 17.7963 1.96217L9.46533 10.2932C9.34538 10.4125 9.25111 10.5551 9.18833 10.7122L9.18633 10.7162C8.84133 11.5582 8.00633 13.5592 7.92033 14.2442Z"
                              fill="black"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M19.2816 6.34934C19.3513 6.419 19.4065 6.50171 19.4442 6.59273C19.4819 6.68376 19.5013 6.78131 19.5013 6.87984C19.5013 6.97836 19.4819 7.07592 19.4442 7.16694C19.4065 7.25797 19.3513 7.34067 19.2816 7.41034C19.2119 7.48 19.1292 7.53527 19.0382 7.57297C18.9472 7.61067 18.8496 7.63008 18.7511 7.63008C18.6526 7.63008 18.555 7.61067 18.464 7.57297C18.373 7.53527 18.2903 7.48 18.2206 7.41034L14.7536 3.94334C14.6129 3.80264 14.5339 3.61181 14.5339 3.41284C14.5339 3.21386 14.6129 3.02304 14.7536 2.88234C14.8943 2.74164 15.0851 2.6626 15.2841 2.6626C15.4831 2.6626 15.6739 2.74164 15.8146 2.88234L19.2816 6.34934ZM13.1606 12.4703C13.2302 12.5399 13.2854 12.6226 13.3231 12.7135C13.3607 12.8044 13.3801 12.9019 13.3801 13.0003C13.3801 13.0988 13.3607 13.1962 13.3231 13.2872C13.2854 13.3781 13.2302 13.4607 13.1606 13.5303C13.091 13.5999 13.0084 13.6551 12.9174 13.6928C12.8265 13.7305 12.729 13.7499 12.6306 13.7499C12.5322 13.7499 12.4347 13.7305 12.3438 13.6928C12.2528 13.6551 12.1702 13.5999 12.1006 13.5303L8.6336 10.0633C8.564 9.99374 8.50879 9.91111 8.47112 9.82017C8.43345 9.72923 8.41406 9.63177 8.41406 9.53334C8.41406 9.43491 8.43345 9.33744 8.47112 9.2465C8.50879 9.15557 8.564 9.07294 8.6336 9.00334C8.7032 8.93374 8.78582 8.87853 8.87676 8.84086C8.9677 8.80319 9.06517 8.7838 9.1636 8.7838C9.26203 8.7838 9.35949 8.80319 9.45043 8.84086C9.54137 8.87853 9.624 8.93374 9.6936 9.00334L13.1606 12.4703Z"
                              fill="black"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M7.66406 2.25C7.86297 2.25 8.05374 2.32902 8.19439 2.46967C8.33504 2.61032 8.41406 2.80109 8.41406 3C8.41406 3.19891 8.33504 3.38968 8.19439 3.53033C8.05374 3.67098 7.86297 3.75 7.66406 3.75H4.16406C3.56733 3.75 2.99503 3.98705 2.57307 4.40901C2.15112 4.83097 1.91406 5.40326 1.91406 6V18C1.91406 18.5967 2.15112 19.169 2.57307 19.591C2.99503 20.0129 3.56733 20.25 4.16406 20.25H17.1641C17.7608 20.25 18.3331 20.0129 18.7551 19.591C19.177 19.169 19.4141 18.5967 19.4141 18V14.5C19.4141 14.3011 19.4931 14.1103 19.6337 13.9697C19.7744 13.829 19.9652 13.75 20.1641 13.75C20.363 13.75 20.5537 13.829 20.6944 13.9697C20.835 14.1103 20.9141 14.3011 20.9141 14.5V18C20.9135 18.9944 20.5183 19.9479 19.8151 20.6511C19.112 21.3542 18.1585 21.7495 17.1641 21.75H4.16406C3.16966 21.7495 2.21614 21.3542 1.513 20.6511C0.809851 19.9479 0.414592 18.9944 0.414062 18V6C0.414062 5.00544 0.809151 4.05161 1.51241 3.34835C2.21567 2.64509 3.1695 2.25 4.16406 2.25H7.66406Z"
                              fill="black"
                            />
                          </svg>
                        </div>
                        <div
                          className=" flex items-center justify-center  cursor-pointer "
                          onClick={() => deleteCatagory(item?.id)}
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
                      </div>
                    }
                    {editToggle && (
                      <CustomModal setClose={setEditToggle}>
                        <CourseForm
                          probidan_id={probidanId}
                          listUpdate={getAll}
                          formClose={setEditToggle}
                        />
                      </CustomModal>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {toggle && (
        <CustomModal setClose={() => setToggle(false)}>
          <CourseForm
            editToggle={editToggle}
            listUpdate={getAll}
            formClose={setToggle}
          />
        </CustomModal>
      )}
    </div>
  );
};

export default Course;
