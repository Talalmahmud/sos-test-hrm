"use client";
import React, { memo, useCallback, useEffect, useState } from "react";
import { Dropdown } from "@mui/base/Dropdown";
import { Menu, MenuListboxSlotProps } from "@mui/base/Menu";
import { MenuButton } from "@mui/base/MenuButton";
import { MenuItem, menuItemClasses } from "@mui/base/MenuItem";
import { format, formatDate } from "date-fns";
import axios from "axios";
import { EndPoint } from "@/utils/api";
type Props = {
  selectedData: any;
  setSelectedData: any;
  startDate: any;
  setStartDate: any;
  endDate: any;
  setEndDate: any;
};
const dateList = [
  {
    label: "Today",
    value: "Today",
  },
  {
    label: "Last 7 Days",
    value: "Last 7 Days",
  },
  {
    label: "Last 28 Days",
    value: "Last 28 Days",
  },
  {
    label: "Last 90 Days",
    value: "Last 90 Days",
  },
  {
    label: "Current Year",
    value: "Current Year",
  },
  {
    label: "Previous Year",
    value: "Previous Year",
  },
  {
    label: "First Previous Month",
    value: "First Previous Month",
  },
  {
    label: "Second Previous Month",
    value: "Second Previous Month",
  },
  {
    label: "Life Time",
    value: "Life Time",
  },
];

const DateFilterDropdown = ({
  selectedData,
  setSelectedData,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: Props) => {
  const [dropList, setDropList] = useState([]);
  const [selectedLabel, setSelectedLabel] = useState("");

  return (
    <div className=" ">
      {" "}
      <Dropdown>
        {selectedData === "Custom" ? (
          <div className=" flex items-center gap-[8px]">
            <div className=" flex items-center gap-[4px]">
              <input
                type="date"
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                }}
                className=" text-white bg-green text-[16px] px-[4px] py-[2px] rounded-[4px]"
              />
              <button className=" select-none" disabled>
                to
              </button>
              <input
                type="date"
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                  setSelectedData("");
                }}
                className=" text-white bg-green text-[16px] px-[4px] py-[2px] rounded-[4px]"
              />
            </div>
            <MenuButton className="  flex items-center  gap-4">
              <div onClick={() => setSelectedData("")}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.9207 8.17969H11.6907H6.08072C5.12072 8.17969 4.64073 9.33969 5.32073 10.0197L10.5007 15.1997C11.3307 16.0297 12.6807 16.0297 13.5107 15.1997L15.4807 13.2297L18.6907 10.0197C19.3607 9.33969 18.8807 8.17969 17.9207 8.17969Z"
                    fill="#121212"
                  />
                </svg>
              </div>
            </MenuButton>
          </div>
        ) : (
          <MenuButton>
            <div className=" px-[8px] flex items-center gap-[4px] py-[2px] rounded-[8px] text-[16px] border-[1px] border-[#000] bg-white ">
              <p className=" font-normal text-black">
                {" "}
                {selectedLabel === "" ? selectedData : selectedLabel}
              </p>
              <div>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.9207 8.17969H11.6907H6.08072C5.12072 8.17969 4.64073 9.33969 5.32073 10.0197L10.5007 15.1997C11.3307 16.0297 12.6807 16.0297 13.5107 15.1997L15.4807 13.2297L18.6907 10.0197C19.3607 9.33969 18.8807 8.17969 17.9207 8.17969Z"
                    fill="#121212"
                  />
                </svg>
              </div>
            </div>
          </MenuButton>
        )}

        {
          <Menu className=" min-w-[228px] max-w-[228px] z-40  text-center  mt-[10px] py-[16px] bg-white shadow-lg border-[1px] border-gray  rounded-[8px]">
            {dateList?.map((item: any, index: any) => (
              <MenuItem
                key={index}
                onClick={() => {
                  setSelectedData(item.value);
                  setSelectedLabel(item?.label);
                }}
                className=" hover:bg-orange hover:text-white py-[4px] text-[16px] my-[4px] bg-[#FBFBFB]  cursor-pointer"
              >
                {item.label}
              </MenuItem>
            ))}

            <MenuItem
              onClick={() => setSelectedData("Custom")}
              className=" hover:bg-orange hover:text-white py-[4px] text-[16px] my-[4px] bg-[#FBFBFB] cursor-pointer"
            >
              Custom
            </MenuItem>
          </Menu>
        }
      </Dropdown>
    </div>
  );
};

export default memo(DateFilterDropdown);
