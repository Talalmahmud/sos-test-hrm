import React from "react";
import CustomModal from "./CustomModal";

type Props = { close: any; okfunction: any };

const DeleteCaution = ({ close, okfunction }: Props) => {
  return (
    <div>
      <CustomModal setClose={close}>
        <div className=" px-[32px] py-[16px] bg-white rounded-md">
          <p className=" text-orange text-[20px]">
            Are you sure to delete this item?
          </p>
          <div className=" flex items-center justify-end gap-4 pt-[16px]">
            <button
              onClick={close}
              className=" w-[80px] text-[16px] text-white rounded-[8px] py-[4px] bg-orange"
            >
              Cencel
            </button>
            <button
              onClick={okfunction}
              className=" w-[80px] text-[16px] text-white rounded-[8px] py-[4px] bg-green"
            >
              Ok
            </button>
          </div>
        </div>
      </CustomModal>
    </div>
  );
};

export default DeleteCaution;
