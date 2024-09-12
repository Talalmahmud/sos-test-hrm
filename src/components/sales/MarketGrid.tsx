import React, { useState } from "react";
import MarketerCard from "./MarketerCard";
import DatePicker from "react-datepicker";
import Calendar from "../Calendar";
import { formatDate } from "date-fns";
import Pagination from "../Pagination";

type Props = {
  employeeList: any;
  isDaily: boolean;
  isLoading: boolean;
  pageNo?: any;
  pageSize?: any;
  totalDataSet?: any;
  setPageNo?: any;
  setPageSize?: any;
};
type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];
const MarketGrid = ({
  employeeList,
  isDaily,
  isLoading,
  pageNo,
  setPageNo,
  pageSize,
  setPageSize,
  totalDataSet,
}: Props) => {
  const [selectDate, setSelectDate] = useState(new Date());
  const [toogleCalendar, setToggleCalendar] = useState(false);

  return (
    <div className=" w-full bg-bg_gray rounded-[16px] p-[24px] flex flex-col gap-[24px]">
      {isDaily ? (
        <p className=" underline text-gray text-[24px] font-semibold">
          Daily Sales
        </p>
      ) : (
        <p className=" text-gray text-[24px] underline font-semibold">
          Monthly Sales
        </p>
      )}
      {/* <div className=" relative">
        <div
          className="  flex items-center justify-center gap-[4px] cursor-pointer "
          onClick={() => setToggleCalendar(!toogleCalendar)}
        >
          <p className=" text-[20px] font-semibold ">
            {" "}
            {formatDate(selectDate, "MMMM dd, yyyy")}
          </p>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="10"
              viewBox="0 0 16 10"
              fill="none"
            >
              <path
                d="M0.846963 1.0225C1.05793 0.811595 1.34403 0.693115 1.64234 0.693115C1.94065 0.693115 2.22674 0.811595 2.43771 1.0225L8.00646 6.59125L13.5752 1.0225C13.7874 0.817572 14.0716 0.704178 14.3665 0.706741C14.6615 0.709305 14.9437 0.82762 15.1523 1.0362C15.3608 1.24479 15.4792 1.52695 15.4817 1.82192C15.4843 2.11689 15.3709 2.40107 15.166 2.61325L8.80184 8.97738C8.59087 9.18828 8.30477 9.30676 8.00646 9.30676C7.70815 9.30676 7.42206 9.18828 7.21109 8.97738L0.846963 2.61325C0.636058 2.40228 0.517578 2.11618 0.517578 1.81787C0.517578 1.51957 0.636058 1.23347 0.846963 1.0225Z"
                fill="black"
              />
            </svg>
          </div>
        </div>
        {toogleCalendar && (
          <div className=" absolute top-[42px] z-10 left-[39%]">
            <Calendar
              startDate={selectDate}
              setStartDate={setSelectDate}
              setToggleCalendar={setToggleCalendar}
              showMonthYear={false}
            />
          </div>
        )}
      </div> */}
      {isDaily ? (
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[16px]">
          {isLoading ? (
            <>
              <div className=" w-full rounded-[8px] bg-gray_light px-[16px] py-[8px] flex flex-col gap-[8px] animate-pulse">
                <div className="flex items-center gap-[16px]">
                  <div className="h-[32px] w-[32px] rounded-full bg-gray-300"></div>
                  <div className="h-[20px] w-[150px] bg-gray-300 rounded"></div>
                </div>

                <div className="flex flex-col gap-[10px] items-center">
                  <div className="flex items-center justify-center gap-x-[24px]">
                    <div className="h-[20px] w-[112px] bg-gray-300 rounded"></div>
                    <div className="flex items-center gap-[4px]">
                      <div className="h-[24px] w-[28px] bg-gray-300 rounded"></div>
                      <div className="h-[20px] w-[71px] bg-gray-300 rounded"></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-[24px]">
                    <div className="h-[20px] w-[112px] bg-gray-300 rounded"></div>
                    <div className="flex items-center gap-[4px]">
                      <div className="h-[24px] w-[28px] bg-gray-300 rounded"></div>
                      <div className="h-[20px] w-[71px] bg-gray-300 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" w-full rounded-[8px] bg-gray_light px-[16px] py-[8px] flex flex-col gap-[8px] animate-pulse">
                <div className="flex items-center gap-[16px]">
                  <div className="h-[32px] w-[32px] rounded-full bg-gray-300"></div>
                  <div className="h-[20px] w-[150px] bg-gray-300 rounded"></div>
                </div>

                <div className="flex flex-col gap-[10px] items-center">
                  <div className="flex items-center justify-center gap-x-[24px]">
                    <div className="h-[20px] w-[112px] bg-gray-300 rounded"></div>
                    <div className="flex items-center gap-[4px]">
                      <div className="h-[24px] w-[28px] bg-gray-300 rounded"></div>
                      <div className="h-[20px] w-[71px] bg-gray-300 rounded"></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-[24px]">
                    <div className="h-[20px] w-[112px] bg-gray-300 rounded"></div>
                    <div className="flex items-center gap-[4px]">
                      <div className="h-[24px] w-[28px] bg-gray-300 rounded"></div>
                      <div className="h-[20px] w-[71px] bg-gray-300 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" w-full rounded-[8px] bg-gray_light px-[16px] py-[8px] flex flex-col gap-[8px] animate-pulse">
                <div className="flex items-center gap-[16px]">
                  <div className="h-[32px] w-[32px] rounded-full bg-gray-300"></div>
                  <div className="h-[20px] w-[150px] bg-gray-300 rounded"></div>
                </div>

                <div className="flex flex-col gap-[10px] items-center">
                  <div className="flex items-center justify-center gap-x-[24px]">
                    <div className="h-[20px] w-[112px] bg-gray-300 rounded"></div>
                    <div className="flex items-center gap-[4px]">
                      <div className="h-[24px] w-[28px] bg-gray-300 rounded"></div>
                      <div className="h-[20px] w-[71px] bg-gray-300 rounded"></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-[24px]">
                    <div className="h-[20px] w-[112px] bg-gray-300 rounded"></div>
                    <div className="flex items-center gap-[4px]">
                      <div className="h-[24px] w-[28px] bg-gray-300 rounded"></div>
                      <div className="h-[20px] w-[71px] bg-gray-300 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            employeeList?.map((item: any, index: number) => (
              <MarketerCard isDaily={isDaily} saleDetails={item} key={index} />
            ))
          )}
        </div>
      ) : (
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[16px]">
          {isLoading ? (
            <>
              <div className=" w-full rounded-[8px] bg-gray_light px-[16px] py-[8px] flex flex-col gap-[8px] animate-pulse">
                <div className="flex items-center gap-[16px]">
                  <div className="h-[32px] w-[32px] rounded-full bg-gray-300"></div>
                  <div className="h-[20px] w-[150px] bg-gray-300 rounded"></div>
                </div>

                <div className="flex flex-col gap-[10px] items-center">
                  <div className="flex items-center justify-center gap-x-[24px]">
                    <div className="h-[20px] w-[112px] bg-gray-300 rounded"></div>
                    <div className="flex items-center gap-[4px]">
                      <div className="h-[24px] w-[28px] bg-gray-300 rounded"></div>
                      <div className="h-[20px] w-[71px] bg-gray-300 rounded"></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-[24px]">
                    <div className="h-[20px] w-[112px] bg-gray-300 rounded"></div>
                    <div className="flex items-center gap-[4px]">
                      <div className="h-[24px] w-[28px] bg-gray-300 rounded"></div>
                      <div className="h-[20px] w-[71px] bg-gray-300 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" w-full rounded-[8px] bg-gray_light px-[16px] py-[8px] flex flex-col gap-[8px] animate-pulse">
                <div className="flex items-center gap-[16px]">
                  <div className="h-[32px] w-[32px] rounded-full bg-gray-300"></div>
                  <div className="h-[20px] w-[150px] bg-gray-300 rounded"></div>
                </div>

                <div className="flex flex-col gap-[10px] items-center">
                  <div className="flex items-center justify-center gap-x-[24px]">
                    <div className="h-[20px] w-[112px] bg-gray-300 rounded"></div>
                    <div className="flex items-center gap-[4px]">
                      <div className="h-[24px] w-[28px] bg-gray-300 rounded"></div>
                      <div className="h-[20px] w-[71px] bg-gray-300 rounded"></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-[24px]">
                    <div className="h-[20px] w-[112px] bg-gray-300 rounded"></div>
                    <div className="flex items-center gap-[4px]">
                      <div className="h-[24px] w-[28px] bg-gray-300 rounded"></div>
                      <div className="h-[20px] w-[71px] bg-gray-300 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" w-full rounded-[8px] bg-gray_light px-[16px] py-[8px] flex flex-col gap-[8px] animate-pulse">
                <div className="flex items-center gap-[16px]">
                  <div className="h-[32px] w-[32px] rounded-full bg-gray-300"></div>
                  <div className="h-[20px] w-[150px] bg-gray-300 rounded"></div>
                </div>

                <div className="flex flex-col gap-[10px] items-center">
                  <div className="flex items-center justify-center gap-x-[24px]">
                    <div className="h-[20px] w-[112px] bg-gray-300 rounded"></div>
                    <div className="flex items-center gap-[4px]">
                      <div className="h-[24px] w-[28px] bg-gray-300 rounded"></div>
                      <div className="h-[20px] w-[71px] bg-gray-300 rounded"></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-[24px]">
                    <div className="h-[20px] w-[112px] bg-gray-300 rounded"></div>
                    <div className="flex items-center gap-[4px]">
                      <div className="h-[24px] w-[28px] bg-gray-300 rounded"></div>
                      <div className="h-[20px] w-[71px] bg-gray-300 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" w-full rounded-[8px] bg-gray_light px-[16px] py-[8px] flex flex-col gap-[8px] animate-pulse">
                <div className="flex items-center gap-[16px]">
                  <div className="h-[32px] w-[32px] rounded-full bg-gray-300"></div>
                  <div className="h-[20px] w-[150px] bg-gray-300 rounded"></div>
                </div>

                <div className="flex flex-col gap-[10px] items-center">
                  <div className="flex items-center justify-center gap-x-[24px]">
                    <div className="h-[20px] w-[112px] bg-gray-300 rounded"></div>
                    <div className="flex items-center gap-[4px]">
                      <div className="h-[24px] w-[28px] bg-gray-300 rounded"></div>
                      <div className="h-[20px] w-[71px] bg-gray-300 rounded"></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-[24px]">
                    <div className="h-[20px] w-[112px] bg-gray-300 rounded"></div>
                    <div className="flex items-center gap-[4px]">
                      <div className="h-[24px] w-[28px] bg-gray-300 rounded"></div>
                      <div className="h-[20px] w-[71px] bg-gray-300 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" w-full rounded-[8px] bg-gray_light px-[16px] py-[8px] flex flex-col gap-[8px] animate-pulse">
                <div className="flex items-center gap-[16px]">
                  <div className="h-[32px] w-[32px] rounded-full bg-gray-300"></div>
                  <div className="h-[20px] w-[150px] bg-gray-300 rounded"></div>
                </div>

                <div className="flex flex-col gap-[10px] items-center">
                  <div className="flex items-center justify-center gap-x-[24px]">
                    <div className="h-[20px] w-[112px] bg-gray-300 rounded"></div>
                    <div className="flex items-center gap-[4px]">
                      <div className="h-[24px] w-[28px] bg-gray-300 rounded"></div>
                      <div className="h-[20px] w-[71px] bg-gray-300 rounded"></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-[24px]">
                    <div className="h-[20px] w-[112px] bg-gray-300 rounded"></div>
                    <div className="flex items-center gap-[4px]">
                      <div className="h-[24px] w-[28px] bg-gray-300 rounded"></div>
                      <div className="h-[20px] w-[71px] bg-gray-300 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" w-full rounded-[8px] bg-gray_light px-[16px] py-[8px] flex flex-col gap-[8px] animate-pulse">
                <div className="flex items-center gap-[16px]">
                  <div className="h-[32px] w-[32px] rounded-full bg-gray-300"></div>
                  <div className="h-[20px] w-[150px] bg-gray-300 rounded"></div>
                </div>

                <div className="flex flex-col gap-[10px] items-center">
                  <div className="flex items-center justify-center gap-x-[24px]">
                    <div className="h-[20px] w-[112px] bg-gray-300 rounded"></div>
                    <div className="flex items-center gap-[4px]">
                      <div className="h-[24px] w-[28px] bg-gray-300 rounded"></div>
                      <div className="h-[20px] w-[71px] bg-gray-300 rounded"></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-[24px]">
                    <div className="h-[20px] w-[112px] bg-gray-300 rounded"></div>
                    <div className="flex items-center gap-[4px]">
                      <div className="h-[24px] w-[28px] bg-gray-300 rounded"></div>
                      <div className="h-[20px] w-[71px] bg-gray-300 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" w-full rounded-[8px] bg-gray_light px-[16px] py-[8px] flex flex-col gap-[8px] animate-pulse">
                <div className="flex items-center gap-[16px]">
                  <div className="h-[32px] w-[32px] rounded-full bg-gray-300"></div>
                  <div className="h-[20px] w-[150px] bg-gray-300 rounded"></div>
                </div>

                <div className="flex flex-col gap-[10px] items-center">
                  <div className="flex items-center justify-center gap-x-[24px]">
                    <div className="h-[20px] w-[112px] bg-gray-300 rounded"></div>
                    <div className="flex items-center gap-[4px]">
                      <div className="h-[24px] w-[28px] bg-gray-300 rounded"></div>
                      <div className="h-[20px] w-[71px] bg-gray-300 rounded"></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-[24px]">
                    <div className="h-[20px] w-[112px] bg-gray-300 rounded"></div>
                    <div className="flex items-center gap-[4px]">
                      <div className="h-[24px] w-[28px] bg-gray-300 rounded"></div>
                      <div className="h-[20px] w-[71px] bg-gray-300 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" w-full rounded-[8px] bg-gray_light px-[16px] py-[8px] flex flex-col gap-[8px] animate-pulse">
                <div className="flex items-center gap-[16px]">
                  <div className="h-[32px] w-[32px] rounded-full bg-gray-300"></div>
                  <div className="h-[20px] w-[150px] bg-gray-300 rounded"></div>
                </div>

                <div className="flex flex-col gap-[10px] items-center">
                  <div className="flex items-center justify-center gap-x-[24px]">
                    <div className="h-[20px] w-[112px] bg-gray-300 rounded"></div>
                    <div className="flex items-center gap-[4px]">
                      <div className="h-[24px] w-[28px] bg-gray-300 rounded"></div>
                      <div className="h-[20px] w-[71px] bg-gray-300 rounded"></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-[24px]">
                    <div className="h-[20px] w-[112px] bg-gray-300 rounded"></div>
                    <div className="flex items-center gap-[4px]">
                      <div className="h-[24px] w-[28px] bg-gray-300 rounded"></div>
                      <div className="h-[20px] w-[71px] bg-gray-300 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" w-full rounded-[8px] bg-gray_light px-[16px] py-[8px] flex flex-col gap-[8px] animate-pulse">
                <div className="flex items-center gap-[16px]">
                  <div className="h-[32px] w-[32px] rounded-full bg-gray-300"></div>
                  <div className="h-[20px] w-[150px] bg-gray-300 rounded"></div>
                </div>

                <div className="flex flex-col gap-[10px] items-center">
                  <div className="flex items-center justify-center gap-x-[24px]">
                    <div className="h-[20px] w-[112px] bg-gray-300 rounded"></div>
                    <div className="flex items-center gap-[4px]">
                      <div className="h-[24px] w-[28px] bg-gray-300 rounded"></div>
                      <div className="h-[20px] w-[71px] bg-gray-300 rounded"></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-[24px]">
                    <div className="h-[20px] w-[112px] bg-gray-300 rounded"></div>
                    <div className="flex items-center gap-[4px]">
                      <div className="h-[24px] w-[28px] bg-gray-300 rounded"></div>
                      <div className="h-[20px] w-[71px] bg-gray-300 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            employeeList?.map((item: any, index: number) => (
              <MarketerCard isDaily={isDaily} saleDetails={item} key={index} />
            ))
          )}
        </div>
      )}
      <Pagination
        pageNo={pageNo}
        pageSize={pageSize}
        setPageNo={setPageNo}
        setPageSize={setPageSize}
        totalPage={totalDataSet}
      />

      {/* <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[16px]">
        <MarketerCard />
        <MarketerCard />
        <MarketerCard />
        <MarketerCard />
        <MarketerCard />
        <MarketerCard />
        <MarketerCard />
        <MarketerCard />
        <MarketerCard />
      </div> */}
    </div>
  );
};

export default MarketGrid;
