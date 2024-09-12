"use client";
import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";

import { customStyles } from "@/utils/staticData";
import { formatDate } from "date-fns";
import SupportDropdown from "@/components/supports/SupportDropdown";
import axios from "axios";
import { EndPoint } from "@/utils/api";
import { AuthContext } from "@/components/ContextProvider";
import Pagination from "@/components/Pagination";
type Props = {};

const BookSaleSummary = (props: Props) => {
  const { user } = useContext(AuthContext);
  // const [book, setBook] = useState({
  //   name: "",
  //   phone_number: "",
  //   second_phone_number: "",
  //   email: "",
  //   institute: "",
  //   address: {
  //     city: "",
  //     post: "",
  //     district: "",
  //   },
  //   polytechnic_board_roll: 0,
  //   department: "",
  //   session: "",
  //   cgpa: "",
  //   ssc_gpa: "",
  //   semester: 1,
  //   guardian_name: "",
  //   guardian_relation: "",
  //   salary: 0,
  //   guardian_contact: "",
  //   guardian_address: "",
  //   shift: "",
  //   stipend: false,
  // });
  const [isLoading, setIsLoading] = useState(false);
  const [pageNo, setPageNo] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalDataSet, setTotalDataSet] = useState(0);
  const [summaryList, setSummaryList] = useState<any>([]);
  const currentDate = formatDate(new Date(), "yyyy-MM-dd");
  const [selectedDataSupport, setSelectedDataSupport] =
    useState<any>(currentDate);
  const [startDateSupportSummary, setStartDateSupportSummary] =
    useState("2024-04-05");
  const [endDateSupportSummary, setEndDateSupportSummary] = useState(
    formatDate(new Date(), "yyyy-MM-dd")
  );

  const getBookSale = async () => {
    if (user) {
      try {
        setIsLoading(true);
        const res = await axios.get(EndPoint.BOOK_SALE_SUMMARY, {
          headers: { Authorization: "Bearer " + user?.access_token },
          params: {
            status: "Completed",
            limit: pageSize,
            offset: pageSize * pageNo,
          },
        });
        const result = await res.data;
        setSummaryList(result.results);
        setTotalDataSet(result.count);

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getBookSale();
  }, [user, pageNo, pageSize]);
  return (
    <div>
      <div className=" grid grid-cols-3 gap-[16px]">
        <div className=" flex flex-col gap-[4px]">
          <p className=" text-[16px] font-semibold ">Book:</p>
          <div className=" w-full  cursor-pointer">
            <Select
              isSearchable
              placeholder="Search by name..."
              className=" z-30"
              options={[
                {
                  label: "All",
                  value: "",
                },
                {
                  label: "Created",
                  value: "created",
                },
                {
                  label: "Processing",
                  value: "processing",
                },
                {
                  label: "Completed",
                  value: "completed",
                },
              ]}
            />
          </div>
        </div>

        <div className=" flex flex-col gap-[4px] text-[16px] ">
          <p className=" text-[16px] font-semibold">Buyer:</p>
          <input
            type="text"
            placeholder="Enter buyer phone number"
            className=" w-full px-[8px] h-[40px] text-[16px] rounded-[8px] border-[1px]  border-gray_light outline-none placeholder:text-white"
          />
        </div>

        <div className=" flex flex-col gap-[4px]">
          <p className=" text-[16px] font-semibold ">Institute:</p>
          <div className=" w-full  cursor-pointer">
            <Select
              className=" w-full h-[28px] cursor-pointer z-30"
              placeholder="Select institute..."
            />
          </div>
        </div>
      </div>
      <div className=" grid grid-cols-2 gap-[16px]">
        <div className=" flex flex-col gap-[4px]">
          <p className=" text-[16px] font-semibold ">Category:</p>
          <div className=" w-full  cursor-pointer">
            <Select
              isSearchable
              placeholder="Select category..."
              className=" z-20"
              options={[
                {
                  label: "All",
                  value: "",
                },
                {
                  label: "Created",
                  value: "created",
                },
                {
                  label: "Procesing",
                  value: "processing",
                },
                {
                  label: "Completed",
                  value: "completed",
                },
              ]}
            />
          </div>
        </div>
        <div className=" flex flex-col gap-[4px]">
          <p className=" text-[16px] font-semibold ">Department:</p>
          <div className=" w-full  cursor-pointer">
            <Select
              isSearchable
              className=" w-full h-[28px] cursor-pointer z-20"
              placeholder="Select department..."
            />
          </div>
        </div>
      </div>

      <div className=" flex justify-between items-center pt-[16px] ">
        <div className=" flex items-center  className= h-[41px]  ">
          <input
            type="text"
            className=" h-full w-[653px] border-[1px] rounded-tr-none rounded-br-none rounded-[8px] px-[16px] outline-none "
            placeholder=" Search by id"
          />
          <div className=" bg-title h-[40px] w-[40px] flex justify-center items-center rounded-tr-[8px] rounded-br-[8px] ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M23.7723 22.6943L17.5759 16.5969C19.1985 14.834 20.1955 12.5024 20.1955 9.93682C20.1947 4.44852 15.6742 0 10.0974 0C4.52055 0 0 4.44852 0 9.93682C0 15.4251 4.52055 19.8736 10.0974 19.8736C12.5069 19.8736 14.7169 19.0402 16.4529 17.6546L22.6733 23.776C22.9764 24.0746 23.4685 24.0746 23.7716 23.776C23.8437 23.7056 23.901 23.6215 23.9401 23.5287C23.9792 23.4358 23.9994 23.3361 23.9995 23.2353C23.9996 23.1345 23.9795 23.0348 23.9405 22.9419C23.9015 22.849 23.8443 22.7648 23.7723 22.6943ZM10.0974 18.3448C5.37877 18.3448 1.55362 14.5804 1.55362 9.93682C1.55362 5.29321 5.37877 1.52884 10.0974 1.52884C14.816 1.52884 18.6411 5.29321 18.6411 9.93682C18.6411 14.5804 14.816 18.3448 10.0974 18.3448Z"
                fill="white"
              />
            </svg>
          </div>
        </div>

        <SupportDropdown
          selectedData={selectedDataSupport}
          setSelectedData={setSelectedDataSupport}
          setStartDate={setStartDateSupportSummary}
          setEndDate={setEndDateSupportSummary}
          startDate={startDateSupportSummary}
          endDate={endDateSupportSummary}
        />
      </div>
      <div className=" shadow-md  my-[24px]">
        <table className="w-full table-fixed  text-center text-[#121212] ">
          <thead className=" bg-[#DBDDE2] sticky top-0 z-10">
            <tr>
              <th className=" px-4 py-2 text-[16px] font-semibold ">
                Sale Id.
              </th>
              <th className=" px-4 py-2 text-[16px] font-semibold ">
                Buyer Number
              </th>
              <th className=" px-4 py-2 text-[16px] font-semibold ">
                Payment Number
              </th>
              <th className=" px-4 py-2 text-[16px] font-semibold ">Address</th>
              <th className=" px-4 py-2 text-[16px] font-semibold ">Price</th>
              <th className=" px-4 py-2 text-[16px] font-semibold ">Status</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <>
                <tr className="animate-pulse">
                  <td className="p-2">
                    <div className="h-[20px] bg-gray_light rounded"></div>
                  </td>
                  <td className="p-2">
                    <div className="h-[20px] bg-gray_light rounded"></div>
                  </td>
                  <td className="p-2">
                    <div className="h-[20px] bg-gray_light rounded"></div>
                  </td>
                  <td className="p-2">
                    <div className="h-[20px] bg-gray_light rounded"></div>
                  </td>

                  <td className="p-2">
                    <div className="h-[20px] bg-gray_light rounded"></div>
                  </td>
                  <td className="p-2">
                    <div className="h-[20px] bg-gray_light rounded"></div>
                  </td>
                </tr>
                <tr className="animate-pulse">
                  <td className="p-2">
                    <div className="h-[20px] bg-gray_light rounded"></div>
                  </td>
                  <td className="p-2">
                    <div className="h-[20px] bg-gray_light rounded"></div>
                  </td>
                  <td className="p-2">
                    <div className="h-[20px] bg-gray_light rounded"></div>
                  </td>
                  <td className="p-2">
                    <div className="h-[20px] bg-gray_light rounded"></div>
                  </td>

                  <td className="p-2">
                    <div className="h-[20px] bg-gray_light rounded"></div>
                  </td>
                  <td className="p-2">
                    <div className="h-[20px] bg-gray_light rounded"></div>
                  </td>
                </tr>{" "}
                <tr className="animate-pulse">
                  <td className="p-2">
                    <div className="h-[20px] bg-gray_light rounded"></div>
                  </td>
                  <td className="p-2">
                    <div className="h-[20px] bg-gray_light rounded"></div>
                  </td>
                  <td className="p-2">
                    <div className="h-[20px] bg-gray_light rounded"></div>
                  </td>
                  <td className="p-2">
                    <div className="h-[20px] bg-gray_light rounded"></div>
                  </td>

                  <td className="p-2">
                    <div className="h-[20px] bg-gray_light rounded"></div>
                  </td>
                  <td className="p-2">
                    <div className="h-[20px] bg-gray_light rounded"></div>
                  </td>
                </tr>{" "}
                <tr className="animate-pulse">
                  <td className="p-2">
                    <div className="h-[20px] bg-gray_light rounded"></div>
                  </td>
                  <td className="p-2">
                    <div className="h-[20px] bg-gray_light rounded"></div>
                  </td>
                  <td className="p-2">
                    <div className="h-[20px] bg-gray_light rounded"></div>
                  </td>
                  <td className="p-2">
                    <div className="h-[20px] bg-gray_light rounded"></div>
                  </td>

                  <td className="p-2">
                    <div className="h-[20px] bg-gray_light rounded"></div>
                  </td>
                  <td className="p-2">
                    <div className="h-[20px] bg-gray_light rounded"></div>
                  </td>
                </tr>{" "}
                <tr className="animate-pulse">
                  <td className="p-2">
                    <div className="h-[20px] bg-gray_light rounded"></div>
                  </td>
                  <td className="p-2">
                    <div className="h-[20px] bg-gray_light rounded"></div>
                  </td>
                  <td className="p-2">
                    <div className="h-[20px] bg-gray_light rounded"></div>
                  </td>
                  <td className="p-2">
                    <div className="h-[20px] bg-gray_light rounded"></div>
                  </td>

                  <td className="p-2">
                    <div className="h-[20px] bg-gray_light rounded"></div>
                  </td>
                  <td className="p-2">
                    <div className="h-[20px] bg-gray_light rounded"></div>
                  </td>
                </tr>{" "}
                <tr className="animate-pulse">
                  <td className="p-2">
                    <div className="h-[20px] bg-gray_light rounded"></div>
                  </td>
                  <td className="p-2">
                    <div className="h-[20px] bg-gray_light rounded"></div>
                  </td>
                  <td className="p-2">
                    <div className="h-[20px] bg-gray_light rounded"></div>
                  </td>
                  <td className="p-2">
                    <div className="h-[20px] bg-gray_light rounded"></div>
                  </td>

                  <td className="p-2">
                    <div className="h-[20px] bg-gray_light rounded"></div>
                  </td>
                  <td className="p-2">
                    <div className="h-[20px] bg-gray_light rounded"></div>
                  </td>
                </tr>
              </>
            ) : (
              summaryList?.map((item: any, index: any) => (
                <tr
                  key={index}
                  className={` ${
                    index % 2 === 0 && " bg-gray_light"
                  }  hover:bg-bg_card cursor-pointer `}
                >
                  <td className=" py-[4px]">{item?.id}</td>
                  <td>{item?.primary_number}</td>
                  <td>{item?.payement_number}</td>
                  <td>{item?.kuriar_address}</td>
                  <td>{item?.received_amount}</td>
                  <td>{item?.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {totalDataSet > 10 && (
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

export default BookSaleSummary;
