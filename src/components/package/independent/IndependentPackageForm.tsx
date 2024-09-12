import { EndPoint } from "@/utils/api";
import axios from "axios";
import React, { memo, useEffect, useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";

type Props = {
  formClose: any;
  editToggle?: any;
  listUpdate?: any;
  custom_id?: number;
};

const IndependentPackageForm = ({
  listUpdate,
  editToggle,
  formClose,
  custom_id,
}: Props) => {
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [categoryList, setCategoryList] = useState<any>([]);
  const [selectedSchedule, setSelectedSchedule] = useState<any>(null);
  const [schedulList, setSchedulList] = useState<any>([]);
  const [emptyCheck, setEmptyCheck] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState<any>([]);
  const [packageData, setPackageData] = useState<any>({
    package_name: "",

    status: false,
  });

  const getCatagory = async () => {
    if (custom_id) {
      try {
        const res = await axios.get(
          EndPoint.GET_INDEPENDENT_PACKAGE_BY_ID + custom_id
        );
        const resResult = await res.data;
        setSelectedCategory({
          value: resResult?.category?.id,
          label: resResult?.category?.category_name,
        });
        setSelectedSchedule(resResult?.independent_schedule);
        setPackageData({
          package_name: resResult?.package_name,

          status: resResult?.status,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const addCustomDate = async () => {
    if (selectedCategory !== null) {
      const bodyData = {
        schedule_type: "Independent Days Based",
        category: selectedCategory?.value,
        package_name: packageData?.package_name,

        status: packageData?.status,
        independent_schedule: selectedSchedule?.value,
      };

      try {
        const res = await axios.post(
          EndPoint.ADD_INDEPENDENT_PACKAGE,
          bodyData
        );
        setPackageData({});
        setEmptyCheck(false);
        listUpdate();
        toast.success(" Package is add.");
        formClose(false);
      } catch (error: any) {
        if (error?.response) {
          toast.error(Object.values(error.response.data).join(""));
        } else {
          toast.error("An unexpected error occurred.");
        }
      }
    } else {
      setEmptyCheck(true);
    }
  };
  const updateCatagory = async () => {
    if (selectedCategory !== null) {
      const bodyData = {
        schedule_type: "Independent Days Based",
        category: selectedCategory?.value,
        package_name: packageData?.package_name,

        status: packageData?.status,
        independent_schedule: selectedSchedule?.value,
      };

      try {
        const res = await axios.patch(
          EndPoint.UPDATE_INDEPENDENT_PACKAGE + custom_id,
          bodyData
        );
        setPackageData({});
        setEmptyCheck(false);
        listUpdate();
        toast.success(" Package is Update.");
        formClose(false);
      } catch (error: any) {
        if (error?.response) {
          toast.error(Object.values(error.response.data).join(""));
        } else {
          toast.error("An unexpected error occurred.");
        }
      }
    } else {
      setEmptyCheck(true);
    }
  };
  const getCategoryList = async () => {
    const res = await axios.get(EndPoint.GET_DROPDOWN_CATAGORY);
    const result = await res.data;
    setCategoryList(result.results);
  };

  const getScheduleList = async () => {
    const res = await axios.get(EndPoint.GET_INDEPENDENT_DAYS_DROPDOWN);
    const result = await res.data;
    setSchedulList(result.results);
  };

  useEffect(() => {
    getScheduleList();
    getCategoryList();
  }, []);

  useEffect(() => {
    getCatagory();
  }, [custom_id]);
  return (
    <div className=" w-[850px] rounded-[16px] bg-green text-white p-[24px] grid grid-cols-2 justify-center gap-[24px]">
      <div className=" flex flex-col gap-[4px] text-[16px] ">
        <p className=" text-white">Package Name:</p>
        <input
          value={packageData.package_name}
          onChange={(e) =>
            setPackageData({ ...packageData, package_name: e.target.value })
          }
          type="text"
          placeholder="Enter type"
          className=" px-[8px] h-[40px] rounded-[8px] text-black"
        />
        {emptyCheck && packageData?.package_name.length === 0 && (
          <p className=" text-[#FFCC00] font-semibold text-[12px]">
            {" "}
            Package name is empty.
          </p>
        )}
      </div>

      <div className=" flex flex-col gap-[4px]">
        <p className=" text-white text-[16px] font-semibold ">Category:</p>
        <div className=" w-full  cursor-pointer">
          <Select
            value={selectedCategory}
            onChange={(e: any) => setSelectedCategory(e)}
            options={categoryList}
            isClearable
            placeholder={"Select category..."}
            className=" w-full text-[16px] h-[40px] text-black cursor-pointer"
          />
        </div>
        {selectedCategory === null && emptyCheck && (
          <p className=" text-[#FFCC00] font-semibold text-[12px]">
            {" "}
            Please select a category.
          </p>
        )}
      </div>

      <div className=" flex flex-col gap-[4px]">
        <p className=" text-white text-[16px] font-semibold ">Schedule:</p>
        <div className=" w-full  cursor-pointer">
          <Select
            value={selectedSchedule}
            onChange={(e) => setSelectedSchedule(e)}
            isClearable
            options={schedulList}
            className=" w-full text-[16px] h-[40px] text-black cursor-pointer"
          />
        </div>
        {selectedSchedule === null && emptyCheck && (
          <p className=" text-[#FFCC00] font-semibold text-[12px]">
            Please select schedules.
          </p>
        )}
      </div>

      <div className=" flex flex-col gap-[4px]">
        <p className=" text-white text-[16px] font-semibold ">Status:</p>
        <div className=" w-full  cursor-pointer">
          <Select
            onChange={(e: any) =>
              setPackageData({ ...packageData, status: e.value })
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
            placeholder={packageData?.status ? "Active" : "Inactive"}
            className=" w-full text-[16px] h-[40px] text-black cursor-pointer"
          />
        </div>
      </div>

      <div className=" flex justify-end items-center gap-[16px]">
        <button
          onClick={() => formClose(false)}
          className=" flex justify-center items-center  text-white w-[115px] h-[39px] border-[1px] border-white rounded-[8px]"
        >
          Cancel
        </button>
        {custom_id ? (
          <button
            onClick={() => updateCatagory()}
            className=" flex justify-center items-center bg-border_orange text-white w-[116px] h-[40px] rounded-[8px]"
          >
            Update
          </button>
        ) : (
          <button
            onClick={() => addCustomDate()}
            className=" flex justify-center items-center bg-border_orange text-white w-[116px] h-[40px] rounded-[8px]"
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
};

export default memo(IndependentPackageForm);
