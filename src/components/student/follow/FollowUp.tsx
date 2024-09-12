"use client";
import { AuthContext } from "@/components/ContextProvider";
import CustomModal from "@/components/CustomModal";
import { EndPoint } from "@/utils/api";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import StudenFilter from "../StudenFilter";
import Pagination from "@/components/Pagination";
import { useRouter } from "next/navigation";

type Props = {};

const FollowUp = (props: Props) => {
  const { user } = useContext(AuthContext);
  const [toggle, setToggle] = useState(false);
  const [toggleData, setToggleData] = useState<any>("");

  const [follupList, setFollupList] = useState<any>([]);
  const [status, setStatus] = useState("");
  const [department, setDepartment] = useState("");
  const [session, setSession] = useState();
  const [phone, setPhone] = useState<any>("");
  const [semester, setSemester] = useState<any>("");
  const [institute, setInstitute] = useState("");
  const [listData, setListData] = useState([]);
  const [sessionList, setSessionList] = useState([]);
  const [selectedSession, setSelectedSession] = useState<any>("");
  const [departmentList, setDepartmentList] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState<any>("");
  const [pageNo, setPageNo] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [selectedStatus, setSelectedStatus] = useState<any>("");
  const [totalDataSet, setTotalDataSet] = useState(0);
  const router = useRouter();

  const getFollowUpList = async () => {
    if (user) {
      const res = await axios.get(EndPoint.FOLLOW_UP_LIST, {
        params: {
          limit: pageSize,
          user_id: user?.id,
          offset: pageSize * pageNo,
          department: selectedDepartment?.label,
          phone_number: phone,
          status: selectedStatus?.value,
          polytechnic: institute,
          semester: semester?.value,
          session: selectedSession?.label,
        },
        headers: {
          Authorization: "Bearer " + user?.access_token,
        },
      });
      const resData = await res.data;
      setFollupList(resData?.results);
      setTotalDataSet(resData.count);
    }
  };

  const getAllSession = async () => {
    const res = await axios.get(EndPoint.GET_DROPDOWN_SESSION);
    const resData = await res.data;
    setSessionList(resData?.results);
  };
  const navigatationHandle = (sId: any) => {
    router.push(`/management/student/portal/${sId}/student/`);
  };
  const getAllDepartment = async () => {
    const res = await axios.get(EndPoint.GET_DROPDOWN_DEPARTMENT);
    const resData = await res.data;
    setDepartmentList(resData?.results);
  };

  useEffect(() => {
    getAllSession();
    getAllDepartment();
  }, []);

  useEffect(() => {
    getFollowUpList();
  }, [
    user,
    pageNo,
    pageSize,
    institute,
    selectedSession,
    phone,
    semester,
    selectedDepartment,
    selectedStatus,
  ]);

  return (
    <div className=" flex flex-col gap-[8px]">
      <StudenFilter
        semester={semester}
        setSemester={setSemester}
        phone={phone}
        setPhone={setPhone}
        selectedSession={selectedSession}
        setSelectedSession={setSelectedSession}
        sessionList={sessionList}
        institute={institute}
        setInstitute={setInstitute}
        deprtmentList={departmentList}
        selectedDepartment={selectedDepartment}
        department={department}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        setSelectedDepartment={setSelectedDepartment}
      />
      <div className=" w-full  rounded-[16px] mt-[8px] transition-all ">
        <table className="w-full table-fixed text-center  rounded-[16px] text-[#121212]">
          <thead className=" bg-green text-white">
            <tr className=" text-left">
              <th className=" px-1 py-2 text-[13px] font-semibold rounded-tl-[13px] ">
                Followup Date
              </th>
              <th className=" px-1 py-2 text-[13px] font-semibold ">Name </th>

              <th className=" px-1 py-2 text-[13px] font-semibold ">Title</th>

              <th className=" px-1 py-2 text-[13px] font-semibold ">Payable</th>

              <th className=" px-1 py-2 text-[13px] font-semibold  ">
                Product Name
              </th>

              <th className=" px-1 py-2 text-[13px] font-semibold  ">Note</th>
              <th className=" px-1 py-2 text-[13px] font-semibold rounded-tr-[16px] ">
                Call type
              </th>
            </tr>
          </thead>
          <tbody className=" bg-white text-[12px] ">
            {follupList?.map((item: any, index: any) => (
              <tr
                key={index}
                className="border-b-[1px] py-[4px] text-left shadow-md border-b-[#A6ABB7]  "
              >
                <td className=" px-1 py-2">{item?.follow_up_date}</td>
                <td
                  onClick={() => navigatationHandle(item?.student?.id)}
                  className=" px-1 py-2 font-semibold active:text-green hover:text-green text-[#4a9d5c] cursor-pointer"
                >
                  {item?.student?.name}
                </td>
                <td className=" px-1 py-2">{item?.product_title}</td>

                <td className=" px-1 py-2">{item?.payable_amount} tk </td>

                <td className=" px-1 py-2">
                  {item?.book === null
                    ? item?.product_package?.label
                    : item?.book?.label}
                </td>
                <td className="  h-auto px-1 py-2">
                  <p
                    onClick={() => {
                      setToggle(true);
                      setToggleData(item?.follow_up_note);
                    }}
                    className=" overflow-auto h-auto "
                  >
                    {item?.follow_up_note?.slice(0, 80)}...
                  </p>
                </td>
                <td className=" px-4 py-2">{item?.call_type} </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        pageNo={pageNo}
        pageSize={pageSize}
        setPageNo={setPageNo}
        setPageSize={setPageSize}
        totalPage={totalDataSet}
      />

      {toggle && (
        <CustomModal setClose={() => setToggle(false)}>
          <div className="max-w-[600px] h-auto bg-white p-4">
            <p className="w-full break-words text-[18px]">{toggleData}</p>
          </div>
        </CustomModal>
      )}
    </div>
  );
};

export default FollowUp;
