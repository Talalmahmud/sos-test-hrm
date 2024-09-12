"use client";
import { AuthContext } from "@/components/ContextProvider";
import LoadingProgressBar from "@/components/LoadingProgressBar";
import { EndPoint } from "@/utils/api";
import { semesterLabel } from "@/utils/staticData";
import { CircularProgress, LinearProgress } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

type Props = {
  sponsoredId: any;
  setSponsorToggle: any;
};

const ReferrededForm = ({ setSponsorToggle, sponsoredId }: Props) => {
  const { user } = useContext(AuthContext);
  const [sponsoredAmount, setSponsoredAmount] = useState(0);
  const [sponsorData, setSponsordata] = useState<any>("");
  const [isLoading, setIsLoading] = useState(false);
  const enrollMentDetails = async () => {
    if (user && sponsoredId !== null) {
      const res = await axios.get(EndPoint.GET_ENROLLMENT_BY_ID + sponsoredId, {
        headers: { Authorization: "Bearer " + user?.access_token },
      });
      const resData = res.data;
      setSponsordata(resData);
      setSponsoredAmount(resData?.sponsored_amount);
    }
  };

  useEffect(() => {
    enrollMentDetails();
  }, [sponsoredId]);
  return (
    <div className=" p-4 w-[375px] flex flex-col gap-2 bg-white rounded-[4px]">
      <div
        className=" text-[14px] flex flex-col gap-1
       "
      >
        <p>
          Refared requested by{" "}
          <span className=" text-orange font-semibold">
            {sponsorData?.employee?.label}
          </span>
        </p>
        <p>
          Semester:
          <span className=" text-orange font-semibold">
            {semesterLabel(sponsorData?.semester)}
          </span>
        </p>
        <p>
          Course Price:
          <span className=" text-orange font-semibold">
            {sponsorData?.course_fee}/-
          </span>
        </p>
        <p>
          Paid Amount:
          <span className=" text-orange font-semibold">
            {sponsorData?.payable_fee}/-
          </span>
        </p>
      </div>
      <div className=" flex flex-col gap-[4px] text-[16px] ">
        <p className=" font-semibold">Refard Note:</p>
        <p className=" w-full"> {sponsorData?.course_note}</p>
      </div>

      <div className=" flex justify-end items-center gap-[16px] pt-[8px]">
        <button
          onClick={() => setSponsorToggle(false)}
          className=" flex justify-center items-center bg-orange text-white w-[115px] h-[39px] border-[1px] border-white rounded-[8px]"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ReferrededForm;
