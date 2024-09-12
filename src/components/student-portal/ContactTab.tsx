import React from "react";

type Props = {
  editable: boolean;
  student: any;
  setStudent: any;
};

const ContactTab = ({ editable, student, setStudent }: Props) => {
  return (
    <div className=" w-full flex flex-col gap-[8px]">
      <div className=" bg-[#FFF7F4] rounded-[8px] px-[16px] py-[8px]">
        <p className=" text-[10px] ">Secondary Number</p>
        {editable ? (
          <p> {student?.second_phone_number}</p>
        ) : (
          <input
            type="text"
            className=" outline-dashed"
            value={student?.second_phone_number}
            placeholder="Add number"
            onChange={(e) =>
              setStudent({
                ...student,
                second_phone_number: e.target.value,
              })
            }
          />
        )}
      </div>
      <div className=" bg-[#FFF7F4] rounded-[8px] px-[16px] py-[8px]">
        <p className=" text-[10px] ">E-mail</p>
        {editable ? (
          <p className="text-[13px] flex justify-center items-center ">
            {" "}
            {student?.email}
          </p>
        ) : (
          <input
            type="text"
            className=" outline-dashed"
            value={student?.email}
            placeholder="Add email"
            onChange={(e) =>
              setStudent({
                ...student,
                email: e.target.value,
              })
            }
          />
        )}
      </div>
      {/* <div className=" bg-[#FFF7F4] rounded-[8px] px-[16px] py-[8px]">
        <p className=" text-[10px] ">Address</p>
        <p className="text-[13px] flex justify-center items-center ">
          Dhaka, Farmgate
        </p>
      </div> */}
    </div>
  );
};

export default ContactTab;
