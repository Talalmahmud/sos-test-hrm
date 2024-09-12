"use client";
import { EndPoint } from "@/utils/api";
import axios from "axios";
import React, {
  memo,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { toast } from "react-toastify";
import {
  redirect,
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { AuthContext } from "../ContextProvider";
import Select from "react-select";
import { customStylesFollowUp } from "@/utils/staticData";
import CustomModal from "../CustomModal";
import { set } from "date-fns";
import Link from "next/link";

const allSemester = [
  {
    label: "1st",
    value: 1,
  },
  {
    label: "2nd",
    value: 2,
  },
  ,
  {
    label: "3rd",
    value: 3,
  },
  {
    label: "4th",
    value: 4,
  },
  {
    label: "5th",
    value: 5,
  },
  {
    label: "6th",
    value: 6,
  },
  {
    label: "7th",
    value: 7,
  },
  {
    label: "8th",
    value: 8,
  },
];

type Props = {
  studentId: any;
};

const FollowUpForm = ({ studentId }: Props) => {
  const { user } = useContext(AuthContext);
  const pathName = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<any>("");
  const [selectedSemester, setSelectedSemester] = useState<any>([]);
  const [selectedPackage, setSelectedPackage] = useState<any>("");
  const [selectedPlan, setSelectedPlan] = useState<any>("");
  const [packagePlanList, setPackagePlanList] = useState<any>([]);
  const [categoryList, setCategoryList] = useState<any>([]);
  const [packageList, setPackageList] = useState<any>([]);
  const [filterpackageList, setFilterPackageList] = useState<any>([]);
  const [planList, setPlanList] = useState<any>([]);
  const [bookCategory, setBookCategory] = useState<any>("");
  const [showUpper, setShowUpper] = useState(true);

  const [smesterCheck, setSemesterCheck] = useState(1);
  const [sessionList, setSessionList] = useState<any>([]);
  const [allDepartment, setAllDepartment] = useState([]);
  const [instituteList, setInstituteList] = useState<any>([]);
  const [follupList, setFollupList] = useState<any>([]);

  const router = useRouter();
  const pad = (n: any) => (n < 10 ? "0" + n : n);
  const now = new Date();
  const currentDateTime = `${now.getFullYear()}-${pad(
    now.getMonth() + 1
  )}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}`;
  const futureDate = new Date(now);
  futureDate.setDate(now.getDate() + 7);
  const futureDateTime = `${futureDate.getFullYear()}-${pad(
    futureDate.getMonth() + 1
  )}-${pad(futureDate.getDate())}T${pad(futureDate.getHours())}:${pad(
    futureDate.getMinutes()
  )}`;

  // console.log(pathName.get("phone"));
  const [stipend, setStipend] = useState<any>("");
  const [department, setDepartment] = useState<any>("");
  const [followUpData, setFollowUpData] = useState<any>({
    product_title: { label: "Others", value: "Others" },
    call_type: "",
    payable_amount: 0,
    is_payable: 0,
    follow_up_date: null,
    follow_up_note: "",
    student: "",
    product_category: null,
    product_package: null,
    product_plan: null,
    book: null,
  });

  const [student, setStudent] = useState<any>({
    name: "",
    phone_number: "",
    second_phone_number: studentId,
    email: "",
    polytechnic_board_roll: 0,
    is_stippend: false,
    number_of_refferds: 0,
    current_semester: smesterCheck,
    secondary_education: "SSC",
    secondary_gpa: 0,
    dream: null,
    shift: null,
    polytechnic: 0,
    department: 0,
    session: 0,
  });
  const [coursePrice, setCourseprice] = useState(0);
  const [selectedBook, setSelectedBook] = useState<any>("");
  const [toggleData, setToggleData] = useState<any>("");
  const [toggle, setToggle] = useState(false);

  const [productData, setProductData] = useState<any>({
    product_title: { label: "Course", value: "Course" },
  });

  const resetAll = () => {
    setSelectedBook("");
    setSelectedCategory("");
    setSelectedPackage("");
    setSelectedPlan("");
    setBookCategory("");
    setFollowUpData({
      product_title: "",
      call_type: "",
      payable_amount: 0,
      is_payable: 0,
      follow_up_date: "",
      follow_up_note: "",
      student: "",
      product_category: null,
      product_package: null,
      product_plan: null,
      book: null,
    });
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
    const res = await axios.get(EndPoint.GET_ALL_PLAN_LIST, {
      params: {
        limit: 100,
      },
    });
    const result = await res.data;
    setPlanList(result.results);
  };

  const filterPackage = () => {
    if (
      selectedCategory !== "" &&
      selectedPackage !== "" &&
      selectedPlan !== ""
    ) {
      const filterPrice = packagePlanList?.filter(
        (item: any) =>
          item?.category?.id === selectedCategory?.value &&
          item?.package?.id === selectedPackage?.value &&
          item?.plan?.id === selectedPlan?.value
      )[0];
      // console.log("test", fitlerPrice);
      setFollowUpData({
        ...followUpData,
        payable_amount: filterPrice?.price - filterPrice?.discount,
      });
    } else {
      setCourseprice(0);
    }
  };

  const getFilterPackage = () => {
    const filterData = packageList?.filter(
      (item: any) => item.category_id == selectedCategory?.value
    );
    setFilterPackageList(filterData);
  };

  const getFollowUpList = async () => {
    const res = await axios.get(EndPoint.FOLLOW_UP_LIST, {
      params: {
        limit: 100,
        phone_number: studentId,
      },
      headers: {
        Authorization: "Bearer " + user?.access_token,
      },
    });
    const resData = await res.data;
    setFollupList(resData?.results);
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

  const getStudentInfo = async () => {
    const res = await axios.get(EndPoint.GET_STUDENT, {
      headers: { Authorization: "Bearer " + user?.access_token },
      params: {
        phone_number: studentId,
      },
    });
    const resData = await res.data;
    const sData = resData?.results[0];
    setStipend({
      label: sData?.stipend ? "Yes" : "No",
      value: sData?.stipend,
    });
    setDepartment({
      label: sData?.stipend ? "Yes" : "No",
      value: sData?.stipend,
    });
    setStudent(sData);
  };

  const getDepartmentList = async () => {
    if (student?.polytechnic) {
      const dData = await axios.get(
        EndPoint.SEARCH_DEPARTMENT_BY_POLYTECHNIC + student?.polytechnic
      );
      const dResult = await dData.data;
      setAllDepartment(dResult?.departments);
    }
  };

  const getInstituteList = async () => {
    const dData = await axios.get(EndPoint.GET_DROPDOWN_POLYTECHNIC);
    const dResult = await dData.data;
    setInstituteList(dResult?.results);
  };

  const getSessionList = async () => {
    const dData = await axios.get(EndPoint.GET_DROPDOWN_SESSION);
    const dResult = await dData.data;
    setSessionList(dResult?.results);
  };

  function handleCheck(index: any) {
    setSemesterCheck(index);
  }
  const [checkError, setCheckError] = useState(false);

  async function handleSubmit() {
    const bodyData = {
      product_title: followUpData?.product_title?.value,
      call_type: followUpData?.call_type?.value,
      payable_amount:
        followUpData?.product_title?.value === "Others"
          ? 0
          : followUpData?.payable_amount,
      is_payable: followUpData?.is_payable === 1 ? true : false,
      follow_up_date: followUpData?.follow_up_date,
      follow_up_note: followUpData?.follow_up_note,
      student: student?.id,
      product_category:
        followUpData?.product_title?.value === "Others"
          ? null
          : bookCategory
          ? null
          : selectedCategory?.value,
      product_package:
        followUpData?.product_title?.value === "Others"
          ? null
          : bookCategory
          ? null
          : selectedPackage?.value,
      product_plan:
        followUpData?.product_title?.value === "Others"
          ? null
          : bookCategory
          ? null
          : selectedPlan?.value,
      book:
        followUpData?.product_title?.value === "Others"
          ? null
          : bookCategory
          ? selectedBook?.value
          : null,
    };

    if (followUpData?.call_type !== "" && followUpData?.follow_up_note !== "") {
      setCheckError(false);
      try {
        const res = await axios.post(EndPoint.FOLLOW_UP_ADD, bodyData, {
          headers: { Authorization: "Bearer " + user?.access_token },
        });
        getFollowUpList();

        toast.success("Follow-up added successfully.");
      } catch (error: any) {
        if (error?.response) {
          toast.error(Object.values(error.response.data).join(""));
        } else {
          toast.error("An unexpected error occurred.");
        }
      }
    } else {
      setCheckError(true);
    }
  }
  const [bookList, setBookList] = useState<any>([]);
  const getBookList = async () => {
    const res = await axios.get(
      EndPoint.DROPDOWN_BOOK + `?category=${bookCategory?.label}`
    );
    const resResult = await res.data;
    setBookList(resResult?.results);
  };

  useEffect(() => {
    getBookList();
  }, [bookCategory]);

  useEffect(() => {
    getFollowUpList();
    getStudentInfo();
  }, [studentId]);

  useEffect(() => {
    getDepartmentList();
  }, [student?.polytechnic]);

  useEffect(() => {
    getSessionList();
    getInstituteList();
  }, []);

  useEffect(() => {
    filterPackage();
  }, [selectedCategory, selectedPackage, selectedPlan]);

  useEffect(() => {
    getFilterPackage();
  }, [selectedCategory]);

  useEffect(() => {
    getPackagePlanList();

    getPlanList();
    getPackageList();
    getCategoryList();
  }, []);

  return (
    <div className=" h-[450px] overflow-auto w-full no-scrollbar bg-[#CED1D7] rounded-[16px] p-[8px] ">
      <div className=" w-full grid grid-cols-4 ">
        <div className=" flex text-[13px] items-center">
          <p className=" whitespace-nowrap">
            Calling Number:{" "}
            <span className=" font-bold text-orange">
              {student?.phone_number}
            </span>
          </p>
        </div>
        <div className=" flex  text-[13px] items-center">
          <p>
            Calling Time:
            <span className=" font-bold text-orange">01:13 min</span>
          </p>
        </div>
        <div>
          <Link
            className=" bg-green text-[13px] text-white py-[4px] px-[8px] h-[32px] border-[1px] rounded-[8px]"
            href={`/management/student/portal/${student?.id}/student`}
          >
            Go to{" "}
            <span className=" text-orange font-semibold">{student?.name}</span>{" "}
            details
          </Link>
        </div>

        <div>
          <Link
            className=" bg-green text-[13px] text-white py-[4px] px-[8px] h-[32px] border-[1px] rounded-[8px]"
            href={`/management/enrollment/${student?.id}`}
          >
            Enroll{" "}
            <span className=" text-orange font-semibold">{student?.name}</span>
          </Link>
        </div>
      </div>
      <div className=" w-full flex justify-between  py-[8px] ">
        <div className=" flex items-center gap-[32px]">
          <div className=" flex  font-bold text-[20px] items-center">
            <p>Calling Time: 01:13 min</p>
          </div>

          <div className=" flex font-bold text-[20px] items-center">
            <p className=" whitespace-nowrap">Calling Date: 05/06/2024</p>
          </div>
        </div>
        <div className=" flex flex-col gap-[4px]">
          <p className=" text-[13px] text-green">Call type:</p>
          <div className=" w-[230px]">
            <Select
              value={followUpData?.call_type}
              isClearable
              onChange={(e) =>
                setFollowUpData({ ...followUpData, call_type: e })
              }
              maxMenuHeight={150}
              className={` ${
                checkError && followUpData?.call_type === ""
                  ? "border-[2px] border-red rounded-[8px]"
                  : ""
              }`}
              options={[
                {
                  value: "Admission",
                  label: "Admission",
                },
                {
                  value: "Smart Book",
                  label: "Smart Book",
                },
                {
                  value: "Suggestion Book",
                  label: "Suggestion Book",
                },
                {
                  value: "Educational Support",
                  label: "Education Support",
                },
                {
                  value: "Complain",
                  label: "Complain",
                },
                {
                  value: "App Issue",
                  label: "App Issue",
                },
                {
                  value: "Others",
                  label: "Others",
                },
              ]}
            />
          </div>
        </div>
      </div>

      <div className=" flex flex-col gap-[8px] mt-[10px]">
        <div className=" grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <input
            value={student?.name}
            type="text"
            placeholder="Name"
            disabled
            className=" px-[8px] bg-white min-h-[34px] outline-none rounded-[8px]"
          />
          {student?.polytechnic_info?.polytechnic_name && (
            <input
              value={student?.polytechnic_info?.polytechnic_name}
              type="text"
              placeholder="Institute is not added."
              disabled
              className=" px-[8px] bg-white min-h-[34px] outline-none rounded-[8px]"
            />
          )}
          {student?.department_info?.full_name && (
            <input
              value={student?.department_info?.full_name}
              type="text"
              placeholder="Department is not added."
              disabled
              className=" px-[8px] bg-white min-h-[34px] outline-none rounded-[8px]"
            />
          )}
        </div>
        {showUpper && (
          <>
            <div className=" flex flex-col md:flex-row items-center text-[13px] gap-1 xl:gap-[12px]">
              <div className=" flex flex-col gap-[2px]">
                <p className=" text-[13px] font-semibold text-green">
                  Product Title:
                </p>
                <div className=" w-[180px]">
                  <Select
                    styles={customStylesFollowUp}
                    value={followUpData?.product_title}
                    className="rounded-[8px]"
                    onChange={(e) => {
                      setFollowUpData({
                        ...followUpData,
                        product_title: e,
                        payable_amount: 0,
                      });
                      setSelectedBook("");
                      setSelectedPackage("");
                      setSelectedCategory("");
                      setSelectedPlan("");
                      setBookCategory("");
                    }}
                    options={[
                      { label: "Softmax Book", value: "Softmax Book" },
                      { label: "Academic Course", value: "Academic Course" },
                      { label: "Others", value: "Others" },
                    ]}
                  />
                </div>
              </div>

              {followUpData?.product_title?.label === "Academic Course" && (
                <>
                  <div className=" flex flex-col gap-[2px]">
                    <p className=" text-[13px] font-semibold text-green">
                      Product Category:
                    </p>
                    <div className="w-full md:w-[200px] ">
                      <Select
                        styles={customStylesFollowUp}
                        value={selectedCategory}
                        onChange={(e) => {
                          setSelectedCategory(e);
                        }}
                        options={categoryList}
                        maxMenuHeight={150}
                        isClearable
                        className=" w-full  text-[16px] cursor-pointer"
                        placeholder="Select Category"
                      />
                    </div>
                  </div>

                  <div className=" flex flex-col gap-[2px]">
                    <p className=" text-[13px] font-semibold text-green">
                      Product Model:
                    </p>
                    <div className=" w-[200px]">
                      <Select
                        onChange={(e) => setSelectedPackage(e)}
                        options={filterpackageList}
                        maxMenuHeight={150}
                        isClearable
                        className=" w-full  text-[16px] cursor-pointer"
                        placeholder="Select Package"
                      />
                    </div>
                  </div>
                  <div className=" flex flex-col gap-[2px]">
                    <p className=" text-[13px] font-semibold text-green">
                      Product Plan:
                    </p>
                    <div className=" w-[200px]">
                      <Select
                        value={selectedPlan}
                        onChange={(e) => setSelectedPlan(e)}
                        options={planList}
                        maxMenuHeight={150}
                        isClearable
                        className=" w-full  text-[16px] cursor-pointer"
                        placeholder="Select Plan"
                      />
                    </div>
                  </div>
                </>
              )}

              {followUpData?.product_title?.label === "Softmax Book" && (
                <>
                  <div className=" flex flex-col gap-[2px]">
                    <p className=" text-[13px] font-semibold text-green">
                      Product Category:
                    </p>
                    <div className="w-[200px] ">
                      <Select
                        styles={customStylesFollowUp}
                        onChange={(e) => setBookCategory(e)}
                        options={[
                          {
                            label: "Softmax Smart Book",
                            value: "Softmax Smart Book",
                          },
                          {
                            label: "Softmax Smart Suggestions",
                            value: "Softmax Smart Suggestions",
                          },
                          {
                            label: "Additional Book",
                            value: "Additional Book",
                          },
                        ]}
                      />
                    </div>
                  </div>

                  <div className=" flex flex-col gap-[2px]">
                    <p className=" text-[13px] font-semibold text-green">
                      Book Name:
                    </p>
                    <div className=" w-[200px]">
                      <Select
                        onChange={(e) => setSelectedBook(e)}
                        styles={customStylesFollowUp}
                        options={bookList}
                      />
                    </div>
                  </div>
                </>
              )}
              {followUpData?.product_title?.label !== "Others" && (
                <div className=" flex items-center text-[18px] gap-[8px]">
                  <div className=" flex flex-col gap-[2px]">
                    <p className=" text-[13px] font-semibold text-green">
                      Amount:
                    </p>

                    <input
                      type="number"
                      value={followUpData?.payable_amount}
                      placeholder="amount"
                      onChange={(e) =>
                        setFollowUpData({
                          ...followUpData,
                          payable_amount: e.target.value,
                        })
                      }
                      className="w-[100px] font-semibold text-[14px] h-[34px] outline-none rounded-[4px] px-[4px]"
                    />
                  </div>
                  <div className=" flex flex-col gap-1 ml-[8px] pt-[8px]">
                    <div className=" flex items-center gap-[4px]">
                      <input
                        className=" h-5 w-5 cursor-pointer"
                        id="paid"
                        type="radio"
                        checked={followUpData?.is_payable === 1}
                        onChange={(e) =>
                          setFollowUpData({ ...followUpData, is_payable: 1 })
                        }
                      />
                      <label htmlFor="paid">Paid</label>
                    </div>
                    <div className=" flex items-center gap-[4px]">
                      <input
                        className=" h-5 w-5 cursor-pointer"
                        id="paid"
                        type="radio"
                        checked={followUpData?.is_payable === 0}
                        onChange={(e) =>
                          setFollowUpData({ ...followUpData, is_payable: 0 })
                        }
                      />
                      <label htmlFor="paid">Due</label>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className=" flex flex-col md:flex-row text-[13px]  gap-[12px]">
              <div className=" flex flex-col gap-[2px] text-[13px] ">
                <p className=" text-green font-semibold">Follow-Up Date:</p>
                <input
                  type="datetime-local"
                  placeholder="Name"
                  value={followUpData?.follow_up_date}
                  onChange={(e) =>
                    setFollowUpData({
                      ...followUpData,
                      follow_up_date: e.target.value,
                    })
                  }
                  className={` px-[8px] min-h-[34px] outline-none rounded-[8px]`}
                />
              </div>
              <div className=" flex flex-grow  flex-col gap-[2px] text-[13px] ">
                <p className=" text-green font-semibold">Note:</p>
                <textarea
                  placeholder="Write your comments..."
                  value={followUpData?.follow_up_note}
                  onChange={(e) =>
                    setFollowUpData({
                      ...followUpData,
                      follow_up_note: e.target.value,
                    })
                  }
                  className={` ${
                    checkError && followUpData?.follow_up_note === ""
                      ? "border-red border-[2px]"
                      : ""
                  }  px-[8px]  outline-none rounded-[8px]`}
                  rows={5}
                />
              </div>
            </div>
          </>
        )}
      </div>
      {showUpper && (
        <>
          <div className=" py-[16px] flex gap-[8px] items-center justify-end">
            <button
              onClick={() => resetAll()}
              className=" w-[116px] h-[40px] hover:text-green bg-orange text-white rounded-[4px] items-center flex justify-center border-[1px] border-orange "
            >
              Reset
            </button>

            <button
              onClick={() => handleSubmit()}
              className=" w-[116px] h-[40px] hover:text-orange bg-green text-white rounded-[4px] items-center flex justify-center border-[1px] border-orange "
            >
              Save
            </button>
          </div>
        </>
      )}

      <div className=" pt-[8px]" onClick={() => setShowUpper(!showUpper)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className={`size-6 cursor-pointer stroke-title ${
            showUpper ? " rotate-180" : " rotate-0"
          } transition-all duration-500`}
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0-3.75-3.75M17.25 21 21 17.25"
          />
        </svg>
      </div>

      <div className=" w-full shadow-md rounded-[16px] mt-[8px] transition-all ">
        <div className=" h-[400px] overflow-y-auto">
          <table className="w-full table-fixed text-center  rounded-[16px] text-[#121212]">
            <thead className=" sticky top-0 z-10 bg-green text-white">
              <tr className="">
                <th className=" px-4 py-2 text-[13px] font-semibold rounded-tl-[13px] ">
                  FollowUp
                </th>
                <th className=" px-4 py-2 text-[13px] font-semibold ">Title</th>
                <th className=" px-4 py-2 text-[13px] font-semibold ">
                  Category
                </th>
                <th className=" px-4 py-2 text-[13px] font-semibold ">Agent</th>

                <th className=" px-4 py-2 text-[13px] font-semibold ">
                  Payable
                </th>

                <th className=" px-4 py-2 text-[13px] font-semibold  ">
                  Product Name
                </th>

                <th className=" px-4 py-2 text-[13px] font-semibold  ">Note</th>
                <th className=" px-4 py-2 text-[13px] font-semibold rounded-tr-[16px] ">
                  Call type
                </th>
              </tr>
            </thead>
            <tbody className=" bg-white text-[10px] ">
              {follupList?.map((item: any, index: any) => (
                <tr key={index} className="border-b-[1px] border-b-[#A6ABB7]  ">
                  <td className=" px-4 py-2">{item?.follow_up_date}</td>
                  <td className=" px-4 py-2">{item?.product_title}</td>
                  <td className=" px-4 py-2">
                    {item?.product_category?.label}
                  </td>

                  <td className=" px-4 py-2">{item?.employee?.label}</td>
                  <td className=" px-4 py-2">{item?.payable_amount} tk </td>

                  <td className=" px-4 py-2">
                    {item?.book === null
                      ? item?.product_package?.label
                      : item?.book?.label}
                  </td>
                  <td className="  h-auto px-4 py-2">
                    <p
                      onClick={() => {
                        setToggle(true);
                        setToggleData(item?.follow_up_note);
                      }}
                      className=" overflow-auto h-auto "
                    >
                      {item?.follow_up_note?.slice(0, 80)}...
                    </p>
                  </td>
                  <td className=" px-4 py-2">{item?.call_type} </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

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

export default memo(FollowUpForm);
