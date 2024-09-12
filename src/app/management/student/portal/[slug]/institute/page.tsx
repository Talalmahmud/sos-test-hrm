"use client";
import SemesterDetails from "@/components/institute-portal/SemesterDetails";
import { useParams } from "next/navigation";
import React from "react";

type Props = {};

const page = () => {
  const params = useParams();

  return (
    <div>
      <p className=" text-[31px] font-semibold flex justify-center items-center py-[4px]">
        Dhaka Polytechnic Institute
      </p>
      <div className=" flex flex-col gap-[16px]">
        <div className=" w-full border-[1px] rounded-[16px]">
          <p className=" text-white w-full text-[20px] md:text-[28px] bg-orange rounded-tl-[16px] rounded-tr-[16px] h-[52px] flex justify-center items-center ">
            Hot Topic
          </p>
          <table className="w-full text-center text-[#121212]">
            <thead className=" bg-[#DBDDE2] sticky top-0 z-10">
              <tr className=" text-[14px] font-semibold">
                <th className=" px-1 py-2 text-left text-[16px] font-normal ">
                  Subject
                </th>
                <th className=" px-1 py-2 text-[16px] font-normal ">Number</th>
                <th className=" px-1 py-2 text-[16px] font-normal ">Name</th>
                <th className=" px-1 py-2 text-[16px] font-normal ">
                  Department
                </th>
                <th className=" px-1 py-2 text-[16px] font-normal ">
                  Semester
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className=" text-[10px] md:text-[16px] ">
                <td className="border-b-[1px] text-left border-[#A6ABB7] px-1 py-2">
                  Most videos viewed by
                </td>

                <td className="border-b-[1px] border-[#A6ABB7] px-1 py-2">
                  1000+
                </td>
                <td className="border-b-[1px] border-[#A6ABB7] px-1 py-2">
                  Rahim
                </td>
                <td className="border-b-[1px] border-[#A6ABB7] px-1 py-2">
                  Civil
                </td>
                <td className="border-b-[1px] border-[#A6ABB7] px-1 py-2">
                  3rd(19-20)
                </td>
              </tr>

              <tr className=" text-[10px] md:text-[16px] ">
                <td className="border-b-[1px] text-left border-[#A6ABB7] px-1 py-2">
                  Got the best CGPA
                </td>
                <td className="border-b-[1px] border-[#A6ABB7] px-1 py-2">
                  <div className=" flex flex-col gap-[4px] items-center justify-center">
                    <p className=" text-[16px]">4.00</p>
                    <p className=" text-[16px]">4.00</p>{" "}
                    <p className=" text-[16px]">4.00</p>{" "}
                    <p className=" text-[16px]">4.00</p>{" "}
                    <p className=" text-[16px]">4.00</p>
                  </div>
                </td>
                <td className="border-b-[1px] border-[#A6ABB7] px-1 py-2">
                  <div className=" flex flex-col gap-[4px] items-center justify-center">
                    <p className=" text-[16px]">Rahim</p>
                    <p className=" text-[16px]">Rahim</p>{" "}
                    <p className=" text-[16px]">Rahim</p>{" "}
                    <p className=" text-[16px]">Rahim</p>{" "}
                    <p className=" text-[16px]">Rahim</p>
                  </div>
                </td>
                <td className="border-b-[1px] border-[#A6ABB7] px-1 py-2">
                  <div className=" flex flex-col gap-[4px] items-center justify-center">
                    <p className=" text-[16px]">Civil</p>
                    <p className=" text-[16px]">Civil</p>{" "}
                    <p className=" text-[16px]">Civil</p>{" "}
                    <p className=" text-[16px]">Civil</p>{" "}
                    <p className=" text-[16px]">Civil</p>
                  </div>
                </td>
                <td className="border-b-[1px] text-left border-[#A6ABB7] px-1 py-2">
                  <div className=" flex flex-col gap-[4px] items-center justify-center">
                    <p className=" text-[16px]">3rd(19-20)</p>
                    <p className=" text-[16px]">3rd(19-20)</p>{" "}
                    <p className=" text-[16px]">3rd(19-20)</p>{" "}
                    <p className=" text-[16px]">3rd(19-20)</p>{" "}
                    <p className=" text-[16px]">3rd(19-20)</p>
                  </div>
                </td>
              </tr>

              <tr className="text-[10px] md:text-[16px] ">
                <td className="border-b-[1px] text-left border-[#A6ABB7] px-1 py-2">
                  Highest points scorer
                </td>

                <td className="border-b-[1px] border-[#A6ABB7] px-1 py-2">
                  1000+
                </td>
                <td className="border-b-[1px] border-[#A6ABB7] px-1 py-2">
                  Rahim
                </td>
                <td className="border-b-[1px] border-[#A6ABB7] px-1 py-2">
                  Civil
                </td>
                <td className="border-b-[1px] border-[#A6ABB7] px-1 py-2">
                  3rd(19-20)
                </td>
              </tr>

              <tr className="text-[10px] md:text-[16px] ">
                <td className=" border-b-[1px] text-left border-[#A6ABB7] px-1 py-2">
                  Most supported taker{" "}
                </td>

                <td className="border-b-[1px] border-[#A6ABB7] px-1 py-2">
                  1000+
                </td>
                <td className="border-b-[1px] border-[#A6ABB7] px-1 py-2">
                  Rahim
                </td>
                <td className="border-b-[1px] border-[#A6ABB7] px-1 py-2">
                  Civil
                </td>
                <td className="border-b-[1px] border-[#A6ABB7] px-1 py-2">
                  3rd(19-20)
                </td>
              </tr>
              <tr className="text-[10px] md:text-[16px] ">
                <td className=" border-b-[1px] text-left border-[#A6ABB7] px-1 py-2">
                  Highest points scorer
                </td>

                <td className=" border-b-[1px] border-[#A6ABB7] px-1 py-2">
                  1000+
                </td>
                <td className=" border-b-[1px] border-[#A6ABB7] px-1 py-2">
                  Rahim
                </td>
                <td className=" border-b-[1px] border-[#A6ABB7] px-1 py-2">
                  Civil
                </td>
                <td className=" border-b-[1px] border-[#A6ABB7] px-1 py-2">
                  3rd(19-20)
                </td>
              </tr>
            </tbody>
          </table>
          <div className=" bg-[#FFF7F4] rounded-bl-[16px] text-[10px] md:text-[16px] rounded-br-[16px] w-full py-[32px] px-[16px] ">
            <div>
              <p>Note:</p>
              <ul className=" list-disc pl-[54px]">
                <li className=" ">
                  200 students enroll in Job Preparation courses.
                </li>
                <li>
                  400 students are enrolled in DUET admission preparation
                  courses.
                </li>
              </ul>
            </div>
            <div>
              <p>Special Note:</p>
              <ul className=" list-disc pl-[54px]">
                <li>
                  {" "}
                  50 students of the Softmax Job Preparation course got Job.
                </li>
                <li>
                  50 students of the DUET admission preparation a chance got
                  chance in DUET.
                </li>
              </ul>
            </div>
          </div>
        </div>

        <SemesterDetails />
      </div>
    </div>
  );
};

export default page;
