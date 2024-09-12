"use client";
import { AuthContext } from "@/components/ContextProvider";
import LoadingProgressBar from "@/components/LoadingProgressBar";
import { EndPoint } from "@/utils/api";
import { CircularProgress, LinearProgress } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

type Props = {
  sponsoredId: any;
  setSponsorToggle: any;
  updateList: any;
};

const SponsoredForm = ({
  setSponsorToggle,
  sponsoredId,
  updateList,
}: Props) => {
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

  const handleSubmit = async () => {
    if (sponsoredId) {
      setIsLoading(true);
      try {
        const bodyData = {
          sponsored_amount: sponsoredAmount,
          status: "Complete",
        };

        const res = await axios.patch(
          EndPoint.UPDATE_ENROLLMENT + sponsoredId,
          bodyData
        );
        const resResult = await res?.data;
        toast.success("Payment sponsored success");
        updateList();
        setSponsoredAmount(0);
        setSponsordata("");
        setSponsorToggle(false);
      } catch (error: any) {
        if (error?.response) {
          toast.error(Object.values(error.response.data).join(""));
        } else {
          toast.error("An unexpected error occurred.");
        }
      } finally {
        setIsLoading(false);
      }
    }
  };
  useEffect(() => {
    enrollMentDetails();
  }, [sponsoredId]);
  return (
    <div className=" w-[375px] p-4 flex flex-col gap-2 bg-white rounded-[4px]">
      <div
        className=" text-[14px] flex flex-col gap-1
       "
      >
        <p>
          Sponsored requested by{" "}
          <span className=" text-orange font-semibold">
            {sponsorData?.employee?.label}
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

        <p>
          Sponsored Request Amount:{" "}
          <span className=" text-orange font-semibold">
            {sponsorData?.sponsored_amount}/-
          </span>
        </p>
      </div>
      <div className=" flex flex-col gap-[4px] text-[16px] ">
        <p className=" font-semibold">How much do you want to sponsored?</p>
        <input
          type="numeric"
          value={sponsoredAmount}
          onChange={(e) => setSponsoredAmount(Number(e.target.value))}
          placeholder="Enter payment note"
          className=" px-[8px] h-[40px] border-[1px] rounded-[8px] text-black"
        />
      </div>
      <p>
        Note:
        <span className=" text-orange font-semibold">
          {sponsorData?.course_note}
        </span>
      </p>

      <div className=" flex justify-end items-center gap-[16px] pt-[8px]">
        <button
          onClick={() => setSponsorToggle(false)}
          className=" flex justify-center items-center bg-orange text-white w-[115px] h-[39px] border-[1px] border-white rounded-[8px]"
        >
          Cancel
        </button>
        <button
          onClick={() => handleSubmit()}
          disabled={isLoading}
          className="  border-[1px] border-white flex justify-center items-center bg-green text-white w-[116px] h-[40px] rounded-[8px]"
        >
          {isLoading ? (
            <CircularProgress size={20} color="warning" />
          ) : (
            "Accept"
          )}
        </button>
      </div>
    </div>
  );
};

export default SponsoredForm;
