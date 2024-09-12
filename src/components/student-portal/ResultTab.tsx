import React, { useState } from "react";

type Props = {
  stipend: boolean;
  setStipend: any;
  editable: boolean;
  studentResult: any;
  setStudentResult: any;
  student: any;
  setStudent: any;
  refard: number;
  setRefard: any;
};

const ResultTab = ({
  student,
  setStudent,
  refard,
  setRefard,
  stipend,
  setStipend,
  studentResult,
  setStudentResult,

  editable,
}: Props) => {
  return (
    <div className=" w-full flex flex-col gap-[8px]">
      <div className=" bg-[#FFF7F4] rounded-[8px] px-[16px] py-[8px]">
        <p className=" text-[10px] ">{student?.secondary_education}:</p>

        {editable ? (
          <p className="text-[13px] flex justify-center items-center ">
            {student?.secondary_gpa}
          </p>
        ) : (
          <input
            className={` w-[80px] text-center  ${
              editable ? " bg-bg_card outline-none" : "bg-white outline-dashed"
            }`}
            type="number"
            value={student?.secondary_gpa}
            onChange={(e) =>
              setStudent({ ...student, secondary_gpa: e.target.value })
            }
          />
        )}
      </div>
      <div className=" bg-[#FFF7F4] rounded-[8px] px-[16px] py-[8px]">
        <p className="text-[13px] flex justify-center items-center ">
          CGPA:0.00
        </p>
      </div>

      <div className=" bg-[#FFF7F4] rounded-[8px] text-[13px] flex justify-between items-center px-[16px] py-[8px]">
        <p>Stipend</p>
        {editable ? (
          <div>
            {stipend ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
              >
                <circle cx="5" cy="5" r="5" fill="#10B981" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
              >
                <circle cx="5" cy="5" r="5" fill="red" />
              </svg>
            )}
          </div>
        ) : (
          <select
            id="stipend"
            className={` w-[80px] text-center  ${
              editable ? " bg-bg_card outline-none" : "bg-white outline-dashed"
            }`}
            onClick={(e: any) => {
              if (e.target.vlaue === "true") {
                setStipend(true);
              }
              if (e.target.vlaue === "false") {
                setStipend(false);
              }
            }}
          >
            <option label="Yes" value={"true"}></option>
            <option label="No" value={"false"}></option>
          </select>
        )}
      </div>

      <div className=" bg-[#FFF7F4] rounded-[8px] text-[13px] flex justify-between items-center px-[16px] py-[8px]">
        <p>Refard</p>
        {editable ? (
          <p>{refard}</p>
        ) : (
          <input
            className={` w-[80px] text-center  ${
              editable ? " bg-bg_card outline-none" : "bg-white outline-dashed"
            }`}
            type="number"
            value={refard}
            onChange={(e) => setRefard(e.target.value)}
          />
        )}
      </div>
      <div className=" w-full bg-[#F0F7FF] text-[13px] rounded-[8px] p-[16px] flex flex-col gap-[4px] ">
        <div className=" flex items-center justify-between">
          <p>1st Semester</p>

          <input
            className={` w-[80px] text-center  ${
              editable ? "bg-[#F0F7FF]" : "bg-white outline-dashed "
            }`}
            type="number"
            value={studentResult?.first_semester}
            disabled={editable}
            onChange={(e) =>
              setStudentResult({
                ...studentResult,
                first_semester: e.target.value,
              })
            }
          />
        </div>
        <div className=" flex items-center justify-between">
          <p>2nd Semester</p>
          <input
            className={` w-[80px] text-center  ${
              editable ? "bg-[#F0F7FF]" : "bg-white outline-dashed"
            }`}
            type="number"
            value={studentResult?.first_semester}
            disabled={editable}
            onChange={(e) =>
              setStudentResult({
                ...studentResult,
                first_semester: e.target.value,
              })
            }
          />
        </div>
        <div className=" flex items-center justify-between">
          <p>3rd Semester</p>
          <input
            className={` w-[80px] text-center  ${
              editable ? "bg-[#F0F7FF]" : "bg-white outline-dashed"
            }`}
            type="number"
            disabled={editable}
            value={studentResult?.first_semester}
            onChange={(e) =>
              setStudentResult({
                ...studentResult,
                first_semester: e.target.value,
              })
            }
          />
        </div>
        <div className=" flex items-center justify-between">
          <p>4th Semester</p>
          <input
            className={` w-[80px] text-center  ${
              editable ? "bg-[#F0F7FF]" : "bg-white outline-dashed"
            }`}
            type="number"
            value={studentResult?.first_semester}
            disabled={editable}
            onChange={(e) =>
              setStudentResult({
                ...studentResult,
                first_semester: e.target.value,
              })
            }
          />
        </div>
        <div className=" flex items-center justify-between">
          <p>5th Semester</p>
          <input
            className={` w-[80px] text-center  ${
              editable ? "bg-[#F0F7FF]" : "bg-white outline-dashed"
            }`}
            type="number"
            value={studentResult?.first_semester}
            disabled={editable}
            onChange={(e) =>
              setStudentResult({
                ...studentResult,
                first_semester: e.target.value,
              })
            }
          />
        </div>
        <div className=" flex items-center justify-between">
          <p>6th Semester</p>
          <input
            className={` w-[80px] text-center  ${
              editable ? "bg-[#F0F7FF]" : "bg-white outline-dashed"
            }`}
            type="number"
            value={studentResult?.first_semester}
            disabled={editable}
            onChange={(e) =>
              setStudentResult({
                ...studentResult,
                first_semester: e.target.value,
              })
            }
          />
        </div>
        <div className=" flex items-center justify-between">
          <p>7th Semester</p>
          <input
            className={` w-[80px] text-center  ${
              editable ? "bg-[#F0F7FF]" : "bg-white outline-dashed"
            }`}
            type="number"
            value={studentResult?.first_semester}
            disabled={editable}
            onChange={(e) =>
              setStudentResult({
                ...studentResult,
                first_semester: e.target.value,
              })
            }
          />
        </div>
        <div className=" flex items-center justify-between">
          <p>8th Semester</p>
          <input
            className={` w-[80px] text-center  ${
              editable ? "bg-[#F0F7FF]" : "bg-white outline-dashed"
            }`}
            type="number"
            value={studentResult?.first_semester}
            disabled={editable}
            onChange={(e) =>
              setStudentResult({
                ...studentResult,
                first_semester: e.target.value,
              })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ResultTab;
