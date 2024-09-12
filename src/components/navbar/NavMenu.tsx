import Image from "next/image";
import React from "react";

type Props = {};

const NavMenu = (props: Props) => {
  return (
    <div className=" flex items-center gap-x-[8px]">
      {/* <p className=" text-[16px]">Menu</p>
      <Image
        src={"/icons/chevron-right.svg"}
        height={20}
        width={20}
        alt="img"
      />
      <p>Dashboard</p>
      <Image
        src={"/icons/chevron-right.svg"}
        height={20}
        width={20}
        alt="img"
      />
      <p className=" text-[16px]">Admin Dashboard</p> */}
    </div>
  );
};

export default NavMenu;
