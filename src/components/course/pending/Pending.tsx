"use client";
import CustomModal from "@/components/CustomModal";
import React, { useContext, useEffect, useState } from "react";
import PendingForm from "./PendingForm";
import axios from "axios";
import { EndPoint } from "@/utils/api";
import Pagination from "@/components/Pagination";
import { useRouter } from "next/navigation";
import Select from "react-select";
import { semesterLabel } from "@/utils/staticData";
import Link from "next/link";
import { AuthContext } from "@/components/ContextProvider";
import TableRowSkeleton from "@/components/skeleton/TabelRowSkeleton";
import SponsoredForm from "./SponsoredForm";
import ReferrededForm from "./ReferredForm";

type Props = {};

const Pending = (props: Props) => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const [toggle, setToggle] = useState(false);
  const [editToggle, setEditToggle] = useState(false);
  const [enrollmentList, setEnrollmentList] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
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
  const [isDataLoading, setIsDataLoading] = useState(false);

  const [sponsorToggle, setSponsorToggle] = useState(false);
  const [refardToggle, setRefardToggle] = useState(false);

  const [sponsorId, setSponsorId] = useState<any>(null);

  const getEnrollmentList = async () => {
    if (user) {
      setIsDataLoading(true);
      const res = await axios.get(EndPoint.GET_ENROLLMENT_LIST, {
        params: {
          limit: pageSize,
          offset: pageNo * pageSize,
          status: "Pending",
          category: selectedCategory?.label,
          plan: selectedPlan?.label,
          package: selectedPackage?.label,
          softmax_student_id: searchId,
          phone_number: phone,
        },
        headers: { Authorization: "Bearer " + user?.access_token },
      });
      const result = res.data;
      setEnrollmentList(result?.results);
      setTotalDataSet(result?.count);
      setIsDataLoading(false);
    }
  };

  const updateEnrollmentStatus = async (id: any, index: any) => {
    setIsLoading(true);
    setEid(index);
    const res = await axios.patch(EndPoint.UPDATE_ENROLLMENT + id, {
      status: "Complete",
    });
    const result = res.data;
    setIsLoading(false);
    getEnrollmentList();
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
    searchId,
    user,
  ]);

  useEffect(() => {
    getPlanList();
    getPackageList();
    getCategoryList();
  }, []);
  return (
    <div className=" flex flex-col gap-[24px]">
      <div className=" w-full flex flex-col gap-[16px] ">
        <div className=" grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-[4px] gap-x-[16px]">
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

          <div className=" flex flex-col gap-[4px] text-[16px] ">
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
          </div>
        </div>
      </div>

      <div className=" w-full h-[1px] bg-gray_light shadow-md"></div>
      <div className="shadow-md">
        <table className="w-full shadow-md">
          <thead className="bg-[#DBDDE2]  z-10">
            <tr>
              <th className=" text-left pl-1 py-2 text-[13px] font-semibold">
                Name
              </th>
              <th className=" text-left py-2 text-[13px] font-semibold">
                Phone
              </th>
              <th className=" text-left py-2 text-[13px] font-semibold">
                Owner
              </th>
              <th className=" text-left py-2 text-[13px] font-semibold">
                Session
              </th>
              <th className=" text-left py-2 text-[13px] font-semibold">
                Semester
              </th>

              <th className=" text-left py-2 text-[13px] font-semibold">
                Course
              </th>
              <th className=" text-left py-2 text-[13px] font-semibold">
                Package
              </th>

              <th className=" text-left py-2 text-[13px] font-semibold">
                Department
              </th>
              <th className=" text-left py-2 text-[13px] font-semibold">
                Course Fee
              </th>
              <th className=" text-left py-2 text-[13px] font-semibold">
                Paid
              </th>
              {user?.role === 0 && (
                <th className="px-[2px] text-left py-2 text-[13px] font-semibold">
                  Action
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {isDataLoading ? (
              <>
                <TableRowSkeleton colomNumber={11} />
                <TableRowSkeleton colomNumber={11} />
                <TableRowSkeleton colomNumber={11} />
                <TableRowSkeleton colomNumber={11} />
              </>
            ) : (
              enrollmentList?.map((enroll: any, index: number) => (
                <tr
                  key={index}
                  className={`hover:bg-bg_card  text-center shadow-md whitespace-nowrap cursor-pointer text-[12px] align-top py-[8px]  ${
                    enroll?.sponsored_amount > 0 ? "bg-green/30" : ""
                  }`}
                >
                  <td className=" pl-1 text-left py-4 text-orange ">
                    <Link
                      href={`/management/student/portal/${enroll?.student?.id}/student`}
                    >
                      {enroll?.student?.name}
                    </Link>
                  </td>
                  <td className=" text-left py-4">{enroll?.payment_number}</td>
                  <td className=" text-left py-4">{enroll?.employee?.name}</td>
                  <td className=" text-left py-4">
                    {enroll?.student?.session_info?.session_year}
                  </td>
                  <td className=" text-left py-4">
                    <div className=" grid grid-cols-4">
                      {enroll?.enrollment_semester?.map(
                        (item: any, index: any) => (
                          <p key={index}>{semesterLabel(item)},</p>
                        )
                      )}
                    </div>
                  </td>
                  <td className=" text-left py-4">
                    {enroll?.category?.category_name}
                  </td>
                  <td className=" text-left py-4">
                    {enroll?.package?.package_name}
                  </td>
                  <td className=" text-left py-4">
                    {enroll?.student?.department_info?.full_name}
                  </td>
                  <td className=" text-left py-4">{enroll?.course_fee}/-</td>
                  <td className=" text-left py-4">{enroll?.payable_fee}/-</td>
                  {user?.role === 0 && (
                    <td className=" text-left py-4 ">
                      <div className=" flex items-center  gap-[10px]">
                        <Link
                          href={`/management/enrollment/${enroll?.student?.id}/?enroll_id=${enroll?.id}`}
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
                        </Link>
                        {enroll?.package?.package_name === "Refard Course" && (
                          <button
                            onClick={() => {
                              setSponsorId(enroll?.id);
                              setRefardToggle(true);
                            }}
                            className=" bg-title text-white p-1 rounded-[4px] text-[10px]"
                          >
                            refard
                          </button>
                        )}
                        {enroll?.sponsored_amount > 0 ? (
                          <button
                            onClick={() => {
                              setSponsorId(enroll?.id);
                              setSponsorToggle(true);
                            }}
                            className=" bg-green text-white p-1 rounded-[4px] text-[10px]"
                          >
                            sponsor
                          </button>
                        ) : isLoading && eId === index ? (
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
                              <circle
                                cx="20.1992"
                                cy="37"
                                r="3"
                                fill="#EB592A"
                              />
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
                        {/* {isLoading && eId === index ? (
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
                      )} */}
                      </div>

                      {/* {editToggle && (
                    <CustomModal setClose={setEditToggle}>
                      <PendingForm formClose={setEditToggle} />
                    </CustomModal>
                  )} */}
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
      {refardToggle && (
        <CustomModal setClose={() => setRefardToggle(false)}>
          <ReferrededForm
            sponsoredId={sponsorId}
            setSponsorToggle={setRefardToggle}
          />
        </CustomModal>
      )}

      {sponsorToggle && (
        <CustomModal setClose={() => setSponsorToggle(false)}>
          <SponsoredForm
            updateList={getEnrollmentList}
            sponsoredId={sponsorId}
            setSponsorToggle={setSponsorToggle}
          />
        </CustomModal>
      )}
    </div>
  );
};

export default Pending;
