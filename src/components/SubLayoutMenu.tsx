// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import React, { useContext } from "react";
// import { AuthContext } from "./ContextProvider";

// type Props = {
//   title: string;
//   iconUrl?: string;
//   pageLink: string;
//   pathMatch: string;
//   isVisited?: boolean;
//   boxwidth?: number;
//   total?: any;
//   role?: any;
//   dataReFetch?: any;
// };

// const SubLayoutMenu = ({
//   title,
//   iconUrl,
//   pageLink,
//   isVisited,
//   pathMatch,
//   dataReFetch,
//   boxwidth,
//   total,
//   role,
// }: Props) => {
//   const pathName = usePathname();
//   const { user } = useContext(AuthContext);
//   return (
//     <Link
//       href={pageLink}
//       onClick={() => dataReFetch()}
//       className={` ${role?.includes(user?.role) ? "block" : "hidden"} w-full`}
//     >
//       <div
//         // style={{ width: `${boxwidth}px` }}
//         className={`border-b-[4px] border-bg_orange ${
//           pathName.includes(pathMatch) ? "border-border_orange" : ""
//         } hover:border-border_orange  bg-bg_orange font-semibold h-[40px] lg:h-[70px] rounded-[8px] shadow-inner flex justify-center items-center gap-[10px] px-[16px] `}
//       >
//         {iconUrl && <Image src={iconUrl} height={21} width={21} alt="image" />}
//         <p className=" text-center text-[10px] lg:text-[16px]">{title}</p>
//         {total > 0 && (
//           <p className=" rounded-full border-[1px] border-red flex justify-center text-[10px] lg:text-[16px] items-center p-1 text-red font-semibold">
//             {total}
//           </p>
//         )}
//       </div>
//     </Link>
//   );
// };

// export default SubLayoutMenu;

"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useContext } from "react";
import { AuthContext } from "./ContextProvider";

type Props = {
  title: string;
  iconUrl?: string;
  pageLink: string;
  pathMatch: string;
  isVisited?: boolean;
  boxwidth?: number;
  total?: any;
  role?: any;
  dataReFetch?: any;
};

const SubLayoutMenu = ({
  title,
  iconUrl,
  pageLink,
  isVisited,
  pathMatch,
  dataReFetch,
  boxwidth,
  total,
  role,
}: Props) => {
  const pathName = usePathname();
  const { user } = useContext(AuthContext);
  return (
    <Link
      href={pageLink}
      onClick={() => dataReFetch()}
      className={` ${role?.includes(user?.role) ? "block" : "hidden"} w-full `}
    >
      <div
        // style={{ width: `${boxwidth}px` }}
        className={`border-b-[2px] border-bg_orange ${
          pathName.includes(pathMatch)
            ? "border-border_orange bg-[#f6f0eb] text-black"
            : ""
        } hover:border-border_orange  font-semibold h-[40px]  flex justify-center items-center gap-[10px] px-[16px] `}
      >
        {iconUrl && <Image src={iconUrl} height={21} width={21} alt="image" />}
        <p className=" text-center text-[10px] md:text-[14px]">{title}</p>
        {total > 0 && (
          <p
            className={` rounded-full h-[20px]  border-[1px] border-red text-red
            }  flex justify-center text-[10px] md:text-[14px] items-center p-1  font-semibold`}
          >
            {total}
          </p>
        )}
      </div>
    </Link>
  );
};

export default SubLayoutMenu;
