// "use client";
// import React, { useContext } from "react";
// import SubLayoutMenu from "./SubLayoutMenu";
// import { AuthContext } from "./ContextProvider";

// type Props = {
//   itemList: any;
//   grridSize: number;
//   boxWidth: number;
//   dataFetch?: any;
// };

// const SubLayout = ({ itemList, grridSize, dataFetch, boxWidth }: Props) => {
//   const { user } = useContext(AuthContext);
//   return (
//     <div
//       className={`  flex justify-between items-center no-scrollbar gap-[24px] py-[8px] w-full md:w-[736px] lg:w-full overflow-auto md:overscroll-none  `}
//     >
//       {itemList.map((item: any, index: any) => (
//         // <div
//         //   className={`  ${
//         //     item?.role?.includes(user?.role) ? " block" : "hidden"
//         //   } grow`}
//         //   key={index}
//         // >
//         <div key={index} className=" grow">
//           <SubLayoutMenu
//             dataReFetch={dataFetch}
//             title={item.title}
//             pathMatch={item.pathMatch}
//             iconUrl={item.imgUrl}
//             pageLink={item.pageLink}
//             boxwidth={boxWidth}
//             total={item?.total}
//             role={item?.role}
//           />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default SubLayout;

"use client";
import React, { useContext } from "react";
import SubLayoutMenu from "./SubLayoutMenu";
import { AuthContext } from "./ContextProvider";

type Props = {
  itemList: any;
  grridSize: number;
  boxWidth: number;
  dataFetch?: any;
};

const SubLayout = ({ itemList, grridSize, dataFetch, boxWidth }: Props) => {
  const { user } = useContext(AuthContext);

  return (
    <div
      className={`  flex items-center no-scrollbar py-[8px] w-full md:w-[736px] lg:w-full overflow-auto md:overscroll-none  `}
    >
      {itemList.map((item: any, index: any) => (
        // <div
        //   className={`  ${
        //     item?.role?.includes(user?.role) ? " block" : "hidden"
        //   } grow`}
        //   key={index}
        // >
        <div key={index} className=" grow">
          <SubLayoutMenu
            dataReFetch={dataFetch}
            title={item.title}
            pathMatch={item.pathMatch}
            iconUrl={item.imgUrl}
            pageLink={item.pageLink}
            boxwidth={boxWidth}
            total={item?.total}
            role={item?.role}
          />
        </div>
      ))}
    </div>
  );
};

export default SubLayout;
