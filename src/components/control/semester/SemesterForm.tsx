import { EndPoint } from "@/utils/api";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";

type Props = {
  formClose: any;
  sessionList: any;
  listUpdate: any;
  semesterId?: any;
};
const SemesterForm = ({
  formClose,
  listUpdate,
  semesterId,
  sessionList,
}: Props) => {
  const [emptyCheck, setEmptyCheck] = useState(false);

  const [semesterData, setSemesterData] = useState<any>({
    session_starting_date: "",
    first_semester_end_date: "",
    second_semester_end_date: "",
    third_semester_end_date: "",
    fourth_semester_end_date: "",
    fifth_semester_end_date: "",
    sixth_semester_end_date: "",
    seventh_semester_end_date: "",
    eighth_semester_end_date: "",
    session: null,
  });

  const getSemester = async () => {
    if (semesterId) {
      try {
        const res = await axios.get(
          EndPoint.GET_SEMESTER_SCHEDUL_BY_ID + semesterId
        );
        const resResult = await res.data;

        setSemesterData(resResult);
      } catch (error) {}
    }
  };
  const addDuetExam = async () => {
    try {
      if (
        semesterData.session !== null &&
        semesterData.first_semester_end_date !== ""
      ) {
        const res = await axios.post(
          EndPoint.ADD_SEMESTER_SCHEDUL,
          semesterData
        );
        setSemesterData({
          session_starting_date: "",
          first_semester_end_date: "",
          second_semester_end_date: "",
          third_semester_end_date: "",
          fourth_semester_end_date: "",
          fifth_semester_end_date: "",
          sixth_semester_end_date: "",
          seventh_semester_end_date: "",
          eighth_semester_end_date: "",
          session: null,
        });
        listUpdate();
        toast.success("Semester schedule is added.");

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
    if (
      semesterData.session !== null &&
      semesterData.first_semester_end_date !== ""
    ) {
      try {
        {
          // const { session } = semesterData;
          const res = await axios.patch(
            EndPoint.UPDATE_SEMESTER_SCHEDUL + semesterId,
            semesterData
          );
          setSemesterData({
            session_starting_date: "",
            first_semester_end_date: "",
            second_semester_end_date: "",
            third_semester_end_date: "",
            fourth_semester_end_date: "",
            fifth_semester_end_date: "",
            sixth_semester_end_date: "",
            seventh_semester_end_date: "",
            eighth_semester_end_date: "",
            session: null,
          });
          listUpdate();
          toast.success("Semester schedule is updated.");

          formClose(false);
        }
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
    getSemester();
  }, []);
  return (
    <div>
      <div className=" w-[906px] grid grid-cols-2 rounded-[16px] bg-green text-white p-[16px]  gap-[16px]">
        {!semesterId && (
          <div className=" flex flex-col gap-[4px]">
            <p className=" text-white text-[16px] font-semibold ">Session:</p>
            <div className=" w-full  cursor-pointer">
              <Select
                onChange={(e: any) =>
                  setSemesterData({ ...semesterData, session: e.value })
                }
                options={sessionList}
                className=" w-full text-[20px] h-[40px] text-black cursor-pointer"
              />
            </div>
          </div>
        )}

        <div className=" flex flex-col gap-[4px] text-[13px] ">
          <p className=" text-[16px] font-semibold text-white">
            Semester Start:
          </p>
          <input
            type="date"
            value={semesterData.session_starting_date}
            onChange={(e: any) =>
              setSemesterData({
                ...semesterData,
                session_starting_date: e.target.value,
              })
            }
            placeholder="Semester start date"
            className=" px-[8px] h-[40px] text-[16px] rounded-[8px] text-black"
          />
        </div>

        <div className=" flex flex-col gap-[4px] text-[13px] ">
          <p className=" text-[16px] font-semibold text-white">1st Semester:</p>
          <input
            type="date"
            value={semesterData.first_semester_end_date}
            onChange={(e: any) =>
              setSemesterData({
                ...semesterData,
                first_semester_end_date: e.target.value,
              })
            }
            placeholder="Semester date"
            className=" px-[8px] h-[40px] text-[16px] rounded-[8px] text-black"
          />
        </div>

        <div className=" flex flex-col gap-[4px] text-[13px] ">
          <p className=" text-[16px] font-semibold text-white">2nd Semester:</p>
          <input
            type="date"
            value={semesterData.second_semester_end_date}
            onChange={(e: any) =>
              setSemesterData({
                ...semesterData,
                second_semester_end_date: e.target.value,
              })
            }
            placeholder="Semester date"
            className=" px-[8px] h-[40px] text-[16px] rounded-[8px] text-black"
          />
        </div>
        <div className=" flex flex-col gap-[4px] text-[13px] ">
          <p className=" text-[16px] font-semibold text-white">3rd Semester:</p>
          <input
            value={semesterData.third_semester_end_date}
            onChange={(e: any) =>
              setSemesterData({
                ...semesterData,
                third_semester_end_date: e.target.value,
              })
            }
            type="date"
            placeholder="Semester date"
            className=" px-[8px] h-[40px] text-[16px] rounded-[8px] text-black"
          />
        </div>
        <div className=" flex flex-col gap-[4px] text-[13px] ">
          <p className=" text-[16px] font-semibold text-white">4th Semester:</p>
          <input
            value={semesterData.fourth_semester_end_date}
            onChange={(e: any) =>
              setSemesterData({
                ...semesterData,
                fourth_semester_end_date: e.target.value,
              })
            }
            type="date"
            placeholder="Semester date"
            className=" px-[8px] h-[40px] text-[16px] rounded-[8px] text-black"
          />
        </div>
        <div className=" flex flex-col gap-[4px] text-[13px] ">
          <p className=" text-[16px] font-semibold text-white">5th Semester:</p>
          <input
            value={semesterData.fifth_semester_end_date}
            onChange={(e: any) =>
              setSemesterData({
                ...semesterData,
                fifth_semester_end_date: e.target.value,
              })
            }
            type="date"
            placeholder="Semester date"
            className=" px-[8px] h-[40px] text-[16px] rounded-[8px] text-black"
          />
        </div>
        <div className=" flex flex-col gap-[4px] text-[13px] ">
          <p className=" text-[16px] font-semibold text-white">6th Semester:</p>
          <input
            value={semesterData.sixth_semester_end_date}
            onChange={(e: any) =>
              setSemesterData({
                ...semesterData,
                sixth_semester_end_date: e.target.value,
              })
            }
            type="date"
            placeholder="Semester date"
            className=" px-[8px] h-[40px] text-[16px] rounded-[8px] text-black"
          />
        </div>
        <div className=" flex flex-col gap-[4px] text-[13px] ">
          <p className=" text-[16px] font-semibold text-white">7th Semester:</p>
          <input
            value={semesterData.seventh_semester_end_date}
            onChange={(e: any) =>
              setSemesterData({
                ...semesterData,
                seventh_semester_end_date: e.target.value,
              })
            }
            type="date"
            placeholder="Semester date"
            className=" px-[8px] h-[40px] text-[16px] rounded-[8px] text-black"
          />
        </div>
        <div className=" flex flex-col gap-[4px] text-[13px] ">
          <p className=" text-[16px] font-semibold text-white">8th Semester:</p>
          <input
            value={semesterData.eighth_semester_end_date}
            onChange={(e: any) =>
              setSemesterData({
                ...semesterData,
                eighth_semester_end_date: e.target.value,
              })
            }
            type="date"
            placeholder="Semester date"
            className=" px-[8px] h-[40px] text-[16px] rounded-[8px] text-black"
          />
        </div>

        <div className=" col-span-2 ">
          <div className=" flex justify-end items-center gap-[16px]">
            <button
              onClick={() => formClose(false)}
              className=" flex justify-center items-center  text-white w-[115px] h-[39px] border-[1px] border-white rounded-[8px]"
            >
              Cancel
            </button>

            {semesterId ? (
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

export default SemesterForm;
function setExamData(resResult: any) {
  throw new Error("Function not implemented.");
}
