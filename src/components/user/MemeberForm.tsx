"use client";
import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import Image from "next/image";
import axios from "axios";
import { EndPoint } from "@/utils/api";
import { toast } from "react-toastify";
import { AuthContext } from "../ContextProvider";
import { roleList } from "@/utils/staticData";

type Props = {
  modalHide: any;
  getAll: any;
};

type user = {
  name: string;
  email: string;
  password: string;
  role: string;
  phone_number: string;
};

const options = [
  { value: "admin", label: "Admin" },
  { value: "user", label: "User" },
  { value: "member", label: "Member" },
  { value: "teacher", label: "Teacher" },
];

const fileToBase64 = (file: any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const MemeberForm = ({ modalHide, getAll }: Props) => {
  const [showVisible, setShowVisible] = useState(false);
  const { user } = useContext(AuthContext);
  const [departmentInput, setDepartmentInput] = useState("");
  const [departmentList, setDepartmentList] = useState([]);

  const [subjectInput, setSubjectInput] = useState("");
  const [subjectList, setSubjectList] = useState([]);
  const [teacherCategoryId, setTeacherCategoryId] = useState<any>(null);

  const [userData, setUserData] = useState<any>({
    email: "",
    name: "",
    password: "",
    phone_number: "",
    role: "",
    join_date: "2024-05-11",
    end_date: null,
    status: true,
    designation: "",
  });

  const [userDepartment, setUserDepartment] = useState<any>(null);
  const [userSubject, setUserSubject] = useState<any>([]);
  const [categoryList, setCategoryList] = useState<any>([]);

  const [file, setFile] = useState<any>("");
  const handleChange = (e: any) => {
    setFile(e.target.files[0]);
  };
  const getCategoryList = async () => {
    const res = await axios.get(EndPoint.SUPPORT_CATEGORY);
    const result = await res.data;

    setCategoryList(result?.results);
  };
  const handleRegister = async () => {
    const isFormValid = () => {
      const { name, email, password, role, phone_number } = userData;
      return name && email && password && role && phone_number;
    };

    const getSubjectIds = () => {
      // return userSubject?.map((item: any) => parseInt(item.value));
      const arrayList = userSubject?.map((item: any) => parseInt(item.value));
      return arrayList.join(",");
    };

    const createSupportTeacherFormData = () => {
      const formData = new FormData();
      if (file !== "") {
        formData.append("name", userData.name);
        formData.append("phone_number", userData.phone_number);
        formData.append("email", userData.email);
        formData.append("role", userData.role);
        formData.append("category", teacherCategoryId.value);
        formData.append("subjects", getSubjectIds()); // Convert array to JSON string
        formData.append("image", file);
        formData.append("password", userData.password);
        formData.append("department", userDepartment?.value);
      } else {
        formData.append("name", userData.name);
        formData.append("phone_number", userData.phone_number);
        formData.append("email", userData.email);
        formData.append("role", userData.role);
        formData.append("category", teacherCategoryId.value);
        formData.append("subjects", getSubjectIds()); // Convert array to JSON string
        formData.append("password", userData.password);
        formData.append("department", userDepartment?.value);
      }
      return formData;
    };

    const handleError = (error: any) => {
      if (error?.response) {
        toast.error(Object.values(error.response.data).join(""));
      } else {
        toast.error("An unexpected error occurred.");
      }
    };

    if (isFormValid()) {
      let supportTeacherPromise = Promise.resolve();
      if (userData?.role === 2) {
        const formData = createSupportTeacherFormData();
        supportTeacherPromise = axios.post(
          EndPoint.SECOND_DATABASE_TEACHER_ADD,
          formData
        );
      }

      const registerUserPromise = axios.post(EndPoint.SIGNUP_API, userData, {
        headers: { Authorization: "Bearer " + user.access_token },
      });

      try {
        const [supportTeacherResponse, registerUserResponse] =
          await Promise.all([supportTeacherPromise, registerUserPromise]);

        getAll();
        modalHide(false);
        toast.success("User registration is successful.");
      } catch (errors) {
        if (Array.isArray(errors)) {
          errors.forEach(handleError);
        } else {
          handleError(errors);
        }
      }
    } else {
      toast.error("Please fill in all required fields.");
    }
  };

  const departmentFilter = async () => {
    if (teacherCategoryId) {
      const res = await axios.get(
        EndPoint.GET_ALL_DEPARTMENT_LIST +
          `?name=${departmentInput}&category=${teacherCategoryId?.value}`
      );
      const result = await res.data;
      setDepartmentList(result?.results);
    }
  };

  const subjectFilter = async () => {
    if (teacherCategoryId) {
      const res = await axios.get(
        EndPoint.GET_ALL_SUBJECT_LIST +
          `?name=${subjectInput}&category=${teacherCategoryId?.value}`
      );
      const result = await res.data;
      setSubjectList(result?.results);
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

  return (
    <div className="  w-[558px] bg-gray_light rounded-[16px] p-[24px]">
      <p className=" text-[25px] pb-[24px]">Add Member</p>

      <div className=" relative mb-[16px] w-full border-[1px] border-dashed rounded-[8px] border-white flex flex-col justify-center items-center p-[16px] ">
        {file !== "" && (
          <div
            onClick={() => setFile("")}
            className=" absolute top-2 right-[8px]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-4 h-4 stroke-2 cursor-pointer"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </div>
        )}
        <label htmlFor="imageUpload" className=" ">
          <Image
            src={
              file !== ""
                ? URL.createObjectURL(file)
                : "/icons/image-upload.svg"
            }
            height={30}
            width={60}
            alt=""
          />
        </label>
        <input
          onChange={handleChange}
          accept="image/*	"
          type="file"
          id="imageUpload"
          className=" hidden"
        />
        <p className=" text-[12px]">{file?.name}</p>
      </div>

      <div className=" w-full flex flex-col gap-[20px] text-[16px]">
        <div className=" w-full h-[28px] cursor-pointer">
          <Select
            onChange={(data: any) =>
              setUserData({ ...userData, role: data.value })
            }
            options={roleList}
            className=" w-full h-[28px] cursor-pointer"
            placeholder="Select user role..."
          />
        </div>
        {userData?.role === 2 && (
          <div className=" w-full  cursor-pointer">
            <Select
              onChange={(data: any) => setTeacherCategoryId(data)}
              options={categoryList}
              isClearable
              className=" w-full text-[16px] cursor-pointer"
              placeholder="Select category..."
            />
          </div>
        )}
        {teacherCategoryId && (
          <div className=" w-full h-[28px] cursor-pointer">
            <Select
              onInputChange={(e) => setDepartmentInput(e)}
              onChange={(data: any) => setUserDepartment(data)}
              isClearable
              options={departmentList}
              className=" w-full h-[28px] cursor-pointer"
              placeholder="Select department..."
            />
          </div>
        )}

        {teacherCategoryId && (
          <div className=" w-full  cursor-pointer">
            <Select
              onInputChange={(e) => setSubjectInput(e)}
              onChange={(data: any) => setUserSubject(data)}
              isMulti
              options={subjectList}
              className=" w-full text-[16px] cursor-pointer"
              placeholder="Select subject..."
            />
          </div>
        )}

        <input
          type="text"
          value={userData.name}
          className=" w-full px-[24px] outline-none rounded-[8px] h-[32px] bg-white "
          placeholder="Name"
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
        />
        <input
          type="email"
          className=" w-full px-[24px] outline-none rounded-[8px] h-[32px] bg-white "
          placeholder="E-mail Address"
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        />
        <input
          type="text"
          value={userData.phone_number}
          className=" w-full px-[24px] outline-none rounded-[8px] h-[32px] bg-white "
          placeholder="Contact Number"
          onChange={(e) =>
            setUserData({ ...userData, phone_number: e.target.value })
          }
        />

        <div className=" relative w-full h-[32px] border-[1px] bg-white border-black rounded-[8px] px-[24px] flex items-center justify-center ">
          <input
            type={showVisible ? "text" : "password"}
            className=" w-full h-full text-input_text outline-none text-[16px] caret-orange "
            value={userData.password}
            name={"password"}
            placeholder={"Enter password"}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
          />

          <div onClick={() => setShowVisible(!showVisible)}>
            <Image
              src={"/icons/invisible.svg"}
              height={24}
              width={24}
              alt="imgInvisible"
              className=" cursor-pointer"
            />
          </div>
        </div>

        <button
          onClick={() => handleRegister()}
          className=" bg-orange text-white rounded-[8px] h-[32px]"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default MemeberForm;
