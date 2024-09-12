"use client";
import { EndPoint } from "@/utils/api";
import axios from "axios";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useContext, useEffect, useState } from "react";
import Select from "react-select";
import { AuthContext } from "../ContextProvider";
import { toast } from "react-toastify";
import { paymentList, semesterLabel, semesterList } from "@/utils/staticData";
import { CircularProgress } from "@mui/material";
import CustomModal from "../CustomModal";

type Props = { enrollId: any };

const Enrollment = ({ enrollId }: Props) => {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const user_enroll_id = searchParams.get("enroll_id");
  const { user } = useContext(AuthContext);
  const [categoryList, setCategoryList] = useState<any>([]);
  const [packageList, setPackageList] = useState<any>([]);
  const [filterpackageList, setFilterPackageList] = useState<any>([]);
  const [planList, setPlanList] = useState<any>([]);
  const [invoice, setInvoice] = useState<any>(null);
  const [employeeList, setEmployeeList] = useState<any>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<any>("");
  const [isChecked, setIsChecked] = useState(false);
  const [phone, setPhone] = useState<any>("");
  const [studentId, setStudentId] = useState<any>("");
  const [selectedCategory, setSelectedCategory] = useState<any>("");
  const [selectedSemester, setSelectedSemester] = useState<any>([]);
  const [selectedPackage, setSelectedPackage] = useState<any>("");
  const [selectedPlan, setSelectedPlan] = useState<any>("");
  const [selectedPaymentType, setSelectedPaymentType] = useState<any>("");
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState<any>("");
  const [note, setNote] = useState<any>("");
  const [semesterQuantity, setSemesterQuantity] = useState<any>("");
  // const [paymentNumber, setPaymentNumber] = useState<any>("");
  const [price, setPrice] = useState<any>(null);
  const [packagePlanList, setPackagePlanList] = useState<any>([]);
  const [coursePrice, setCourseprice] = useState(0);

  const [selectedLayer, setSelectedLayer] = useState<any>("");
  const [mainPrice, setMainPrice] = useState(0);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [sponsoredAmount, setSponsoredAmount] = useState(0);
  const [toggleSponsored, setToggleSponsored] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [enrollData, setEnrollData] = useState<any>("");

  const [installment, setInstallment] = useState({
    payment_date_one: "",
    payment_date_two: "",
    payment_date_three: "",
    installment_price_one: 100,
    installment_price_two: 100,
    installment_price_three: 100,
  });
  const getEnrollDetails = async () => {
    if (user && user_enroll_id !== null) {
      const res = await axios.get(
        EndPoint.GET_ENROLLMENT_BY_ID + user_enroll_id,
        {
          headers: { Authorization: "Bearer " + user?.access_token },
        }
      );
      const resData = res.data;
      console.log(resData);

      setSelectedPackage(resData?.package);
      setSelectedCategory(resData?.category);
      setSelectedPaymentType(resData?.payment_type);
      setNote(resData?.note);

      setSelectedLayer({
        label: resData?.package_layer,
        value: resData?.package_layer,
      });
      setSelectedPaymentType({
        label: resData?.payment_type,
        value: resData?.payment_type,
      });
      setInvoice(resData?.incoice_number);
      setSelectedPlan(resData?.plan);
      setSelectedSemester({
        label: semesterLabel(resData?.semester),
        value: resData?.semester,
      });
      setSponsoredAmount(resData?.sponsored_amount);
      console.log(resData?.payable_fee);
      setPrice(Number(resData?.payable_fee));
      setMainPrice(resData?.course_fee);
      setSelectedEmployee(resData?.employee);
      setInstallment({
        ...installment,
        payment_date_one: resData?.due_payment_date,
      });
    }
  };

  const getCategoryList = async () => {
    const res = await axios.get(EndPoint.GET_DROPDOWN_CATAGORY, {
      params: {
        limit: 100,
      },
    });
    const result = await res.data;
    setCategoryList(result.results);
  };

  const getPackageList = async () => {
    const res = await axios.get(EndPoint.GET_ALL_PACKAGE_LIST, {
      params: {
        limit: 100,
      },
    });
    const result = await res.data;
    setPackageList(result.results);
  };

  const getPlanList = async () => {
    if (selectedCategory !== "" && selectedPackage !== "") {
      const res = await axios.get(EndPoint.GET_ALL_PACKAGE_PLAN_LIST, {
        params: {
          limit: 100,
          category_id: selectedCategory?.value,
          package_id: selectedPackage?.value,
        },
      });
      const result = await res.data;
      setPlanList(result);
    }
  };

  const getEmployeeList = async () => {
    const res = await axios.get(EndPoint.EMPLOYEE_DROPDOWN_LIST, {
      params: {
        limit: 100,
      },
    });
    const result = await res.data;
    setEmployeeList(result.results);
  };

  const getStudentData = async () => {
    if (user && params) {
      const res = await axios.get(EndPoint.GET_STUDENT_BY_ID + params?.slug, {
        headers: {
          Authorization: "Bearer " + user?.access_token,
        },
      });

      const resResult = await res?.data;
      setSelectedSemester({
        label: semesterLabel(resResult?.current_semester),
        value: resResult?.current_semester,
      });
      setPhone(resResult?.phone_number);
    }
  };

  const filterPackage = () => {
    if (selectedLayer !== "") {
      if (
        selectedCategory !== "" &&
        selectedLayer !== "" &&
        selectedPlan !== ""
      ) {
        const fitlerPrice = packagePlanList?.filter(
          (item: any) =>
            item?.category?.id === selectedCategory?.value &&
            item?.package?.id === selectedPackage?.value &&
            item?.plan?.id === selectedPlan?.value &&
            item?.package_layer === selectedLayer?.value
        )[0];
        setMainPrice(fitlerPrice?.price);

        setCourseprice(fitlerPrice?.price - fitlerPrice?.discount);
        // setSemesterQuantity(fitlerPrice?.Semester_Quantity);
      } else {
        setCourseprice(0);
      }
    } else {
      if (
        selectedCategory !== "" &&
        selectedPackage !== "" &&
        selectedPlan !== ""
      ) {
        const fitlerPrice = packagePlanList?.filter(
          (item: any) =>
            item?.category?.id === selectedCategory?.value &&
            item?.package?.id === selectedPackage?.value &&
            item?.plan?.id === selectedPlan?.value
        )[0];
        setMainPrice(fitlerPrice?.price);

        setCourseprice(fitlerPrice?.price - fitlerPrice?.discount);
        setSemesterQuantity(fitlerPrice?.Semester_Quantity);
      } else {
        setCourseprice(0);
      }
    }
  };

  const categorySelectFunction = async (e: any) => {
    setSelectedCategory(e);
    setSelectedPackage("");
    setSelectedLayer("");

    setSelectedPlan("");
    setCourseprice(0);
  };
  // const filterPackageLayer = () => {
  //   if (
  //     selectedCategory !== "" &&
  //     selectedLayer !== "" &&
  //     selectedPlan !== ""
  //   ) {
  //     const fitlerPrice = packagePlanList?.filter(
  //       (item: any) =>
  //         item?.category?.id === selectedCategory?.value &&
  //         item?.package?.id === selectedPackage?.value &&
  //         item?.plan?.id === selectedPlan?.value &&
  //         item?.package_layer === selectedLayer?.value
  //     )[0];
  //     console.log("test", fitlerPrice);

  //     setCourseprice(fitlerPrice?.price - fitlerPrice?.discount);
  //     // setSemesterQuantity(fitlerPrice?.Semester_Quantity);
  //   } else {
  //     setCourseprice(0);
  //   }
  // };

  const getFilterPackage = () => {
    const filterData = packageList?.filter(
      (item: any) => item.category_id == selectedCategory?.value
    );
    setFilterPackageList(filterData);
  };

  const getPackagePlanList = async () => {
    const res = await axios.get(EndPoint.GET_PACKAGE_PLAN_PRICE_LIST, {
      params: {
        limit: 100,
      },
    });
    const resData = await res.data;
    setPackagePlanList(resData?.results);
  };

  const addEnrollment = async () => {
    const bodyData = {
      student: enrollId,
      package: selectedPackage?.value,
      semester: selectedSemester?.value,
      // softmax_student_id: studentId,
      payable_fee: price,
      course_fee: coursePrice,
      payment_type: selectedPaymentType?.value,
      payment_number: phone,
      is_due_enrollment: coursePrice > price ? true : false,
      due_payment_date:
        coursePrice > price ? installment?.payment_date_one : null,
      course_note: note,
      package_layer: selectedLayer?.value,
      incoice_number: invoice,
      status: "Pending",
      plan: selectedPlan?.value,
      sponsored_amount: Number(sponsoredAmount),

      category: selectedCategory?.value,
      employee: selectedEmployee?.value ? selectedEmployee?.value : user?.id,
    };
    setEnrollData(bodyData);

    try {
      setSubmitLoading(true);
      if (user) {
        const res = await axios.post(EndPoint.ADD_ENROLLMENT, bodyData, {
          headers: { Authorization: "Bearer " + user?.access_token },
        });
        const result = await res.data;
        toast.success("Enrollment is transfered to pending stage.");
        router.push("/management/course/pending-access");
      }
    } catch (error: any) {
      setSubmitLoading(false);

      if (error?.response) {
        toast.error(Object.values(error.response.data).join(""));
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  const updateEnrollment = async () => {
    const bodyData = {
      student: enrollId,
      package: selectedPackage?.value,
      semester: selectedSemester?.value,
      // softmax_student_id: studentId,
      payable_fee: price,
      course_fee: coursePrice,
      payment_type: selectedPaymentType?.value,
      payment_number: phone,
      is_due_enrollment: coursePrice > price ? true : false,
      due_payment_date:
        coursePrice > price ? installment?.payment_date_one : null,
      course_note: note,
      package_layer: selectedLayer?.value,
      invoice_number: invoice,
      status: "Pending",
      plan: selectedPlan?.value,
      category: selectedCategory?.value,
      sponsored_amount: Number(sponsoredAmount),
      employee: selectedEmployee?.value ? selectedEmployee?.value : user?.id,
    };

    try {
      setSubmitLoading(true);

      if (user && user_enroll_id !== null) {
        const res = await axios.patch(
          EndPoint.UPDATE_ENROLLMENT + user_enroll_id,
          bodyData,
          {
            headers: { Authorization: "Bearer " + user?.access_token },
          }
        );
        const result = await res.data;
        toast.success("Enrollment is updated.");
        router.push("/management/course/pending-access");
      }
    } catch (error: any) {
      setSubmitLoading(false);

      if (error?.response) {
        toast.error(Object.values(error.response.data).join(""));
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };
  // useEffect(() => {
  //   filterPackageLayer;
  // }, []);
  useEffect(() => {
    getEnrollDetails();
  }, [user, user_enroll_id]);
  useEffect(() => {
    filterPackage();
  }, [selectedCategory, selectedPackage, selectedPlan, selectedLayer]);

  useEffect(() => {
    getFilterPackage();
    getPlanList();
  }, [selectedCategory, selectedPackage]);

  useEffect(() => {
    getStudentData();
  }, [user, params]);

  useEffect(() => {
    getStudentData();
    getPackagePlanList();

    getEmployeeList();
    getPlanList();
    getPackageList();
    getCategoryList();
  }, []);

  return (
    <div className=" shadow-md border-[1px] border-gray_light bg-gray_light rounded-[16px] p-2 md:p-4 xl:p-[24px] flex flex-col gap-[8px]">
      <div className=" flex justify-end">
        <Link
          className="  w-[200px]  bg-green/80 text-white px-[4px] py-[2px] flex justify-center items-center rounded-[8px]"
          href={`/management/student/portal/${enrollId}/student/`}
        >
          Go to student Details
        </Link>
      </div>
      {/* <div className=" flex flex-col gap-[4px]">
        <label htmlFor="sid" className="  font-bold ">
          Softmax Student Id:
        </label>
        <input
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          type="text"
          placeholder="Enter student id"
          id="sid"
          className="  px-[8px] h-[40px] outline-none rounded-[8px] text-black"
        />
      </div> */}
      <div className=" grid grid-cols-1 md:grid-cols-2">
        <div className=" w-[280px] flex flex-col gap-[4px]">
          <p className="  font-bold ">Category:</p>
          <div className=" w-full  cursor-pointer">
            <Select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e);
                setSelectedPackage("");
                setSelectedLayer("");

                setSelectedPlan("");
                setCourseprice(0);
              }}
              options={categoryList}
              isClearable
              className=" w-full  text-[16px] cursor-pointer"
              placeholder="Select Category"
            />
          </div>
        </div>
        {selectedCategory?.label === "Polytechnic" && (
          <div className=" flex flex-col gap-[4px]">
            <p className="  font-bold ">Starting Semester:</p>
            <div className=" w-full  cursor-pointer">
              <Select
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e)}
                options={semesterList}
                isClearable
                maxMenuHeight={200}
                className=" w-full  text-[16px] cursor-pointer"
                placeholder="Select semester"
              />
            </div>
          </div>
        )}
        {(selectedCategory?.label === "DUET" ||
          selectedCategory?.label === "JOB") && (
          <div className=" flex flex-col gap-[4px]">
            <p className="  font-bold ">Package Layer:</p>
            <div className=" w-full  cursor-pointer">
              <Select
                value={selectedLayer}
                onChange={(e) => setSelectedLayer(e)}
                options={[
                  { label: "Full", value: "Full" },
                  { label: "Department", value: "Department" },
                  { label: "Non-Department", value: "Non-Department" },
                ]}
                isClearable
                maxMenuHeight={200}
                className=" w-full  text-[16px] cursor-pointer"
                placeholder="Select layer.."
              />
            </div>
          </div>
        )}
      </div>
      <div className="  grid grid-cols-1 md:grid-cols-2 gap-[20px] items-center">
        <div className=" flex flex-col gap-[4px]">
          <p className="  font-bold ">Package:({semesterQuantity})</p>
          <div className=" w-full  cursor-pointer">
            <Select
              value={selectedPackage}
              onChange={(e) => setSelectedPackage(e)}
              options={filterpackageList}
              isClearable
              className=" w-full  text-[16px] cursor-pointer"
              placeholder="Select package"
            />
          </div>
        </div>
        <div className=" flex flex-col gap-[4px]">
          <p className="  font-bold ">Plan:</p>
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
      </div>

      <div className="  grid grid-cols-1 md:grid-cols-3 gap-[20px] ">
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
        <div className=" w-full flex flex-col gap-2">
          <div className=" flex flex-col gap-[4px]">
            <label htmlFor="packageprice" className="  font-bold ">
              Course Price= (
              <span className=" text-red text-[14px] line-through ">
                {mainPrice}
              </span>
              /
              <span className=" text-orange text-[20px]">
                {isNaN(coursePrice) ? 0 : coursePrice}
              </span>
              )tk
            </label>
            <input
              value={price}
              onChange={(e: any) => setPrice(e.target.value)}
              type="number"
              placeholder="Enter payable price"
              className="  px-[8px] h-[40px] outline-none rounded-[8px] text-black"
            />
          </div>
          {coursePrice < price && (
            <p className=" tex-[14px] font-serif">
              Extra payment is:
              <span className=" text-orange">{price - coursePrice}</span>
            </p>
          )}
          {coursePrice > price && (
            <div className=" flex flex-col gap-[4px] border-[1px] border-white rounded-[4px] bg-gray_light p-2">
              <p className=" text-red text-[14px] font-semibold">
                Due Installment Price: {coursePrice - price}
              </p>
              <div className=" flex flex-col gap-[4px]">
                <label htmlFor="payment" className=" text-[14px] font-bold ">
                  Payment Date:
                </label>
                <input
                  value={installment?.payment_date_one}
                  onChange={(e) =>
                    setInstallment({
                      ...installment,
                      payment_date_one: e.target.value,
                    })
                  }
                  type="date"
                  placeholder="Payment date"
                  id="payment"
                  className="  px-[8px] h-[40px] outline-none rounded-[8px] text-black"
                />
                <div className=" flex items-center pt-2 gap-2">
                  <button
                    onClick={() => setToggleSponsored(!toggleSponsored)}
                    className=" text-white bg-green h-[30px] px-[4px] py-[2px] text-[16px] rounded-[4px]"
                  >
                    sponsored
                  </button>
                  {toggleSponsored && (
                    <input
                      value={sponsoredAmount}
                      onChange={(e) =>
                        setSponsoredAmount(Number(e.target.value))
                      }
                      type="numeric"
                      placeholder="Sponsored amount"
                      className="  px-[8px] h-[30px] outline-none rounded-[4px] text-[14px] text-black"
                    />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {selectedPaymentType?.label === "Cash Hand" ? (
          <div className=" flex flex-col gap-[4px]">
            <label htmlFor="invoice" className="  font-bold ">
              Invoice Number:
            </label>
            <input
              value={invoice}
              onChange={(e) => setInvoice(e.target.value)}
              type="text"
              placeholder="Enter invoice number"
              id="invoice"
              className="  px-[8px] h-[40px] outline-none rounded-[8px] text-black"
            />
          </div>
        ) : (
          <div className=" flex flex-col gap-[4px]">
            <label htmlFor="phone" className="  font-bold ">
              Payment Number:
            </label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="phone"
              placeholder="Enter number"
              id="phone"
              className="  px-[8px] h-[40px] outline-none rounded-[8px] text-black"
            />
          </div>
        )}
      </div>

      {/* {coursePrice > price && (
        <div className=" grid grid-cols-1 md:grid-cols-3 items-center gap-[20px]">
          <div></div>
          <div className=" flex flex-col gap-[4px] border-[1px] border-white rounded-[4px] bg-gray_light p-2">
            <p className=" text-red text-[14px] font-semibold">
              Due Installment Price: {coursePrice - price - sponsoredAmount}
            </p>
            <div className=" flex flex-col gap-[4px]">
              <label htmlFor="payment" className=" text-[14px] font-bold ">
                Payment Date:
              </label>
              <input
                value={installment?.payment_date_one}
                onChange={(e) =>
                  setInstallment({
                    ...installment,
                    payment_date_one: e.target.value,
                  })
                }
                type="date"
                placeholder="Payment date"
                id="payment"
                className="  px-[8px] h-[40px] outline-none rounded-[8px] text-black"
              />
              <div className=" flex items-center pt-2 gap-2">
                <button
                  onClick={() => setToggleSponsored(!toggleSponsored)}
                  className=" text-white bg-green h-[30px] px-[4px] py-[2px] text-[16px] rounded-[4px]"
                >
                  sponsored
                </button>
                {toggleSponsored && (
                  <input
                    value={sponsoredAmount}
                    onChange={(e) => setSponsoredAmount(Number(e.target.value))}
                    type="numeric"
                    placeholder="Sponsored amount"
                    className="  px-[8px] h-[30px] outline-none rounded-[4px] text-[14px] text-black"
                  />
                )}
              </div>
            </div>
          </div>
          <div></div>
        </div>
      )} */}
      <div className=" flex flex-col gap-[4px]">
        <label htmlFor="note" className="  font-bold ">
          Note
        </label>
        <input
          value={note}
          onChange={(e) => setNote(e.target.value)}
          type="text"
          placeholder="Add note.."
          id="note"
          className=" px-[8px] h-[40px] outline-none rounded-[8px] text-black"
        />
      </div>

      {user?.role === 0 && (
        <div className=" flex-grow flex flex-col gap-[4px]">
          <p className="  font-bold ">Employee:</p>
          <div className=" w-full  cursor-pointer">
            <Select
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e)}
              options={employeeList}
              isClearable
              className=" w-full  text-[16px] cursor-pointer"
              placeholder="Select employee"
            />
          </div>
        </div>
      )}

      <div className=" flex gap-4 md:gap-[20px] justify-end items-center pt-[8px]">
        <Link href={"/management/student/list/all"}>
          <button className=" py-[8px] px-[16px] border-[1px] hover:bg-red hover:text-white  rounded-[8px]">
            Cancel
          </button>
        </Link>
        {user_enroll_id !== null ? (
          <button
            onClick={() => updateEnrollment()}
            className=" py-[8px] px-[16px] bg-green text-white hover:bg-orange   rounded-[8px]"
          >
            Update
          </button>
        ) : (
          <button
            disabled={submitLoading}
            onClick={() => setToggle(true)}
            className=" py-[8px] px-[16px] bg-title text-white active:bg-green active:text-gray_light hover:bg-title/40  rounded-[8px]"
          >
            {submitLoading ? (
              <CircularProgress size={18} color="success" />
            ) : (
              "Check"
            )}
          </button>
        )}
      </div>
      {toggle && (
        <CustomModal setClose={() => setToggle(false)}>
          <div className=" w-[350px] p-4 -mt-[40%] xl:-mt-[10%] flex flex-col gap-2 bg-white rounded-[4px]">
            <div
              className=" text-[14px] flex flex-col gap-1
       "
            >
              <p className=" text-[16px] font-medium">
                Submit Detials Information:
              </p>
              <p>
                Package Name:
                <span className=" text-orange font-semibold">
                  {selectedPackage?.label}
                </span>
              </p>
              <p>
                Category Name:
                <span className=" text-orange font-semibold">
                  {selectedCategory?.label}
                </span>
              </p>
              <p>
                Plan Name:
                <span className=" text-orange font-semibold">
                  {selectedPlan?.label}
                </span>
              </p>
              <p>
                Package Layer:
                <span className=" text-orange font-semibold">
                  {selectedLayer?.label}
                </span>
              </p>
              <p>
                Payment Number:
                <span className=" text-orange font-semibold">{phone}</span>
              </p>
              <p>
                Payment Media:
                <span className=" text-orange font-semibold">
                  {selectedPaymentType?.label}
                </span>
              </p>
              <p>
                Paid Amount:
                <span className=" text-orange font-semibold">{price}/-</span>
              </p>
              <p>
                Due Amount:
                <span className=" text-orange font-semibold">
                  {coursePrice - price}/-
                </span>
              </p>

              <p>
                Sponsored Amount:
                <span className=" text-orange font-semibold">
                  {sponsoredAmount}/-
                </span>
              </p>

              <p className=" w-[200px]">
                Note:
                <span className=" text-orange font-semibold">{note}</span>
              </p>
            </div>

            <div className=" flex justify-start items-center gap-[16px] pt-[8px]">
              <button
                onClick={() => {
                  setToggle(false);
                  setSubmitLoading(false);
                }}
                className=" flex justify-center items-center bg-orange text-white w-[115px] h-[39px] border-[1px] border-white rounded-[8px]"
              >
                Cancel
              </button>
              <button
                onClick={() => addEnrollment()}
                disabled={submitLoading}
                className="  border-[1px] border-white flex justify-center items-center bg-green text-white active:bg-green/60 active:text-gray_light hover:bg-green/80 w-[116px] h-[40px] rounded-[8px]"
              >
                {submitLoading ? (
                  <CircularProgress size={20} color="warning" />
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </div>
        </CustomModal>
      )}
    </div>
  );
};

export default Enrollment;
