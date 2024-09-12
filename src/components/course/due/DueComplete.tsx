"use client";
import CustomModal from "@/components/CustomModal";
import React, { useContext, useEffect, useState } from "react";

import axios from "axios";
import { EndPoint } from "@/utils/api";
import Pagination from "@/components/Pagination";
import { useRouter } from "next/navigation";
import Select from "react-select";
import { semesterLabel } from "@/utils/staticData";
import PendingForm from "../pending/PendingForm";
import { AuthContext } from "@/components/ContextProvider";
import TableRowSkeleton from "@/components/skeleton/TabelRowSkeleton";
import Link from "next/link";

type Props = {};

const DueComplete = (props: Props) => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [toggle, setToggle] = useState(false);
  const [toggleData, setToggleData] = useState("");
  const [editToggle, setEditToggle] = useState(false);
  const [enrollmentList, setEnrollmentList] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [isInstallmentLoading, setIsInstallmentLoading] = useState(false);
  const [eId, setEid] = useState<any>("");
  const [pageNo, setPageNo] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalDataSet, setTotalDataSet] = useState(0);

  const [categoryList, setCategoryList] = useState<any>([]);
  const [packageList, setPackageList] = useState<any>([]);
  const [filterpackageList, setFilterPackageList] = useState<any>([]);
  const [planList, setPlanList] = useState<any>([]);
  const [selectedCategory, setSelectedCategory] = useState<any>("");
  const [selectedPackage, setSelectedPackage] = useState<any>("");
  const [selectedPlan, setSelectedPlan] = useState<any>("");
  // const [selectedPaymentType, setSelectedPaymentType] = useState<any>("");
  const [searchId, setSearchId] = useState("");
  const [phone, setPhone] = useState("");

  const getEnrollmentList = async () => {
    if (user) {
      const res = await axios.get(EndPoint.DUE_PENDING_LIST, {
        params: {
          limit: pageSize,
          offset: pageNo * pageSize,
          status: "Due-Complete",
          category: selectedCategory?.value,
          plan: selectedPlan?.value,
          package: selectedPackage?.value,
        },
        headers: { Authorization: "Bearer " + user?.access_token },
      });
      const result = res.data;
      setEnrollmentList(result?.results);
      setTotalDataSet(result?.count);
    }
  };

  const updateEnrollmentStatus = async (id: any, index: any) => {
    if (user) {
      setIsInstallmentLoading(true);
      setEid(index);
      const res = await axios.patch(
        EndPoint.UPDATE_INSTALLMENT + id,
        {},
        {
          headers: { Authorization: "Bearer " + user?.access_token },
        }
      );
      const result = res.data;
      setIsInstallmentLoading(false);
      getEnrollmentList();
    }
    // router.push("/management/course/paid-course");
  };

  const getCategoryList = async () => {
    const res = await axios.get(EndPoint.GET_DROPDOWN_CATAGORY);
    const result = await res.data;
    setCategoryList(result.results);
  };
  const getFilterPackage = () => {
    const filterData = packageList?.filter(
      (item: any) => item.category_id == selectedCategory?.value
    );
    setFilterPackageList(filterData);
  };

  const getPackageList = async () => {
    const res = await axios.get(EndPoint.GET_ALL_PACKAGE_LIST);
    const result = await res.data;
    setPackageList(result.results);
  };

  const getPlanList = async () => {
    const res = await axios.get(EndPoint.GET_ALL_PLAN_LIST);
    const result = await res.data;
    setPlanList(result.results);
  };
  useEffect(() => {
    getFilterPackage();
  }, [selectedCategory]);
  useEffect(() => {
    getEnrollmentList();
  }, [
    pageNo,
    pageSize,
    selectedCategory,
    selectedPackage,
    selectedPlan,
    phone,
    user,
    searchId,
  ]);

  useEffect(() => {
    getPlanList();
    getPackageList();
    getCategoryList();
  }, []);
  return (
    <div className=" flex flex-col gap-[24px]">
      <div className=" w-full flex flex-col gap-[16px] ">
        <div className=" grid grid-cols-3 gap-y-[4px] gap-x-[16px]">
          <div className=" flex flex-col gap-[4px]">
            <p className=" text-[16px] font-semibold ">Category:</p>
            <div className=" w-full  cursor-pointer">
              <Select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e);
                }}
                options={categoryList}
                isClearable
                className=" w-full  text-[16px] cursor-pointer"
                placeholder="Select Category"
              />
            </div>
          </div>

          <div className=" flex flex-col gap-[4px]">
            <p className=" font-bold ">Package:</p>
            <div className=" w-full  cursor-pointer">
              <Select
                onChange={(e) => setSelectedPackage(e)}
                options={filterpackageList}
                isClearable
                className=" w-full  text-[16px] cursor-pointer"
                placeholder="Select Plan"
              />
            </div>
          </div>

          <div className=" flex flex-col gap-[4px]">
            <p className=" font-bold ">Plan:</p>
            <div className=" w-full  cursor-pointer">
              <Select
                value={selectedPlan}
                onChange={(e) => setSelectedPlan(e)}
                options={planList}
                isClearable
                className=" w-full  text-[16px] cursor-pointer"
                placeholder="Select Plan"
              />
            </div>
          </div>

          {/* <div className=" flex flex-col gap-[4px] text-[16px] ">
            <p className=" text-[16px] font-semibold">SoftmaxId:</p>
            <div className=" relative">
              <input
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder="Search by softmax id"
                className=" w-full px-[8px] h-[36px] text-[16px] outline-none border-[1px] border-gray_light rounded-[4px] "
              />
            </div>
          </div>
          <div className=" flex flex-col gap-[4px] text-[16px] ">
            <p className=" text-[16px] font-semibold">Phone:</p>
            <div className=" relative">
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Search by student phone number"
                className=" w-full px-[8px] h-[36px] text-[16px] outline-none border-[1px] border-gray_light rounded-[4px] "
              />
            </div>
          </div> */}
        </div>
      </div>

      <div className=" w-full h-[1px] bg-gray_light shadow-md"></div>
      <div className="shadow-md">
        <table className="w-full text-left">
          <thead className="bg-[#DBDDE2] ">
            <tr>
              <th className="px-2 py-2 text-[13px]  font-semibold">Name</th>

              <th
                className={`px-2 py-2 text-[13px] ${
                  user?.role === 0 ? "block" : "hidden"
                } font-semibold`}
              >
                Owner
              </th>
              <th className="px-2 py-2 text-[13px]  font-semibold">Category</th>
              <th className="px-2 py-2 text-[13px] font-semibold">Package</th>
              <th className="px-2 py-2 text-[13px] font-semibold">Plan</th>

              <th className="px-2 py-2 text-[13px] font-semibold">Paid</th>

              <th className="px-2 py-2 text-[13px] font-semibold">Note</th>

              {user?.role === 0 && (
                <th className="px-2 py-2 text-[13px] font-semibold">Action</th>
              )}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <>
                <TableRowSkeleton colomNumber={10} />{" "}
                <TableRowSkeleton colomNumber={10} />
                <TableRowSkeleton colomNumber={10} />
                <TableRowSkeleton colomNumber={10} />
                <TableRowSkeleton colomNumber={10} />
              </>
            ) : (
              enrollmentList?.map((enroll: any, index: number) => (
                <tr
                  key={index}
                  className={`hover:bg-bg_card  text-left shadow-md whitespace-nowrap text-[12px] align-top py-[8px] ${
                    index % 2 === 0 && " bg-orange"
                  }}`}
                >
                  <td className="pl-2 text-left py-2 text-orange ">
                    <Link
                      href={`/management/student/portal/${enroll?.due_enrollment?.student_id}/student`}
                    >
                      {enroll?.due_enrollment?.student_name}
                    </Link>
                  </td>
                  <td
                    className={`px-2 py-2 ${
                      user?.role === 0 ? "flex" : "hidden"
                    }`}
                  >
                    {enroll?.due_enrollment?.owner}
                  </td>
                  <td className="px-2 py-2 ">
                    {enroll?.due_enrollment?.category}
                  </td>
                  <td className="px-2 py-2  ">
                    {enroll?.due_enrollment?.package}
                  </td>
                  <td className="px-2 py-2 ">{enroll?.due_enrollment?.plan}</td>

                  <td className="px-2 py-2">
                    {enroll?.due_enrollment?.payable_fee}/-
                  </td>

                  <td
                    className="px-2 cursor-pointer py-2 "
                    onClick={() => {
                      setToggle(true);
                      setToggleData(enroll?.payment_note);
                    }}
                  >
                    {enroll?.payment_note?.slice(0, 20)}..
                  </td>

                  {user?.role === 0 && (
                    <td className="px-2 py-2">
                      {isInstallmentLoading && eId === index ? (
                        <div>
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 40 40"
                            fill="none"
                            className=" animate-spin"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M40 20C40 31.0457 31.0457 40 20 40C8.9543 40 0 31.0457 0 20C0 8.9543 8.9543 0 20 0C31.0457 0 40 8.9543 40 20ZM5.98053 20C5.98053 27.7427 12.2573 34.0195 20 34.0195C27.7427 34.0195 34.0195 27.7427 34.0195 20C34.0195 12.2573 27.7427 5.98053 20 5.98053C12.2573 5.98053 5.98053 12.2573 5.98053 20Z"
                              fill="url(#paint0_angular_2903_21177)"
                            />
                            <circle cx="20.1992" cy="37" r="3" fill="#EB592A" />
                            <defs>
                              <radialGradient
                                id="paint0_angular_2903_21177"
                                cx="0"
                                cy="0"
                                r="1"
                                gradientUnits="userSpaceOnUse"
                                gradientTransform="translate(20 20) rotate(90) scale(20)"
                              >
                                <stop stop-color="#EB592A" />
                                <stop offset="0.245" stop-color="#EB592A" />
                                <stop
                                  offset="1"
                                  stop-color="#EB592A"
                                  stop-opacity="0"
                                />
                              </radialGradient>
                            </defs>
                          </svg>
                        </div>
                      ) : (
                        <div
                          className=" flex items-center justify-center  cursor-pointer "
                          onClick={() =>
                            updateEnrollmentStatus(enroll?.id, index)
                          }
                        >
                          <svg
                            width="18"
                            height="16"
                            viewBox="0 0 24 19"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className=" hover:stroke-light_red"
                          >
                            <path
                              d="M9.19003 18.3233C8.96095 18.5537 8.64835 18.6823 8.32369 18.6823C7.99902 18.6823 7.68642 18.5537 7.45735 18.3233L0.538518 11.4033C-0.179506 10.6853 -0.179506 9.52094 0.538518 8.80429L1.40486 7.93772C2.12311 7.2197 3.28608 7.2197 4.00411 7.93772L8.32374 12.2575L19.9958 0.585149C20.714 -0.132875 21.8782 -0.132875 22.595 0.585149L23.4614 1.45172C24.1794 2.16974 24.1794 3.33386 23.4614 4.05074L9.19003 18.3233Z"
                              fill="#10B981"
                            />
                          </svg>
                        </div>
                      )}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalDataSet > 10 && (
        <Pagination
          pageNo={pageNo}
          pageSize={pageSize}
          setPageNo={setPageNo}
          setPageSize={setPageSize}
          totalPage={totalDataSet}
        />
      )}

      {toggle && (
        <CustomModal setClose={() => setToggle(false)}>
          <div className="max-w-[600px] h-auto bg-white p-4">
            <p className="w-full break-words text-[18px]">{toggleData}</p>
          </div>
        </CustomModal>
      )}
    </div>
  );
};

export default DueComplete;
