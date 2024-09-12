import { EndPoint } from "@/utils/api";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { toast } from "react-toastify";

const animatedComponents = makeAnimated();
type Props = {
  formClose: any;
  listUpdate: any;
  departmentList?: any;
  instituteId?: any;
};

const InstituteForm = ({
  departmentList,
  listUpdate,
  instituteId,
  formClose,
}: Props) => {
  const [instituteData, setInstituteData] = useState<any>({
    instituteName: "",
    polytechnic_code: null,
  });
  const [emptyCheck, setEmptyCheck] = useState(false);
  const [selectedType, setSelectedType] = useState<any>("");

  const [selectedDepartment, setSelectedDepartment] = useState<any>("");

  const getInstitute = async () => {
    if (instituteId) {
      try {
        const res = await axios.get(
          EndPoint.GET_POLYTECHNIC_BY_ID + instituteId
        );
        const resResult = await res.data;

        setInstituteData({
          instituteName: resResult.polytechnic_name,

          polytechnic_code: resResult?.polytechnic_code,
        });
        setSelectedDepartment(resResult?.departments);
        setSelectedType({
          label: resResult?.institute_type,
          value: resResult?.institute_type,
        });
      } catch (error) {}
    }
  };

  const addInstitute = async () => {
    try {
      if (
        instituteData.instituteType !== "" &&
        instituteData.instituteName !== ""
      ) {
        const outputData = selectedDepartment.map((item: any) => item.value);

        const postData = {
          polytechnic_name: instituteData.instituteName,
          institute_type: selectedType?.value,
          departments: outputData,
          polytechnic_code: instituteData?.polytechnic_code,
        };
        const res = await axios.post(EndPoint.ADD_POLYTECHNIC, postData);
        setInstituteData({
          instituteName: "",
          polytechnic_code: null,
        });
        listUpdate();
        toast.success("Institute is added.");

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
  const updateInstitute = async () => {
    try {
      if (
        instituteData.instituteType !== "" &&
        instituteData.instituteName !== ""
      ) {
        const outputData = selectedDepartment.map((item: any) => item.value);
        const postData = {
          polytechnic_name: instituteData.instituteName,
          institute_type: selectedType?.value,
          departments: outputData,
          polytechnic_code: instituteData.polytechnic_code,
        };
        const res = await axios.patch(
          EndPoint.UPDATE_POLYTECHNIC + instituteId,
          postData
        );
        setInstituteData({
          instituteName: "",
          polytechnic_code: null,
        });
        listUpdate();
        toast.success("Institute is Updated.");

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

  useEffect(() => {
    getInstitute();
  }, [instituteId]);
  return (
    <div>
      <div className=" w-[700px] rounded-[16px] bg-button_bg text-white p-[16px] flex flex-col justify-center gap-[16px]">
        <div className=" flex w-full flex-col gap-[4px]">
          <p className=" text-white text-[16px] font-semibold ">
            Polytechnic Type:
          </p>
          <div className=" w-full  cursor-pointer">
            <Select
              value={selectedType}
              components={animatedComponents}
              isClearable
              options={[
                {
                  value: "PRIVATE",
                  label: "PRIVATE",
                },
                {
                  value: "GOVT",
                  label: "GOVT",
                },
                {
                  value: "TEXTILE",
                  label: "TEXTILE",
                },
              ]}
              onChange={(e: any) => setSelectedType(e)}
              placeholder="Select polytechnic type..."
              className=" w-[300px] text-[16px]  text-black cursor-pointer"
            />
          </div>
        </div>

        <div className=" flex flex-col gap-[4px] text-[16px] ">
          <p className=" text-[16px] font-semibold text-white">
            Institute Name:
          </p>
          <input
            type="text"
            value={instituteData?.instituteName}
            onChange={(e: any) =>
              setInstituteData({
                ...instituteData,
                instituteName: e.target.value,
              })
            }
            placeholder="Enter Institute Name"
            className=" w-full px-[8px] h-[40px] text-[16px] rounded-[8px] text-black"
          />
        </div>
        <div className=" flex flex-col gap-[4px] text-[16px] ">
          <p className=" text-[16px] font-semibold text-white">
            Institute Code:
          </p>
          <input
            type="text"
            value={instituteData?.polytechnic_code}
            onChange={(e: any) =>
              setInstituteData({
                ...instituteData,
                polytechnic_code: e.target.value,
              })
            }
            placeholder="Enter Institute Code"
            className=" w-full px-[8px] h-[40px] text-[16px] rounded-[8px] text-black"
          />
        </div>
        <div className=" flex flex-col gap-[4px]">
          <p className=" text-white text-[16px] font-semibold ">Department:</p>
          <div className=" w-full  cursor-pointer">
            <Select
              isSearchable
              components={animatedComponents}
              onChange={(e) => setSelectedDepartment(e)}
              placeholder="Select department..."
              isMulti
              value={selectedDepartment}
              maxMenuHeight={200}
              closeMenuOnSelect={false}
              options={departmentList}
              className=" w-full text-[16px]  text-black cursor-pointer"
            />
          </div>
        </div>

        <div className=" flex justify-end items-center gap-[16px]">
          <button
            onClick={() => formClose(false)}
            className=" flex justify-center items-center  text-white w-[115px] h-[39px] border-[1px] border-white rounded-[8px]"
          >
            Cancel
          </button>
          {instituteId ? (
            <button
              onClick={() => updateInstitute()}
              className=" flex justify-center items-center bg-border_orange text-white w-[116px] h-[40px] rounded-[8px]"
            >
              Update
            </button>
          ) : (
            <button
              onClick={() => addInstitute()}
              className=" flex justify-center items-center bg-border_orange text-white w-[116px] h-[40px] rounded-[8px]"
            >
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default InstituteForm;
