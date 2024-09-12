"use client";
import React, { useContext } from "react";
import { AuthContext } from "./ContextProvider";
import SubLayoutMenuAdmin from "./SubLayoutMenuAdmin";

type Props = {
  itemList: any;
  grridSize: number;
  boxWidth: number;
  dataFetch?: any;
};

const SubLayoutAdmin = ({
  itemList,
  grridSize,
  dataFetch,
  boxWidth,
}: Props) => {
  const { user } = useContext(AuthContext);

  return (
    <div
      className={`  flex justify-between items-center no-scrollbar py-[8px] w-full md:w-[736px] lg:w-full overflow-auto md:overscroll-none  `}
    >
      {itemList.map((item: any, index: any) => (
        // <div
        //   className={`  ${
        //     item?.role?.includes(user?.role) ? " block" : "hidden"
        //   } grow`}
        //   key={index}
        // >
        <div key={index} className=" grow">
          <SubLayoutMenuAdmin
            title={item.title}
            pathMatch={item.pathMatch}
            iconUrl={item.imgUrl}
            pageLink={item.pageLink}
            boxwidth={boxWidth}
            role={item?.role}
          />
        </div>
      ))}
    </div>
  );
};

export default SubLayoutAdmin;
