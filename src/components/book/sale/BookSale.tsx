"use client";
import { AuthContext } from "@/components/ContextProvider";
import { EndPoint } from "@/utils/api";
import { customStyles } from "@/utils/staticData";
import axios from "axios";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";

type Props = {};

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
const options = [
  { value: "admin", label: "Admin" },
  { value: "user", label: "User" },
  { value: "member", label: "Member" },
  { value: "teacher", label: "Teacher" },
];

const paymentMethods = [
  { value: "Bkash", label: "Bkash" },
  { value: "Nagad", label: "Nagad" },
  { value: "Rocket", label: "Rocket" },
];
const BookSale = (props: Props) => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<any>("Admin");
  const [smesterCheck, setSemesterCheck] = useState(1);
  const [bookList, setBookList] = useState<any>([]);
  const [allDepartment, setAllDepartment] = useState([]);
  const [allSession, setAllSession] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState<any>("");
  const [selectedBook, setSelectedBook] = useState<any>("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<any>("");

  const [saleInfo, seSaleInfo] = useState<any>({
    BuyerStudent: "",
    book_name: selectedBook?.value,
    primary_number: null,
    secondary_number: null,
    payment_method: selectedPaymentMethod?.value,
    payement_number: "",
    board_roll: null,
    kuriar_address: "",
    semester: selectedSemester?.value,
    received_amount: null,
    transaction_id: "",
    reference: "",
    book_quantity: 1,
  });

  const getBookList = async () => {
    const res = await axios.get(EndPoint.DROPDOWN_BOOK);
    const result = await res.data;
    setBookList(result.results);
  };

  const submitHandle = async () => {
    const bodyData = {
      BuyerStudent: saleInfo?.BuyerStudent,
      book_name: selectedBook?.value,
      primary_number: saleInfo?.primary_number,
      secondary_number: saleInfo?.secondary_number,
      payment_method: selectedPaymentMethod?.value,
      payement_number: saleInfo?.payement_number,
      board_roll: saleInfo?.board_roll,
      kuriar_address: saleInfo?.kuriar_address,
      semester: selectedSemester?.value,
      received_amount: saleInfo?.received_amount,
      transaction_id: saleInfo?.transaction_id,
      reference: saleInfo?.reference,
      book_quantity: saleInfo?.book_quantity,
    };
    try {
      const res = await axios.post(EndPoint.BOOK_SALE, bodyData, {
        headers: { Authorization: "Bearer " + user?.access_token },
      });
      const result = await res.data;

      toast.success("Book is sold successfully.");
      router.push("/management/book/processing");
    } catch (error: any) {
      if (error?.response) {
        toast.error(Object.values(error.response.data).join(""));
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  useEffect(() => {
    getBookList();
  }, []);
  return (
    <div className=" shadow-md border-gray_light border-[1px] rounded-[16px] p-[24px] flex flex-col">
      <div className=" w-full grid grid-cols-2 items-center gap-[16px]">
        <div className=" flex flex-col gap-[4px]">
          <label htmlFor="cgpa" className="  font-bold ">
            Student Name
          </label>
          <input
            value={saleInfo.BuyerStudent}
            onChange={(e) =>
              seSaleInfo({ ...saleInfo, BuyerStudent: e.target.value })
            }
            type="text"
            placeholder="Enter Name"
            className=" px-[8px] h-[40px] outline-non shadow-md border-gray_light border-[1px] outline-none rounded-[8px] text-black"
          />
        </div>
        <div className=" flex flex-col gap-[4px]">
          <label htmlFor="cgpa" className="  font-bold ">
            Board Roll
          </label>
          <input
            type="numeric"
            value={saleInfo.board_roll}
            onChange={(e: any) =>
              seSaleInfo({ ...saleInfo, board_roll: e.target.value })
            }
            placeholder="Enter Board Roll"
            className=" px-[8px] h-[40px] shadow-md border-gray_light border-[1px] outline-none rounded-[8px] text-black"
          />
        </div>{" "}
        <div className=" flex flex-col gap-[4px]">
          <p className="  font-bold ">Semester:</p>
          <div className=" w-full  cursor-pointer">
            <Select
              value={selectedSemester}
              options={allSemester}
              isClearable
              onChange={(e: any) => setSelectedSemester(e)}
              maxMenuHeight={120}
              className=" w-full  text-[16px] shadow-md cursor-pointer"
              placeholder="Select Role"
            />
          </div>
        </div>
        <div className=" flex flex-col gap-[4px] py-[8px]">
          <label htmlFor="gpa" className="  font-bold ">
            Primary Phone Number
          </label>
          <input
            type="number"
            value={saleInfo.primary_number}
            onChange={(e: any) =>
              seSaleInfo({ ...saleInfo, primary_number: e.target.value })
            }
            placeholder="Primary Number"
            className=" px-[8px] h-[40px] shadow-md border-gray_light border-[1px] outline-none rounded-[8px] text-black"
          />
        </div>
        <div className=" flex flex-col gap-[4px] py-[8px]">
          <label htmlFor="second" className="  font-bold ">
            Secondary Phone Number
          </label>
          <input
            type="number"
            value={saleInfo.secondary_number}
            onChange={(e: any) =>
              seSaleInfo({ ...saleInfo, secondary_number: e.target.value })
            }
            placeholder="Secondary Number"
            className=" px-[8px] h-[40px] shadow-md border-gray_light border-[1px] outline-none rounded-[8px] text-black"
          />
        </div>
        <div className=" flex flex-col gap-[4px]">
          <p className="  font-bold ">Book Name:</p>
          <div className=" w-full  cursor-pointer">
            <Select
              options={bookList}
              value={selectedBook}
              onChange={(e: any) => setSelectedBook(e)}
              isClearable
              className=" w-full  text-[16px] shadow-md cursor-pointer"
              placeholder="Select book.."
            />
          </div>
        </div>
        <div className=" flex flex-col gap-[4px]">
          <p className="  font-bold ">Payment Method:</p>
          <div className=" w-full  cursor-pointer">
            <Select
              value={selectedPaymentMethod}
              isClearable
              options={paymentMethods}
              onChange={(e: any) => setSelectedPaymentMethod(e)}
              className=" w-full shadow-md text-[16px] cursor-pointer"
              placeholder="Select Role"
            />
          </div>
        </div>
        <div className=" flex flex-col gap-[4px]">
          <label htmlFor="cgpa" className="  font-bold ">
            Selling Address
          </label>
          <input
            type="text"
            placeholder="Selling address"
            value={saleInfo.kuriar_address}
            onChange={(e: any) =>
              seSaleInfo({ ...saleInfo, kuriar_address: e.target.value })
            }
            className=" px-[8px] h-[40px] shadow-md border-gray_light border-[1px] outline-none rounded-[8px] text-black"
          />
        </div>
        <div className=" flex flex-col gap-[4px]">
          <label htmlFor="cgpa" className="  font-bold ">
            Payment Number:
          </label>
          <input
            type="text"
            value={saleInfo.payement_number}
            onChange={(e: any) =>
              seSaleInfo({ ...saleInfo, payement_number: e.target.value })
            }
            placeholder="Payment number"
            className=" px-[8px] h-[40px] shadow-md border-gray_light border-[1px] outline-none rounded-[8px] text-black"
          />
        </div>{" "}
        <div className=" flex flex-col gap-[4px]">
          <label htmlFor="cgpa" className="  font-bold ">
            Transaction Id
          </label>
          <input
            type="text"
            value={saleInfo.transaction_id}
            onChange={(e: any) =>
              seSaleInfo({ ...saleInfo, transaction_id: e.target.value })
            }
            placeholder="Transaction number"
            className=" px-[8px] h-[40px] shadow-md border-gray_light border-[1px] outline-none rounded-[8px] text-black"
          />
        </div>{" "}
        <div className=" flex flex-col gap-[4px]">
          <label htmlFor="cgpa" className="  font-bold ">
            Referance
          </label>
          <input
            type="text"
            value={saleInfo.reference}
            onChange={(e: any) =>
              seSaleInfo({ ...saleInfo, reference: e.target.value })
            }
            placeholder="Reference"
            className=" px-[8px] h-[40px] shadow-md border-gray_light border-[1px] outline-none rounded-[8px] text-black"
          />
        </div>
        <div className=" flex flex-col gap-[4px]">
          <label htmlFor="amount" className="  font-bold ">
            Received Amount
          </label>
          <input
            type="number"
            value={saleInfo.received_amount}
            onChange={(e: any) =>
              seSaleInfo({ ...saleInfo, received_amount: e.target.value })
            }
            placeholder="Amount"
            className=" px-[8px] h-[40px] shadow-md  border-gray_light border-[1px] outline-none rounded-[8px] text-black"
          />
        </div>
        <div className=" flex flex-col gap-[4px]">
          <label htmlFor="quantity" className="  font-bold ">
            Book Quantity
          </label>
          <input
            type="number"
            value={saleInfo.book_quantity}
            onChange={(e: any) =>
              seSaleInfo({ ...saleInfo, book_quantity: e.target.value })
            }
            placeholder="Quantity"
            className=" px-[8px] h-[40px] shadow-md border-gray_light border-[1px] outline-none rounded-[8px] text-black"
          />
        </div>
        <div className=" flex gap-[20px] justify-end items-center pt-[8px]">
          <Link href={"/management/book/add"}>
            <button className=" py-[8px] px-[16px] border-[1px] hover:bg-orange hover:text-white  rounded-[8px]">
              Cancel
            </button>
          </Link>
          <button
            onClick={() => submitHandle()}
            className=" py-[8px] px-[16px] active:bg-orange bg-green text-white   rounded-[8px]"
          >
            Sale
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookSale;
