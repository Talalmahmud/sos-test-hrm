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

const BookProcessing = (props: Props) => {
  const { user } = useContext(AuthContext);
  const [book, setBook] = useState({
    name: "",
    phone_number: "",
    second_phone_number: "",
    email: "",
    institute: "",
    address: {
      city: "",
      post: "",
      district: "",
    },
    polytechnic_board_roll: 0,
    department: "",
    session: "",
    cgpa: "",
    ssc_gpa: "",
    semester: 1,
    guardian_name: "",
    guardian_relation: "",
    salary: 0,
    guardian_contact: "",
    guardian_address: "",
    shift: "",
    stipend: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [updateIsLoading, setUpdateIsLoading] = useState(false);
  const [eId, setEid] = useState<any>("");
  const [summaryList, setSummaryList] = useState<any>([]);
  const currentDate = formatDate(new Date(), "yyyy-MM-dd");
  const [pageNo, setPageNo] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalDataSet, setTotalDataSet] = useState(0);
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
          params: {
            limit: pageSize,
            offset: pageSize * pageNo,
            status: "Processing",
          },
          headers: { Authorization: "Bearer " + user?.access_token },
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

  const updateSaleStatus = async (id: any, index: any) => {
    setUpdateIsLoading(true);
    setEid(index);
    const res = await axios.patch(
      EndPoint.BOOK_SALE_UPDATE + id,
      {
        status: "Completed",
      },
      {
        headers: {
          Authorization: "Bearer " + user?.access_token,
        },
      }
    );
    const result = res.data;
    setIsLoading(false);
    getBookSale();
    setUpdateIsLoading(false);
    // router.push("/management/course/paid-course");
  };
  //   console.log(summaryList);
  useEffect(() => {
    getBookSale();
  }, [user, pageNo, pageSize]);
  return (
    <div>
      <div className=" grid grid-cols-3 gap-[16px]"></div>
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
              <th className=" px-4 py-2 text-[16px] font-semibold ">Action</th>
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
                  <td className=" flex justify-center items-center">
                    {updateIsLoading && eId === index ? (
                      <div>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 40 40"
                          fill="none"
                          className=" animate-spin"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M40 20C40 31.0457 31.0457 40 20 40C8.9543 40 0 31.0457 0 20C0 8.9543 8.9543 0 20 0C31.0457 0 40 8.9543 40 20ZM5.98053 20C5.98053 27.7427 12.2573 34.0195 20 34.0195C27.7427 34.0195 34.0195 27.7427 34.0195 20C34.0195 12.2573 27.7427 5.98053 20 5.98053C12.2573 5.98053 5.98053 12.2573 5.98053 20Z"
                            fill="url(#paint0_angular_2903_21177)"
                          />
                          <circle cx="20.1992" cy="37" r="3" fill="#EB592A" />
                          <defs>
                            <radialGradient
                              id="paint0_angular_2903_21177"
                              cx="0"
                              cy="0"
                              r="1"
                              gradientUnits="userSpaceOnUse"
                              gradientTransform="translate(20 20) rotate(90) scale(20)"
                            >
                              <stop stop-color="#EB592A" />
                              <stop offset="0.245" stop-color="#EB592A" />
                              <stop
                                offset="1"
                                stop-color="#EB592A"
                                stop-opacity="0"
                              />
                            </radialGradient>
                          </defs>
                        </svg>
                      </div>
                    ) : (
                      <div
                        className=" flex items-center justify-center  cursor-pointer "
                        onClick={() => updateSaleStatus(item?.id, index)}
                      >
                        <svg
                          width="18"
                          height="16"
                          viewBox="0 0 24 19"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className=" hover:stroke-light_red"
                        >
                          <path
                            d="M9.19003 18.3233C8.96095 18.5537 8.64835 18.6823 8.32369 18.6823C7.99902 18.6823 7.68642 18.5537 7.45735 18.3233L0.538518 11.4033C-0.179506 10.6853 -0.179506 9.52094 0.538518 8.80429L1.40486 7.93772C2.12311 7.2197 3.28608 7.2197 4.00411 7.93772L8.32374 12.2575L19.9958 0.585149C20.714 -0.132875 21.8782 -0.132875 22.595 0.585149L23.4614 1.45172C24.1794 2.16974 24.1794 3.33386 23.4614 4.05074L9.19003 18.3233Z"
                            fill="#10B981"
                          />
                        </svg>
                      </div>
                    )}
                  </td>
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

export default BookProcessing;
