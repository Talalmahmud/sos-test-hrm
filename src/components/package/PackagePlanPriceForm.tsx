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

const options = [
  { value: 1, label: 1 },
  { value: 2, label: 2 },
  { value: 3, label: 3 },
  { value: 4, label: 4 },
  { value: 5, label: 5 },
  { value: 6, label: 6 },
  { value: 7, label: 7 },
  { value: 8, label: 8 },
];

const PackagePlanPriceForm = ({
  listUpdate,
  editToggle,
  formClose,
  custom_id,
}: Props) => {
  const [emptyCheck, setEmptyCheck] = useState(false);
  const [categoryList, setCategoryList] = useState<any>([]);
  const [selectedCategory, setSelectedCategory] = useState<any>("");
  const [selectedPlan, setSelectedPlan] = useState<any>("");
  const [planList, setPlanList] = useState<any>([]);
  const [packageList, setPackageList] = useState<any>([]);
  const [selectedPackage, setSelectedPackage] = useState<any>("");
  const [filterpackageList, setFilterPackageList] = useState<any>([]);
  const [price, setPrice] = useState(100);
  const [discount, setDiscount] = useState(100);
  const [semester, setSemester] = useState<{ value: number; label: number }>({
    value: 1,
    label: 1,
  });
  const [selectedLayer, setSelectedLayer] = useState<any>("");

  const getPackagePlanPrice = async () => {
    if (custom_id) {
      try {
        const res = await axios.get(
          EndPoint.GET_PACKAGE_PLAN_PRICE_BY_ID + custom_id
        );
        const resResult = await res.data;
        setSelectedCategory(resResult?.category);
        setSelectedPackage(resResult?.package);
        setSelectedPlan(resResult?.plan);
        setPrice(resResult?.price);
        setDiscount(resResult?.discount);
        setSemester({
          label: resResult?.Semester_Quantity,
          value: resResult?.Semester_Quantity,
        });
        setSelectedLayer({
          label: resResult?.package_layer,
          value: resResult?.package_layer,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const addCustomDate = async () => {
    let bodyData;

    if (selectedCategory?.label === "Polytechnic") {
      bodyData = {
        category: selectedCategory?.value,
        package: selectedPackage?.value,
        plan: selectedPlan?.value,
        price: price,
        discount: discount,
        Semester_Quantity: semester?.value,
        package_layer: null,
      };
    } else if (
      selectedCategory?.label === "DUET" ||
      selectedCategory?.label === "JOB"
    ) {
      bodyData = {
        category: selectedCategory?.value,
        package: selectedPackage?.value,
        plan: selectedPlan?.value,
        price: price,
        discount: discount,
        package_layer: selectedLayer?.value,
      };
    } else {
      bodyData = {
        category: selectedCategory?.value,
        package: selectedPackage?.value,
        plan: selectedPlan?.value,
        price: price,
        discount: discount,
        package_layer: null,
      };
    }

    if (selectedCategory?.value !== 0) {
      try {
        const res = await axios.post(EndPoint.ADD_PACKAGE_PLAN_PRICE, bodyData);
        setEmptyCheck(false);
        toast.success("Package plan price is added.");
        listUpdate();
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
    const bodyData =
      selectedCategory?.label === "Polytechnic"
        ? {
            category: selectedCategory?.value,
            package: selectedPackage?.value,
            plan: selectedPlan?.value,
            price: price,
            discount: discount,
            Semester_Quantity: semester?.value,
            package_layer: null,
          }
        : selectedCategory?.label === "DUET" || "JOB"
        ? {
            category: selectedCategory?.value,
            package: selectedPackage?.value,
            plan: selectedPlan?.value,
            price: price,
            discount: discount,
            package_layer: selectedLayer?.value,
          }
        : {
            category: selectedCategory?.value,
            package: selectedPackage?.value,
            plan: selectedPlan?.value,
            price: price,
            discount: discount,
            package_layer: null,
          };

    if (selectedCategory?.value !== 0) {
      try {
        const res = await axios.patch(
          EndPoint.UPDATE_PACKAGE_PLAN_PRICE + custom_id,
          bodyData
        );
        setEmptyCheck(false);
        toast.success("Package plan price is Updated.");
        listUpdate();
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
    const res = await axios.get(EndPoint.GET_DROPDOWN_CATAGORY, {
      params: { limit: 200 },
    });
    const result = await res.data;
    setCategoryList(result.results);
  };

  const getPackageList = async () => {
    const res = await axios.get(EndPoint.GET_ALL_PACKAGE_LIST, {
      params: {
        limit: 200,
      },
    });
    const result = await res.data;
    setPackageList(result.results);
  };

  const getPlanList = async () => {
    const res = await axios.get(EndPoint.GET_ALL_PLAN_LIST, {
      params: { limit: 200 },
    });
    const result = await res.data;
    setPlanList(result.results);
  };

  const filterPackage = () => {
    const filterData = packageList?.filter(
      (item: any) => item.category_id == selectedCategory?.value
    );
    setFilterPackageList(filterData);
  };

  useEffect(() => {
    filterPackage();
  }, [selectedCategory]);

  useEffect(() => {
    getPlanList();
    getPackageList();
    getCategoryList();
  }, []);

  useEffect(() => {
    getPackagePlanPrice();
  }, [custom_id]);
  return (
    <div className=" w-[461px] rounded-[16px] bg-green  p-[16px] flex flex-col justify-center gap-[16px]">
      <div className=" flex flex-col gap-[4px]">
        <p className=" text-white font-bold ">Category:</p>
        <div className=" w-full  cursor-pointer">
          <Select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e);
              filterPackage();
            }}
            options={categoryList}
            isClearable
            className=" w-full  text-[16px] cursor-pointer"
            placeholder="Select Package"
          />
        </div>
      </div>
      {selectedCategory?.label === "Polytechnic" && (
        <div className=" flex flex-col gap-[4px]">
          <p className=" text-[16px] font-semibold text-white ">
            Semester Quantity:
          </p>
          <div className=" w-full  cursor-pointer">
            <Select
              value={semester}
              isClearable
              onChange={(e: any) => setSemester(e)}
              maxMenuHeight={150}
              options={options}
              className="  h-[41px] text-[16px] cursor-pointer"
              placeholder="Select quantity..."
            />
          </div>
        </div>
      )}

      {(selectedCategory?.label === "DUET" ||
        selectedCategory?.label === "JOB") && (
        <div className=" flex flex-col gap-[4px]">
          <p className=" text-[16px] font-semibold text-white ">
            Package Layer:
          </p>
          <div className=" w-full  cursor-pointer">
            <Select
              value={selectedLayer}
              isClearable
              onChange={(e: any) => setSelectedLayer(e)}
              maxMenuHeight={150}
              options={[
                { label: "Full", value: "Full" },
                { label: "Department", value: "Department" },
                { label: "Non-Department", value: "Non-Department" },
              ]}
              className="  h-[41px] text-[16px] cursor-pointer"
              placeholder="Select layer..."
            />
          </div>
        </div>
      )}

      <div className=" flex flex-col gap-[4px]">
        <p className=" text-white font-bold ">Package:</p>
        <div className=" w-full  cursor-pointer">
          <Select
            value={selectedPackage}
            onChange={(e) => setSelectedPackage(e)}
            options={filterpackageList}
            isClearable
            className=" w-full  text-[16px] cursor-pointer"
            placeholder="Select Plan"
          />
        </div>
      </div>

      <div className=" flex flex-col gap-[4px]">
        <p className=" text-white font-bold ">Plan:</p>
        <div className=" w-full  cursor-pointer">
          <Select
            value={selectedPlan}
            onChange={(e) => setSelectedPlan(e)}
            options={planList}
            isClearable
            className=" w-full  text-[16px] cursor-pointer"
            placeholder="Select Plan"
          />
        </div>
      </div>

      <div className=" flex flex-col gap-[4px]">
        <label htmlFor="email" className=" text-white font-bold ">
          Price:
        </label>
        <input
          value={price}
          onChange={(e: any) => setPrice(e.target.value)}
          type="number"
          placeholder="Enter Price"
          id="email"
          className="  px-[8px] h-[40px] outline-none rounded-[8px] text-black"
        />
      </div>

      <div className=" flex flex-col gap-[4px]">
        <label htmlFor="email" className=" text-white font-bold ">
          Discount:
        </label>
        <input
          value={discount}
          onChange={(e: any) => setDiscount(e.target.value)}
          type="number"
          placeholder="Enter discount price"
          id="email"
          className="  px-[8px] h-[40px] outline-none rounded-[8px] text-black"
        />
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

export default memo(PackagePlanPriceForm);
