"use client";
import { EndPoint } from "@/utils/api";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import Department from "@/components/sales/Department";
import { toast } from "react-toastify";
import {
  redirect,
  useParams,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { AuthContext } from "../ContextProvider";
import CustomModal from "../CustomModal";
import FollowUpForm from "./FollowUpForm";

type Props = { phone?: any };
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

const StudentForm = ({ phone }: Props) => {
  const router = useRouter();
  const params = useSearchParams();
  const { user } = useContext(AuthContext);
  const [isCheck, setIsCheck] = useState(false);
  const [semesterCheck, setSemesterCheck] = useState(1);
  const [sessionList, setSessionList] = useState<any>([]);
  const [allDepartment, setAllDepartment] = useState([]);
  const [instituteList, setInstituteList] = useState<any>([]);
  const [dummyNumber, setDummyNumber] = useState(params.get("phone") || "");
  const [emptyCheck, setEmptyCheck] = useState(false);
  const [instituteType, setInstituteType] = useState<any>("");

  const [student, setStudent] = useState<any>({
    name: "",
    phone_number: params.get("phone") || "",
    second_phone_number: null,
    email: null,
    student_board_roll: null,
    source_type: null,
    is_stippend: false,
    number_of_refferds: 0,
    current_semester: null,
    secondary_education: "SSC",
    secondary_gpa: 0,
    student_type: null,
    dream: null,
    shift: null,
    polytechnic: null,
    department: null,
    session: null,
    general_passing_year: null,
  });

  const getDepartmentList = async () => {
    if (student?.polytechnic) {
      const dData = await axios.get(
        EndPoint.SEARCH_DEPARTMENT_BY_POLYTECHNIC + student?.polytechnic,
        { params: { limit: 400 } }
      );
      const dResult = await dData.data;

      setAllDepartment(dResult?.departments);
    }
  };

  const getInstituteList = async () => {
    if (instituteType !== "") {
      const dData = await axios.get(EndPoint.GET_DROPDOWN_POLYTECHNIC, {
        params: {
          polytechnic_type: instituteType?.value,
          limit: 1000,
        },
      });
      const dResult = await dData.data;
      setInstituteList(dResult?.results);
    }
  };

  const getSessionList = async () => {
    const dData = await axios.get(EndPoint.GET_DROPDOWN_SESSION, {
      params: { limit: 200 },
    });
    const dResult = await dData.data;
    setSessionList(dResult?.results);
  };

  function handleCheck(index: any) {
    setSemesterCheck(index);
  }
  const [isFollowUp, setIsFollowUp] = useState(false);

  async function handleSubmit() {
    if (student.name !== "" && student.phone_number !== "") {
      try {
        const bodyData = {
          name: student?.name,
          phone_number: student?.phone_number,
          second_phone_number: student?.second_phone_number,
          email: student?.email,
          student_board_roll: student?.student_board_roll,
          source_type: student?.source_type,
          is_stippend: student?.is_stippend,
          number_of_refferds: student?.number_of_refferds,
          current_semester:
            student?.student_type === "Polytechnic"
              ? student?.current_semester
              : null,
          secondary_education: student?.secondary_education,
          secondary_gpa: student?.secondary_gpa,
          student_type: student?.student_type,
          dream: student?.dream,
          shift:
            student?.student_type === "Polytechnic" ? student?.shift : null,
          polytechnic:
            student?.student_type === "Polytechnic"
              ? student?.polytechnic
              : null,
          department:
            student?.student_type === "Polytechnic"
              ? student?.department
              : null,
          session: student?.session,
          general_passing_year: student?.general_passing_year || null,
        };
        const res = await axios.post(EndPoint.ADD_STUDENT, bodyData, {
          headers: { Authorization: "Bearer " + user?.access_token },
        });
        setStudent({
          name: null,
          phone_number: null,
          second_phone_number: null,
          email: null,
          student_board_roll: null,
          is_stippend: false,
          number_of_refferds: 0,
          current_semester: null,
          secondary_education: "SSC",
          secondary_gpa: 0,
          student_type: null,
          source_type: null,
          dream: null,
          shift: null,
          polytechnic: null,
          department: null,
          session: null,
        });
        toast.success("Student is added.");

        router.push("/management/student/list/all");
      } catch (error: any) {
        if (error?.response) {
          toast.error(Object.values(error.response.data).join(""));
        } else {
          toast.error("An unexpected error occurred.");
        }
      }
    } else {
      setEmptyCheck(true);
    }
  }

  async function handleSubmitWithFollowUp() {
    if (student.name !== "" && student.phone_number !== "") {
      //   const res = await axios.post(EndPoint.ADD_STUDENT, student, {
      //     headers: { Authorization: "Bearer " + user?.token },
      //   });
      //   setStudent({
      //     name: "",
      //     second_phone_number: "",
      //     email: "",
      //     student_board_roll: null,
      //     is_stippend: false,
      //     number_of_refferds: 0,
      //     current_semester: semesterCheck,
      //     secondary_education: "SSC",
      //     secondary_gpa: 0,
      //     student_type: "",
      //     dream: null,
      //     shift: null,
      //     polytechnic: null,
      //     department: null,
      //     session: null,
      //   });
      //   toast.success("Student is added.");
      // } else {
      //   toast.error("Student is not added.");
      // }
      try {
        const bodyData = {
          name: student?.name,
          phone_number: student?.phone_number,
          second_phone_number: student?.second_phone_number,
          email: student?.email,
          student_board_roll: student?.student_board_roll,
          source_type: student?.source_type,
          is_stippend: student?.is_stippend,
          number_of_refferds: student?.number_of_refferds,
          current_semester:
            student?.student_type === "Polytechnic"
              ? student?.current_semester
              : null,
          secondary_education: student?.secondary_education,
          secondary_gpa: student?.secondary_gpa,
          student_type: student?.student_type,
          dream: student?.dream,
          shift:
            student?.student_type === "Polytechnic" ? student?.shift : null,
          polytechnic:
            student?.student_type === "Polytechnic"
              ? student?.polytechnic
              : null,
          department:
            student?.student_type === "Polytechnic"
              ? student?.department
              : null,
          session: student?.session,
          general_passing_year: student?.general_passing_year || null,
        };
        const res = await axios.post(EndPoint.ADD_STUDENT, bodyData, {
          headers: { Authorization: "Bearer " + user?.access_token },
        });
        const resResult = await res.data;
        setIsFollowUp(true);
        setStudent({
          name: null,
          phone_number: null,
          second_phone_number: null,
          email: null,
          source_type: null,
          student_board_roll: null,
          is_stippend: false,
          number_of_refferds: 0,
          current_semester: null,
          secondary_education: "SSC",
          secondary_gpa: 0,
          student_type: null,
          dream: null,
          shift: null,
          polytechnic: null,
          department: null,
          session: null,
        });
      } catch (error: any) {
        if (error?.response) {
          toast.error(Object.values(error.response.data).join(""));
        } else {
          toast.error("An unexpected error occurred.");
        }
        setIsFollowUp(false);
      }
    } else {
      setEmptyCheck(true);
    }
  }

  useEffect(() => {
    getInstituteList();
  }, [instituteType]);

  useEffect(() => {
    getDepartmentList();
  }, [student.polytechnic]);

  useEffect(() => {
    getSessionList();
  }, []);

  return (
    <div className="  shadow-md border-[1px] bg-gray_light border-gray_light rounded-[16px] p-[24px]">
      <p className=" text-[25px]  font-semibold pb-[24px]">Add Student</p>

      <div className=" flex flex-col gap-[12px] text-[16px]">
        <div className=" w-full  cursor-pointer">
          <Select
            onChange={(e: any) =>
              setStudent({ ...student, student_type: e.value })
            }
            maxMenuHeight={200}
            options={[
              {
                label: "Polytechnic",
                value: "Polytechnic",
              },
              {
                label: "School",
                value: "School",
              },
              {
                label: "College",
                value: "College",
              },
              {
                label: "Vocational School",
                value: "Vocational School",
              },
              {
                label: "Technical College",
                value: "Technical College",
              },
            ]}
            className=" w-full  text-[16px] cursor-pointer"
            placeholder="Select type"
          />
        </div>
        <div className=" w-full  cursor-pointer">
          <Select
            onChange={(e: any) =>
              setStudent({ ...student, source_type: e.value })
            }
            maxMenuHeight={200}
            options={[
              { value: "Facebook", label: "Facebook" },
              { value: "WhatsApp", label: "WhatsApp" },
              { value: "App", label: "App" },
              { value: "YouTube", label: "YouTube" },
              { value: "Reference", label: "Reference" },
              { value: "Campus Visit", label: "Campus Visit" },
              { value: "Website", label: "Website" },
              { value: "Instagram", label: "Instagram" },
              { value: "Telegram", label: "Telegram" },
              { value: "Gmail", label: "Gmail" },
              { value: "Others", label: "Others" },
            ]}
            className=" w-full  text-[16px] cursor-pointer"
            placeholder="Select source"
          />
        </div>
        <input
          value={student.name}
          onChange={(e) => setStudent({ ...student, name: e.target.value })}
          type="text"
          placeholder="Name"
          className={` ${
            emptyCheck && student?.name === "" ? "border-red border-[2px]" : ""
          } px-[8px] c h-[40px] outline-none rounded-[8px] text-black`}
        />
        <input
          value={student.phone_number}
          onChange={(e) => {
            setStudent({ ...student, phone_number: e.target.value });
            setDummyNumber(e.target.value);
          }}
          type="text"
          placeholder="Contact number"
          className={`${
            emptyCheck && student?.phone_number === ""
              ? "border-red border-[2px]"
              : ""
          } px-[8px] h-[40px] shadow-md outline-none rounded-[8px] text-black `}
        />
        <input
          value={student.second_phone_number}
          onChange={(e) =>
            setStudent({ ...student, second_phone_number: e.target.value })
          }
          type="text"
          placeholder="Second contact number"
          className=" px-[8px] h-[40px] shadow-md outline-none rounded-[8px] text-black"
        />{" "}
        <input
          value={student.email}
          onChange={(e) => setStudent({ ...student, email: e.target.value })}
          type="text"
          placeholder="E-mail Address"
          className=" px-[8px] shadow-md h-[40px] outline-none rounded-[8px] text-black"
        />{" "}
        <input
          value={student.student_board_roll}
          onChange={(e: any) =>
            setStudent({ ...student, student_board_roll: e.target.value })
          }
          type="number"
          placeholder="Board Roll"
          className=" px-[8px] h-[40px] shadow-md outline-none rounded-[8px] text-black"
        />
        {student?.student_type !== "Polytechnic" && (
          <input
            value={student.general_passing_year}
            onChange={(e: any) =>
              setStudent({
                ...student,
                general_passing_year: e.target.value,
              })
            }
            type="number"
            placeholder="Passing year"
            className=" px-[8px] h-[40px] shadow-md outline-none rounded-[8px] text-black"
          />
        )}
        {student?.student_type === "Polytechnic" && (
          <>
            <div className=" w-full flex flex-col md:flex-row gap-2">
              <div className=" w-full flex-1 cursor-pointer">
                <Select
                  isClearable
                  value={instituteType}
                  options={[
                    {
                      value: "GOVT",
                      label: "GOVT",
                    },
                    {
                      value: "PRIVATE",
                      label: "PRIVATE",
                    },
                    {
                      value: "TEXTILE",
                      label: "TEXTILE",
                    },
                  ]}
                  onChange={(e: any) => {
                    setInstituteType(e);
                    setStudent({ ...student, polytechnic: null });
                    setStudent({ ...student, department: null });
                  }}
                  placeholder="Polytechnic type..."
                  className=" w-[250px] text-[16px]  text-black cursor-pointer"
                />
              </div>
              <div className=" w-full flex-auto  cursor-pointer">
                <Select
                  onChange={(e: any) =>
                    setStudent({ ...student, polytechnic: e.value })
                  }
                  maxMenuHeight={150}
                  options={instituteList}
                  className=" w-full  text-[16px] cursor-pointer"
                  placeholder="Select Polytechnic"
                />
              </div>
            </div>

            <div className=" flex items-center gap-[16px] justify-between">
              <div className=" w-full  cursor-pointer">
                <Select
                  onChange={(e: any) =>
                    setStudent({ ...student, department: e.value })
                  }
                  options={allDepartment || []}
                  maxMenuHeight={150}
                  className=" w-full  text-[16px] cursor-pointer"
                  placeholder="Select Department"
                />
              </div>

              <div className=" w-full  cursor-pointer">
                <Select
                  onChange={(e: any) =>
                    setStudent({ ...student, session: e.value })
                  }
                  options={sessionList}
                  maxMenuHeight={150}
                  className=" w-full  text-[16px] cursor-pointer"
                  placeholder="Select Session"
                />
              </div>
              <input
                value={student.general_passing_year}
                onChange={(e: any) =>
                  setStudent({
                    ...student,
                    current_semester: e.target.value,
                  })
                }
                type="number"
                placeholder="Semester"
                className=" px-[8px] h-[34px] shadow-md outline-none rounded-[8px] text-black"
              />
            </div>

            {/* <div className=" flex items-center gap-[24px]">
              <p className=" text-[16px] ">Semester:</p>

              {allSemester.map((semester: any, index) => (
                <div key={index} className="flex items-center gap-1">
                  <div
                    className={`h-4 w-4 rounded-full border-2 border-white cursor-pointer ${
                      semesterCheck === semester.value ? "bg-orange" : ""
                    }`}
                    onClick={() => {
                      handleCheck(semester.value);
                    }}
                  ></div>
                  <p className="text-lg ">{semester.label}</p>
                </div>
              ))}
            </div> */}
          </>
        )}
        <div className=" grid grid-cols-2 gap-8">
          <button
            disabled={student?.phone_number === ""}
            onClick={() => handleSubmit()}
            className={` ${
              student?.phone_number === "" && "bg-title/40"
            } h-[32px] bg-title w-full text-white flex items-center justify-center  rounded-[8px]`}
          >
            Register
          </button>
          <button
            disabled={student?.phone_number === ""}
            onClick={() => {
              handleSubmitWithFollowUp();
            }}
            className={` ${
              student?.phone_number === "" && "bg-title/40"
            } h-[32px] bg-title w-full text-white flex items-center justify-center  rounded-[8px]`}
          >
            Register & Follow Up
          </button>
        </div>
      </div>
      {isFollowUp && (
        <CustomModal setClose={() => setIsFollowUp(false)}>
          <div className=" max-w-[1100px]">
            <FollowUpForm studentId={dummyNumber} />
          </div>
        </CustomModal>
      )}
    </div>
  );
};

export default StudentForm;
