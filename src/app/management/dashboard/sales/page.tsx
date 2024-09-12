"use client";
import { ApiGet } from "@/app/action";

import Department from "@/components/sales/Department";
import SaleGrid from "@/components/sales/SaleGrid";
import { EndPoint } from "@/utils/api";
import axios from "axios";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import CustomBarChart from "@/components/CustomBarChart";
import Select from "react-select";
import CustomEnrollmentChart from "@/components/CustomEnrollmentChart";
import {
  getCurrentMonthLabel,
  monthLabel,
  monthList,
  userSaleShowList,
  yearList,
} from "@/utils/staticData";
import { getCurrentYearLabel } from "../../../../utils/staticData";
import Pagination from "@/components/Pagination";
import DailySale from "@/components/sales/DailySale";
import MonthlySale from "@/components/sales/MonthlySale";
import InstituteSale from "@/components/sales/InstituteSale";

import CustomMultColumnChart from "@/components/CustomMultiColumnChart";
import RefardReport from "@/components/sales/RefardReport";

type Props = {};

const page = (props: Props) => {
  const [selectUserSaleSchedule, setSelectUserSaleSchedule] =
    useState("Daily Sales");

  const [selectDepartmentOrInstitute, setSelectDepartmentOrInstitute] =
    useState("Department");

  const [sessionList, setSessionList] = useState<any>([]);
  const [selectSession, setSelelctSession] = useState<any>("");
  const [selectedSemester, setSelectedSemester] = useState<any>("");
  const [departmentList, setDepartmentList] = useState<any>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<any>([]);
  const [selectedDepartment2, setSelectedDepartment2] = useState<any>([]);
  const [polytechnicList, setPolytechnicList] = useState<any>([]);
  const [selectedpolytechnic, setSelectedPolytechnic] = useState<any>([]);

  const [month, setMonth] = useState<any>(getCurrentMonthLabel());
  const [month2, setMonth2] = useState<any>(getCurrentMonthLabel());
  const [year, setYear] = useState<any>(getCurrentYearLabel());
  const [year2, setYear2] = useState<any>(getCurrentYearLabel());

  const [showRefard, setShowRefard] = useState(false);

  // const [userDailyPageNo, setUserDailyPageNo] = useState(0);
  // const [userDailyPageSize, setUserDailyPageSize] = useState(9);
  // const [totaluserDaily, setTotalUserDaily] = useState(0);

  // const [userMonthlyPageNo, setUserMonthlyPageNo] = useState(0);
  // const [userMonthlyPageSize, setUserMonthlyPageSize] = useState(9);
  // const [totaluserMonthly, setTotalUserMonthly] = useState(0);

  // const [institutePageNo, setInstitutePageNo] = useState(0);
  // const [institutePageSize, setInstitutePageSize] = useState(6);
  // const [totalDepartment, setTotalDepartment] = useState(0);

  // const [departmentPageNo, setDepartmentPageNo] = useState(0);
  // const [departmentPageSize, setDepartmentPageSize] = useState(8);
  // const [totalInstitute, setTotalInstitute] = useState(0);

  const [saleCategoryList, setSaleCategoryList] = useState<any>([]);

  // const [emplyoeeDailySaleList, setEmployeeDailySaleList] = useState<any>([]);
  // const [emplyoeeMonthlySaleList, setEmployeeMonthlySaleList] = useState<any>(
  //   []
  // );

  // const [departmentSaleList, setDepartmentSaleList] = useState<any>([]);
  const [selectCategory, setSelectCategory] = useState<any>(null);
  const [categoryList, setCategoryList] = useState<any>([]);
  const [selectedSaleCategoryList, setSelectedSaleCategoryList] = useState<any>(
    []
  );
  // const [instituteSale, setInstituteSale] = useState([]);

  const [dailyPolytechnicEnrollment, setDailyPolytechnicEnrollment] =
    useState<any>([]);
  const [dailyPolytechnicIncome, setDailyPolytechnicIncome] = useState<any>([]);

  const [monthlyPolytechnicEnrollment, setMonthlyPolytechnicEnrollment] =
    useState<any>([]);
  const [monthlyPolytechnicIncome, setMonthlyPolytechnicIncome] = useState<any>(
    []
  );

  const [dailyDepartmentEnrollment, setDailyDepartmentEnrollment] =
    useState<any>([]);
  const [dailyDepartmentIncome, setDailyDepartmentIncome] = useState<any>([]);

  const [monthlyDepartmentEnrollment, setMonthlyDepartmentEnrollment] =
    useState<any>([]);
  const [monthlyDepartmentIncome, setMonthlyDepartmentIncome] = useState<any>(
    []
  );

  const getPolytechnic = async () => {
    const res = await axios.get(EndPoint.GET_DROPDOWN_POLYTECHNIC, {
      params: {
        limit: 1020,
      },
    });
    const resData = await res?.data?.results;
    const allDData = [...resData, { label: "All polytechnic", value: "" }];
    setPolytechnicList(allDData);
    setSelectedPolytechnic({ label: "All polytechnic", value: "" });
  };

  const getDepartment = async () => {
    const res = await axios.get(EndPoint.GET_DROPDOWN_DEPARTMENT, {
      params: {
        limit: 400,
      },
    });
    const resData = await res?.data?.results;
    const allDData = [...resData, { label: "All department", value: "" }];
    setDepartmentList(allDData);
    setSelectedDepartment({ label: "All department", value: "" });
    setSelectedDepartment2({ label: "All department", value: "" });
  };

  const getDailyPolytechnicChartData = async () => {
    if (
      selectedpolytechnic?.value !== undefined &&
      selectedDepartment2?.value !== undefined &&
      selectCategory !== null
    ) {
      const res = await axios.get(
        EndPoint.POLYTECHNIC_DAILY_CHART +
          `?polytechnic_id=${selectedpolytechnic?.value}&department_id=${selectedDepartment2?.value}&month=${month?.value}&year=${year?.value}&category_id=${selectCategory}`
      );
      const resData = await res.data;

      const transformedData = resData?.map((item: any) => ({
        day: item.day,
        income: item.total_earning,
      }));

      const transformedEnrollData = resData?.map((item: any) => ({
        day: item.day,
        enroll: item.enrollments,
      }));
      setDailyPolytechnicEnrollment(transformedEnrollData);
      // console.log("t", transformedData);
      setDailyPolytechnicIncome(transformedData);
    }
  };

  const getMonthlyPolytechnicChartData = async () => {
    if (
      selectedpolytechnic?.value !== undefined &&
      selectedDepartment2?.value !== undefined &&
      selectCategory !== null
    ) {
      const res = await axios.get(
        EndPoint.POLYTECHNIC_MONTHLY_CHART +
          `?polytechnic_id=${selectedpolytechnic?.value}&department_id=${selectedDepartment2?.value}&year=${year?.value}&category_id=${selectCategory}`
      );
      const resData = await res.data;
      const transformedData = resData?.map((item: any) => ({
        day: monthLabel(item.month),
        income: item.total_earning,
      }));
      const transformedEnrollData = resData?.map((item: any) => ({
        day: monthLabel(item.month),
        enroll: item.enrollments,
      }));
      setMonthlyPolytechnicEnrollment(transformedEnrollData);
      setMonthlyPolytechnicIncome(transformedData);
    }
  };

  const getDailyDepartmentChartData = async () => {
    if (selectedDepartment?.value !== undefined && selectCategory !== null) {
      const res = await axios.get(
        EndPoint.DEPARTMENT_DAILY_CHART +
          `?department_id=${selectedDepartment?.value}&month=${month2?.value}&year=${year2?.value}&category_id=${selectCategory}`
      );
      const resData = await res.data;

      const transformedData = resData?.map((item: any) => ({
        day: item.day,
        income: item.total_earning,
      }));

      const transformedEnrollData = resData?.map((item: any) => ({
        day: item.day,
        enroll: item.enrollments,
      }));
      setDailyDepartmentEnrollment(transformedEnrollData);
      // console.log("t", transformedData);
      setDailyDepartmentIncome(transformedData);
    }
  };

  const getMonthlyDepartmentChartData = async () => {
    if (selectedDepartment?.value !== undefined && selectCategory !== null) {
      const res = await axios.get(
        EndPoint.DEPARTMENT_MONTHLY_CHART +
          `?department_id=${selectedDepartment?.value}&year=${year2?.value}&category_id=${selectCategory}`
      );
      const resData = await res.data;
      const transformedData = resData?.map((item: any) => ({
        day: monthLabel(item.month),
        income: item.total_earning,
      }));
      const transformedEnrollData = resData?.map((item: any) => ({
        day: monthLabel(item.month),
        enroll: item.enrollments,
      }));
      setMonthlyDepartmentEnrollment(transformedEnrollData);
      setMonthlyDepartmentIncome(transformedData);
    }
  };

  // const getSales = async () => {
  //   const res = await axios.get(EndPoint.DASHBOARD_INSTITUTE_MONTHLY_SALE, {
  //     params: {
  //       category_id: selectCategory,
  //       limit: institutePageSize,
  //       offset: institutePageSize * institutePageNo,
  //     },
  //   });
  //   const resData = await res.data;
  //   setInstituteSale(resData?.results);
  //   setTotalInstitute(resData?.count);
  // };

  // const getSalesListDepartment = async () => {
  //   // console.log(selectCategory);
  //   const res = await axios.get(EndPoint.DASHBOARD_DEPARTMENT_MONTHLY_SALE, {
  //     params: {
  //       category_id: selectCategory,
  //       limit: departmentPageSize,
  //       offset: departmentPageSize * departmentPageNo,
  //     },
  //   });
  //   const resData = await res.data;
  //   setDepartmentSaleList(resData?.results);
  //   setTotalDepartment(resData?.count);
  // };
  const getCategoryData = async () => {
    const { resData } = await ApiGet(EndPoint.GET_CATAGORY, { limits: 200 });
    // console.log(resData);
    setSelectCategory(resData?.results[0]?.id);

    setCategoryList(resData?.results);
  };
  const getSaleCategoryData = async () => {
    const { resData } = await ApiGet(EndPoint.DASHBOARD_CATEGORY_SALE, {
      category_id: selectCategory,
      limits: 200,
    });

    setSaleCategoryList(resData?.results);
    setSelectedSaleCategoryList(resData?.results[0]);
  };
  const filterData = () => {
    const listFilter = saleCategoryList?.find(
      (item: any) => item.id === selectCategory
    );

    setSelectedSaleCategoryList(listFilter);
  };

  const categoryName = useCallback(() => {
    console.log(categoryList);
    const selectedLabel = categoryList?.find(
      (item: any) => item?.id === selectCategory
    )?.category_name;
    return selectedLabel;
  }, [categoryList, selectCategory]);
  // const getDailySalesListUser = async () => {
  //   setMarketerIsLoading(true);
  //   const res = await axios.get(EndPoint.DASHBOARD_SALES_USER_DAILY, {
  //     params: {
  //       category_id: selectCategory,
  //       limit: userDailyPageSize,
  //       offset: userDailyPageSize * userDailyPageNo,
  //     },
  //   });
  //   const resData = await res?.data;

  //   setEmployeeDailySaleList(resData?.results);
  //   setTotalUserDaily(resData?.count);
  //   setMarketerIsLoading(false);
  // };
  // const getMonthlySalesListUser = async () => {
  //   if (selectCategory !== "") {
  //     setMarketerIsLoading(true);
  //     const res = await axios.get(EndPoint.DASHBOARD_SALES_USER_MONTHLY, {
  //       params: {
  //         category_id: selectCategory,
  //         limit: userMonthlyPageSize,
  //         offset: userMonthlyPageSize * userMonthlyPageNo,
  //       },
  //     });
  //     const resData = await res?.data;
  //     setTotalUserMonthly(resData?.count);
  //     setEmployeeMonthlySaleList(resData?.results);
  //     setMarketerIsLoading(false);
  //   }
  // };

  useEffect(() => {
    getDailyDepartmentChartData();
    getMonthlyDepartmentChartData();
  }, [selectedDepartment, month2, year2, selectCategory]);

  useEffect(() => {
    getDailyPolytechnicChartData();
    getMonthlyPolytechnicChartData();
  }, [selectedpolytechnic, month, year, selectedDepartment2, selectCategory]);

  useEffect(() => {
    filterData();
  }, [selectCategory]);

  // useEffect(() => {
  //   getSalesListDepartment();
  // }, [selectCategory, departmentPageNo, departmentPageSize]);
  // useEffect(() => {
  //   getSales();
  // }, [selectCategory, institutePageNo, institutePageSize]);

  // useEffect(() => {
  //   getDailySalesListUser();
  // }, [selectCategory, userDailyPageNo, userDailyPageSize]);
  // useEffect(() => {
  //   getMonthlySalesListUser();
  // }, [selectCategory, userMonthlyPageNo, userDailyPageNo]);
  console.log(selectCategory);

  useEffect(() => {
    getSaleCategoryData();
  }, [selectCategory]);
  useEffect(() => {
    getCategoryData();
    getPolytechnic();
    getDepartment();
  }, []);

  return (
    <div className=" w-full flex flex-col gap-[24px] ">
      <div className=" flex  justify-between flex-col xl:flex-row">
        {!showRefard && (
          <div className="flex items-center divide-gray_light divide-x-[1px] border-b-[1px] border-gray_light shadow-md ">
            {categoryList?.map((item: any, index: number) => (
              <button
                key={index}
                onClick={() => {
                  setSelectCategory(item?.id);
                }}
                className={` ${
                  selectCategory === item?.id
                    ? "bg-black text-white"
                    : " bg-white"
                } p-2 text-[14px]`}
              >
                {item?.category_name}
              </button>
            ))}
          </div>
        )}
        <button
          onClick={() => setShowRefard(!showRefard)}
          className={`  p-2 text-[14px] ${
            showRefard ? "bg-green/80 text-white" : "bg-title/80 text-white"
          }  rounded-sm`}
        >
          Refard Report {showRefard ? "Hide" : "Show"}
        </button>
      </div>

      {!showRefard && <SaleGrid saleDetails={selectedSaleCategoryList} />}
      {showRefard && <RefardReport />}

      {!showRefard && (
        <div className="  flex bg-green/40  h-[40px] shadow-md overflow-auto no-scrollbar">
          {userSaleShowList?.map((item: any, index: any) => (
            <button
              key={index}
              onClick={() => setSelectUserSaleSchedule(item)}
              className={` flex-1 px-4 ${
                item === selectUserSaleSchedule ? "bg-orange text-white" : ""
              } hover:bg-border_orange hover:text-white active:bg-orange active:text-white `}
            >
              {categoryName()} {item}
            </button>
          ))}
        </div>
      )}
      {!showRefard &&
        selectCategory &&
        selectUserSaleSchedule === userSaleShowList[0] && (
          <DailySale selectCategory={selectCategory} />
        )}
      {!showRefard &&
        selectCategory &&
        selectUserSaleSchedule === userSaleShowList[1] && (
          <MonthlySale selectCategory={selectCategory} />
        )}

      {/* {emplyoeeDailySaleList?.length > 0 && (
        <MarketGrid
          isLoading={marketerIsLoading}
          isDaily={true}
          employeeList={emplyoeeDailySaleList}
          pageNo={userDailyPageNo}
          pageSize={userDailyPageSize}
          setPageNo={setUserDailyPageNo}
          setPageSize={setUserDailyPageSize}
          totalDataSet={totaluserDaily}
        />
      )} */}
      {/* {emplyoeeMonthlySaleList?.length > 0 && (
        <MarketGrid
          isLoading={marketerIsLoading}
          isDaily={false}
          employeeList={emplyoeeMonthlySaleList}
          pageNo={userMonthlyPageNo}
          pageSize={userMonthlyPageSize}
          setPageNo={setUserMonthlyPageNo}
          setPageSize={setUserMonthlyPageSize}
          totalDataSet={totaluserMonthly}
        />
      )} */}
      {!showRefard && (
        <div className="  flex bg-green/40  h-[40px] shadow-md overflow-auto no-scrollbar">
          <button
            onClick={() => setSelectDepartmentOrInstitute("Department")}
            className={` flex-1 px-4 ${
              selectDepartmentOrInstitute === "Department"
                ? "bg-orange text-white"
                : ""
            } hover:bg-border_orange hover:text-white active:bg-orange active:text-white `}
          >
            {categoryName()} Department
          </button>
          <button
            onClick={() => setSelectDepartmentOrInstitute("Institute")}
            className={` flex-1 px-4 ${
              selectDepartmentOrInstitute === "Institute"
                ? "bg-orange text-white"
                : ""
            } hover:bg-border_orange hover:text-white active:bg-orange active:text-white `}
          >
            {categoryName()} Institute
          </button>
        </div>
      )}
      {!showRefard && selectDepartmentOrInstitute === "Department" && (
        <Department selectCategory={selectCategory} />
      )}
      {!showRefard && selectDepartmentOrInstitute === "Institute" && (
        <InstituteSale selectCategory={selectCategory} />
      )}

      {/* { instituteSale?.length > 0 && (
        <div className=" p-6 bg-[#F4F5F9] rounded-[16px]">
          <div className=" flex items-center gap-2">
            <Image
              src={"/icons/sale_title.svg"}
              height={23}
              width={21}
              alt="img"
            />
            <p className="  font-semibold text-[20px]  py-[8px]">Institute</p>
          </div>
          <div className="grid grid-cols-3 gap-[16px]">
            {instituteSale?.map((item: any) => (
              <MonthlyInstituteCard
                title={item?.polytechnic_name}
                saleDetails={item}
              />
            ))}
          </div>
          <Pagination
            pageNo={institutePageNo}
            pageSize={institutePageSize}
            setPageNo={setInstitutePageNo}
            setPageSize={setInstitutePageSize}
            totalPage={totalInstitute}
          />
        </div>
      )} */}

      {/* polytechnic chart */}
      {!showRefard && (
        <div className=" w-full flex flex-col gap-2 bg-bg_card rounded-[8px] p-2">
          <p className=" text-[24px] text-center font-semibold">
            {categoryName()} Statistics:
          </p>
          <div className=" w-full flex items-center justify-center gap-4 px-4">
            <div className=" w-full ">
              <Select
                value={selectedpolytechnic}
                options={polytechnicList}
                placeholder="Select polytechnic..."
                isClearable
                onChange={(e) => setSelectedPolytechnic(e)}
                maxMenuHeight={200}
              />
            </div>
            <div className=" w-full">
              <Select
                value={selectedDepartment2}
                options={departmentList}
                placeholder="Select department..."
                isClearable
                onChange={(e) => setSelectedDepartment2(e)}
                maxMenuHeight={200}
              />
            </div>
            <div className=" w-full ">
              <Select
                value={month}
                onChange={(e) => setMonth(e)}
                isClearable
                options={monthList}
              />
            </div>

            <div className=" w-full ">
              <Select
                value={year}
                onChange={(e) => setYear(e)}
                isClearable
                options={yearList}
              />
            </div>
          </div>
          <div className=" w-full grid grid-cols-1 xl:grid-cols-2 gap-2">
            <CustomBarChart
              title="Daily Income"
              dataset={dailyPolytechnicIncome}
            />
            <CustomEnrollmentChart
              title="Daily Enrollments"
              dataset={dailyPolytechnicEnrollment}
            />
            <CustomBarChart
              title="Monthly Income"
              dataset={monthlyPolytechnicIncome}
            />
            <CustomEnrollmentChart
              title="Monthly Enrollments"
              dataset={monthlyPolytechnicEnrollment}
            />
          </div>
        </div>
      )}

      {/* department chart */}
      {!showRefard && (
        <div className=" flex flex-col items-center gap-2 bg-bg_card rounded-[8px] p-2">
          <p className=" flex-1 text-[24px] text-center font-semibold">
            {categoryName()} Department Statistics:
          </p>
          <div className=" flex items-center gap-2">
            <div className=" flex items-center gap-1">
              <div className=" w-full">
                {" "}
                <Select
                  value={selectedDepartment}
                  placeholder="Select department..."
                  options={departmentList}
                  isClearable
                  onChange={(e) => setSelectedDepartment(e)}
                  maxMenuHeight={200}
                />
              </div>
            </div>

            <div className=" flex items-center">
              <Select
                value={month2}
                onChange={(e) => setMonth2(e)}
                isClearable
                options={monthList}
                maxMenuHeight={150}
              />
            </div>
            <div className=" flex items-center">
              <Select
                value={year2}
                onChange={(e) => setYear2(e)}
                isClearable
                options={yearList}
              />
            </div>
          </div>
          <div className=" w-full flex flex-col gap-2">
            <div className=" w-full grid grid-cols-1 xl:grid-cols-2 gap-2">
              <CustomBarChart
                title="Daily Income"
                dataset={dailyDepartmentIncome}
              />
              <CustomEnrollmentChart
                title="Daily Enrollments"
                dataset={dailyDepartmentEnrollment}
              />
              <CustomBarChart
                title="Monthly Income"
                dataset={monthlyDepartmentIncome}
              />
              <CustomEnrollmentChart
                title="Monthly Enrollments"
                dataset={monthlyDepartmentEnrollment}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
