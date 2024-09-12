import React from "react";
import Select from "react-select";

type Props = {
  formClose: any;
};

const PendingForm = ({ formClose }: Props) => {
  return (
    <div>
      <div className=" w-[906px] grid grid-cols-2 rounded-[16px] bg-button_bg text-white p-[16px]  gap-[16px]">
        <div className=" flex flex-col gap-[4px] text-[16px] ">
          <p className=" text-[16px] text-left font-semibold text-white">
            Institute Name:
          </p>
          <input
            type="Type"
            placeholder="Enter Institute Name"
            className=" w-full px-[8px] h-[40px] text-[16px] rounded-[8px] text-black"
          />
        </div>
        <div className=" flex flex-col gap-[4px] text-[16px] ">
          <p className=" text-[16px] text-left font-semibold text-white">
            Contact number:
          </p>
          <input
            type="Type"
            placeholder="Enter Institute Name"
            className=" w-full px-[8px] h-[40px] text-[16px] rounded-[8px] text-black"
          />
        </div>
        <div className=" flex flex-col gap-[4px] text-[16px] ">
          <p className=" text-[16px] text-left font-semibold text-white">
            Owner Name:
          </p>
          <input
            type="Type"
            placeholder="Enter Name"
            className=" w-full px-[8px] h-[40px] text-[16px] rounded-[8px] text-black"
          />
        </div>
        <div className=" flex flex-col gap-[4px]">
          <p className=" text-white text-left text-[16px] font-semibold ">
            Status:
          </p>
          <div className=" w-full  cursor-pointer">
            <Select
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
              className=" w-full  text-left text-[16px] h-[32px] text-black cursor-pointer"
            />
          </div>
        </div>
        <div className=" flex flex-col gap-[4px]">
          <p className=" text-white text-left text-[16px] font-semibold ">
            Status:
          </p>
          <div className=" w-full  cursor-pointer">
            <Select
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
              className=" w-full text-left  text-[16px] h-[32px] text-black cursor-pointer"
            />
          </div>
        </div>{" "}
        <div className=" flex flex-col gap-[4px]">
          <p className=" text-white text-left text-[16px] font-semibold ">
            Status:
          </p>
          <div className=" w-full  cursor-pointer">
            <Select
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
              className=" w-full text-left text-[16px] h-[32px] text-black cursor-pointer"
            />
          </div>
        </div>
        <div className=" flex flex-col gap-[4px]">
          <p className=" text-white text-left text-[16px] font-semibold ">
            Status:
          </p>
          <div className=" w-full  cursor-pointer">
            <Select
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
              className=" w-full text-left  text-[16px] h-[32px] text-black cursor-pointer"
            />
          </div>
        </div>
        <div className=" flex flex-col gap-[4px] text-[16px] ">
          <p className=" text-[16px] text-left font-semibold text-white">
            Institute Name:
          </p>
          <input
            type="Type"
            placeholder="Enter Institute Name"
            className=" w-full px-[8px] h-[40px] text-[16px] rounded-[8px] text-black"
          />
        </div>
        <div className=" flex flex-col gap-[4px] text-[16px] ">
          <p className=" text-[16px] text-left font-semibold text-white">
            Institute Name:
          </p>
          <input
            type="Type"
            placeholder="Enter Institute Name"
            className=" w-full px-[8px] h-[40px] text-[16px] rounded-[8px] text-black"
          />
        </div>
        <div className=" col-span-2 text-[16px] ">
          <div className=" flex justify-end items-center gap-[16px]">
            <button
              onClick={() => formClose(false)}
              className=" flex justify-center items-center  text-white w-[115px] h-[39px] border-[1px] border-white rounded-[8px]"
            >
              Cancel
            </button>
            <button className=" flex justify-center items-center bg-border_orange text-white w-[116px] h-[40px] rounded-[8px]">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingForm;
