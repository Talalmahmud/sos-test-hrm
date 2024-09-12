import React from "react";

type Props = {
  title: string;
  clickFunction: any;
  boxWidth: number;
};

const AddButton = ({ title, clickFunction, boxWidth }: Props) => {
  return (
    <div
      onClick={clickFunction}
      style={{ width: `${boxWidth}px` }}
      className=" rounded-[8px] cursor-pointer h-[40px] flex gap-[4px] items-center justify-center text-[15px]  font-semibold shadow-md"
    >
      <p className=" text-[20px] font-semibold">{title}</p>
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M12 0C5.3828 0 0 5.3828 0 12C0 18.6172 5.3828 24 12 24C18.6172 24 24 18.6163 24 12C24 5.38373 18.6172 0 12 0ZM12 22.141C6.40898 22.141 1.85902 17.592 1.85902 12C1.85902 6.40805 6.40898 1.85902 12 1.85902C17.591 1.85902 22.141 6.40805 22.141 12C22.141 17.592 17.592 22.141 12 22.141Z"
            fill="green"
          />
          <path
            d="M16.6465 10.9869H12.9285V7.26889C12.9285 6.75579 12.513 6.33936 11.999 6.33936C11.4849 6.33936 11.0694 6.75579 11.0694 7.26889V10.9869H7.35141C6.83738 10.9869 6.42188 11.4034 6.42188 11.9164C6.42188 12.4295 6.83738 12.846 7.35141 12.846H11.0694V16.564C11.0694 17.0771 11.4849 17.4935 11.999 17.4935C12.513 17.4935 12.9285 17.0771 12.9285 16.564V12.846H16.6465C17.1606 12.846 17.5761 12.4295 17.5761 11.9164C17.5761 11.4034 17.1606 10.9869 16.6465 10.9869Z"
            fill="green"
          />
        </svg>
      </div>
    </div>
  );
};

export default AddButton;
