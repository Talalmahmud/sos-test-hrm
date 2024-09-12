"use client";
import React, { useState } from "react";
import AboutTab from "./AboutTab";
import ResultTab from "./ResultTab";
import ContactTab from "./ContactTab";

type Props = {
  stipend: boolean;
  setStipend: any;
  studentResult: any;
  setStudentResult: any;
  editable: boolean;
  selectedDream: any;
  setSelectedDream: any;
  studentDetails: any;
  guardian: any;
  setGuardian: any;
  refard: number;
  setRefard: any;
  student: any;
  setStudent: any;
};

const StudentFilter = ({
  student,
  setStudent,
  refard,
  setRefard,
  stipend,
  setStipend,
  studentResult,
  setStudentResult,
  studentDetails,
  selectedDream,
  setSelectedDream,
  editable,
  guardian,
  setGuardian,
}: Props) => {
  const [selectFilter, setSelectFilter] = useState("about");
  return (
    <div className=" flex flex-col gap-[8px]">
      <div className=" w-full flex items-center justify-center text-[13px] bg-green rounded-[8px] h-[32px] shadow-md text-white">
        <p
          className={` ${
            selectFilter === "about" && " bg-orange"
          } w-[73px] cursor-pointer h-full flex items-center justify-center hover:bg-orange rounded-[8px] `}
          onClick={() => setSelectFilter("about")}
        >
          About
        </p>
        <p
          className={`  ${
            selectFilter === "result" && " bg-orange"
          } w-[73px] cursor-pointer h-full flex items-center justify-center hover:bg-orange rounded-[8px]`}
          onClick={() => setSelectFilter("result")}
        >
          Result
        </p>
        <p
          className={`  ${
            selectFilter === "contact" && " bg-orange"
          } w-[73px] cursor-pointer h-full flex items-center justify-center hover:bg-orange rounded-[8px]`}
          onClick={() => setSelectFilter("contact")}
        >
          Contact
        </p>
      </div>
      {selectFilter === "about" && (
        <AboutTab
          guardian={guardian}
          setGuardian={setGuardian}
          editable={editable}
          selectedDream={selectedDream}
          setSelectedDream={setSelectedDream}
        />
      )}
      {selectFilter === "result" && (
        <ResultTab
          student={student}
          setStudent={setStudent}
          refard={refard}
          setRefard={setRefard}
          stipend={stipend}
          setStipend={setStipend}
          editable={editable}
          studentResult={studentResult}
          setStudentResult={setStudentResult}
        />
      )}
      {selectFilter === "contact" && (
        <ContactTab
          editable={editable}
          student={student}
          setStudent={setStudent}
        />
      )}
    </div>
  );
};

export default StudentFilter;
