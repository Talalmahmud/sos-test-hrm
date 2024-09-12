"use client";
import CustomModal from "@/components/CustomModal";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { EndPoint } from "@/utils/api";
import Pagination from "@/components/Pagination";
import Select from "react-select";
import { semesterLabel } from "@/utils/staticData";
import Link from "next/link";
import TableRowSkeleton from "@/components/skeleton/TabelRowSkeleton";
import { AuthContext } from "@/components/ContextProvider";

type Props = {};

const TodayCourse = (props: Props) => {
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
  const [searchId, setSearchId] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getEnrollmentList = async () => {
    if (user) {
      setIsLoading(true);
      const res = await axios.get(EndPoint.GET_ENROLLMENT_LIST, {
        params: {
          limit: pageSize,
          offset: pageNo * pageSize,
          status: "Complete",
          category: selectedCategory?.label,
          plan: selectedPlan?.label,
          package: selectedPackage?.label,
          softmax_student_id: searchId,
          phone_number: phone,
          options: "Today",
        },
        headers: { Authorization: "Bearer " + user?.access_token },
      });
      const result = res.data;
      setEnrollmentList(result?.results);
      setTotalDataSet(result?.count);
      setIsLoading(false);
    }
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
    getAllDepartment();
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
      <div className=" shadow-md ">
        <table className="w-full shadow-md ">
          <thead className="bg-[#DBDDE2] ">
            <tr>
              <th className="pl-1 text-left py-2 text-[13px] font-semibold">
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
                Course Fee
              </th>
              <th className="text-left py-2 text-[13px] font-semibold">Paid</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <>
                <TableRowSkeleton colomNumber={9} />
                <TableRowSkeleton colomNumber={9} />
                <TableRowSkeleton colomNumber={9} />
                <TableRowSkeleton colomNumber={9} />
                <TableRowSkeleton colomNumber={9} />
              </>
            ) : (
              enrollmentList?.map((enroll: any, index: number) => (
                <tr
                  key={index}
                  className={`hover:bg-bg_card  text-center shadow-md whitespace-nowrap cursor-pointer text-[12px] align-top py-[8px] ${
                    index % 2 === 0 && " bg-orange"
                  }}`}
                >
                  {" "}
                  <td className="pl-1 text-left py-4 text-orange ">
                    <Link
                      href={`/management/student/portal/${enroll?.student?.id}/student`}
                    >
                      {enroll?.student?.name}
                    </Link>
                  </td>{" "}
                  <td className="text-left py-4">{enroll?.payment_number}</td>
                  <td className="text-left py-4 ">{enroll?.employee?.name}</td>
                  <td className="text-left py-4">
                    {enroll?.student?.session_info?.session_year}
                  </td>
                  <td className="text-left py-4">
                    <div className=" grid grid-cols-4">
                      {enroll?.enrollment_semester?.map(
                        (item: any, index: any) => (
                          <p key={index}>{semesterLabel(item)},</p>
                        )
                      )}
                    </div>
                  </td>
                  <td className="text-left py-4">
                    {enroll?.category?.category_name}
                  </td>
                  <td className="text-left py-4">
                    {enroll?.student?.department_info?.full_name}
                  </td>
                  <td className="text-left py-4 ">{enroll?.course_fee}/-</td>
                  <td className="text-left py-4">{enroll?.payable_fee}/-</td>
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
    </div>
  );
};

export default TodayCourse;
