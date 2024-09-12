"use client";
import React, { useEffect, useState } from "react";

type Props = {
  totalPage: number;
  pageSize: number;
  pageNo: number;
  setPageNo: any;
  setPageSize: any;
};
const createList = (num: number) => {
  const arrList = [];

  for (let i = 0; i < num; i++) {
    arrList.push(i + 1);
  }

  return arrList;
};

const Pagination = ({
  totalPage,
  pageNo,
  pageSize,
  setPageNo,
  setPageSize,
}: Props) => {
  const [inputValue, setInputValue] = useState(pageSize);
  const [pages, setPages] = useState<any>([]);
  const [selectedPage, setSelectedPage] = useState(pageNo);

  const increseInput = () => {
    if (pageSize >= 0 && pageSize <= 100) {
      setPageSize(pageSize + 1);
    }
  };

  const decreseInput = () => {
    if (pageSize >= 1 && pageSize <= 100) {
      setPageSize(pageSize - 1);
    }
  };

  const pageIncrease = () => {
    if (pages?.length - 1 !== pageNo) setPageNo(pageNo + 1);
  };
  const pageDecrese = () => {
    if (pageNo > 0) setPageNo(pageNo - 1);
  };

  useEffect(() => {
    if (pageSize) {
      const d = createList(Math.ceil(totalPage / pageSize));
      //     const d = createList(5);
      setPages(d);
    }
  }, [totalPage, pageSize]);
  return (
    <div className=" flex flex-col gap-[4px] py-[8px] ">
      <div className=" flex items-center text-[16px] gap-[4px]">
        <p className=" select-none">Showing Result</p>
        <input
          type="numeric"
          defaultValue={1}
          value={pageSize >= totalPage ? totalPage : pageSize}
          onChange={(e: any) => setPageSize(e.target.value)}
          min={1}
          max={100}
          className=" w-[40px] flex items-center justify-center text-center rounded-[8px] border-[1px] "
        />

        <div className=" flex flex-col ">
          <div className=" cursor-pointer" onClick={() => increseInput()}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.9188 15.8203H11.6888H6.07877C5.11877 15.8203 4.63877 14.6603 5.31877 13.9803L10.4988 8.80031C11.3288 7.97031 12.6788 7.97031 13.5088 8.80031L15.4788 10.7703L18.6888 13.9803C19.3588 14.6603 18.8788 15.8203 17.9188 15.8203Z"
                fill="#171717"
              />
            </svg>
          </div>
          <div className=" cursor-pointer" onClick={() => decreseInput()}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.9188 8.17969H11.6888H6.07877C5.11877 8.17969 4.63877 9.33969 5.31877 10.0197L10.4988 15.1997C11.3288 16.0297 12.6788 16.0297 13.5088 15.1997L15.4788 13.2297L18.6888 10.0197C19.3588 9.33969 18.8788 8.17969 17.9188 8.17969Z"
                fill="#171717"
              />
            </svg>
          </div>
        </div>
        <p className="select-none">Out Of </p>
        <p className=" text-[20px] select-none font-semibold">{totalPage}</p>
      </div>
      <div className=" flex items-center justify-center gap-[8px]">
        <div className=" cursor-pointer" onClick={() => pageDecrese()}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className=" hover:stroke-title"
          >
            <g clip-path="url(#clip0_2014_2402)">
              <path
                d="M3.97667 12.4998L14.0417 22.5643C14.2526 22.7753 14.3711 23.0615 14.3711 23.3599C14.371 23.6583 14.2525 23.9445 14.0414 24.1555C13.8304 24.3665 13.5442 24.4849 13.2458 24.4849C12.9474 24.4849 12.6612 24.3663 12.4503 24.1552L1.59026 13.2967C1.3793 13.0857 1.26078 12.7995 1.26078 12.5012C1.26078 12.2028 1.3793 11.9167 1.59026 11.7057L12.4503 0.844308C12.6612 0.633275 12.9474 0.514692 13.2458 0.514648C13.5442 0.514604 13.8304 0.633102 14.0414 0.844074C14.2525 1.05505 14.371 1.34121 14.3711 1.63961C14.3711 1.93801 14.2526 2.22421 14.0417 2.43525L3.97667 12.4998Z"
                fill="#CED1D7"
              />
              <path
                d="M23.4088 24.1555C23.1978 24.3664 22.9117 24.485 22.6133 24.485C22.315 24.485 22.0288 24.3664 21.8179 24.1555L10.9574 13.2969C10.7464 13.0859 10.6279 12.7998 10.6279 12.5014C10.6279 12.2031 10.7464 11.9169 10.9574 11.7059L21.8179 0.844537C22.0294 0.636397 22.3147 0.520285 22.6114 0.521494C22.9082 0.522702 23.1925 0.641133 23.4024 0.850989C23.6122 1.06085 23.7306 1.34512 23.7318 1.6419C23.7331 1.93868 23.6169 2.22392 23.4088 2.43547L13.3424 12.5L23.4088 22.5645C23.6198 22.7755 23.7383 23.0617 23.7383 23.36C23.7383 23.6584 23.6198 23.9445 23.4088 24.1555Z"
                fill="#CED1D7"
              />
            </g>
            <defs>
              <clipPath id="clip0_2014_2402">
                <rect
                  width="24"
                  height="24"
                  fill="white"
                  transform="matrix(-1 0 0 1 24.5 0.5)"
                />
              </clipPath>
            </defs>
          </svg>
        </div>
        <div className=" tex-[16px] max-w-[500px] flex overflow-x-scroll no-scrollbar items-center gap-[8px]">
          {pages?.length !== 0 &&
            pages?.map((item: any, index: any) => (
              <p
                onClick={() => setPageNo(index)}
                key={index}
                className={` min-w-[37px] ${
                  index === pageNo && " bg-green text-white "
                } hover:bg-green hover:text-white cursor-pointer select-none h-[30px] border-[1px] flex items-center justify-center rounded-[8px]`}
              >
                {index + 1}
              </p>
            ))}
        </div>
        <div className=" cursor-pointer" onClick={() => pageIncrease()}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className=" hover:stroke-title"
          >
            <g clip-path="url(#clip0_2014_2428)">
              <path
                d="M21.0233 12.4998L10.9583 22.5643C10.7474 22.7753 10.6289 23.0615 10.6289 23.3599C10.629 23.6583 10.7475 23.9445 10.9586 24.1555C11.1696 24.3665 11.4558 24.4849 11.7542 24.4849C12.0526 24.4849 12.3388 24.3663 12.5497 24.1552L23.4097 13.2967C23.6207 13.0857 23.7392 12.7995 23.7392 12.5012C23.7392 12.2028 23.6207 11.9167 23.4097 11.7057L12.5497 0.844308C12.3388 0.633275 12.0526 0.514692 11.7542 0.514648C11.4558 0.514604 11.1696 0.633102 10.9586 0.844074C10.7475 1.05505 10.629 1.34121 10.6289 1.63961C10.6289 1.93801 10.7474 2.22421 10.9583 2.43525L21.0233 12.4998Z"
                fill="#CED1D7"
              />
              <path
                d="M1.5912 24.1555C1.80217 24.3664 2.08831 24.485 2.38667 24.485C2.68502 24.485 2.97116 24.3664 3.18213 24.1555L14.0426 13.2969C14.2536 13.0859 14.3721 12.7998 14.3721 12.5014C14.3721 12.2031 14.2536 11.9169 14.0426 11.7059L3.18213 0.844537C2.97058 0.636397 2.68534 0.520285 2.38856 0.521494C2.09178 0.522702 1.80751 0.641133 1.59765 0.850989C1.38779 1.06085 1.26936 1.34512 1.26815 1.6419C1.26695 1.93868 1.38306 2.22392 1.5912 2.43547L11.6576 12.5L1.5912 22.5645C1.38023 22.7755 1.26172 23.0617 1.26172 23.36C1.26172 23.6584 1.38023 23.9445 1.5912 24.1555Z"
                fill="#CED1D7"
              />
            </g>
            <defs>
              <clipPath id="clip0_2014_2428">
                <rect
                  width="24"
                  height="24"
                  fill="white"
                  transform="translate(0.5 0.5)"
                />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
      <div className=" flex items-center justify-center gap-[8px] py-[8px]">
        <button
          onClick={() => pageDecrese()}
          className=" hover:bg-green hover:text-white select-none w-[98px] h-[35px] border-[1px] flex justify-center items-center rounded-[8px] "
        >
          Previous
        </button>

        <button
          onClick={() => pageIncrease()}
          className=" hover:bg-green hover:text-white select-none w-[68px] h-[35px] border-[1px] flex justify-center items-center rounded-[8px] "
        >
          next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
