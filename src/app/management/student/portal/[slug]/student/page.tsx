"use client";
import { AuthContext } from "@/components/ContextProvider";
import CustomModal from "@/components/CustomModal";
import ActivityCard from "@/components/student-portal/ActivityCard";
import SemesterCard from "@/components/student-portal/SemesterCard";
import StudentFilter from "@/components/student-portal/StudentFilter";
import SummaryField from "@/components/student-portal/SummaryField";
import FollowUpForm from "@/components/student/FollowUpForm";
import { EndPoint } from "@/utils/api";
import { semesterLabel } from "@/utils/staticData";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import FollowUp from "@/components/student/follow/FollowUp";

type Props = {};

const Page = () => {
  const { user } = useContext(AuthContext);
  const params = useParams();

  //academic options
  const [sessionList, setSessionList] = useState<any>([]);
  const [selectedSession, setSelectedSession] = useState<any>("");
  const [allDepartment, setAllDepartment] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState<any>("");
  const [instituteList, setInstituteList] = useState<any>([]);
  const [selectedInstitute, setSelectedInstitute] = useState<any>("");
  const [selectedShift, setSelectedShift] = useState<any>("");
  const [selectedSemester, setSelectedSemester] = useState<any>("");
  const [selectedDream, setSelectedDream] = useState<any>("");
  const [stipend, setStipend] = useState(false);
  const [studentInfo, setStudentInfo] = useState<any>("");
  const [editable, setEditable] = useState(true);
  const [refardNumber, setRefardNumber] = useState(0);
  const [supportSummary, setSupportSummary] = useState<any>("");
  const [followUpToggle, setFollowUpToggle] = useState(false);
  const [followUpList, setFollowUpList] = useState<any>([]);
  const [allFollowUpList, setAllFollowUpList] = useState<any>([]);
  const [toggleData, setToggleData] = useState<any>("");
  const [toggle, setToggle] = useState(false);
  const [enrollmentList, setEnrollmentList] = useState<any>([]);
  const [supportList, setSupportList] = useState([]);

  const [guardian, setGuardian] = useState({
    guardian_name: "",
    guardian_contact: "",
    guardian_relation: "",
    salary: 0,
    designation: "",
    guardian_address: "",
  });

  const [studentResult, setStudentResult] = useState({
    first_semester: 0,
    second_semester: 0,
    third_semester: 0,
    fourth_semester: 0,
    fifth_semester: 0,
    sixth_semester: 0,
    seventh_semester: 0,
    eighth_semester: 0,
  });

  const [student, setStudent] = useState({
    name: "",
    // phone_number: phone ? phone : "",
    second_phone_number: "",
    email: "",
    student_board_roll: 0,
    is_stippend: false,
    // current_semester: smesterCheck,
    secondary_education: "",
    secondary_gpa: 0,
    phone_number: "",
  });

  const getEnrollmentList = async () => {
    if (params.slug !== undefined) {
      const res = await axios.get(EndPoint.GET_ENROLLMENT_LIST, {
        params: {
          student_id: params?.slug,
          limit: 30,
        },
      });
      const result = res.data;
      setEnrollmentList(result?.results);
    }
  };

  const getStudentInfo = async () => {
    const res = await axios.get(EndPoint.GET_STUDENT_BY_ID + params?.slug, {
      headers: {
        Authorization: "Bearer " + user?.access_token,
      },
    });
    const result = await res.data;
    setRefardNumber(result?.number_of_refferds);
    setStipend(result.stipend);
    setStudent({
      name: result?.name,
      phone_number: result?.phone_number,
      second_phone_number: result?.second_phone_number,
      email: result?.email,
      student_board_roll: result?.student_board_roll,
      is_stippend: false,
      // current_semester: smesterCheck,
      secondary_education: result?.secondary_education,
      secondary_gpa: result?.secondary_gpa,
    });
    setGuardian({
      guardian_name: result?.guardian?.guardian_name,
      guardian_contact: result?.guardian?.guardian_contact,
      salary: result?.guardian?.salary,
      guardian_address: result?.guardian?.guardian_address,
      guardian_relation: result?.guardian?.guardian_relation,
      designation: result?.guardian?.designation,
    });

    setStudentResult({
      first_semester: result?.first_semester,
      second_semester: result?.second_semester,
      third_semester: result?.third_semester,
      fourth_semester: result?.fourth_semester,
      fifth_semester: result?.fifth_semester,
      sixth_semester: result?.sixth_semester,
      seventh_semester: result?.seventh_semester,
      eighth_semester: result?.eighth_semester,
    });
    setSelectedDream(result?.dream);
    setSelectedInstitute({
      label: result?.polytechnic_info?.polytechnic_name,
      value: result?.polytechnic_info?.id,
    });
    setSelectedDepartment({
      label: result?.department_info?.full_name,
      value: result?.department_info?.id,
    });
    setSelectedSession({
      label: result?.session_info?.session_year,
      value: result?.session_info?.id,
    });
    setSelectedSemester(result?.current_semester);

    setSelectedShift({
      label: result?.shift,
      value: result?.shift,
    });

    setStudentInfo(result);
  };

  // function for academic options
  const getDepartmentList = async () => {
    if (selectedInstitute?.value) {
      const dData = await axios.get(
        EndPoint.SEARCH_DEPARTMENT_BY_POLYTECHNIC + selectedInstitute?.value,
        { params: { limit: 50 } }
      );
      const dResult = await dData.data;

      setAllDepartment(dResult?.departments);
    }
  };

  const getInstituteList = async () => {
    const dData = await axios.get(EndPoint.GET_DROPDOWN_POLYTECHNIC, {
      params: { limit: 1000 },
    });
    const dResult = await dData.data;
    setInstituteList(dResult?.results);
  };

  const getSessionList = async () => {
    const dData = await axios.get(EndPoint.GET_DROPDOWN_SESSION);
    const dResult = await dData.data;
    setSessionList(dResult?.results);
  };

  const updateStudent = async () => {
    const bodyData = {
      guardian: {
        guardian_name: guardian?.guardian_name,
        designation: guardian?.designation,
        guardian_relation: guardian?.guardian_relation,
        guardian_contact: guardian?.guardian_contact,
        salary: guardian?.salary,
        guardian_address: guardian?.guardian_address,
      },
      name: student?.name,
      phone_number: student?.phone_number,
      second_phone_number: student?.second_phone_number,
      email: student?.email,
      student_board_roll: student?.student_board_roll,
      // is_stippend: selectedStipend?.value,
      current_semester: selectedSemester,
      secondary_education: student?.secondary_education,
      secondary_gpa: student?.secondary_gpa,
      dream: selectedDream,
      polytechnic: selectedInstitute?.value,
      department: selectedDepartment?.value,
      session: selectedSession?.value,
      shift: selectedShift?.value,
      number_of_refferds: refardNumber,
    };

    if (params && user) {
      try {
        const res = await axios.patch(
          EndPoint.UPDATE_STUDENT + params?.slug,
          bodyData,
          {
            headers: {
              Authorization: "Bearer " + user?.access_token,
            },
          }
        );

        const result = await res.data;
        toast.success("Student data is updated.");
        getStudentInfo();
      } catch (error: any) {
        if (error?.response) {
          toast.error(Object.values(error.response.data).join(""));
        } else {
          toast.error("An unexpected error occurred.");
        }
      }
    }
  };

  // const getSupportSummary = async () => {
  //   const res = await axios.get(EndPoint.STUDENT_PORTAL_SUPPORT_SUMMARY, {
  //     params: {
  //       student_number: student?.phone_number,
  //     },
  //   });
  //   const resResult = await res?.data;
  //   console.log(resResult);
  // };

  // useEffect(() => {
  //   getSupportSummary();
  // }, [student?.phone_number]);
  const getFollowUpList = async () => {
    if (student?.phone_number !== "") {
      const res = await axios.get(EndPoint.FOLLOW_UP_LIST, {
        params: {
          limit: 100,
          phone_number: student?.phone_number,
          user_id: user?.id,
        },
        headers: {
          Authorization: "Bearer " + user?.access_token,
        },
      });
      const resData = await res.data;
      setFollowUpList(resData?.results);
    }
  };

  const getAllFollowUpList = async () => {
    if (student?.phone_number !== "" && user?.id !== "") {
      const res = await axios.get(EndPoint.FOLLOW_UP_LIST, {
        params: {
          limit: 100,
          phone_number: student?.phone_number,
        },
        headers: {
          Authorization: "Bearer " + user?.access_token,
        },
      });
      const resData = await res.data;
      setAllFollowUpList(resData?.results);
    }
  };
  useEffect(() => {
    getAllFollowUpList();
  }, [student, user]);
  useEffect(() => {
    getFollowUpList();
  }, [student]);

  useEffect(() => {
    getDepartmentList();
  }, [selectedInstitute]);

  useEffect(() => {
    getSessionList();
    getInstituteList();
  }, []);
  useEffect(() => {
    getEnrollmentList();
    getStudentInfo();
  }, [params]);
  return (
    <div className=" flex flex-col gap-6">
      <div className=" flex flex-col-reverse md:flex-row gap-[24px]">
        <div className=" w-full flex flex-col gap-[24px] ">
          <div className=" w-full flex flex-col md:flex-row gap-[24px]">
            <div className=" w-full  flex flex-col gap-[24px]">
              <div className=" w-full shadow-md rounded-[16px]">
                <div className=" max-h-[200px] overflow-auto">
                  <table className="w-full text-center  rounded-[16px] text-[#121212]">
                    <thead className=" bg-[#DBDDE2]">
                      <tr className="">
                        <th className=" px-4 py-2 text-[16px] font-semibold rounded-tl-[16px] ">
                          Type
                        </th>
                        <th className=" px-4 py-2 text-[16px] font-semibold ">
                          Product
                        </th>
                        <th className=" px-4 py-2 text-[16px] font-semibold ">
                          Payable
                        </th>

                        <th className=" px-4 py-2 text-[16px] font-semibold rounded-tr-[16px] ">
                          Follow Up
                        </th>
                      </tr>
                    </thead>
                    <tbody className=" text-[12px] ">
                      {followUpList?.map((item: any, index: any) => (
                        <tr
                          key={index}
                          className="border-b-[1px] border-b-[#A6ABB7] "
                        >
                          <td className=" px-4 py-2">{item?.call_type}</td>
                          <td className=" px-4 py-2">{item?.product_title}</td>

                          <td className=" px-4 py-2">{item?.payable_amount}</td>

                          <td className=" px-4 py-2">{item?.follow_up_date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className=" flex items-center justify-between px-[16px] py-[10px]">
                  <p className=" text-[12px] flex items-center font-semibold">
                    Last follow up:&nbsp;
                    <span className=" text-[14px] font-semibold">
                      {followUpList.length > 0 &&
                        followUpList[0]?.follow_up_date}
                    </span>
                  </p>
                  <button
                    onClick={() => setFollowUpToggle(true)}
                    className=" text-[14px] bg-orange text-white px-[16px] py-[4px] rounded-[4px]"
                  >
                    Follow up now
                  </button>
                </div>
              </div>
              {followUpToggle && (
                <CustomModal setClose={() => setFollowUpToggle(false)}>
                  <div className=" max-w-[1100px]">
                    <FollowUpForm studentId={studentInfo?.phone_number} />
                  </div>
                </CustomModal>
              )}
              <div className=" w-full h-auto  grid  grid-cols-2 gap-[8px] px-[12px] py-[8px] bg-bg_gray rounded-[16px]">
                <SemesterCard />
                <SemesterCard />
                <SemesterCard />
                <SemesterCard />
                <SemesterCard />
                <SemesterCard />
              </div>
            </div>
            <div className=" w-full md:w-[267px]  flex flex-col gap-[16px]  rounded-[16px]">
              <div className=" w-full px-[16px] pt-[8px] pb-[16px] h-[302px] bg-green rounded-[16px] flex flex-col justify-center items-center">
                <p className=" text-white text-[20px] font-semibold pb-[4px]">
                  Support Summery
                </p>
                <div className=" w-full flex flex-col gap-[8px]">
                  <SummaryField title="Total Day" amount="122" />
                  <SummaryField title="Total Support" amount="452" />
                  <SummaryField title="This Semester" amount="22" />
                  <SummaryField title="This Week" amount="12" />
                  <SummaryField title="Today" amount="2" />
                  <SummaryField title="Average Support" amount="22 min" />
                </div>
              </div>
              <div className=" w-full  h-[95px] bg-bg_gray rounded-[16px]  ">
                <p className=" tex-[16px] font-[700] text-center py-[8px]">
                  Dept. Overview
                </p>
                <div className="bg-[#F0F7FF] w-full h-[60px] px-[16px] flex justify-center items-center rounded-br-[16px] rounded-bl-[16px]  ">
                  <p className=" w-[126px] text-[16px] font-[700px]">
                    Computer:
                  </p>
                  <div className=" flex flex-col gap-[4px] items-center ">
                    <p>100</p>
                    <div className=" h-[1px] bg-title w-[46px]"></div>
                    <p>Total</p>
                  </div>
                  <div className=" h-[44px] bg-title w-[1px] mx-[8px]"></div>
                  <div className=" flex flex-col gap-[4px] items-center">
                    <p>10</p>
                    <div className=" h-[1px] bg-title w-[46px]"></div>
                    <p>Our</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* App activity */}
          <div className=" w-full h-[248px] bg-orange px-[16px] rounded-[16px]">
            <p className=" text-[20px] font-semibold flex justify-center items-center text-white pt-[12px]">
              App Activity
            </p>
            <div className=" grid grid-cols-5 items-center justify-center gap-[8px] py-[16px]">
              <ActivityCard />
              <ActivityCard />
              <ActivityCard />
              <ActivityCard />
              <ActivityCard />
              <ActivityCard />
              <ActivityCard />
              <ActivityCard />
              <ActivityCard />
              <ActivityCard />
            </div>
          </div>
        </div>
        <div>
          <div className=" w-full md:max-w-[267px] bg-[#EDEEF1] flex flex-col gap-[16px] justify-center items-center rounded-[16px]  py-[16px]">
            <div className=" w-full flex flex-col justify-center gap-[8px] items-center">
              <div className=" flex w-full items-center justify-between px-[24px]">
                <p className=" text-[16px]">ID:{studentInfo?.id}</p>

                <div>
                  {editable ? (
                    <div
                      onClick={() => setEditable(!editable)}
                      className={`rounded-md ${
                        user?.role === 0
                          ? "block"
                          : user?.name === studentInfo?.mentor
                          ? "block"
                          : "hidden"
                      } cursor-pointer px-[4px] py-[2px]`}
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
                          d="M21.0993 5.42893C18.9733 7.55493 13.9833 12.5439 12.7663 13.7569C12.5057 14.0172 12.1956 14.2226 11.8543 14.3609C10.8783 14.7659 8.49727 15.6999 7.79727 15.7469C7.59092 15.7608 7.384 15.7304 7.19038 15.6577C6.99676 15.585 6.82093 15.4717 6.6747 15.3255C6.52846 15.1793 6.41519 15.0034 6.34251 14.8098C6.26982 14.6162 6.23939 14.4093 6.25327 14.2029C6.30027 13.5029 7.23427 11.1239 7.63227 10.1519C7.77127 9.80693 7.97827 9.49393 8.24127 9.23193L16.5713 0.900928C16.9749 0.498019 17.5219 0.271729 18.0923 0.271729C18.6626 0.271729 19.2096 0.498019 19.6133 0.900928L21.0993 2.38693C21.5022 2.79058 21.7285 3.3376 21.7285 3.90793C21.7285 4.47825 21.5022 5.02528 21.0993 5.42893ZM7.75627 14.2439C8.44027 14.1579 10.4393 13.3239 11.2793 12.9749C11.4389 12.9122 11.5839 12.8172 11.7053 12.6959L11.7063 12.6949C14.4855 9.92116 17.2628 7.14549 20.0383 4.36793C20.0987 4.30756 20.1467 4.23585 20.1794 4.15692C20.2122 4.07799 20.229 3.99338 20.229 3.90793C20.229 3.82248 20.2122 3.73787 20.1794 3.65894C20.1467 3.58 20.0987 3.5083 20.0383 3.44793L18.5523 1.96193C18.4919 1.90146 18.4202 1.85348 18.3413 1.82075C18.2623 1.78802 18.1777 1.77117 18.0923 1.77117C18.0068 1.77117 17.9222 1.78802 17.8433 1.82075C17.7643 1.85348 17.6926 1.90146 17.6323 1.96193L9.30127 10.2929C9.18132 10.4122 9.08705 10.5548 9.02427 10.7119L9.02227 10.7159C8.67727 11.5579 7.84227 13.5589 7.75627 14.2439Z"
                          fill="black"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M19.1175 6.34885C19.1872 6.41852 19.2425 6.50122 19.2802 6.59224C19.3179 6.68327 19.3373 6.78083 19.3373 6.87935C19.3373 6.97787 19.3179 7.07543 19.2802 7.16645C19.2425 7.25748 19.1872 7.34018 19.1175 7.40985C19.0479 7.47952 18.9652 7.53478 18.8741 7.57248C18.7831 7.61018 18.6856 7.62959 18.587 7.62959C18.4885 7.62959 18.391 7.61018 18.2999 7.57248C18.2089 7.53478 18.1262 7.47952 18.0565 7.40985L14.5895 3.94285C14.4488 3.80215 14.3698 3.61133 14.3698 3.41235C14.3698 3.21337 14.4488 3.02255 14.5895 2.88185C14.7302 2.74115 14.9211 2.66211 15.12 2.66211C15.319 2.66211 15.5098 2.74115 15.6505 2.88185L19.1175 6.34885ZM12.9965 12.4698C13.0661 12.5395 13.1213 12.6221 13.159 12.713C13.1967 12.804 13.2161 12.9014 13.2161 12.9998C13.2161 13.0983 13.1967 13.1957 13.159 13.2867C13.1213 13.3776 13.0661 13.4602 12.9965 13.5298C12.9269 13.5995 12.8443 13.6547 12.7534 13.6923C12.6624 13.73 12.565 13.7494 12.4665 13.7494C12.3681 13.7494 12.2706 13.73 12.1797 13.6923C12.0888 13.6547 12.0061 13.5995 11.9365 13.5298L8.46953 10.0628C8.39993 9.99325 8.34472 9.91062 8.30706 9.81968C8.26939 9.72875 8.25 9.63128 8.25 9.53285C8.25 9.43442 8.26939 9.33695 8.30706 9.24602C8.34472 9.15508 8.39993 9.07245 8.46953 9.00285C8.53913 8.93325 8.62176 8.87804 8.7127 8.84037C8.80364 8.8027 8.9011 8.78332 8.99953 8.78332C9.09796 8.78332 9.19543 8.8027 9.28637 8.84037C9.37731 8.87804 9.45993 8.93325 9.52953 9.00285L12.9965 12.4698Z"
                          fill="black"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M7.5 2.25C7.69891 2.25 7.88968 2.32902 8.03033 2.46967C8.17098 2.61032 8.25 2.80109 8.25 3C8.25 3.19891 8.17098 3.38968 8.03033 3.53033C7.88968 3.67098 7.69891 3.75 7.5 3.75H4C3.40326 3.75 2.83097 3.98705 2.40901 4.40901C1.98705 4.83097 1.75 5.40326 1.75 6V18C1.75 18.5967 1.98705 19.169 2.40901 19.591C2.83097 20.0129 3.40326 20.25 4 20.25H17C17.5967 20.25 18.169 20.0129 18.591 19.591C19.0129 19.169 19.25 18.5967 19.25 18V14.5C19.25 14.3011 19.329 14.1103 19.4697 13.9697C19.6103 13.829 19.8011 13.75 20 13.75C20.1989 13.75 20.3897 13.829 20.5303 13.9697C20.671 14.1103 20.75 14.3011 20.75 14.5V18C20.7495 18.9944 20.3542 19.9479 19.6511 20.6511C18.9479 21.3542 17.9944 21.7495 17 21.75H4C3.0056 21.7495 2.05208 21.3542 1.34893 20.6511C0.645788 19.9479 0.25053 18.9944 0.25 18V6C0.25 5.00544 0.645088 4.05161 1.34835 3.34835C2.05161 2.64509 3.00544 2.25 4 2.25H7.5Z"
                          fill="black"
                        />
                      </svg>
                    </div>
                  ) : (
                    <div className=" flex items-center text-[12px] gap-[8px]">
                      <button
                        onClick={() => {
                          setEditable(!editable);
                        }}
                        className=" text-white rounded-md bg-green px-[4px] py-[2px]"
                      >
                        cancel
                      </button>{" "}
                      <button
                        onClick={() => {
                          updateStudent();
                          setEditable(!editable);
                        }}
                        className=" text-white rounded-md bg-green px-[4px] py-[2px]"
                      >
                        save
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className=" relative overflow-auto h-[111px] w-[111px] rounded-full object-cover">
                <Image src={"/assets/profile.png"} fill alt="img" />
              </div>

              <div>
                <input
                  type="text"
                  className={` ${
                    editable
                      ? " bg-bg_ingo outline-none "
                      : " bg-white outline-dashed"
                  } text-[22px] text-center font-semibold py-[8px]`}
                  value={student?.name}
                  disabled={editable}
                  onChange={(e) =>
                    setStudent({ ...student, name: e.target.value })
                  }
                />
              </div>
              <div className=" flex flex-col px-6 gap-[8px]">
                <div className=" flex  gap-[8px] text-[#121212] text-[13px]">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="17"
                      height="16"
                      viewBox="0 0 17 16"
                      fill="none"
                    >
                      <path
                        d="M12.45 7.15026L12.5 7.08351V4.70801L8.5 6.30801L4.5 4.70801V7.08351L4.55 7.15026C4.59125 7.20526 5.596 8.50026 8.5 8.50026C11.404 8.50026 12.4087 7.20526 12.45 7.15026ZM16.125 15.2503H2.625C2.26033 15.2503 1.91059 15.1054 1.65273 14.8475C1.39487 14.5897 1.25 14.2399 1.25 13.8753C1.25 13.5106 1.39487 13.1608 1.65273 12.903C1.91059 12.6451 2.26033 12.5003 2.625 12.5003H16.125C16.2245 12.5003 16.3198 12.4608 16.3902 12.3904C16.4605 12.3201 16.5 12.2247 16.5 12.1253C16.5 12.0258 16.4605 11.9304 16.3902 11.8601C16.3198 11.7898 16.2245 11.7503 16.125 11.7503H2.625C2.06141 11.7503 1.52091 11.9741 1.1224 12.3727C0.723883 12.7712 0.5 13.3117 0.5 13.8753C0.5 14.4388 0.723883 14.9793 1.1224 15.3779C1.52091 15.7764 2.06141 16.0003 2.625 16.0003H16.125C16.2245 16.0003 16.3198 15.9608 16.3902 15.8904C16.4605 15.8201 16.5 15.7247 16.5 15.6253C16.5 15.5258 16.4605 15.4304 16.3902 15.3601C16.3198 15.2898 16.2245 15.2503 16.125 15.2503Z"
                        fill="#121212"
                      />
                      <path
                        d="M1.75 13.875C1.75 13.9899 1.77263 14.1037 1.81661 14.2098C1.86058 14.316 1.92503 14.4125 2.00628 14.4937C2.08753 14.575 2.18399 14.6394 2.29015 14.6834C2.39631 14.7274 2.51009 14.75 2.625 14.75H16.125V13H2.625C2.39294 13 2.17038 13.0922 2.00628 13.2563C1.84219 13.4204 1.75 13.6429 1.75 13.875Z"
                        fill="#121212"
                      />
                      <path
                        d="M13.75 6.625C14.0952 6.625 14.375 6.34518 14.375 6C14.375 5.65482 14.0952 5.375 13.75 5.375C13.4048 5.375 13.125 5.65482 13.125 6C13.125 6.34518 13.4048 6.625 13.75 6.625Z"
                        fill="#121212"
                      />
                      <path
                        d="M12.6629 4.10396L8.41017 2.48396L8.58817 2.01646L13.3482 3.82996L15.4222 3.00021L8.49917 0.230957L1.57617 3.00021L8.49917 5.76946L12.6629 4.10396ZM13.4992 4.42271V4.90546C13.6634 4.8652 13.8349 4.8652 13.9992 4.90546V4.07796L13.3482 3.82996L12.6629 4.10396L13.4992 4.42271ZM2.74917 9.50021C2.74917 9.63282 2.80185 9.75999 2.89562 9.85376C2.98939 9.94753 3.11656 10.0002 3.24917 10.0002H12.4092L12.5757 9.00021H3.24917C3.11656 9.00021 2.98939 9.05289 2.89562 9.14665C2.80185 9.24042 2.74917 9.3676 2.74917 9.50021ZM14.4992 9.50021L14.0934 7.06571C13.8708 7.14509 13.6276 7.14509 13.4049 7.06571L12.9992 9.50021H14.4992Z"
                        fill="#121212"
                      />
                      <path
                        d="M3.25 11.25H14.125C14.2245 11.25 14.3198 11.2105 14.3902 11.1402C14.4605 11.0698 14.5 10.9745 14.5 10.875C14.5 10.7755 14.4605 10.6802 14.3902 10.6098C14.3198 10.5395 14.2245 10.5 14.125 10.5H3.25C2.98478 10.5 2.73043 10.3946 2.54289 10.2071C2.35536 10.0196 2.25 9.76522 2.25 9.5C2.25 9.23478 2.35536 8.98043 2.54289 8.79289C2.73043 8.60536 2.98478 8.5 3.25 8.5H5.67C5.21858 8.3218 4.80071 8.06819 4.43425 7.75H3.25C2.78587 7.75 2.34075 7.93437 2.01256 8.26256C1.68437 8.59075 1.5 9.03587 1.5 9.5C1.5 9.96413 1.68437 10.4092 2.01256 10.7374C2.34075 11.0656 2.78587 11.25 3.25 11.25ZM12.785 7.75H12.566C12.1995 8.06822 11.7815 8.32184 11.33 8.5H12.66L12.785 7.75Z"
                        fill="#121212"
                      />
                    </svg>
                  </div>
                  {editable ? (
                    <p>{selectedInstitute?.label}</p>
                  ) : (
                    <Select
                      value={selectedInstitute}
                      onChange={(e: any) => setSelectedInstitute(e)}
                      isClearable
                      maxMenuHeight={200}
                      options={instituteList}
                      className=" w-full  text-[12px] cursor-pointer"
                      placeholder="Select polytechnic"
                    />
                  )}
                </div>
                <div className=" flex  gap-[8px] text-[#121212] text-[13px]">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="16"
                      viewBox="0 0 14 16"
                      fill="none"
                    >
                      <path
                        d="M12 11.0342V9.3335C12 8.41483 11.252 7.66683 10.3333 7.66683H7.33333V4.96616C8.46133 4.80283 9.33333 3.83883 9.33333 2.66683C9.33333 1.38016 8.28667 0.333496 7 0.333496C5.71333 0.333496 4.66667 1.38016 4.66667 2.66683C4.66667 3.83883 5.53867 4.80283 6.66667 4.96616V7.66683H3.66667C3.2248 7.66736 2.80119 7.84312 2.48874 8.15557C2.17629 8.46801 2.00053 8.89163 2 9.3335V11.0342C0.872 11.1975 0 12.1615 0 13.3335C0 14.6202 1.04667 15.6668 2.33333 15.6668C3.62 15.6668 4.66667 14.6202 4.66667 13.3335C4.66667 12.1615 3.79467 11.1975 2.66667 11.0342V9.3335C2.66667 8.78216 3.11533 8.3335 3.66667 8.3335H10.3333C10.8847 8.3335 11.3333 8.78216 11.3333 9.3335V11.0342C10.2053 11.1975 9.33333 12.1615 9.33333 13.3335C9.33333 14.6202 10.38 15.6668 11.6667 15.6668C12.9533 15.6668 14 14.6202 14 13.3335C14 12.1615 13.128 11.1975 12 11.0342Z"
                        fill="#121212"
                      />
                    </svg>
                  </div>
                  {editable ? (
                    <p className="">{selectedDepartment?.label}</p>
                  ) : (
                    <Select
                      value={selectedDepartment}
                      onChange={(e: any) => setSelectedDepartment(e)}
                      isClearable
                      maxMenuHeight={200}
                      options={allDepartment}
                      className=" w-full  text-[12px] cursor-pointer"
                      placeholder="Select department"
                    />
                  )}
                </div>
                <div className=" flex items-center gap-[8px] text-[#121212] text-[13px]">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="14"
                      viewBox="0 0 15 14"
                      fill="none"
                    >
                      <path
                        d="M14.25 13.0868H13.1295V5.29C13.1293 5.09115 13.0502 4.9005 12.9096 4.75989C12.769 4.61928 12.5784 4.5402 12.3795 4.54H11.2257C11.0269 4.5402 10.8362 4.61928 10.6956 4.75989C10.555 4.9005 10.4759 5.09115 10.4757 5.29V13.087H8.82675V7.4265C8.82655 7.22765 8.74747 7.037 8.60686 6.89639C8.46625 6.75578 8.2756 6.6767 8.07675 6.6765H6.92325C6.7244 6.6767 6.53375 6.75578 6.39314 6.89639C6.25253 7.037 6.17345 7.22765 6.17325 7.4265V13.0868H4.52425V9.6505C4.52405 9.45165 4.44497 9.261 4.30436 9.12039C4.16375 8.97978 3.9731 8.9007 3.77425 8.9005H2.6205C2.42165 8.9007 2.231 8.97978 2.09039 9.12039C1.94978 9.261 1.8707 9.45165 1.8705 9.6505V13.0868H0.75C0.683696 13.0868 0.620107 13.1131 0.573223 13.16C0.526339 13.2069 0.5 13.2704 0.5 13.3368C0.5 13.4031 0.526339 13.4666 0.573223 13.5135C0.620107 13.5604 0.683696 13.5868 0.75 13.5868C0.75 13.5868 13.4375 13.5872 14.25 13.5868C14.3163 13.5868 14.3799 13.5604 14.4268 13.5135C14.4737 13.4666 14.5 13.4031 14.5 13.3368C14.5 13.2704 14.4737 13.2069 14.4268 13.16C14.3799 13.1131 14.3163 13.0868 14.25 13.0868ZM2.3705 13.0868V9.6505C2.37057 9.58422 2.39693 9.52067 2.4438 9.4738C2.49067 9.42693 2.55422 9.40057 2.6205 9.4005H3.77425C3.84053 9.40057 3.90408 9.42693 3.95095 9.4738C3.99782 9.52067 4.02418 9.58422 4.02425 9.6505V13.0868H2.3705ZM6.673 13.0868V7.4265C6.67307 7.36022 6.69943 7.29667 6.7463 7.2498C6.79317 7.20293 6.85672 7.17657 6.923 7.1765H8.07675C8.14303 7.17657 8.20658 7.20293 8.25345 7.2498C8.30032 7.29667 8.32668 7.36022 8.32675 7.4265V13.0868H6.673ZM10.9757 13.0868V5.29C10.9758 5.22372 11.0022 5.16017 11.049 5.1133C11.0959 5.06643 11.1595 5.04007 11.2257 5.04H12.3795C12.4458 5.04007 12.5093 5.06643 12.5562 5.1133C12.6031 5.16017 12.6294 5.22372 12.6295 5.29V13.087L10.9757 13.0868ZM10.5075 1.474H10.78C10.898 1.88888 11.1039 2.2735 11.3837 2.60175C11.1431 2.74429 10.8655 2.81216 10.5863 2.79675C10.5205 2.78793 10.454 2.80553 10.4012 2.84569C10.3484 2.88585 10.3138 2.9453 10.3048 3.011C10.2928 3.224 10.4432 3.314 10.6648 3.3C11.061 3.29596 11.447 3.17336 11.773 2.948C12.1379 3.20711 12.5825 3.32911 13.0285 3.2925C13.0942 3.28385 13.1539 3.24943 13.1942 3.19683C13.2346 3.14423 13.2524 3.07774 13.2437 3.012C13.2351 2.94626 13.2007 2.88665 13.1481 2.84628C13.0955 2.80591 13.029 2.7881 12.9633 2.79675C12.6829 2.81228 12.4041 2.74443 12.1622 2.60175C12.4421 2.27349 12.648 1.88887 12.766 1.474H13.0977C13.1641 1.474 13.2276 1.44766 13.2745 1.40078C13.3214 1.35389 13.3477 1.2903 13.3477 1.224C13.3477 1.1577 13.3214 1.09411 13.2745 1.04722C13.2276 1.00034 13.1641 0.974 13.0977 0.974H12.0527V0.25C12.0527 0.183696 12.0264 0.120107 11.9795 0.0732234C11.9326 0.0263393 11.8691 0 11.8027 0C11.7364 0 11.6729 0.0263393 11.626 0.0732234C11.5791 0.120107 11.5527 0.183696 11.5527 0.25V0.974H10.5072C10.4409 0.974 10.3774 1.00034 10.3305 1.04722C10.2836 1.09411 10.2572 1.1577 10.2572 1.224C10.2572 1.2903 10.2836 1.35389 10.3305 1.40078C10.3774 1.44766 10.4412 1.474 10.5075 1.474ZM11.773 2.2875C11.5652 2.04995 11.4067 1.77341 11.3068 1.474H12.2393C12.1393 1.7734 11.9808 2.04993 11.773 2.2875Z"
                        fill="#121212"
                      />
                    </svg>
                  </div>
                  <div className=" flex items-center gap-[4px]">
                    {editable ? (
                      <p>
                        {semesterLabel(parseInt(selectedSemester))} Semester
                      </p>
                    ) : (
                      <select
                        id="semester"
                        value={selectedSemester}
                        onChange={(e) => setSelectedSemester(e.target.value)}
                      >
                        <option label="one" value={1}>
                          1
                        </option>
                        <option label="two" value={2}>
                          2
                        </option>
                        <option label="three" value={3}>
                          3
                        </option>
                        <option label="four" value={4}>
                          4
                        </option>
                        <option label="five" value={5}>
                          5
                        </option>
                        <option label="six" value={6}>
                          6
                        </option>
                        <option label="seven" value={7}>
                          7
                        </option>
                        <option label="eight" value={8}>
                          8
                        </option>
                      </select>
                    )}
                    {editable ? (
                      <p>({selectedSession?.label})</p>
                    ) : (
                      <Select
                        value={selectedSession}
                        options={sessionList}
                        isClearable
                        onChange={(e) => setSelectedSession(e)}
                        className=" text-[12px]"
                        placeholder="Select session"
                      />
                    )}
                  </div>
                </div>

                <div className=" flex items-center gap-[8px] text-[#121212] text-[13px]">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="17"
                      height="16"
                      viewBox="0 0 17 16"
                      fill="none"
                    >
                      <path
                        d="M16.5 4.3871V1.29032C16.4992 0.578065 15.9219 0.00083871 15.2097 0H12.1129C11.4006 0.00083871 10.8234 0.578065 10.8226 1.29032V4.3871C10.8231 4.58816 10.8708 4.78629 10.9619 4.96556C11.0529 5.14484 11.1847 5.30026 11.3467 5.41935C11.2455 5.49453 11.1558 5.58418 11.0806 5.68542C10.9616 5.52342 10.8061 5.39161 10.6269 5.30059C10.4476 5.20956 10.2494 5.16185 10.0484 5.16129H8.13484L8.89613 4.4C9.40003 3.8961 9.40003 3.07913 8.89613 2.57523L6.70645 0.385548C6.20255 -0.118355 5.38558 -0.118355 4.88168 0.385548L2.692 2.57523C2.1881 3.07913 2.1881 3.8961 2.692 4.4L3.45329 5.16129H1.79032C1.07806 5.16213 0.500839 5.73935 0.5 6.45161V9.54839C0.500559 9.74945 0.548269 9.94758 0.639296 10.1269C0.730324 10.3061 0.862131 10.4616 1.02413 10.5806C0.862131 10.6997 0.730324 10.8552 0.639296 11.0344C0.548269 11.2137 0.500559 11.4118 0.5 11.6129L0.5 14.7097C0.500839 15.4219 1.07806 15.9992 1.79032 16H4.8871C5.08816 15.9994 5.28629 15.9517 5.46556 15.8607C5.64484 15.7697 5.80026 15.6379 5.91935 15.4759C6.03845 15.6379 6.19387 15.7697 6.37315 15.8607C6.55242 15.9517 6.75055 15.9994 6.95161 16H10.0484C10.2494 15.9994 10.4476 15.9517 10.6269 15.8607C10.8061 15.7697 10.9616 15.6379 11.0806 15.4759C11.1997 15.6379 11.3552 15.7697 11.5344 15.8607C11.7137 15.9517 11.9118 15.9994 12.1129 16H15.2097C15.9219 15.9992 16.4992 15.4219 16.5 14.7097V11.6129C16.4994 11.4118 16.4517 11.2137 16.3607 11.0344C16.2697 10.8552 16.1379 10.6997 15.9759 10.5806C16.1379 10.4616 16.2697 10.3061 16.3607 10.1269C16.4517 9.94758 16.4994 9.74945 16.5 9.54839V6.45161C16.4994 6.25055 16.4517 6.05242 16.3607 5.87315C16.2697 5.69387 16.1379 5.53845 15.9759 5.41935C16.1379 5.30026 16.2697 5.14484 16.3607 4.96556C16.4517 4.78629 16.4994 4.58816 16.5 4.3871ZM10.0484 5.67742C10.476 5.67742 10.8226 6.02403 10.8226 6.45161V9.54839C10.8226 9.97597 10.476 10.3226 10.0484 10.3226H6.95161C6.52403 10.3226 6.17742 9.97597 6.17742 9.54839V6.90374C6.37667 6.84375 6.55827 6.73603 6.70645 6.58994L7.61871 5.67742H10.0484ZM11.3467 10.5806C11.2455 10.6558 11.1558 10.7455 11.0806 10.8467C11.0055 10.7455 10.9158 10.6558 10.8146 10.5806C10.9158 10.5055 11.0055 10.4158 11.0806 10.3146C11.1558 10.4158 11.2455 10.5055 11.3467 10.5806ZM5.91935 10.8467C5.84418 10.7455 5.75453 10.6558 5.65329 10.5806C5.75454 10.5055 5.84419 10.4158 5.91935 10.3146C5.99453 10.4158 6.08418 10.5055 6.18542 10.5806C6.08417 10.6558 5.99452 10.7455 5.91935 10.8467ZM2.83006 3.48774C2.82981 3.38604 2.84973 3.2853 2.88866 3.19134C2.9276 3.09739 2.98478 3.01209 3.0569 2.94039L5.24684 0.750452C5.54916 0.448226 6.03923 0.448226 6.34155 0.750452L8.53123 2.94039C8.83345 3.24271 8.83345 3.73277 8.53123 4.0351L6.34155 6.22503C6.0351 6.51713 5.55329 6.51713 5.24684 6.22503L3.0569 4.0351C2.98483 3.96336 2.92767 3.87805 2.88874 3.78411C2.8498 3.69016 2.82986 3.58944 2.83006 3.48774ZM1.01613 9.54839V6.45161C1.01613 6.02403 1.36274 5.67742 1.79032 5.67742H3.96942L4.88168 6.58994C5.09153 6.79807 5.36704 6.92703 5.66129 6.95484V9.54839C5.66129 9.97597 5.31468 10.3226 4.8871 10.3226H1.79032C1.36274 10.3226 1.01613 9.97597 1.01613 9.54839ZM4.8871 15.4839H1.79032C1.36274 15.4839 1.01613 15.1373 1.01613 14.7097V11.6129C1.01613 11.1853 1.36274 10.8387 1.79032 10.8387H4.8871C5.31468 10.8387 5.66129 11.1853 5.66129 11.6129V14.7097C5.66129 15.1373 5.31468 15.4839 4.8871 15.4839ZM10.0484 15.4839H6.95161C6.52403 15.4839 6.17742 15.1373 6.17742 14.7097V11.6129C6.17742 11.1853 6.52403 10.8387 6.95161 10.8387H10.0484C10.476 10.8387 10.8226 11.1853 10.8226 11.6129V14.7097C10.8226 15.1373 10.476 15.4839 10.0484 15.4839ZM15.9839 11.6129V14.7097C15.9839 15.1373 15.6373 15.4839 15.2097 15.4839H12.1129C11.6853 15.4839 11.3387 15.1373 11.3387 14.7097V11.6129C11.3387 11.1853 11.6853 10.8387 12.1129 10.8387H15.2097C15.6373 10.8387 15.9839 11.1853 15.9839 11.6129ZM15.9839 6.45161V9.54839C15.9839 9.97597 15.6373 10.3226 15.2097 10.3226H12.1129C11.6853 10.3226 11.3387 9.97597 11.3387 9.54839V6.45161C11.3387 6.02403 11.6853 5.67742 12.1129 5.67742H15.2097C15.6373 5.67742 15.9839 6.02403 15.9839 6.45161ZM15.9839 4.3871C15.9839 4.81468 15.6373 5.16129 15.2097 5.16129H12.1129C11.6853 5.16129 11.3387 4.81468 11.3387 4.3871V1.29032C11.3387 0.862742 11.6853 0.516129 12.1129 0.516129H15.2097C15.6373 0.516129 15.9839 0.862742 15.9839 1.29032V4.3871Z"
                        fill="#121212"
                      />
                      <path
                        d="M6.7069 4.39995L7.0718 4.03505L5.42922 2.39273C5.37991 2.3461 5.31463 2.32012 5.24677 2.32012C5.17891 2.32012 5.11362 2.3461 5.06432 2.39273L4.69916 2.75789C4.65076 2.80627 4.62356 2.8719 4.62354 2.94034V3.67015H5.13967V3.04718L5.24677 2.94034L6.7069 4.39995ZM14.4357 1.54834H12.6292V2.06447H14.1776V2.5806H12.8873C12.8188 2.5806 12.7532 2.60779 12.7048 2.65618C12.6564 2.70458 12.6292 2.77022 12.6292 2.83866V3.87092C12.6292 3.93936 12.6564 4.005 12.7048 4.0534C12.7532 4.1018 12.8188 4.12898 12.8873 4.12898H14.6937V3.61286H13.1453V3.09673H14.4357C14.5041 3.09673 14.5698 3.06954 14.6182 3.02114C14.6665 2.97275 14.6937 2.90711 14.6937 2.83866V1.8064C14.6937 1.73796 14.6665 1.67232 14.6182 1.62393C14.5698 1.57553 14.5041 1.54834 14.4357 1.54834ZM14.6937 9.03221V7.99995C14.6937 7.93151 14.6665 7.86587 14.6182 7.81747C14.5698 7.76908 14.5041 7.74189 14.4357 7.74189H13.1453V7.22576H14.6937V6.70963H12.8873C12.8188 6.70963 12.7532 6.73682 12.7048 6.78522C12.6564 6.83361 12.6292 6.89925 12.6292 6.96769V7.99995C12.6292 8.0684 12.6564 8.13404 12.7048 8.18243C12.7532 8.23083 12.8188 8.25802 12.8873 8.25802H14.1776V8.77415H12.6292V9.29028H14.4357C14.5041 9.29028 14.5698 9.26309 14.6182 9.21469C14.6665 9.16629 14.6937 9.10065 14.6937 9.03221ZM4.11309 11.8709H2.56471C2.49626 11.8709 2.43062 11.8981 2.38223 11.9465C2.33383 11.9949 2.30664 12.0605 2.30664 12.129V14.1935C2.30664 14.2619 2.33383 14.3276 2.38223 14.376C2.43062 14.4244 2.49626 14.4516 2.56471 14.4516H4.11309C4.18154 14.4516 4.24717 14.4244 4.29557 14.376C4.34397 14.3276 4.37116 14.2619 4.37116 14.1935V13.1612C4.37116 13.0928 4.34397 13.0272 4.29557 12.9788C4.24717 12.9304 4.18154 12.9032 4.11309 12.9032H2.82277V12.387H3.85503V12.6451H4.37116V12.129C4.37116 12.0605 4.34397 11.9949 4.29557 11.9465C4.24717 11.8981 4.18154 11.8709 4.11309 11.8709ZM3.85503 13.4193V13.9354H2.82277V13.4193H3.85503ZM3.59696 6.70963H2.56471V7.22576H3.59696C3.66541 7.22576 3.73105 7.25295 3.77944 7.30134C3.82784 7.34974 3.85503 7.41538 3.85503 7.48382C3.85503 7.55227 3.82784 7.61791 3.77944 7.6663C3.73105 7.7147 3.66541 7.74189 3.59696 7.74189H3.08083C3.01239 7.74189 2.94675 7.76908 2.89836 7.81747C2.84996 7.86587 2.82277 7.93151 2.82277 7.99995C2.82277 8.0684 2.84996 8.13404 2.89836 8.18243C2.94675 8.23083 3.01239 8.25802 3.08083 8.25802H3.59696C3.66541 8.25802 3.73105 8.28521 3.77944 8.3336C3.82784 8.382 3.85503 8.44764 3.85503 8.51608C3.85503 8.58452 3.82784 8.65016 3.77944 8.69856C3.73105 8.74696 3.66541 8.77415 3.59696 8.77415H2.56471V9.29028H3.59696C4.02454 9.28998 4.37093 8.94311 4.37061 8.51553C4.37048 8.32529 4.3003 8.14176 4.17348 7.99995C4.45854 7.68124 4.43125 7.19182 4.11254 6.90676C3.97074 6.77993 3.78721 6.70976 3.59696 6.70963ZM7.726 8.25802H8.75825V9.29028H9.27438V8.25802H9.79051V7.74189H9.27438V6.70963H8.75825V7.74189H8.04083L8.23696 6.76124L7.73116 6.65802L7.47309 7.94834C7.46543 7.98584 7.46621 8.02457 7.47537 8.06173C7.48453 8.0989 7.50184 8.13355 7.52605 8.1632C7.55026 8.19284 7.58076 8.21673 7.61534 8.23313C7.64992 8.24953 7.68772 8.25803 7.726 8.25802ZM9.27438 11.8709H7.726C7.68513 11.871 7.64485 11.8807 7.60848 11.8993C7.57211 11.918 7.54069 11.945 7.5168 11.9781C7.49291 12.0113 7.47724 12.0497 7.47108 12.0901C7.46491 12.1305 7.46844 12.1718 7.48135 12.2105L7.73941 12.9847L8.22974 12.8216L8.08419 12.387H8.95258L8.50612 14.3956L9.01038 14.5076L9.52651 12.185C9.53491 12.1472 9.53471 12.1081 9.52595 12.0704C9.51718 12.0328 9.50006 11.9976 9.47585 11.9674C9.45165 11.9373 9.42097 11.9129 9.3861 11.8962C9.35123 11.8795 9.31305 11.8709 9.27438 11.8709ZM13.4034 14.4516H13.9195C14.3453 14.4534 14.6919 14.1099 14.6938 13.6841C14.6947 13.4908 14.6228 13.3041 14.4924 13.1612C14.7794 12.8467 14.757 12.3592 14.4424 12.0723C14.2996 11.942 14.1129 11.8701 13.9195 11.8709H13.4034C12.9777 11.869 12.6311 12.2126 12.6292 12.6383C12.6283 12.8317 12.7002 13.0184 12.8305 13.1612C12.5436 13.4758 12.566 13.9633 12.8805 14.2502C13.0234 14.3806 13.21 14.4524 13.4034 14.4516ZM13.9195 13.9354H13.4034C13.335 13.9354 13.2693 13.9082 13.2209 13.8599C13.1725 13.8115 13.1453 13.7458 13.1453 13.6774C13.1453 13.6089 13.1725 13.5433 13.2209 13.4949C13.2693 13.4465 13.335 13.4193 13.4034 13.4193H13.9195C13.988 13.4193 14.0536 13.4465 14.102 13.4949C14.1504 13.5433 14.1776 13.6089 14.1776 13.6774C14.1776 13.7458 14.1504 13.8115 14.102 13.8599C14.0536 13.9082 13.988 13.9354 13.9195 13.9354ZM13.4034 12.387H13.9195C13.988 12.387 14.0536 12.4142 14.102 12.4626C14.1504 12.511 14.1776 12.5767 14.1776 12.6451C14.1776 12.7136 14.1504 12.7792 14.102 12.8276C14.0536 12.876 13.988 12.9032 13.9195 12.9032H13.4034C13.335 12.9032 13.2693 12.876 13.2209 12.8276C13.1725 12.7792 13.1453 12.7136 13.1453 12.6451C13.1453 12.5767 13.1725 12.511 13.2209 12.4626C13.2693 12.4142 13.335 12.387 13.4034 12.387Z"
                        fill="#121212"
                      />
                    </svg>
                  </div>
                  {editable ? (
                    <p>Board Roll: {student?.student_board_roll}</p>
                  ) : (
                    <input
                      value={student?.student_board_roll}
                      className={` ${
                        editable ? "outline-none" : "outline-dashed"
                      }`}
                      onChange={(e: any) =>
                        setStudent({
                          ...student,
                          student_board_roll: e.target.value,
                        })
                      }
                      type="text"
                      placeholder=" Add board roll"
                    />
                  )}
                </div>

                <div className=" flex items-center gap-2 ">
                  <div>
                    <Image
                      src={"/icons/phone.svg"}
                      height={17}
                      width={16}
                      priority
                      alt="phone"
                    />
                  </div>
                  <input
                    value={student?.phone_number}
                    type="text"
                    disabled={editable}
                    onChange={(e: any) =>
                      setStudent({ ...student, phone_number: e.target.value })
                    }
                    className={` ${
                      editable
                        ? "bg-[#EDEEF1] outline-none"
                        : "bg-white outline-dashed"
                    }  `}
                  />
                </div>

                <Link
                  href={`/management/enrollment/${studentInfo?.id}`}
                  className=" bg-green text-center text-white text-[16px] rounded-[8px]"
                >
                  Enroll
                </Link>
                {/* <p>{studentInfo?.phone_number}</p> */}
              </div>
            </div>
            <div className=" w-full px-6">
              <StudentFilter
                refard={refardNumber}
                setRefard={setRefardNumber}
                stipend={stipend}
                setStipend={setStipend}
                studentResult={studentResult}
                setStudentResult={setStudentResult}
                guardian={guardian}
                setGuardian={setGuardian}
                editable={editable}
                selectedDream={selectedDream}
                setSelectedDream={setSelectedDream}
                studentDetails={studentInfo}
                student={student}
                setStudent={setStudent}
              />
            </div>
          </div>
        </div>
      </div>

      {enrollmentList.length > 0 && (
        <div className=" w-full">
          <p className=" text-white w-full text-[24px] font-semibold bg-green rounded-tl-[16px] rounded-tr-[16px] h-[52px] flex justify-center items-center ">
            Subscription History
          </p>
          <table className="w-full text-center text-[#121212]">
            <thead className=" bg-[#DBDDE2]">
              <tr className=" font-semibold text-[14px]">
                <th className=" px-1 py-2 text-[16px] font-semibold ">Id</th>
                <th className=" px-1 py-2 text-[16px] font-semibold ">Owner</th>
                <th className=" px-1 py-2 text-[16px] font-semibold ">
                  Category
                </th>

                <th className=" px-1 py-2 text-[16px] font-semibold ">
                  Package
                </th>
                <th className=" px-1 py-2 text-[16px] font-semibold ">plan</th>

                <th className=" px-1 py-2 text-[16px] font-semibold ">Paid</th>
                <th className=" px-1 py-2 text-[16px] font-semibold ">Due</th>
                <th className=" px-1 py-2 text-[16px] font-semibold ">Date</th>
              </tr>
            </thead>
            <tbody>
              {enrollmentList?.map((item: any, index: number) => (
                <tr key={index} className=" text-[14px] ">
                  <td className="border text-[10px] border-[#A6ABB7] px-1 py-2">
                    {item?.softmax_student_id}
                  </td>
                  <td className="border border-[#A6ABB7] px-1 py-2">
                    {item?.employee?.name}
                  </td>
                  <td className="border border-[#A6ABB7] px-1 py-2">
                    {item?.category?.category_name}
                  </td>

                  <td className="border border-[#A6ABB7] px-1 py-2">
                    {item?.package?.package_name}
                  </td>
                  <td className="border border-[#A6ABB7] px-1 py-2">
                    {item?.plan?.plan_name}
                  </td>
                  <td className="border border-[#A6ABB7] px-1 py-2">
                    {item?.payable_fee}
                  </td>
                  <td className="border border-[#A6ABB7] px-1 py-2">
                    {item?.course_fee - item?.payable_fee}
                  </td>
                  <td className="border border-[#A6ABB7] px-1 py-2">
                    {item?.created_at}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {allFollowUpList.length > 0 && (
        <div className=" w-full shadow-md rounded-[16px] transition-all ">
          <p className=" bg-green p-2 px-4 text-center text-white text-[24px] font-semibold rounded-tl-[16px]  rounded-tr-[16px] ">
            Follow Up List
          </p>
          <div className=" max-h-[400px] overflow-y-auto">
            <table className="w-full table-fixed text-center   text-[#121212]">
              <thead className=" sticky top-0 z-10 bg-gray text-white">
                <tr className="">
                  <th className=" px-4 py-2 text-[13px] font-semibold  ">
                    FollowUp
                  </th>
                  <th className=" px-4 py-2 text-[13px] font-semibold ">
                    Title
                  </th>
                  <th className=" px-4 py-2 text-[13px] font-semibold ">
                    Agent
                  </th>

                  <th className=" px-4 py-2 text-[13px] font-semibold ">
                    Payable
                  </th>

                  <th className=" px-4 py-2 text-[13px] font-semibold  ">
                    Product Name
                  </th>

                  <th className=" px-4 py-2 text-[13px] font-semibold  ">
                    Note
                  </th>
                  <th className=" px-4 py-2 text-[13px] font-semibold ">
                    Call type
                  </th>
                </tr>
              </thead>
              <tbody className=" bg-white text-[12px] ">
                {allFollowUpList?.map((item: any, index: any) => (
                  <tr
                    key={index}
                    className="border-b-[1px] border-b-[#A6ABB7] "
                  >
                    <td className=" px-4 py-2">{item?.follow_up_date}</td>
                    <td className=" px-4 py-2">{item?.product_title}</td>
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
      )}

      {supportList?.length > 0 && (
        <div className=" w-full">
          <div className=" text-white w-full bg-green rounded-tl-[16px] rounded-tr-[16px] h-[52px] flex  justify-center items-center px-[16px] ">
            <p className=" text-[24px] font-semibold text-center ">
              Support History
            </p>
            {/* <label htmlFor=""></label>
    <input
      id="calender"
      type="date"
      className=" text-black text-[13px] bg-none"
    /> */}
          </div>
          <table className="w-full text-center text-[#121212]">
            <thead className=" bg-[#DBDDE2]">
              <tr>
                <th className=" px-4 py-2 text-[16px] font-normal ">Subject</th>
                <th className=" px-4 py-2 text-[16px] font-normal ">Chapter</th>
                <th className=" px-4 py-2 text-[16px] font-normal ">
                  Support By
                </th>
                <th className=" px-4 py-2 text-[16px] font-normal ">Time</th>
                <th className=" px-4 py-2 text-[16px] font-normal ">Date</th>
              </tr>
            </thead>
            <tbody>
              {/* <tr className=" ">
        <td className=" px-4 py-2">Bangla 1st</td>
        <td className=" px-4 py-2">4th</td>
        <td className=" px-4 py-2">Kaes Mahmud</td>
        <td className=" px-4 py-2">30 min</td>
        <td className=" px-4 py-2">02-11-2024</td>
      </tr> */}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Page;
