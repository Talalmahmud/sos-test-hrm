import { EndPoint } from "@/utils/api";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";

type Props = {
  formClose: any;
  sessionList?: any;
  listUpdate: any;
  editToggle?: any;
  exam_id?: any;
};

const DuetForm = ({
  sessionList,
  formClose,
  listUpdate,
  editToggle,
  exam_id,
}: Props) => {
  const [emptyCheck, setEmptyCheck] = useState(false);
  const [examData, setExamData] = useState<any>({
    status: false,
    exam_date: "",
    session: null,
  });

  const getExamData = async () => {
    if (exam_id) {
      try {
        const res = await axios.get(EndPoint.GET_DUET_SCHEDUL_BY_ID + exam_id);
        const resResult = await res.data;
        const { id } = resResult;
        setExamData({
          status: resResult.status,
          exam_date: resResult.exam_date,
        });
      } catch (error) {}
    }
  };

  const addDuetExam = async () => {
    try {
      if (
        examData.status === true ||
        (examData.status === false &&
          examData.session !== "" &&
          examData.exam_date !== "")
      ) {
        const res = await axios.post(EndPoint.ADD_DUET_SCHEDUL, examData);
        setExamData({
          status: false,
          exam_date: "",
          session: null,
        });
        listUpdate();
        toast.success("Exam schedule is added.");

        formClose(false);
      } else {
        setEmptyCheck(true);
      }
    } catch (error: any) {
      if (error?.response) {
        toast.error(Object.values(error.response.data).join(""));
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };
  const updateSession = async () => {
    if (exam_id) {
      try {
        const res = await axios.patch(EndPoint.UPDATE_DUET_SCHEDUL + exam_id, {
          status: examData.status,
          exam_date: examData.exam_date,
        });
        setExamData({
          status: false,
          exam_date: "",
          session: null,
        });
        listUpdate();
        toast.success("Exam schedule is updated.");

        formClose(false);
      } catch (error: any) {
        if (error?.response) {
          toast.error(Object.values(error.response.data).join(""));
        } else {
          toast.error("An unexpected error occurred.");
        }
      }
    }
  };

  useEffect(() => {
    getExamData();
  }, [exam_id]);
  return (
    <div>
      <div className=" w-[400px] flex flex-col rounded-[16px] bg-button_bg text-white p-[16px]  gap-[16px]">
        {!exam_id && (
          <div className=" flex flex-col gap-[4px]">
            <p className=" text-white text-[16px] font-semibold ">Session:</p>

            <div className=" w-full  cursor-pointer">
              <Select
                onChange={(e: any) =>
                  setExamData({ ...examData, session: e.value })
                }
                options={sessionList}
                className=" w-full text-[16px] h-[40px] text-black cursor-pointer"
              />
            </div>
          </div>
        )}

        <div className=" flex flex-col gap-[4px] text-[13px] ">
          <p className=" text-[16px] font-semibold text-white">Exam Date:</p>
          <input
            value={examData.exam_date}
            onChange={(e: any) =>
              setExamData({ ...examData, exam_date: e.target.value })
            }
            type="date"
            placeholder="Join date"
            className=" px-[8px] h-[40px] text-[16px] rounded-[8px] text-black"
          />
        </div>

        <div className=" flex flex-col gap-[4px]">
          <p className=" text-white text-[16px] font-semibold ">Status:</p>
          <div className=" w-full  cursor-pointer">
            <Select
              onChange={(e: any) =>
                setExamData({ ...examData, status: e.value })
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
              placeholder={examData.status ? "Active" : "Inactive"}
              className=" w-full text-[16px] h-[40px] text-black cursor-pointer"
            />
          </div>
        </div>

        <div className=" col-span-2 ">
          <div className=" flex justify-end items-center gap-[16px]">
            <button
              onClick={() => formClose(false)}
              className=" flex justify-center items-center  text-white w-[115px] h-[39px] border-[1px] border-white rounded-[8px]"
            >
              Cancel
            </button>
            {exam_id ? (
              <button
                onClick={() => updateSession()}
                className=" flex justify-center items-center bg-border_orange text-white w-[116px] h-[40px] rounded-[8px]"
              >
                Update
              </button>
            ) : (
              <button
                onClick={() => addDuetExam()}
                className=" flex justify-center items-center bg-border_orange text-white w-[116px] h-[40px] rounded-[8px]"
              >
                Save
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DuetForm;
