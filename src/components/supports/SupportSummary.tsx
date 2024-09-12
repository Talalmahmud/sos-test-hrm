"use client";
import React, { useEffect, useState } from "react";
import Calendar from "../Calendar";
import Image from "next/image";
import { formatDate } from "date-fns";
import { EndPoint } from "@/utils/api";
import axios from "axios";
import SupportDropdown from "./SupportDropdown";
import { format } from "util";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {};

const SupportSummary = (props: Props) => {
  const router = useRouter();
  const [toogleCalendar, setToggleCalendar] = useState(false);

  const [summaryHistory, setSummaryHistory] = useState<any>(null);
  const [teacherSummaryHistory, setTeacherSummaryHistory] = useState<any>(null);
  const [categorySummary, setCategorySummary] = useState<any>([]);
  const [supportPlanSummary, setSupportPlanSummary] = useState<any>({});
  const [suportBaseSummary, setSupportBaseSummary] = useState<any>({});
  const [suportBaseDaimonTotal, setSupportBaseDaimonTotal] = useState(0);
  const [suportBaseDreamerTotal, setSupportBaseDreamerTotal] = useState(0);
  const [suportBaseTargetTotal, setSupportBaseTargetTotal] = useState(0);
  const [dropList, setDropList] = useState([]);

  const navigateToDetailsPage = (
    params1 = "",
    params2 = "",
    selectedDate = "",
    name = ""
  ) => {
    router.push(
      `/management/support-summary/details/total?status=${params1}&teacherNumber=${params2}&selectedDate=${selectedDate}&name=${name}`
    );
  };

  const currentDate = formatDate(new Date(), "yyyy-MM-dd");
  const [selectedDataSupportSummary, setSelectedDataSupportSummary] =
    useState<any>(currentDate);
  const [startDateSupportSummary, setStartDateSupportSummary] =
    useState("2024-04-05");
  const [endDateSupportSummary, setEndDateSupportSummary] = useState(
    formatDate(new Date(), "yyyy-MM-dd")
  );

  const [selectedDataCategoryPlan, setSelectedDataCategoryPlan] =
    useState<any>(currentDate);
  const [startDateCategoryPlan, setStartDateCategoryPlan] =
    useState("2024-04-05");
  const [endDateCategoryPlan, setEndDateCategoryPlan] = useState(
    formatDate(new Date(), "yyyy-MM-dd")
  );

  const [selectedDataPackage, setSelectedDataPackage] =
    useState<any>(currentDate);
  const [startDatePackage, setStartDatePackage] = useState("2024-04-05");
  const [endDatePackage, setEndDatePackage] = useState(
    formatDate(new Date(), "yyyy-MM-dd")
  );

  const [selectedDataBatch, setSelectedDataBatch] = useState<any>(currentDate);
  const [startDateBatch, setStartDateBatch] = useState("2024-04-05");
  const [endDateBatch, setEndDateBatch] = useState(
    formatDate(new Date(), "yyyy-MM-dd")
  );

  const [selectedDataTeacher, setSelectedDataTeacher] =
    useState<any>(currentDate);
  const [startDateTeacher, setStartDateTeacher] = useState("2024-04-05");
  const [endDateTeacher, setEndDateTeacher] = useState(
    formatDate(new Date(), "yyyy-MM-dd")
  );

  const getSupportStatistics = async () => {
    try {
      if (selectedDataSupportSummary !== "Custom") {
        if (
          (selectedDataSupportSummary && startDateSupportSummary) ||
          endDateSupportSummary
        ) {
          const res = await axios.get(EndPoint.SUPPORT_STATISTICS, {
            params: {
              start_date: selectedDataSupportSummary
                ? ""
                : startDateSupportSummary,
              end_date: selectedDataSupportSummary ? "" : endDateSupportSummary,
              options: selectedDataSupportSummary,
            },
          });
          const result = await res.data;
          setSummaryHistory(result);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTeacherSupportStatistics = async () => {
    try {
      if (selectedDataTeacher !== "Custom") {
        if ((startDateTeacher && endDateTeacher) || selectedDataTeacher) {
          const res = await axios.get(EndPoint.SUPPORT_TEACHER_STATISTICS, {
            params: {
              start_date: selectedDataTeacher ? "" : startDateTeacher,
              end_date: selectedDataTeacher ? "" : endDateTeacher,
              options: selectedDataTeacher,
            },
          });
          const result = await res.data;
          setTeacherSummaryHistory(result);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCategorySummary = async () => {
    try {
      if (selectedDataCategoryPlan !== "Custom") {
        const res = await axios.get(EndPoint.SUPPORT_CATEGORY_SUMMARY, {
          params: {
            start_date: selectedDataCategoryPlan ? "" : startDateCategoryPlan,
            end_date: selectedDataCategoryPlan ? "" : endDateCategoryPlan,
            options: selectedDataCategoryPlan,
          },
        });
        const result = await res.data;
        setCategorySummary(result.category_support_summary);
        setSupportPlanSummary(result.plan_support_summary);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getbaseSummary = async () => {
    try {
      if (selectedDataBatch !== "Custom") {
        const res = await axios.get(EndPoint.SUPPORT_BASE_SUMMARY, {
          params: {
            start_date: selectedDataBatch ? "" : startDateBatch,
            end_date: selectedDataBatch ? "" : endDateBatch,
            options: selectedDataBatch,
          },
        });
        const result = await res.data;
        setSupportBaseSummary(result);

        // Calculate totals
        let daimondTotal = 0;
        let dreamerTotal = 0;
        let targetTotal = 0;

        if (result?.dimond) {
          Object.entries(result.dimond).forEach((item: any) => {
            daimondTotal += item[1];
          });
        }

        if (result?.dreamer) {
          Object.entries(result.dreamer).forEach((item: any) => {
            dreamerTotal += item[1];
          });
        }

        if (result?.target_sae) {
          Object.entries(result.target_sae).forEach((item: any) => {
            targetTotal += item[1];
          });
        }

        // Set state for totals
        setSupportBaseDaimonTotal(daimondTotal);
        setSupportBaseDreamerTotal(dreamerTotal);
        setSupportBaseTargetTotal(targetTotal);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getbaseSummary();
    };

    fetchData();
  }, [selectedDataBatch, startDateBatch, endDateBatch]);

  useEffect(() => {
    getCategorySummary();
  }, [selectedDataCategoryPlan, startDateCategoryPlan, endDateCategoryPlan]);
  useEffect(() => {
    getSupportStatistics();
  }, [
    startDateSupportSummary,
    endDateSupportSummary,
    selectedDataSupportSummary,
  ]);
  const getDropDownList = async () => {
    const res = await axios.get(EndPoint.SUPPORT_DROPDOWN_LIST);
    const result = await res.data;
    setSelectedDataSupportSummary(result[1].value);
    setSelectedDataBatch(result[1].value);
    setSelectedDataCategoryPlan(result[1].value);
    setSelectedDataTeacher(result[1].value);
  };

  useEffect(() => {
    getDropDownList();
  }, []);

  useEffect(() => {
    getTeacherSupportStatistics();
  }, [selectedDataTeacher, startDateTeacher, endDateTeacher]);

  return (
    <div className=" w-full flex flex-col gap-[24px]">
      <div className=" flex flex-col gap-[16px] items-center justify-center bg-orange rounded-[16px]  p-[16px]">
        <div className=" flex items-center justify-end gap-[8px] ">
          <p className=" text-[24px] text-white font-semibold">
            Total Support Summary:
          </p>
          <SupportDropdown
            selectedData={selectedDataSupportSummary}
            setSelectedData={setSelectedDataSupportSummary}
            setStartDate={setStartDateSupportSummary}
            setEndDate={setEndDateSupportSummary}
            startDate={startDateSupportSummary}
            endDate={endDateSupportSummary}
          />
        </div>
        <div className=" w-full h-[134px] grid grid-cols-4 items-center gap-[16px] rounded-[16px] ">
          <div
            onClick={() =>
              navigateToDetailsPage("", "", selectedDataSupportSummary)
            }
            className="  h-full bg-white cursor-pointer hover:bg-green hover:text-white rounded-[8px] flex flex-col items-center justify-center gap-[4px]"
          >
            <p className=" text-[20px]">Total support</p>
            <p className=" text-[24px] font-semibold">
              {summaryHistory?.total_support}
            </p>
          </div>

          <div
            onClick={() =>
              navigateToDetailsPage("created", "", selectedDataSupportSummary)
            }
            className="  h-full bg-white cursor-pointer hover:bg-green hover:text-white rounded-[8px] flex flex-col items-center justify-center gap-[4px]"
          >
            <p className=" text-[20px]">Total pending support</p>
            <p className=" text-[24px] font-semibold">
              {summaryHistory?.total_pending_support}
            </p>
          </div>
          <div
            onClick={() =>
              navigateToDetailsPage(
                "processing",
                "",
                selectedDataSupportSummary
              )
            }
            className="  h-full bg-white cursor-pointer hover:bg-green hover:text-white rounded-[8px] flex flex-col items-center justify-center gap-[4px]"
          >
            <p className=" text-[20px]">Total processing support</p>
            <p className=" text-[24px] font-semibold">
              {summaryHistory?.total_processing_support}
            </p>
          </div>
          <div
            onClick={() =>
              navigateToDetailsPage("completed", "", selectedDataSupportSummary)
            }
            className=" h-full bg-white cursor-pointer hover:bg-green hover:text-white rounded-[8px] flex flex-col items-center justify-center gap-[4px]"
          >
            <p className=" text-[20px]">Total completed support</p>
            <p className=" text-[24px] font-semibold">
              {summaryHistory?.total_complete_support}
            </p>
          </div>
        </div>
      </div>

      <div className=" w-full  bg-gray_light  rounded-[16px] p-[16px]">
        {/* <div className=" relative">
          <div
            className="  flex items-center justify-center gap-[4px] cursor-pointer "
            onClick={() => setToggleCalendar(!toogleCalendar)}
          >
            <p className=" text-[31px] text-white">
              {" "}
              {formatDate(selectDate, "MMMM , yyyy")}
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
                  fill="white"
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
                showMonthYear={true}
              />
            </div>
          )}
        </div> */}

        <div className=" flex justify-center gap-[16px] items-center">
          <p className=" text-[24px] font-semibold ">
            Teacher Support Summary:
          </p>
          <SupportDropdown
            selectedData={selectedDataTeacher}
            setSelectedData={setSelectedDataTeacher}
            setStartDate={setStartDateTeacher}
            setEndDate={setEndDateTeacher}
            startDate={startDateTeacher}
            endDate={endDateTeacher}
          />
        </div>
        <div className=" w-full flex  flex-wrap gap-[16px]  justify-center items-center p-[8px]">
          {teacherSummaryHistory?.map((item: any, index: any) => (
            <div
              key={index}
              onClick={() =>
                navigateToDetailsPage(
                  "processing",
                  item?.teacher_phone_number,
                  selectedDataTeacher,
                  item?.teacher_name
                )
              }
              className=" bg-white rounded-[8px] cursor-pointer shadow-md flex flex-col gap-[4px] p-[8px]   max-w-[250px] min-w-[250px]"
            >
              <div className=" flex items-center gap-[8px] ">
                <div className=" relative overflow-auto h-[32px] w-[32px] rounded-full">
                  <Image src={"/assets/im2.jpeg"} fill alt="image" />
                </div>
                <p className=" ">{item?.teacher_name}</p>
              </div>
              <div className=" flex items-center justify-center text-[12px] font-semibold gap-[16px] pt-[4px] ">
                <p className="  ">Total Support</p>
                <p className=" font-bold text-border_orange">
                  {item?.teacher_total_processing +
                    item?.teacher_total_completed}
                </p>
              </div>
              <div className=" flex items-center flex-col">
                <div className=" flex items-center gap-[8px] justify-between">
                  <p className=" text-[12px]">Processing Support</p>
                  <p className=" text-[12px] font-semibold text-[#F59E0B]">
                    {item?.teacher_total_processing}
                  </p>
                </div>
                <div className=" flex items-center gap-[8px] justify-between">
                  <p className=" text-[12px]">Completed Support</p>
                  <p className=" text-[12px] font-semibold text-[#246a30]">
                    {item?.teacher_total_completed}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className=" flex flex-col gap-[16px] justify-center items-center  pt-[16px] bg-bg_orange rounded-[8px]">
        <div className=" flex items-center gap-[16px] justify-center">
          <p className=" text-[24px] font-semibold ">
            Category &amp; Plan Support Summary:
          </p>
          <SupportDropdown
            selectedData={selectedDataCategoryPlan}
            setSelectedData={setSelectedDataCategoryPlan}
            setStartDate={setStartDateCategoryPlan}
            setEndDate={setEndDateCategoryPlan}
            startDate={startDateCategoryPlan}
            endDate={endDateCategoryPlan}
          />
        </div>
        <div className=" w-full flex justify-between  gap-[16px] ">
          <div className="  py-[8px]  grow  bg-orange rounded-lg">
            <h2 className="text-white flex justify-center items-center text-[25px] font-semibold pb-[8px]">
              Category Support Summary
            </h2>
            <div className=" grid grid-cols-3 gap-[8px] px-[8px]">
              {categorySummary.map((category: any, index: any) => (
                <div
                  key={index}
                  className=" p-2 bg-white rounded-lg shadow-md h-[100px]"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-[8px]">
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          color="#5E6579"
                          fill="none"
                        >
                          <path
                            d="M22.0575 12.5811C22.0225 12.3985 21.9249 12.2338 21.7816 12.1154C21.6384 11.9969 21.4583 11.932 21.2723 11.9319H20.4999L20.4431 11.5915C20.4155 11.4248 20.3361 11.271 20.2161 11.1521C20.0961 11.0331 19.9417 10.9549 19.7747 10.9287C19.6987 10.9167 19.6219 10.9087 19.5463 10.8983C19.6773 10.2868 19.5685 9.64831 19.2423 9.11471C19.3275 8.89383 19.3637 8.65712 19.3485 8.42089C19.3333 8.18465 19.2671 7.95453 19.1543 7.74638C19.0416 7.53823 18.885 7.35702 18.6955 7.21523C18.5059 7.07344 18.2879 6.97446 18.0563 6.92511C17.9111 6.14784 17.4998 5.44539 16.893 4.93839C16.2862 4.43139 15.5218 4.15147 14.7311 4.14671C14.6911 4.14671 14.6555 4.15191 14.6175 4.15311C14.4888 3.95098 14.3171 3.77976 14.1145 3.65171C13.912 3.52366 13.6836 3.44192 13.4458 3.41234C13.208 3.38277 12.9666 3.40608 12.7389 3.48061C12.5111 3.55515 12.3026 3.67906 12.1283 3.84351C11.6838 3.55452 11.165 3.40044 10.6347 3.39991C10.2131 3.40164 9.79736 3.49935 9.4191 3.68564C9.04083 3.87194 8.70994 4.14192 8.45154 4.47511C8.16453 4.39142 7.86236 4.37339 7.56743 4.42236C7.2725 4.47132 6.99238 4.58604 6.74781 4.75799C6.50325 4.92995 6.30052 5.15474 6.15464 5.4157C6.00877 5.67666 5.92349 5.96711 5.90514 6.26551C5.60646 6.39106 5.35146 6.60195 5.17208 6.87176C4.99271 7.14157 4.89693 7.45831 4.89674 7.78231C4.89794 7.89711 4.91154 8.01151 4.93674 8.12351C4.67012 8.52544 4.49723 8.98213 4.43083 9.45985C4.36444 9.93758 4.40624 10.4241 4.55314 10.8835C4.44594 10.8983 4.33634 10.9115 4.23314 10.9267C3.88914 10.9787 3.61714 11.2459 3.55954 11.5891L3.50274 11.9307H2.72834C2.5427 11.9308 2.36289 11.9955 2.21971 12.1137C2.07654 12.2318 1.9789 12.3961 1.94354 12.5783L0.191937 21.5711C0.158153 21.745 0.163306 21.9243 0.207025 22.096C0.250745 22.2677 0.331945 22.4276 0.444795 22.5642C0.557646 22.7008 0.699345 22.8107 0.859717 22.886C1.02009 22.9614 1.19515 23.0003 1.37234 22.9999H9.71394C10.0451 23.5463 11.0515 23.7999 12.0003 23.7999C12.9391 23.7999 13.9359 23.5523 14.2767 22.9999H22.6283C22.8055 23.0003 22.9805 22.9614 23.1408 22.8861C23.3012 22.8108 23.4429 22.7009 23.5557 22.5643C23.6685 22.4278 23.7498 22.2679 23.7935 22.0963C23.8373 21.9246 23.8425 21.7454 23.8087 21.5715L22.0575 12.5811ZM6.10634 8.50631C5.9483 8.41129 5.8257 8.26717 5.75723 8.09595C5.68877 7.92472 5.67821 7.7358 5.72717 7.55802C5.77613 7.38023 5.88191 7.22335 6.02837 7.11131C6.17484 6.99927 6.35394 6.93823 6.53834 6.93751C6.66909 6.93712 6.79809 6.96765 6.9148 7.0266C7.03152 7.08554 7.13264 7.17124 7.20994 7.27671C7.27316 7.3619 7.36764 7.41848 7.47259 7.43401C7.52455 7.4417 7.57752 7.43907 7.62847 7.42629C7.67942 7.41351 7.72736 7.39082 7.76954 7.35951C7.81172 7.3282 7.84732 7.28889 7.87431 7.24383C7.9013 7.19876 7.91915 7.14882 7.92683 7.09686C7.93452 7.04489 7.9319 6.99193 7.91912 6.94098C7.90634 6.89002 7.88364 6.84209 7.85234 6.79991C7.718 6.62037 7.54777 6.47074 7.35247 6.36056C7.15717 6.25038 6.94108 6.18204 6.71794 6.15991C6.77581 5.88805 6.92508 5.64422 7.14088 5.46903C7.35668 5.29384 7.62598 5.19788 7.90394 5.19711C7.95274 5.19951 8.00154 5.20511 8.04954 5.21311C8.01754 5.29511 7.98954 5.37871 7.96554 5.46351C7.9416 5.56531 7.95849 5.67243 8.01257 5.76194C8.06666 5.85144 8.15364 5.9162 8.2549 5.94235C8.35615 5.9685 8.46362 5.95396 8.55428 5.90184C8.64494 5.84972 8.71159 5.76417 8.73994 5.66351C8.78554 5.48751 8.85514 5.31951 8.94754 5.16271C9.12198 4.87046 9.36899 4.62825 9.6646 4.45956C9.96021 4.29087 10.2944 4.20143 10.6347 4.19991C11.0115 4.20158 11.3796 4.31276 11.6943 4.51991C11.6343 4.68831 11.6023 4.86551 11.6003 5.04431C11.6003 5.1504 11.6425 5.25214 11.7175 5.32715C11.7925 5.40217 11.8943 5.44431 12.0003 5.44431C12.1064 5.44431 12.2082 5.40217 12.2832 5.32715C12.3582 5.25214 12.4003 5.1504 12.4003 5.04431C12.4003 4.82116 12.489 4.60714 12.6468 4.44935C12.8046 4.29156 13.0186 4.20291 13.2417 4.20291C13.4649 4.20291 13.6789 4.29156 13.8367 4.44935C13.9945 4.60714 14.0831 4.82116 14.0831 5.04431C14.0831 5.1504 14.1253 5.25214 14.2003 5.32715C14.2753 5.40217 14.3771 5.44431 14.4831 5.44431C14.5892 5.44431 14.691 5.40217 14.766 5.32715C14.841 5.25214 14.8831 5.1504 14.8831 5.04431C14.8831 5.01351 14.8755 4.98431 14.8739 4.95351C15.4317 4.98792 15.9634 5.20136 16.3902 5.56211C16.817 5.92286 17.116 6.41167 17.2427 6.95591C17.0562 7.01023 16.8808 7.09762 16.7251 7.21391C16.6403 7.27756 16.5842 7.37232 16.5692 7.47734C16.5542 7.58236 16.5815 7.68904 16.6451 7.77391C16.7088 7.85878 16.8036 7.91489 16.9086 7.92989C17.0136 7.94489 17.1203 7.91756 17.2051 7.85391C17.2998 7.78326 17.4083 7.73329 17.5235 7.70724C17.6387 7.68119 17.7581 7.67963 17.8739 7.70268C17.9898 7.72572 18.0995 7.77285 18.196 7.84101C18.2925 7.90917 18.3735 7.99684 18.434 8.09834C18.4944 8.19984 18.5328 8.3129 18.5468 8.4302C18.5607 8.5475 18.5498 8.66641 18.5149 8.77924C18.4799 8.89208 18.4216 8.9963 18.3438 9.08517C18.266 9.17404 18.1704 9.24556 18.0631 9.29511C17.9819 9.33442 17.9164 9.40002 17.8772 9.48127C17.838 9.56251 17.8274 9.65462 17.8471 9.74264C17.8669 9.83066 17.9158 9.90943 17.9859 9.96616C18.0561 10.0229 18.1433 10.0542 18.2335 10.0551C18.2922 10.0552 18.3501 10.0422 18.4031 10.0171C18.5091 9.96591 18.6091 9.90311 18.7019 9.83031C18.8035 10.1189 18.8256 10.4295 18.7661 10.7296C18.7066 11.0297 18.5675 11.3083 18.3635 11.5363L18.3539 11.5463C18.1003 11.8211 17.7642 12.0062 17.3964 12.0737C17.0285 12.1412 16.6487 12.0875 16.3139 11.9207C16.2466 11.8851 16.1819 11.8448 16.1203 11.7999C16.2649 11.5973 16.3512 11.3589 16.3698 11.1107C16.3884 10.8624 16.3386 10.6139 16.2259 10.3919C16.1782 10.2971 16.0948 10.2252 15.994 10.1919C15.8932 10.1586 15.7833 10.1668 15.6885 10.2145C15.5938 10.2622 15.5218 10.3457 15.4885 10.4465C15.4553 10.5473 15.4634 10.6571 15.5111 10.7519C15.6427 11.0159 15.5607 11.3371 15.3183 11.5059C15.248 11.5528 15.1686 11.5843 15.0852 11.5985C15.0019 11.6127 14.9166 11.6092 14.8346 11.5884C14.7527 11.5675 14.6761 11.5296 14.6098 11.4772C14.5435 11.4249 14.4889 11.3591 14.4495 11.2843C14.426 11.2373 14.3935 11.1954 14.3538 11.161C14.3141 11.1266 14.268 11.1003 14.2182 11.0837C14.1683 11.0671 14.1157 11.0605 14.0633 11.0642C14.0109 11.068 13.9597 11.082 13.9127 11.1055C13.8658 11.129 13.8239 11.1615 13.7894 11.2012C13.755 11.2409 13.7288 11.287 13.7122 11.3369C13.6956 11.3867 13.6889 11.4394 13.6927 11.4918C13.6964 11.5442 13.7104 11.5953 13.7339 11.6423C13.8489 11.8744 14.0266 12.0697 14.2469 12.206C14.4672 12.3423 14.7213 12.4142 14.9803 12.4135C15.1524 12.4123 15.3227 12.3788 15.4823 12.3147C15.6251 12.4399 15.7823 12.5471 15.9511 12.6347C16.5212 12.9302 17.1841 12.9915 17.7987 12.8055C17.4034 13.3452 16.8118 13.708 16.1515 13.8155C16.0468 13.8323 15.953 13.89 15.8907 13.9759C15.8285 14.0618 15.803 14.169 15.8197 14.2737C15.8365 14.3785 15.8942 14.4723 15.9801 14.5345C16.066 14.5967 16.1732 14.6223 16.2779 14.6055C16.5215 14.5633 16.7595 14.4938 16.9875 14.3983C17.1107 14.6163 17.2107 14.8463 17.2859 15.0851C17.2995 15.1267 17.3067 15.1703 17.3067 15.2143C17.3067 15.3871 17.2035 15.5435 17.0443 15.6111C16.8603 15.6823 16.6515 15.6263 16.5279 15.4723C16.2182 15.1085 15.8125 14.839 15.3571 14.6943C14.4927 14.4047 14.1591 14.1459 14.0175 13.8643C14.2251 13.8384 14.4302 13.7956 14.6307 13.7363C14.681 13.7209 14.7276 13.6957 14.7681 13.6622C14.8086 13.6287 14.8421 13.5876 14.8667 13.5412C14.8913 13.4947 14.9065 13.4439 14.9114 13.3916C14.9164 13.3393 14.911 13.2865 14.8955 13.2363C14.8801 13.1861 14.8549 13.1394 14.8214 13.0989C14.7879 13.0584 14.7468 13.0249 14.7004 13.0004C14.654 12.9758 14.6031 12.9606 14.5508 12.9556C14.4985 12.9507 14.4458 12.9561 14.3955 12.9715C14.1711 13.0404 13.9394 13.0829 13.7051 13.0983C13.2538 13.1336 12.8004 13.0652 12.3795 12.8983C12.3024 12.8682 12.2179 12.8628 12.1376 12.8828C12.0573 12.9028 11.9852 12.9472 11.9311 13.0099C11.6502 13.3327 11.2586 13.5385 10.8334 13.587C10.4083 13.6355 9.98034 13.5231 9.6339 13.272C9.28747 13.0208 9.04759 12.649 8.9615 12.2299C8.87541 11.8107 8.94934 11.3745 9.16874 11.0071C9.22342 10.9158 9.23961 10.8066 9.21373 10.7033C9.18785 10.6001 9.12202 10.5114 9.03074 10.4567C8.93945 10.402 8.83018 10.3858 8.72696 10.4117C8.62374 10.4376 8.53503 10.5034 8.48034 10.5947C8.38474 10.7571 8.30834 10.9299 8.25154 11.1095C8.09973 11.1015 7.95661 11.0362 7.8511 10.9268C7.74559 10.8173 7.68556 10.6719 7.68314 10.5199V10.5099C7.68303 10.4577 7.67258 10.4059 7.65238 10.3577C7.63218 10.3096 7.60262 10.2658 7.56543 10.2291C7.52824 10.1924 7.48415 10.1634 7.43569 10.1439C7.38724 10.1243 7.33539 10.1145 7.28314 10.1151C7.17655 10.1162 7.07469 10.1593 6.99977 10.2351C6.92484 10.311 6.88292 10.4133 6.88314 10.5199C6.884 10.8625 7.01118 11.1928 7.24033 11.4475C7.46949 11.7022 7.78452 11.8634 8.12514 11.9003C8.12674 12.0343 8.13874 12.1683 8.16154 12.3003C7.72343 12.3951 7.26768 12.3676 6.84414 12.2208C6.42061 12.0741 6.04559 11.8136 5.76009 11.4681C5.4746 11.1225 5.28962 10.7051 5.2254 10.2614C5.16117 9.81781 5.22017 9.36506 5.39594 8.95271C5.48554 9.04311 5.58514 9.12271 5.69354 9.18991C5.78434 9.2431 5.89244 9.25837 5.99442 9.2324C6.0964 9.20643 6.18404 9.14132 6.23834 9.05118C6.29265 8.96104 6.30924 8.85314 6.28453 8.75085C6.25982 8.64855 6.1958 8.56012 6.10634 8.50471V8.50631ZM4.34634 11.7195C4.53074 11.6923 4.72114 11.6683 4.91034 11.6435C5.27091 12.2197 5.80409 12.6675 6.43395 12.923C7.0638 13.1785 7.75823 13.2288 8.41834 13.0667C8.59782 13.4074 8.8534 13.7021 9.16523 13.9279C9.47706 14.1538 9.83674 14.3048 10.2164 14.3691C10.596 14.4335 10.9853 14.4094 11.3542 14.2989C11.723 14.1884 12.0614 13.9944 12.3431 13.7319C12.615 13.813 12.8949 13.8637 13.1779 13.8831C13.3711 14.6159 13.9295 15.0599 15.1027 15.4531C15.4187 15.5523 15.7011 15.7379 15.9171 15.9895C16.0358 16.1306 16.1836 16.2443 16.3505 16.3226C16.5173 16.401 16.6992 16.4423 16.8835 16.4435C17.0467 16.4435 17.2083 16.4107 17.3583 16.3467C17.5802 16.2519 17.7692 16.0941 17.9022 15.8928C18.0351 15.6914 18.1059 15.4555 18.1059 15.2143C18.1059 15.0859 18.0859 14.9579 18.0451 14.8359C17.9552 14.5533 17.8367 14.2805 17.6915 14.0219C18.3717 13.5329 18.8456 12.8083 19.0207 11.9891C19.1059 11.8879 19.1831 11.7799 19.2511 11.6667C19.3851 11.6839 19.5191 11.6991 19.6539 11.7215L21.0979 20.4071C18.2753 19.4646 15.2229 19.4646 12.4003 20.4071V15.3999C12.4003 15.2938 12.3582 15.1921 12.2832 15.1171C12.2082 15.0421 12.1064 14.9999 12.0003 14.9999C11.8943 14.9999 11.7925 15.0421 11.7175 15.1171C11.6425 15.1921 11.6003 15.2938 11.6003 15.3999V20.4087C8.77806 19.4653 5.72571 19.4642 2.90274 20.4055L4.34634 11.7195ZM1.06074 22.0527C1.02341 22.0076 0.996519 21.9548 0.981996 21.8981C0.967473 21.8414 0.965677 21.7822 0.976737 21.7247L2.72834 12.7319H3.36834L2.11314 20.2755C2.09142 20.4106 2.10457 20.5489 2.15134 20.6774C2.19811 20.806 2.27694 20.9204 2.38036 21.01C2.48378 21.0995 2.60836 21.1611 2.74227 21.1889C2.87619 21.2168 3.015 21.21 3.14554 21.1691C5.27794 20.4783 7.54972 20.3341 9.75234 20.7499L9.63314 22.1999H1.37234C1.25154 22.1999 1.13714 22.1459 1.06074 22.0527ZM12.0003 22.9999C11.0367 22.9999 10.4839 22.7151 10.4027 22.5883L10.5403 20.9283C10.9803 21.0379 11.4107 21.1823 11.8275 21.3599C11.8815 21.386 11.9406 21.3995 12.0005 21.3995C12.0605 21.3995 12.1196 21.386 12.1735 21.3599C12.5902 21.1811 13.0205 21.0358 13.4603 20.9255L13.5979 22.5879C13.5167 22.7151 12.9639 22.9999 12.0003 22.9999ZM22.9399 22.0527C22.9021 22.0988 22.8546 22.1359 22.8007 22.1613C22.7468 22.1868 22.6879 22.2 22.6283 22.1999H14.3687L14.2487 20.7471C16.4526 20.3322 18.7253 20.4776 20.8583 21.1699C20.9888 21.2102 21.1275 21.2166 21.2611 21.1883C21.3948 21.1601 21.519 21.0982 21.622 21.0085C21.725 20.9188 21.8035 20.8043 21.8499 20.6758C21.8963 20.5473 21.9091 20.4091 21.8871 20.2743L20.6331 12.7323H21.2731L23.0251 21.7243C23.0361 21.7819 23.0341 21.8413 23.0194 21.8981C23.0047 21.9549 22.9775 22.0077 22.9399 22.0527Z"
                            fill="#5E6579"
                          />
                          <path
                            d="M10.6743 9.27395C10.5957 9.3451 10.5485 9.44456 10.5432 9.55047C10.5379 9.65638 10.5748 9.76007 10.6459 9.83875C10.9853 10.2134 11.4337 10.472 11.9279 10.578C11.8176 10.7334 11.6717 10.8601 11.5022 10.9475C11.3328 11.0348 11.1449 11.0802 10.9543 11.08C10.8483 11.08 10.7465 11.1221 10.6715 11.1971C10.5965 11.2721 10.5543 11.3739 10.5543 11.48C10.5543 11.586 10.5965 11.6878 10.6715 11.7628C10.7465 11.8378 10.8483 11.88 10.9543 11.88C11.3587 11.8816 11.7539 11.7596 12.087 11.5303C12.42 11.301 12.6751 10.9754 12.8179 10.5972C13.3036 10.5167 13.7531 10.2896 14.106 9.94643C14.459 9.60326 14.6986 9.16037 14.7927 8.67715C14.8037 8.62515 14.8042 8.57149 14.7941 8.5193C14.7841 8.46711 14.7638 8.41745 14.7343 8.3732C14.7049 8.32896 14.6669 8.29103 14.6227 8.26162C14.5784 8.23221 14.5287 8.21192 14.4765 8.20193C14.4243 8.19194 14.3707 8.19244 14.3187 8.20342C14.2667 8.2144 14.2174 8.23563 14.1737 8.26587C14.13 8.29611 14.0928 8.33476 14.0642 8.37955C14.0356 8.42434 14.0162 8.47438 14.0071 8.52675C13.9287 8.93931 13.6907 9.30426 13.3447 9.54235C13.0226 9.75933 12.6336 9.85435 12.2477 9.81036C11.8618 9.76638 11.5042 9.58626 11.2391 9.30235C11.168 9.22372 11.0685 9.17655 10.9626 9.17123C10.8567 9.1659 10.753 9.20285 10.6743 9.27395ZM9.27995 8.83995C9.38603 8.83995 9.48777 8.79781 9.56279 8.72279C9.6378 8.64778 9.67995 8.54604 9.67995 8.43995C9.67995 8.16413 9.78952 7.8996 9.98455 7.70456C10.1796 7.50952 10.4441 7.39995 10.7199 7.39995C10.826 7.39995 10.9278 7.35781 11.0028 7.28279C11.0778 7.20778 11.1199 7.10604 11.1199 6.99995C11.1199 6.89386 11.0778 6.79212 11.0028 6.71711C10.9278 6.64209 10.826 6.59995 10.7199 6.59995C10.2321 6.60048 9.76441 6.79451 9.41945 7.13946C9.0745 7.48441 8.88047 7.95212 8.87995 8.43995C8.87995 8.54604 8.92209 8.64778 8.9971 8.72279C9.07212 8.79781 9.17386 8.83995 9.27995 8.83995ZM12.3999 0.999951V0.599951C12.3999 0.493865 12.3578 0.392123 12.2828 0.317108C12.2078 0.242094 12.106 0.199951 11.9999 0.199951C11.8939 0.199951 11.7921 0.242094 11.7171 0.317108C11.6421 0.392123 11.5999 0.493865 11.5999 0.599951V0.999951C11.5999 1.10604 11.6421 1.20778 11.7171 1.28279C11.7921 1.35781 11.8939 1.39995 11.9999 1.39995C12.106 1.39995 12.2078 1.35781 12.2828 1.28279C12.3578 1.20778 12.3999 1.10604 12.3999 0.999951ZM18.5639 3.07035L18.1639 3.47035C18.1257 3.50725 18.0953 3.55139 18.0743 3.60019C18.0533 3.64899 18.0423 3.70148 18.0418 3.75459C18.0414 3.8077 18.0515 3.86037 18.0716 3.90953C18.0917 3.95869 18.1214 4.00335 18.159 4.04091C18.1965 4.07847 18.2412 4.10817 18.2904 4.12828C18.3395 4.14839 18.3922 4.15851 18.4453 4.15805C18.4984 4.15759 18.5509 4.14656 18.5997 4.12559C18.6485 4.10463 18.6926 4.07416 18.7295 4.03595L19.1295 3.63595C19.1678 3.59905 19.1982 3.55491 19.2192 3.50611C19.2402 3.45731 19.2512 3.40482 19.2516 3.35171C19.2521 3.2986 19.242 3.24593 19.2219 3.19677C19.2018 3.14761 19.1721 3.10295 19.1345 3.06539C19.0969 3.02784 19.0523 2.99813 19.0031 2.97802C18.954 2.95791 18.9013 2.94779 18.8482 2.94825C18.7951 2.94871 18.7426 2.95975 18.6938 2.98071C18.645 3.00167 18.6008 3.03215 18.5639 3.07035ZM5.55315 4.15315C5.63225 4.15313 5.70956 4.12967 5.77533 4.08571C5.84109 4.04176 5.89235 3.97929 5.92262 3.90621C5.95288 3.83313 5.96081 3.75272 5.94538 3.67514C5.92995 3.59756 5.89187 3.52629 5.83595 3.47035L5.43595 3.07035C5.39905 3.03215 5.35491 3.00167 5.30611 2.98071C5.25731 2.95975 5.20482 2.94871 5.15171 2.94825C5.09859 2.94779 5.04592 2.95791 4.99676 2.97802C4.9476 2.99813 4.90294 3.02784 4.86539 3.06539C4.82783 3.10295 4.79813 3.14761 4.77802 3.19677C4.7579 3.24593 4.74778 3.2986 4.74824 3.35171C4.74871 3.40482 4.75974 3.45731 4.7807 3.50611C4.80167 3.55491 4.83214 3.59905 4.87034 3.63595L5.27034 4.03595C5.34534 4.11097 5.44707 4.15313 5.55315 4.15315ZM8.63235 2.46995C8.69815 2.46997 8.76293 2.45375 8.82097 2.42274C8.879 2.39173 8.92849 2.34688 8.96504 2.29216C9.0016 2.23745 9.02409 2.17457 9.03053 2.10908C9.03696 2.0436 9.02715 1.97753 9.00194 1.91675L8.54235 0.807951C8.523 0.758338 8.49395 0.713086 8.45689 0.674849C8.41983 0.636612 8.37551 0.60616 8.32652 0.585277C8.27754 0.564395 8.22488 0.553504 8.17163 0.553242C8.11838 0.55298 8.06562 0.563353 8.01643 0.583753C7.96724 0.604152 7.92262 0.634167 7.88519 0.672038C7.84775 0.709909 7.81826 0.754873 7.79843 0.804293C7.7786 0.853714 7.76884 0.906596 7.76972 0.959838C7.7706 1.01308 7.7821 1.06561 7.80355 1.11435L8.26274 2.22315C8.29304 2.29623 8.34433 2.35868 8.41012 2.40261C8.4759 2.44653 8.55324 2.46997 8.63235 2.46995ZM15.9799 0.591551C15.882 0.551019 15.7719 0.551045 15.674 0.591623C15.576 0.632201 15.4982 0.71001 15.4575 0.807951L14.9979 1.91675C14.9778 1.96529 14.9674 2.01732 14.9674 2.06987C14.9673 2.12242 14.9777 2.17446 14.9977 2.22303C15.0178 2.27159 15.0472 2.31573 15.0844 2.35291C15.1215 2.3901 15.1656 2.41961 15.2141 2.43975C15.2627 2.4599 15.3147 2.47028 15.3673 2.47032C15.4198 2.47036 15.4719 2.46004 15.5204 2.43997C15.569 2.41989 15.6131 2.39045 15.6503 2.35331C15.6875 2.31618 15.717 2.27209 15.7371 2.22355L16.1963 1.11475C16.2165 1.06619 16.227 1.01413 16.227 0.961543C16.2271 0.908955 16.2167 0.856873 16.1966 0.808277C16.1765 0.759681 16.1471 0.715526 16.1099 0.678338C16.0727 0.641149 16.0285 0.611658 15.9799 0.591551ZM20.1299 7.23275C20.1825 7.23266 20.2346 7.22219 20.2831 7.20195L21.3915 6.74275C21.4896 6.70217 21.5675 6.62432 21.6081 6.52631C21.6487 6.4283 21.6487 6.31818 21.6081 6.22015C21.5676 6.12213 21.4897 6.04424 21.3917 6.00362C21.2937 5.963 21.1836 5.96297 21.0855 6.00355L19.9767 6.46275C19.891 6.49799 19.8201 6.56195 19.7762 6.64368C19.7324 6.72542 19.7183 6.81984 19.7364 6.91081C19.7545 7.00177 19.8037 7.08362 19.8755 7.14235C19.9472 7.20108 20.0372 7.23303 20.1299 7.23275ZM3.71674 7.20195C3.76528 7.22207 3.81731 7.23243 3.86985 7.23244C3.92239 7.23246 3.97442 7.22212 4.02296 7.20203C4.07151 7.18193 4.11562 7.15247 4.15278 7.11533C4.18994 7.07819 4.21943 7.03409 4.23954 6.98555C4.25966 6.93702 4.27003 6.88499 4.27004 6.83245C4.27005 6.77991 4.25971 6.72788 4.23962 6.67933C4.21953 6.63079 4.19007 6.58667 4.15292 6.54951C4.11578 6.51235 4.07168 6.48287 4.02314 6.46275L2.91434 6.00355C2.81632 5.96297 2.70619 5.963 2.60819 6.00362C2.51018 6.04424 2.43232 6.12213 2.39174 6.22015C2.35117 6.31818 2.35119 6.4283 2.39181 6.52631C2.43243 6.62432 2.51032 6.70217 2.60834 6.74275L3.71674 7.20195Z"
                            fill="#5E6579"
                          />
                        </svg>
                      </div>
                      <h3 className="text-gray text-[15px] whitespace-nowrap font-bold">
                        {category.category_name}
                      </h3>
                    </div>
                    <div className="text-gray-700 text-xl font-bold">
                      {category.total_support}
                    </div>
                  </div>
                  <div className=" flex flex-col">
                    <div className="flex justify-center items-center gap-x-[16px] text-[13px] ">
                      <div className=" ">Processing Support</div>
                      <div className=" ">{category.processing_support}</div>
                    </div>
                    <div className="flex justify-center items-center gap-x-[16px] text-[13px]">
                      <div className=" ">Pending Support</div>
                      <div className=" ">{category.pending_support}</div>
                    </div>
                    <div className="flex justify-center items-center gap-x-[16px] text-[13px]">
                      <div className=" ">Completed Support</div>
                      <div className=" ">{category.completed_support}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="  bg-green rounded-[8px] px-[8px]">
            <p className=" flex items-center whitespace-nowrap justify-center text-[25px] pt-[16px] font-semibold text-white">
              Plan Support Summary
            </p>
            <div className=" w-full grid grid-cols-2 gap-[8px] text-[12px] items-center justify-center ">
              <div className="  h-[100px] flex justify-center items-center flex-col bg-white rounded-[8px] p-[8px]">
                <div className=" w-full flex items-center justify-between">
                  <p className=" text-orange">Basic</p>
                  <p className=" text-[16px] font-bold">
                    {supportPlanSummary?.total_basic}
                  </p>
                </div>

                <div className=" w-full flex flex-col">
                  <div className=" flex items-center justify-between">
                    <p className=" whitespace-nowrap text-[10px]">
                      Processing Support
                    </p>
                    <p className=" text-[#F59E0B] font-bold">
                      {supportPlanSummary?.basic_processing}
                    </p>
                  </div>
                  <div className=" flex items-center justify-between">
                    <p className=" whitespace-nowrap text-[10px]">
                      Pending Support
                    </p>
                    <p className="text-[#246a30] font-bold">
                      {supportPlanSummary?.basic_pending}
                    </p>
                  </div>
                  <div className=" flex items-center justify-between">
                    <p className=" whitespace-nowrap text-[10px]">
                      Completed Support
                    </p>
                    <p className="text-[#246a30] font-bold">
                      {supportPlanSummary?.basic_completed}
                    </p>
                  </div>
                </div>
              </div>
              <div className="  h-[100px] flex justify-center items-center flex-col bg-white rounded-[8px] p-[8px]">
                <div className=" w-full flex items-center justify-between">
                  <p className=" text-orange">Premium</p>
                  <p className=" text-[16px] font-bold">
                    {supportPlanSummary?.total_premium}
                  </p>
                </div>

                <div className=" w-full flex flex-col">
                  <div className=" flex items-center justify-between">
                    <p className=" whitespace-nowrap text-[10px]">
                      Processing Support
                    </p>
                    <p className=" text-[#F59E0B] font-bold">
                      {supportPlanSummary?.premium_processing}
                    </p>
                  </div>
                  <div className=" flex items-center justify-between">
                    <p className=" whitespace-nowrap text-[10px]">
                      Pending Support
                    </p>
                    <p className="text-[#246a30] font-bold">
                      {supportPlanSummary?.premium_pending}
                    </p>
                  </div>
                  <div className=" flex items-center justify-between">
                    <p className=" whitespace-nowrap text-[10px]">
                      Completed Support
                    </p>
                    <p className="text-[#246a30] font-bold">
                      {supportPlanSummary?.premium_completed}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=" bg-gray_light rounded-[16px] p-[16px]">
        <div className="flex items-center justify-center  text-[25px] pb-[8px] font-semibold gap-[24px] ">
          <p> Package Support Summary</p>
          <SupportDropdown
            selectedData={selectedDataPackage}
            setSelectedData={setSelectedDataPackage}
            setStartDate={setStartDatePackage}
            setEndDate={setEndDatePackage}
            startDate={startDatePackage}
            endDate={endDatePackage}
          />
        </div>

        <div className=" flex flex-wrap justify-center text-[12px] gap-[8px] items-center">
          <div className=" w-[208px]  flex justify-center items-center flex-col bg-white rounded-[8px] p-[8px] gap-[8px]">
            <div className=" w-full flex items-center justify-between">
              <p className=" text-orange">Basic</p>
              <p className=" text-[16px] font-bold">2000</p>
            </div>

            <div className=" w-full flex flex-col">
              <div className=" flex items-center justify-between">
                <p>Processing Support</p>
                <p className=" text-[#F59E0B] font-bold">2000</p>
              </div>
              <div className=" flex items-center justify-between">
                <p>Completed Support</p>
                <p className="text-[#246a30] font-bold">2000</p>
              </div>
            </div>
          </div>
          <div className=" w-[208px]  flex justify-center items-center flex-col bg-white rounded-[8px] p-[8px] gap-[8px]">
            <div className=" w-full flex items-center justify-between">
              <p className=" text-orange">Basic</p>
              <p className=" text-[16px] font-bold">2000</p>
            </div>

            <div className=" w-full flex flex-col">
              <div className=" flex items-center justify-between">
                <p>Processing Support</p>
                <p className=" text-[#F59E0B] font-bold">2000</p>
              </div>
              <div className=" flex items-center justify-between">
                <p>Completed Support</p>
                <p className="text-[#246a30] font-bold">2000</p>
              </div>
            </div>
          </div>
          <div className=" w-[208px]  flex justify-center items-center flex-col bg-white rounded-[8px] p-[8px] gap-[8px]">
            <div className=" w-full flex items-center justify-between">
              <p className=" text-orange">Basic</p>
              <p className=" text-[16px] font-bold">2000</p>
            </div>

            <div className=" w-full flex flex-col">
              <div className=" flex items-center justify-between">
                <p>Processing Support</p>
                <p className=" text-[#F59E0B] font-bold">2000</p>
              </div>
              <div className=" flex items-center justify-between">
                <p>Completed Support</p>
                <p className="text-[#246a30] font-bold">2000</p>
              </div>
            </div>
          </div>
          <div className=" w-[208px]  flex justify-center items-center flex-col bg-white rounded-[8px] p-[8px] gap-[8px]">
            <div className=" w-full flex items-center justify-between">
              <p className=" text-orange">Basic</p>
              <p className=" text-[16px] font-bold">2000</p>
            </div>

            <div className=" w-full flex flex-col">
              <div className=" flex items-center justify-between">
                <p>Processing Support</p>
                <p className=" text-[#F59E0B] font-bold">2000</p>
              </div>
              <div className=" flex items-center justify-between">
                <p>Completed Support</p>
                <p className="text-[#246a30] font-bold">2000</p>
              </div>
            </div>
          </div>
          <div className=" w-[208px]  flex justify-center items-center flex-col bg-white rounded-[8px] p-[8px] gap-[8px]">
            <div className=" w-full flex items-center justify-between">
              <p className=" text-orange">Basic</p>
              <p className=" text-[16px] font-bold">2000</p>
            </div>

            <div className=" w-full flex flex-col">
              <div className=" flex items-center justify-between">
                <p>Processing Support</p>
                <p className=" text-[#F59E0B] font-bold">2000</p>
              </div>
              <div className=" flex items-center justify-between">
                <p>Completed Support</p>
                <p className="text-[#246a30] font-bold">2000</p>
              </div>
            </div>
          </div>

          <div className=" w-[208px]  flex justify-center items-center flex-col bg-white rounded-[8px] p-[8px] gap-[8px]">
            <div className=" w-full flex items-center justify-between">
              <p className=" text-orange">Basic</p>
              <p className=" text-[16px] font-bold">2000</p>
            </div>

            <div className=" w-full flex flex-col">
              <div className=" flex items-center justify-between">
                <p>Processing Support</p>
                <p className=" text-[#F59E0B] font-bold">2000</p>
              </div>
              <div className=" flex items-center justify-between">
                <p>Completed Support</p>
                <p className="text-[#246a30] font-bold">2000</p>
              </div>
            </div>
          </div>
          <div className=" w-[208px]  flex justify-center items-center flex-col bg-white rounded-[8px] p-[8px] gap-[8px]">
            <div className=" w-full flex items-center justify-between">
              <p className=" text-orange">Basic</p>
              <p className=" text-[16px] font-bold">2000</p>
            </div>

            <div className=" w-full flex flex-col">
              <div className=" flex items-center justify-between">
                <p>Processing Support</p>
                <p className=" text-[#F59E0B] font-bold">2000</p>
              </div>
              <div className=" flex items-center justify-between">
                <p>Completed Support</p>
                <p className="text-[#246a30] font-bold">2000</p>
              </div>
            </div>
          </div>
          <div className=" w-[208px]  flex justify-center items-center flex-col bg-white rounded-[8px] p-[8px] gap-[8px]">
            <div className=" w-full flex items-center justify-between">
              <p className=" text-orange">Basic</p>
              <p className=" text-[16px] font-bold">2000</p>
            </div>

            <div className=" w-full flex flex-col">
              <div className=" flex items-center justify-between">
                <p>Processing Support</p>
                <p className=" text-[#F59E0B] font-bold">2000</p>
              </div>
              <div className=" flex items-center justify-between">
                <p>Completed Support</p>
                <p className="text-[#246a30] font-bold">2000</p>
              </div>
            </div>
          </div>
          <div className=" w-[208px]  flex justify-center items-center flex-col bg-white rounded-[8px] p-[8px] gap-[8px]">
            <div className=" w-full flex items-center justify-between">
              <p className=" text-orange">Basic</p>
              <p className=" text-[16px] font-bold">2000</p>
            </div>

            <div className=" w-full flex flex-col">
              <div className=" flex items-center justify-between">
                <p>Processing Support</p>
                <p className=" text-[#F59E0B] font-bold">2000</p>
              </div>
              <div className=" flex items-center justify-between">
                <p>Completed Support</p>
                <p className="text-[#246a30] font-bold">2000</p>
              </div>
            </div>
          </div>
          <div className=" w-[208px]  flex justify-center items-center flex-col bg-white rounded-[8px] p-[8px] gap-[8px]">
            <div className=" w-full flex items-center justify-between">
              <p className=" text-orange">Basic</p>
              <p className=" text-[16px] font-bold">2000</p>
            </div>

            <div className=" w-full flex flex-col">
              <div className=" flex items-center justify-between">
                <p>Processing Support</p>
                <p className=" text-[#F59E0B] font-bold">2000</p>
              </div>
              <div className=" flex items-center justify-between">
                <p>Completed Support</p>
                <p className="text-[#246a30] font-bold">2000</p>
              </div>
            </div>
          </div>
          <div className=" w-[208px]  flex justify-center items-center flex-col bg-white rounded-[8px] p-[8px] gap-[8px]">
            <div className=" w-full flex items-center justify-between">
              <p className=" text-orange">Basic</p>
              <p className=" text-[16px] font-bold">2000</p>
            </div>

            <div className=" w-full flex flex-col">
              <div className=" flex items-center justify-between">
                <p>Processing Support</p>
                <p className=" text-[#F59E0B] font-bold">2000</p>
              </div>
              <div className=" flex items-center justify-between">
                <p>Completed Support</p>
                <p className="text-[#246a30] font-bold">2000</p>
              </div>
            </div>
          </div>
          <div className=" w-[208px]  flex justify-center items-center flex-col bg-white rounded-[8px] p-[8px] gap-[8px]">
            <div className=" w-full flex items-center justify-between">
              <p className=" text-orange">Basic</p>
              <p className=" text-[16px] font-bold">2000</p>
            </div>

            <div className=" w-full flex flex-col">
              <div className=" flex items-center justify-between">
                <p>Processing Support</p>
                <p className=" text-[#F59E0B] font-bold">2000</p>
              </div>
              <div className=" flex items-center justify-between">
                <p>Completed Support</p>
                <p className="text-[#246a30] font-bold">2000</p>
              </div>
            </div>
          </div>
          <div className=" w-[208px]  flex justify-center items-center flex-col bg-white rounded-[8px] p-[8px] gap-[8px]">
            <div className=" w-full flex items-center justify-between">
              <p className=" text-orange">Basic</p>
              <p className=" text-[16px] font-bold">2000</p>
            </div>

            <div className=" w-full flex flex-col">
              <div className=" flex items-center justify-between">
                <p>Processing Support</p>
                <p className=" text-[#F59E0B] font-bold">2000</p>
              </div>
              <div className=" flex items-center justify-between">
                <p>Completed Support</p>
                <p className="text-[#246a30] font-bold">2000</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=" w-full bg-green p-[16px] rounded-[16px] ">
        <div className="flex items-center justify-center text-white text-[25px] pb-[8px] font-semibold gap-[24px] ">
          <p>Plan Support Summary</p>
          <SupportDropdown
            selectedData={selectedDataBatch}
            setSelectedData={setSelectedDataBatch}
            setStartDate={setStartDateBatch}
            setEndDate={setEndDateBatch}
            startDate={startDateBatch}
            endDate={endDateBatch}
          />
        </div>

        <div className=" grid grid-cols-3 gap-[16px] ">
          <div className=" p-[8px] flex flex-col gap-[4px] shadow-md rounded-[8px] bg-bg_card">
            <div className="flex justify-between items-center">
              <p className=" font-bold">Daimond</p>
              <p className=" text-orange">{suportBaseDaimonTotal}</p>
            </div>

            {suportBaseSummary.dimond &&
              Object.entries(suportBaseSummary?.dimond).map(
                (item: any, index: any) => (
                  <div
                    key={index}
                    className=" w-full flex justify-between items-center drop-shadow  rounded-[8px] h-[35px] px-[8px] text-[16px] bg-white"
                  >
                    <p className=" text-orange">{item[0]}</p>
                    <p className=" font-bold">{item[1]}</p>
                  </div>
                )
              )}
          </div>
          <div className=" p-[8px] flex flex-col gap-[4px] shadow-md rounded-[8px] bg-bg_card">
            <div className="flex justify-between items-center">
              <p className=" font-bold">Dreamer</p>
              <p className=" text-orange">{suportBaseDreamerTotal}</p>
            </div>
            {suportBaseSummary.dimond &&
              Object.entries(suportBaseSummary?.dreamer).map(
                (item: any, index: any) => (
                  <div
                    key={index}
                    className=" w-full flex justify-between items-center drop-shadow  rounded-[8px] h-[35px] px-[8px] text-[16px] bg-white"
                  >
                    <p className=" text-orange">{item[0]}</p>
                    <p className=" font-bold">{item[1]}</p>
                  </div>
                )
              )}
          </div>
          <div className=" p-[8px] flex flex-col gap-[4px] shadow-md rounded-[8px] bg-bg_card">
            <div className="flex justify-between items-center">
              <p className=" font-bold">Target SAE</p>
              <p className=" text-orange">{suportBaseTargetTotal}</p>
            </div>
            {suportBaseSummary.dimond &&
              Object.entries(suportBaseSummary?.target_sae).map(
                (item: any, index: any) => (
                  <div
                    key={index}
                    className=" w-full flex justify-between items-center drop-shadow  rounded-[8px] h-[35px] px-[8px] text-[16px] bg-white"
                  >
                    <p className=" text-orange">{item[0]}</p>
                    <p className=" font-bold">{item[1]}</p>
                  </div>
                )
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportSummary;
