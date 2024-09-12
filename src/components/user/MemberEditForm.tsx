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
import Select from "react-select";
import { toast } from "react-toastify";
import { AuthContext } from "../ContextProvider";
import { customStyles, roleList } from "@/utils/staticData";

type Props = {
  employeeId: any;
  modalHide: any;
  getAll: any;
  userNumber?: any;
};
// const options = [
//   {
//     label: "MARKETER",
//     value: "MARKETER",
//   },
//   {
//     label: "CONTENT WRITER",
//     value: "CONTENT WRITER",
//   },
//   {
//     label: "SUPPORT TEACHER",
//     value: "SUPPORT TEACHER",
//   },
//   {
//     label: "VIDEO EDITOR",
//     value: "VIDEO EDITOR",
//   },
//   {
//     label: "COMPUTER OPERATOR",
//     value: "COMPUTER OPERATOR",
//   },
//   {
//     label: "SOFTWARE ENGINEER",
//     value: "SOFTWARE ENGINEER",
//   },
// ];

const MemberEditForm = ({
  employeeId,
  modalHide,
  getAll,
  userNumber,
}: Props) => {
  const { user } = useContext(AuthContext);
  const [employeeData, setEmployeeData] = useState<any>({
    name: "",
    email: "",
    phone_number: "",
    role: "",
    designation: "",
    join_date: null,
    end_date: null,
    status: false,
  });
  const [userId, setUserId] = useState<any>("");
  const [secondDataBaseTeaher, setSecondDataBaseTeacher] = useState<any>({
    name: "",
    phone_number: "",
    email: "",
    status: true,
    department: 13,
    subjects: [12],
  });
  const [departmentInput, setDepartmentInput] = useState("");
  const [userDepartment, setUserDepartment] = useState<any>(null);
  const [subjectInput, setSubjectInput] = useState("");
  const [departmentList, setDepartmentList] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [selectAllSubject, setSelectAllSubject] = useState("");
  const [userSubject, setUserSubject] = useState<any>([]);
  const [categoryList, setCategoryList] = useState<any>([]);
  const [teacherSubjectId, setTeacherSubjectId] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<any>("");
  const [selectedDepartment, setSelectedDepartment] = useState<any>("");
  const [selectedSubject, setSelectedSubject] = useState<any>("");
  const [responseCheck, setResponseCheck] = useState(0);

  const [secondEmployeeData, setSecondEmployeeData] = useState<any>({
    subjects: "",
    department: "",
    category: "",
  });

  const departmentFilter = async () => {
    if (departmentInput !== "") {
      if (teacherSubjectId) {
        const res = await axios.get(
          EndPoint.GET_ALL_DEPARTMENT_LIST +
            `?name=${departmentInput}&category=${teacherSubjectId?.value}`
        );
        const result = await res.data;
        setDepartmentList(result?.results);
      }
    }
  };

  const getCategoryList = async () => {
    const res = await axios.get(EndPoint.CATEGORY_LIST_DROPDOWN);
    const result = await res.data;
    setCategoryList(result?.results);
  };

  const subjectFilter = async () => {
    if (subjectInput !== "" || selectAllSubject !== "") {
      if (teacherSubjectId) {
        const res = await axios.get(
          EndPoint.GET_ALL_SUBJECT_LIST +
            `?name=${subjectInput}&category=${teacherSubjectId?.value}&options=${selectAllSubject}`
        );
        const result = await res.data;
        setSubjectList(result?.results);
      }
    }
  };

  const userInfo = async () => {
    if (employeeId) {
      try {
        // Fetch employee data
        const { data: resData } = await axios.get(
          EndPoint.EMPLOYEE_DATAILS + employeeId
        );

        // Set employee data
        setEmployeeData({
          name: resData.name,
          email: resData.email,
          phone_number: resData.phone_number,
          role: resData.role,
          designation: resData.designation,
          join_date: resData.join_date,
          end_date: resData.end_date,
          status: resData.status,
        });

        if (resData.role === 2) {
          // Fetch additional data for role 2
          const { data: resData2 } = await axios.get(
            EndPoint.SECOND_DATABASE_TEACHER_GET,
            {
              params: {
                phone_number: userNumber,
              },
            }
          );

          const teacherData = resData2?.results[0];
          if (teacherData) {
            // Set additional data for role 2
            setUserId(teacherData.id);
            setSelectedCategory(teacherData.category);
            setSelectedDepartment(teacherData.department);
            setSelectedSubject(teacherData.subjects);
            setTeacherSubjectId(teacherData.category);
          }
        }
      } catch (error) {
        console.error("Error fetching user information:", error);
        // Optionally set an error state here
      }
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.patch(
        EndPoint.EMPLOYEE_DATAILS + employeeId,
        employeeData
      );

      getAll();
      toast.success("Employee data is updated.");

      modalHide(false);
      setEmployeeData({
        name: "",
        email: "",
        phone_number: "",
        role: "",
        designation: "",
        join_date: "",
        end_date: null || "",
        status: false,
      });
      const bodyData = {
        name: employeeData?.name,
        phone_number: employeeData?.phone_number,
        email: employeeData?.email,
        status: employeeData?.status,
        department: selectedDepartment?.value,
        subjects: selectedSubject?.map((item: any) => item.value),
        category: selectedCategory?.value,
      };

      const res2 = await axios.patch(
        EndPoint.SUPPORT_TEACHER_UPDATE + userId + "/",
        bodyData
      );
    } catch (error: any) {
      if (error?.response) {
        toast.error(Object.values(error.response.data).join(""));
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  useEffect(() => {
    departmentFilter();
  }, [departmentInput]);

  useEffect(() => {
    subjectFilter();
  }, [subjectInput]);
  useEffect(() => {
    getCategoryList();
  }, []);
  useEffect(() => {
    userInfo();
  }, [employeeId]);

  return (
    <div className=" w-[800px] bg-green px-[16px] max-h-[600px] py-[16px] rounded-[16px] overflow-auto">
      <div className=" grid grid-cols-2 gap-[16px]">
        <div className=" flex flex-col gap-[4px] text-[16px] ">
          <p className=" text-left text-white">Name:</p>
          <input
            value={employeeData.name}
            onChange={(e) =>
              setEmployeeData({ ...employeeData, name: e.target.value })
            }
            type="text"
            placeholder="Name"
            className=" px-[8px] rounded-[8px]"
          />
        </div>
        <div className=" flex flex-col gap-[4px] text-[16px] ">
          <p className=" text-left text-white">Email:</p>
          <input
            value={employeeData.email}
            onChange={(e) =>
              setEmployeeData({ ...employeeData, email: e.target.value })
            }
            type="email"
            placeholder="E-mail"
            className=" px-[8px] rounded-[8px]"
          />
        </div>

        <div className=" flex flex-col gap-[4px]">
          <p className=" text-left text-white">Category</p>
          <div className=" w-full  cursor-pointer">
            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e)}
              options={categoryList}
              isClearable
              className=" w-full text-[16px] cursor-pointer"
              placeholder="Select category..."
            />
          </div>
        </div>
        <div className=" flex flex-col gap-[4px]">
          <p className=" text-left text-white">Department</p>
          <div className=" w-full  cursor-pointer">
            <Select
              value={selectedDepartment}
              options={departmentList}
              onInputChange={(e) => setDepartmentInput(e)}
              onChange={(data: any) => setSelectedDepartment(data)}
              maxMenuHeight={200}
              isClearable
              className=" w-full text-[16px] cursor-pointer"
              placeholder="Select department..."
            />
          </div>
        </div>
        <div className=" col-span-2">
          <div className=" flex  flex-col gap-[4px]">
            <p className=" text-left text-white">Subject</p>
            <div className=" w-full  cursor-pointer">
              <Select
                options={subjectList}
                value={selectedSubject}
                onInputChange={(data: any) => setSubjectInput(data)}
                onChange={(data: any) => setSelectedSubject(data)}
                maxMenuHeight={200}
                isMulti
                className=" w-full text-[16px] cursor-pointer"
                placeholder="Select subject..."
              />
            </div>
            {/* <div className=" flex gap-[4px]">
            <input
              onChange={(e) => console.log(e.target.value)}
              type="checkbox"
              id="all"
              name="All"
              value="all"
            />
            <label htmlFor="all" className=" text-white">
              All Select
            </label>
          </div> */}
          </div>
        </div>

        <div className=" flex flex-col gap-[4px] text-[16px] ">
          <p className=" text-left  text-white">Join Date:</p>
          <input
            value={employeeData.join_date}
            onChange={(e) =>
              setEmployeeData({ ...employeeData, join_date: e.target.value })
            }
            type="date"
            placeholder="Join date"
            className=" px-[8px] rounded-[8px] text-black"
          />
        </div>
        <div className=" flex flex-col gap-[4px] text-[16px] ">
          <p className=" text-left text-white">End Date:</p>
          <input
            value={employeeData.end_date}
            onChange={(e) =>
              setEmployeeData({ ...employeeData, end_date: e.target.value })
            }
            type="date"
            placeholder="Name"
            className=" px-[8px] rounded-[8px] text-black"
          />
        </div>

        <div className=" flex flex-col gap-[4px]">
          <p className=" text-left text-white ">Assign Role:</p>
          <div className=" w-full  cursor-pointer">
            {employeeData.role && (
              <Select
                // defaultValue={{
                //   label: employeeData.role,
                //   value: employeeData.role,
                // }}
                onChange={(e: any) =>
                  setEmployeeData({ ...employeeData, role: e.value })
                }
                options={roleList}
                className=" w-full text-[16px] cursor-pointer"
                placeholder={employeeData.role}
              />
            )}
          </div>
        </div>

        <div className=" flex flex-col gap-[4px] text-[13px] ">
          <p className=" text-left text-white">Assign Position:</p>
          <input
            value={employeeData.designation}
            onChange={(e) =>
              setEmployeeData({ ...employeeData, designation: e.target.value })
            }
            type="text"
            placeholder="Enter user position.."
            className=" px-[8px] rounded-[8px] outline-none text-[16px] h-[32px]"
          />
        </div>

        {/* <div className=" flex flex-col gap-[4px]">
          <p className=" text-left text-white ">Assign Marketer:</p>
          <div className=" w-full cursor-pointer">
            <Select
              defaultValue={selectedOption}
              onChange={(e) => setSelectedOption(e)}
              options={options}
              className=" w-full  text-[16px] cursor-pointer"
              placeholder="--Select--"
            />
          </div>
        </div> */}
        {
          <div className=" flex flex-col gap-[4px]">
            <p className=" text-left text-white ">Status:</p>
            <div className=" w-full cursor-pointer">
              <Select
                onChange={(e: any) =>
                  setEmployeeData({ ...employeeData, status: e.value })
                }
                options={[
                  {
                    value: true,
                    label: "Active",
                  },
                  {
                    value: false,
                    label: "Inactive",
                  },
                ]}
                className=" w-full text-[16px] h-[40px] text-black cursor-pointer"
                placeholder={employeeData?.status ? "Active" : "Inactive"}
              />
            </div>
          </div>
        }
        <div></div>
        <div></div>
        <div className=" text-right">
          <button
            onClick={() => handleUpdate()}
            className=" h-[28px] w-[100px] bg-orange rounded-[8px] text-white "
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(MemberEditForm);
