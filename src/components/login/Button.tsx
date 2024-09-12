import React from "react";

type Props = {
  title: string;
  onClickFunction: any;
};

const Button = ({ title, onClickFunction }: Props) => {
  return (
    <div
      onClick={onClickFunction}
      className=" w-[342px] hover:bg-green xl:w-[326px] h-[52px] font-[16px] cursor-pointer rounded-[8px] bg-orange text-white flex items-center justify-center "
    >
      {title}
    </div>
  );
};

export default Button;
