import React from "react";
import SupportTable from "./SupportTable";

type Props = { title: string; allList: any };

const SupportTableWithTitle = ({ title, allList }: Props) => {
  return (
    <>
      {allList?.premium?.length +
        allList?.basic?.length +
        allList?.free?.length +
        allList?.dimond?.length !==
      0 ? (
        <div className=" w-full  pt-[16px] flex flex-col justify-center items-center">
          <p className="w-full text-center text-[24px] bg-green text-white rounded-tr-[16px] rounded-tl-[16px] font-semibold">
            {title}
          </p>
          <div className=" pt-[16px] w-full grid grid-cols-1 rounded-bl-[16px] rounded-br-[16px]">
            {allList?.premium?.length > 0 && (
              <SupportTable
                title="Premium Student"
                listData={allList?.premium}
              />
            )}
            {allList?.premium?.length > 0 && (
              <SupportTable
                title="Daimond Student"
                listData={allList?.dimond}
              />
            )}
            {allList?.premium?.length > 0 && (
              <SupportTable title="Basic Student" listData={allList?.basic} />
            )}
            {allList?.premium?.length > 0 && (
              <SupportTable title="Free Student" listData={allList?.free} />
            )}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default SupportTableWithTitle;
