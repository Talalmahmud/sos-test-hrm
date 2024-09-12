import { AuthContext } from "@/components/ContextProvider";
import { EndPoint } from "@/utils/api";
import axios from "axios";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";

type Props = { formClose: any; book_id?: any; listUpdate?: any };
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

const customStyles = {
  control: (provided: any) => ({
    ...provided,
    backgroundColor: "white", // Set background color of the control to green
    color: "black", // Set text color to white
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: "white", // Set background color of the menu to green
    color: "black", // Ensure text color is white for contrast
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "orange"
      : state.isFocused
      ? "darkorange"
      : "white", // Different shades of green for different states
    color: "black", // Set text color to white
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: "black", // Set the color of the selected value text to white
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: "black", // Set placeholder text color to white
  }),
};
const BookForm = ({ formClose, book_id, listUpdate }: Props) => {
  const { user } = useContext(AuthContext);
  const [file, setFile] = useState<any>("");
  const [emptyCheck, setEmptyCheck] = useState(false);

  const [categoryList, setCategoryList] = useState<any>([]);
  const [departmentList, setDepartmentList] = useState<any>([]);

  const [bookInfo, setBookInfo] = useState<any>({
    book_name: "",
    category: "",
    department: null,
    semester: 1,
    price: null,
    discount: null,
    quantity: null,
  });

  const getAllDepartment = async () => {
    const res = await axios.get(EndPoint.GET_DROPDOWN_DEPARTMENT);
    const resData = await res.data;
    setDepartmentList(resData?.results);
  };

  const getCategory = async () => {
    const res = await axios.get(EndPoint.GET_DROPDOWN_CATAGORY);
    const result = await res.data;

    setCategoryList(result?.results);
  };

  const getBookInfo = async () => {
    if (book_id) {
      const res = await axios.get(EndPoint.BOOK_BY_ID + book_id);
      const result = await res.data;
      setBookInfo(result);
    }
  };

  const fileUpload = (e: any) => {
    setFile(e.target.files[0]);
  };

  function handleCheck(index: any) {
    setBookInfo({ ...bookInfo, semester: index });
  }

  const handleSubmit = async () => {
    if (
      (bookInfo?.name !== "",
      bookInfo?.price !== null && bookInfo?.quantity !== null)
    ) {
      try {
        // Make the API call to add a book
        const res = await axios.post(EndPoint.ADD_BOOK, {
          book_name: bookInfo?.book_name,
          category: bookInfo?.category?.value,
          department: bookInfo?.department?.value,
          semester: bookInfo?.semester,
          price: bookInfo?.price,
          discount: bookInfo?.discount,
          quantity: bookInfo?.quantity,
        });
        const result = await res.data;

        // Update the list of books
        listUpdate();

        // Show success message
        toast.success("Book added successfully.");

        // Close the form
        formClose(true);
        setEmptyCheck(false);
      } catch (error: any) {
        // Close the form
        formClose(false);

        // Check if the error response exists
        if (error?.response) {
          // Extract and display the error messages
          const errorMessage = Object.values(error.response.data).join("");
          toast.error(errorMessage);
        } else {
          // Handle unexpected errors
          toast.error("An unexpected error occurred.");
        }

        // Optionally log the error for debugging
        console.error("Error adding book:", error);
      }
    } else {
      setEmptyCheck(true);
    }
  };

  const handleSUpdate = async () => {
    try {
      const res = await axios.patch(EndPoint.BOOK_UPDATE + book_id, {
        book_name: bookInfo?.book_name,
        category: bookInfo?.category?.value,
        department: bookInfo?.department?.value,
        semester: bookInfo?.semester,
        price: bookInfo?.price,
        discount: bookInfo?.discount,
        quantity: bookInfo?.quantity,
      });
      const result = await res.data;
      listUpdate();
      toast.success("Book is updated successfully.");
    } catch (error: any) {
      if (error?.response) {
        toast.error(Object.values(error.response.data).join(""));
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };
  useEffect(() => {
    getBookInfo();
  }, [book_id]);
  useEffect(() => {
    getCategory();
    getAllDepartment();
  }, []);
  return (
    <div className=" w-[662px] bg-green p-[16px] rounded-[16px] text-white grid grid-cols-2 gap-[16px]">
      <div className=" flex flex-col gap-[4px] text-[25px] ">
        <p className=" text-[16px] font-semibold text-white">Name:</p>
        <input
          type="text"
          value={bookInfo?.book_name}
          onChange={(e) =>
            setBookInfo({ ...bookInfo, book_name: e.target.value })
          }
          placeholder="Enter book name"
          className={`${
            emptyCheck && bookInfo?.book_name === ""
              ? "border-[2px] border-red"
              : ""
          } px-[8px] h-[32px] text-[16px] rounded-[8px] text-black outline-none`}
        />
      </div>
      <div className=" flex flex-col gap-[4px]">
        <p className=" text-white text-[16px] font-semibold ">Category:</p>
        <div className=" w-full  cursor-pointer">
          <Select
            styles={customStyles}
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
            onChange={(e: any) => setBookInfo({ ...bookInfo, category: e })}
            placeholder={bookInfo?.category || "Select..."}
            className=" w-full text-[16px] text-black cursor-pointer"
          />
        </div>
      </div>{" "}
      <div className=" flex flex-col gap-[4px]">
        <p className=" text-white text-[16px] font-semibold ">Department:</p>
        <div className=" w-full  cursor-pointer">
          <Select
            styles={customStyles}
            options={departmentList}
            onChange={(e: any) => setBookInfo({ ...bookInfo, department: e })}
            placeholder={bookInfo?.department?.full_name || "Select..."}
            className=" w-full text-[16px] text-black cursor-pointer"
          />
        </div>
      </div>
      <div className=" flex flex-col gap-[4px] text-[25px] ">
        <p className=" text-[16px] font-semibold text-white">Discount:</p>
        <input
          type="numeric"
          value={bookInfo.discount}
          onChange={(e: any) =>
            setBookInfo({
              ...bookInfo,
              discount: e.target.value,
            })
          }
          placeholder="Add Price"
          className=" px-[8px] h-[32px] text-[16px] rounded-[8px] text-black outline-none"
        />
      </div>
      <div className=" col-span-2 flex items-center gap-[16px]">
        <p className=" text-[16px] text-white">Semester:</p>

        {allSemester.map((semester: any, index) => (
          <div key={index} className="flex items-center gap-1">
            <div
              className={`h-4 w-4 rounded-full border-2 border-white cursor-pointer ${
                parseInt(bookInfo?.semester) === semester.value
                  ? "bg-orange"
                  : ""
              }`}
              onClick={() => {
                handleCheck(semester.value);
              }}
            ></div>
            <p className="text-lg text-white">{semester.label}</p>
          </div>
        ))}
      </div>
      <div className=" flex flex-col gap-[4px] text-[25px] ">
        <p className=" text-[16px] font-semibold text-white">Price:</p>
        <input
          type="numeric"
          value={bookInfo.price}
          onChange={(e: any) =>
            setBookInfo({
              ...bookInfo,
              price: e.target.value,
            })
          }
          placeholder="Add Price"
          className={` ${
            emptyCheck && bookInfo?.price === null
              ? "border-[2px] border-red"
              : ""
          } px-[8px] h-[32px] text-[16px] rounded-[8px] text-black outline-none`}
        />
      </div>
      <div className=" flex flex-col gap-[4px] text-[25px] ">
        <p className=" text-[16px] font-semibold text-white">Quantity:</p>
        <input
          type="text"
          value={bookInfo.quantity}
          onChange={(e: any) =>
            setBookInfo({
              ...bookInfo,
              quantity: e.target.value,
            })
          }
          placeholder="Add quantity"
          className={` ${
            emptyCheck && bookInfo?.quantity === null
              ? "border-[2px] border-red"
              : ""
          }  px-[8px] h-[32px] text-[16px] rounded-[8px] text-black outline-none`}
        />
      </div>
      <div className=" relative col-span-2 p-[16px] bg-[#FFF7F4]  w-full border-[1px] border-dotted rounded-[8px] flex flex-col justify-center items-center ">
        <div
          onClick={() => setFile("")}
          className=" text-white absolute top-2 right-[8px]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="black"
            className="w-4 h-4 stroke-2 cursor-pointer"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </div>
        <label htmlFor="imageUpload" className=" ">
          <Image
            src={
              file !== ""
                ? URL.createObjectURL(file)
                : "/icons/image-upload.svg"
            }
            height={64}
            width={74}
            alt=""
          />
        </label>
        <input
          onChange={fileUpload}
          accept="image/*	"
          type="file"
          id="imageUpload"
          className=" hidden"
        />
        <p className=" text-black">{file?.name}</p>
      </div>
      <div className=" col-span-2">
        {" "}
        <div className="  flex justify-end items-center gap-[16px]">
          <button className=" flex justify-center items-center  text-white w-[115px] h-[39px] border-[1px] border-white rounded-[8px]">
            Cancel
          </button>

          {book_id ? (
            <button
              onClick={handleSUpdate}
              className=" flex justify-center items-center bg-border_orange text-white w-[116px] h-[40px] rounded-[8px]"
            >
              Update
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className=" flex justify-center items-center bg-border_orange text-white w-[116px] h-[40px] rounded-[8px]"
            >
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookForm;
