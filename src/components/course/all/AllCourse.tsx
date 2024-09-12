"use client";
import CustomModal from "@/components/CustomModal";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { EndPoint } from "@/utils/api";
import Pagination from "@/components/Pagination";
import Select from "react-select";
import DateFilterDropdown from "@/components/DateFilterDropdown";
import { formatDate } from "date-fns";
import { semesterLabel } from "@/utils/staticData";
import { toast } from "react-toastify";
import Link from "next/link";
import DeleteCaution from "@/components/DeleteCaution";
import TableRowSkeleton from "@/components/skeleton/TabelRowSkeleton";
import { AuthContext } from "@/components/ContextProvider";

type Props = {};

const AllCourse = (props: Props) => {
  const { user } = useContext(AuthContext);
  const [toggle, setToggle] = useState(false);
  const [editToggle, setEditToggle] = useState(false);
  const [enrollmentList, setEnrollmentList] = useState<any>([]);
  const [pageNo, setPageNo] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalDataSet, setTotalDataSet] = useState(0);
  const [departmentList, setDepartmentList] = useState([]);
  const [categoryList, setCategoryList] = useState<any>([]);
  const [packageList, setPackageList] = useState<any>([]);
  const [filterpackageList, setFilterPackageList] = useState<any>([]);
  const [planList, setPlanList] = useState<any>([]);
  const [selectedCategory, setSelectedCategory] = useState<any>("");
  const [selectedPackage, setSelectedPackage] = useState<any>("");
  const [selectedPlan, setSelectedPlan] = useState<any>("");
  // const [selectedPaymentType, setSelectedPaymentType] = useState<any>("");
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState<any>("");
  const [searchId, setSearchId] = useState("");
  const [phone, setPhone] = useState("");
  const [deleteWarn, setDeleteWarn] = useState(false);
  const [enrollId, setEnrollId] = useState<any>("");
  const [isLoading, setIsLoading] = useState(false);

  const [selectedDataSupportSummary, setSelectedDataSupportSummary] =
    useState<any>("Last 7 Days");
  const [startDateSupportSummary, setStartDateSupportSummary] =
    useState("2024-04-05");
  const [endDateSupportSummary, setEndDateSupportSummary] = useState(
    formatDate(new Date(), "yyyy-MM-dd")
  );

  const getEnrollmentList = async () => {
    setIsLoading(true);
    const res = await axios.get(EndPoint.GET_ENROLLMENT_LIST, {
      params: {
        limit: pageSize,
        offset: pageNo * pageSize,
        status: selectedPaymentStatus?.label,
        category: selectedCategory?.label,
        plan: selectedPlan?.label,
        package: selectedPackage?.label,
        softmax_student_id: searchId,
        phone_number: phone,
        start_date: selectedDataSupportSummary ? "" : startDateSupportSummary,
        end_date: selectedDataSupportSummary ? "" : endDateSupportSummary,
        options: selectedDataSupportSummary,
      },
    });
    const result = res.data;
    setEnrollmentList(result?.results);
    setTotalDataSet(result?.count);
    setIsLoading(false);
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

  const getAllDepartment = async () => {
    const res = await axios.get(EndPoint.GET_DROPDOWN_DEPARTMENT);
    const resData = await res.data;
    setDepartmentList(resData?.results);
  };
  const getPlanList = async () => {
    const res = await axios.get(EndPoint.GET_ALL_PLAN_LIST);
    const result = await res.data;
    setPlanList(result.results);
  };

  // const deleteEnroll = async (id: any) => {
  //   const res = await axios.delete(EndPoint.DELETE_ENROLLMENT + id);
  //   const resResult = await res.data;
  //   getEnrollmentList();
  //   toast.success("Delete successs.");
  // };

  const clikOndeleteButton = (item_id: any) => {
    setEnrollId(item_id);
    setDeleteWarn(true);
  };

  const deleteEnroll = async () => {
    try {
      const res = await axios.delete(EndPoint.DELETE_ENROLLMENT + enrollId);
      setDeleteWarn(false);
      toast.success("Enrollment is deleted.");

      getEnrollmentList();
    } catch (error) {
      toast.error("Enrollment is not deleted.");
      setDeleteWarn(false);
      console.log(error);
    }
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
    selectedPaymentStatus,
    selectedPlan,
    phone,
    searchId,
    selectedDataSupportSummary,
    startDateSupportSummary,
    endDateSupportSummary,
  ]);

  useEffect(() => {
    getPlanList();
    getPackageList();
    getCategoryList();
    getAllDepartment();
  }, []);
  return (
    <div className=" flex flex-col gap-[24px]">
      <div className=" w-full flex flex-col gap-[16px] ">
        <div className=" grid grid-cols-3 gap-y-[4px] gap-x-[16px]">
          <div className=" flex flex-col gap-[4px]">
            <p className=" text-[16px] font-semibold ">Status:</p>
            <div className=" w-full  cursor-pointer">
              <Select
                className="  w-full text-[16px]"
                isClearable
                options={[
                  { label: "Due", value: "Due" },
                  { label: "Pending", value: "Pending" },
                ]}
                value={selectedPaymentStatus}
                onChange={(e) => setSelectedPaymentStatus(e)}
                placeholder="Select Status.."
              />
            </div>
          </div>
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
      <div className=" text-right">
        <DateFilterDropdown
          selectedData={selectedDataSupportSummary}
          setSelectedData={setSelectedDataSupportSummary}
          setStartDate={setStartDateSupportSummary}
          setEndDate={setEndDateSupportSummary}
          startDate={startDateSupportSummary}
          endDate={endDateSupportSummary}
        />
      </div>

      <div className=" shadow-md ">
        <table className="w-full text-center">
          <thead className="bg-[#DBDDE2] ">
            <tr>
              <th className=" pl-1 text-left py-2 text-[13px] font-semibold">
                Name
              </th>
              <th className="text-left py-2 text-[13px] font-semibold">
                Phone
              </th>
              <th className="text-left py-2 text-[13px] font-semibold">
                Owner
              </th>
              <th className="text-left py-2 text-[13px] font-semibold">
                Session
              </th>
              <th className="text-left py-2 text-[13px] font-semibold">
                Semester
              </th>

              <th className="text-left py-2 text-[13px] font-semibold">
                Course
              </th>
              <th className="text-left py-2 text-[13px] font-semibold">
                Department
              </th>
              <th className="text-left py-2 text-[13px] font-semibold">
                Package
              </th>
              <th className="text-left py-2 text-[13px] font-semibold">
                Course Fee
              </th>

              <th className="text-left py-2 text-[13px] font-semibold">Paid</th>
              {user?.role === 0 && (
                <th className="text-left py-2 text-[13px] font-semibold">
                  Action
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
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
                  className={`hover:bg-bg_card  text-center shadow-md whitespace-nowrap cursor-pointer text-[12px] align-top py-[8px] ${
                    index % 2 !== 0 ? " bg-gray_light" : " bg-white"
                  }`}
                >
                  <td className="pl-1 text-left py-4 text-orange ">
                    <Link
                      href={`/management/student/portal/${enroll?.student?.id}/student`}
                    >
                      {enroll?.student?.name}
                    </Link>
                  </td>
                  <td className="text-left py-4 ">{enroll?.payment_number}</td>
                  <td className="text-left py-4 ">{enroll?.employee?.name}</td>
                  <td className="text-left py-4 ">
                    {enroll?.student?.session_info?.session_year}
                  </td>
                  <td className="text-left py-4 ">
                    <div className=" grid grid-cols-4">
                      {enroll?.packge === "Refard Course" ? (
                        <p key={index}>{semesterLabel(enroll?.semester)}</p>
                      ) : (
                        enroll?.enrollment_semester?.map(
                          (item: any, index: any) => (
                            <p key={index}>{semesterLabel(item)},</p>
                          )
                        )
                      )}
                    </div>
                  </td>
                  <td className="text-left py-4 ">
                    {enroll?.category?.category_name}
                  </td>
                  <td className="text-left py-4 ">
                    {enroll?.student?.department_info?.full_name}
                  </td>
                  <td className="text-left py-4 ">
                    {enroll?.package?.package_name}
                  </td>
                  <td className="text-left py-4 ">{enroll?.course_fee}/-</td>
                  <td className="text-left py-4 ">{enroll?.payable_fee}/-</td>
                  {user?.role === 0 && (
                    <td
                      id={enroll?.id}
                      className="text-left py-4 text-red flex items-center gap-2 "
                    >
                      <div onClick={() => clikOndeleteButton(enroll?.id)}>
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
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {deleteWarn && (
        <DeleteCaution
          close={() => setDeleteWarn(false)}
          okfunction={() => deleteEnroll()}
        />
      )}
      {totalDataSet > 10 && (
        <Pagination
          pageNo={pageNo}
          pageSize={pageSize}
          setPageNo={setPageNo}
          setPageSize={setPageSize}
          totalPage={totalDataSet}
        />
      )}
    </div>
  );
};

export default AllCourse;
