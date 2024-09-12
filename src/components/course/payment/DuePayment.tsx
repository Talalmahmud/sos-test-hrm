"use client";
import CustomModal from "@/components/CustomModal";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { EndPoint } from "@/utils/api";
import Pagination from "@/components/Pagination";
import { AuthContext } from "@/components/ContextProvider";
import Select from "react-select";
import { paymentList, semesterLabel } from "@/utils/staticData";
import { toast } from "react-toastify";
import Link from "next/link";
import NoticeDropdown from "../../NoticeDropdown";
import TableRowSkeleton from "@/components/skeleton/TabelRowSkeleton";

type Props = {};

const DuePayment = (props: Props) => {
  const { user } = useContext(AuthContext);
  const [toggle, setToggle] = useState(false);

  const [enrollmentList, setEnrollmentList] = useState<any>([]);
  const [pageNo, setPageNo] = useState(0);
  const [pageSize, setPageSize] = useState(8);
  const [totalDataSet, setTotalDataSet] = useState(0);
  const [departmentList, setDepartmentList] = useState([]);
  const [categoryList, setCategoryList] = useState<any>([]);
  const [packageList, setPackageList] = useState<any>([]);
  const [filterpackageList, setFilterPackageList] = useState<any>([]);
  const [planList, setPlanList] = useState<any>([]);
  const [selectedCategory, setSelectedCategory] = useState<any>("");
  const [selectedPackage, setSelectedPackage] = useState<any>("");
  const [selectedPlan, setSelectedPlan] = useState<any>("");
  const [selectedPaymentType, setSelectedPaymentType] = useState<any>("");
  const [searchId, setSearchId] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentNote, setPaymentNote] = useState("");
  const [enrollId, setEnrollId] = useState<any>(null);

  const [updateId, setUpdateId] = useState<any>(null);

  const [paymentAmount, setPaymentAmount] = useState<any>(null);
  const [installMentDate, setInstallMentDate] = useState("");
  const [paymentNumber, setPaymentNumber] = useState<any>("");
  const [showDue, setShowDue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [totalDueAmount, setTotalDueAmount] = useState(0);

  const getEnrollmentList = async () => {
    setIsLoading(true);
    if (user) {
      const res = await axios.get(EndPoint.GET_DUE_ENROLLMENT, {
        params: {
          limit: pageSize,
          offset: pageNo * pageSize,
        },
        headers: { Authorization: "Bearer " + user?.access_token },
      });
      const result = res.data;
      setEnrollmentList(result?.results);
      setTotalDueAmount(result?.total_installment_amount);

      setTotalDataSet(result?.count);
      const totalAmount = result?.results?.reduce(
        (total: number, item: any) => {
          return total + item?.due_enrollment?.due_fee;
        },
        0
      );
    }
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

  const handleSubmit = async () => {
    if (enrollId && updateId) {
      try {
        const bodyData = {
          due_enrollment: enrollId,
          next_payment_date: paymentAmount < showDue ? installMentDate : null,
          payment_type: selectedPaymentType?.value,
          payment_number: paymentNumber,
          installment_price: paymentAmount,
          payment_note: paymentNote,
        };

        const res = await axios.patch(
          EndPoint.UPDATE_INSTALLMENT + updateId,
          bodyData,
          { headers: { Authorization: "Bearer " + user?.access_token } }
        );
        const resResult = await res?.data;
        toast.success("Payment success");
        getEnrollmentList();
        setPaymentNumber("");
        setSelectedPaymentType("");
        setInstallMentDate("");
        setPaymentAmount(null);
        setToggle(false);
      } catch (error: any) {
        if (error?.response) {
          toast.error(Object.values(error.response.data).join(""));
        } else {
          toast.error("An unexpected error occurred.");
        }
      }
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
      <div className=" shadow-md ">
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

              <th className="px-2 py-2 text-[13px] font-semibold">
                Course Fee
              </th>
              <th className="px-2 py-2 text-[13px] font-semibold">Paid</th>
              <th className="px-2 py-2 text-[13px]  font-semibold">Due Fee</th>
              <th className="px-2 py-2 text-[13px] font-semibold">
                Next Payment Date
              </th>
              <th className="px-2 py-2 text-[13px] font-semibold">Action</th>
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
                    {enroll?.due_enrollment?.course_fee}/-
                  </td>
                  <td className="px-2 py-2">
                    {enroll?.due_enrollment?.payable_fee}/-
                  </td>
                  <td className="px-2 py-2  ">
                    {enroll?.due_enrollment?.due_fee}/-
                  </td>
                  <td className="px-2 py-2 ">{enroll?.next_payment_date}</td>
                  <td className="px-2 py-2">
                    <button
                      onClick={() => {
                        setUpdateId(enroll?.id);
                        setEnrollId(enroll?.due_enrollment?.id);
                        setToggle(true);
                        setShowDue(enroll?.due_enrollment?.due_fee);
                      }}
                      className={` rounded-md ${
                        enroll?.is_sponsored ? "bg-title" : "bg-green"
                      } px-[8px] py-[2px] text-[14px] text-white`}
                    >
                      {enroll?.is_sponsored ? "Sponsored Pay" : "Pay"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <p className=" text-right  font-semibold text-[16px]">
        Total Due= {totalDueAmount} <span className=" text-orange">Tk.</span>
      </p>
      {toggle && (
        <CustomModal setClose={() => setToggle(false)}>
          <div className=" w-[500px] p-[16px] bg-bg_gray rounded-md">
            <p className=" text-[23px] font-semibold">
              Due Payment:
              <span className=" text-red">{showDue - paymentAmount}</span>
            </p>
            <div className=" flex flex-col gap-[4px]">
              <p className="  font-bold ">Payment Type:</p>
              <div className=" w-full  cursor-pointer">
                <Select
                  value={selectedPaymentType}
                  options={paymentList}
                  onChange={(e) => setSelectedPaymentType(e)}
                  maxMenuHeight={200}
                  isClearable
                  className=" w-full  text-[16px] cursor-pointer"
                  placeholder="Select payment type"
                />
              </div>
            </div>

            <div className=" flex flex-col gap-[4px] text-[16px] ">
              <p className=" font-semibold">Price:</p>
              <input
                type="numeric"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                placeholder="Enter Price"
                className=" px-[8px] h-[40px] rounded-[8px] text-black"
              />
            </div>

            <div className=" flex flex-col gap-[4px] text-[16px] ">
              <p className=" font-semibold">Payment Number:</p>
              <input
                type="number"
                value={paymentNumber}
                onChange={(e) => setPaymentNumber(e.target.value)}
                placeholder="Enter Number"
                className=" px-[8px] h-[40px] rounded-[8px] text-black"
              />
            </div>
            {paymentAmount < showDue && (
              <div className=" flex flex-col gap-[4px] text-[16px] ">
                <p className=" font-semibold">Next Installment Date:</p>
                <input
                  type="date"
                  value={installMentDate}
                  onChange={(e) => setInstallMentDate(e.target.value)}
                  placeholder="Select Date"
                  className=" px-[8px] h-[40px] rounded-[8px] text-black"
                />
              </div>
            )}
            <div className=" flex flex-col gap-[4px] text-[16px] ">
              <p className=" font-semibold">Payment Note:</p>
              <input
                type="text"
                value={paymentNote}
                onChange={(e) => setPaymentNote(e.target.value)}
                placeholder="Enter payment note"
                className=" px-[8px] h-[40px] rounded-[8px] text-black"
              />
            </div>

            <div className=" flex justify-end items-center gap-[16px] pt-[16px]">
              <button
                onClick={() => setToggle(false)}
                className=" flex justify-center items-center bg-orange text-white w-[115px] h-[39px] border-[1px] border-white rounded-[8px]"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSubmit()}
                className=" flex justify-center items-center bg-green text-white w-[116px] h-[40px] rounded-[8px]"
              >
                Submit
              </button>
            </div>
          </div>
        </CustomModal>
      )}
      {totalDataSet > 8 && (
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

export default DuePayment;
