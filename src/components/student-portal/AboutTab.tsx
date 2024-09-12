"use client";
import React from "react";

type Props = {
  editable: boolean;
  selectedDream: any;
  setSelectedDream: any;
  guardian: any;
  setGuardian: any;
};

const AboutTab = ({
  guardian,
  setGuardian,
  editable,
  selectedDream,
  setSelectedDream,
}: Props) => {
  return (
    <div className=" flex flex-col gap-[8px]  ">
      <div className=" bg-[#FFF7F4] rounded-[8px] px-[16px] py-[8px]">
        <p className=" text-[10px] ">Dream:</p>

        {editable ? (
          <p className=" font-semibold text-[12px]">{selectedDream}</p>
        ) : (
          <select
            className=" text-[12px] outline-dashed"
            id="dream"
            onChange={(e) => setSelectedDream(e.target.value)}
          >
            <option label="DUET" value="DUET"></option>
            <option label="GOVT-JOB" value="GOVT-JOB"></option>
          </select>
        )}
      </div>

      {/* <div className=" bg-[#FFF7F4] rounded-[8px] px-[16px] py-[8px]">
        <div className=" flex flex-col gap-[8px]">
          <div>
            <p className=" text-[10px] ">City:</p>
            <ul className=" pl-[18px] list-disc gap-[4px]">
              <li className=" text-[13px]">Dhaka</li>
            </ul>
          </div>
          <div>
            {" "}
            <p className=" text-[10px] ">Post:</p>
            <ul className=" pl-[18px] list-disc gap-[4px]">
              <li className=" text-[13px]">Farmgate</li>
            </ul>
          </div>
          <div>
            <p className=" text-[10px] ">District:</p>

            <ul className=" pl-[18px] list-disc gap-[4px]">
              <li className=" text-[13px]">Dhaka</li>
            </ul>
          </div>
        </div>
      </div> */}
      <div className=" bg-[#FFF7F4] rounded-[8px] px-[16px] py-[8px]">
        <div className=" flex flex-col gap-[8px]">
          <div>
            <div className=" flex gap-2 items-center">
              <p className=" text-[10px] ">
                <span>{guardian?.guardian_relation}</span>'s Name:
              </p>
              {!editable && (
                <select
                  id="relation"
                  className=" text-[10px] outline-dashed"
                  onChange={(e: any) =>
                    setGuardian({
                      ...guardian,
                      guardian_relation: e.target.value,
                    })
                  }
                >
                  <option label="FATHER" value="FATHER"></option>
                  <option label="BROTHER" value="BROTHER"></option>
                  <option label="MOTHER" value="MOTHER"></option>
                  <option label="SISTER" value="SISTER"></option>
                  <option label="UNCLE" value="UNCLE"></option>
                  <option label="OTHERS" value="OTHERS"></option>
                </select>
              )}
            </div>

            <ul className=" pl-[18px] list-disc gap-[4px]">
              <li className=" text-[13px]">
                {editable ? (
                  <p>{guardian?.guardian_name}</p>
                ) : (
                  <input
                    className=" outline-dashed"
                    type="text"
                    value={guardian?.guardian_name}
                    placeholder="Add name"
                    onChange={(e) =>
                      setGuardian({
                        ...guardian,
                        guardian_name: e.target.value,
                      })
                    }
                  />
                )}
              </li>
            </ul>
          </div>
          <div>
            <p className=" text-[10px] ">Profession:</p>
            <ul className=" pl-[18px] list-disc gap-[4px]">
              <li className=" text-[13px]">
                {" "}
                {editable ? (
                  <p>{guardian?.designation}</p>
                ) : (
                  <input
                    type="text"
                    className="outline-dashed"
                    placeholder="Add profession"
                    value={guardian?.designation}
                    onChange={(e) =>
                      setGuardian({ ...guardian, designation: e.target.value })
                    }
                  />
                )}
              </li>
            </ul>
          </div>
          <div>
            <p className=" text-[10px] ">Monthly Income:</p>

            <ul className=" pl-[18px] list-disc gap-[4px]">
              <li className=" text-[13px]">
                {editable ? (
                  <p>{guardian?.salary} tk</p>
                ) : (
                  <input
                    type="text"
                    className="outline-dashed"
                    value={guardian?.salary}
                    placeholder="Add income"
                    onChange={(e) =>
                      setGuardian({ ...guardian, salary: e.target.value })
                    }
                  />
                )}
              </li>
            </ul>
          </div>

          <div>
            <p className=" text-[10px] ">Contact:</p>

            <ul className=" pl-[18px] list-disc gap-[4px]">
              <li className=" text-[13px]">
                {editable ? (
                  <p>{guardian?.guardian_contact}</p>
                ) : (
                  <input
                    type="text"
                    className="outline-dashed"
                    value={guardian?.guardian_contact}
                    placeholder="Add number"
                    onChange={(e) =>
                      setGuardian({
                        ...guardian,
                        guardian_contact: e.target.value,
                      })
                    }
                  />
                )}
              </li>
            </ul>
          </div>

          <div>
            <p className=" text-[10px] ">Address:</p>

            <ul className=" pl-[18px] list-disc gap-[4px]">
              <li className=" text-[13px]">
                {editable ? (
                  <p>{guardian?.guardian_address}</p>
                ) : (
                  <input
                    type="text"
                    className="outline-dashed"
                    value={guardian?.guardian_address}
                    placeholder="Add address"
                    onChange={(e) =>
                      setGuardian({
                        ...guardian,
                        guardian_address: e.target.value,
                      })
                    }
                  />
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutTab;
