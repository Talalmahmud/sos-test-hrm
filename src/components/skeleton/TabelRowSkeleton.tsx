import React from "react";
type Props = {
  colomNumber: number;
};
const TableRowSkeleton = ({ colomNumber }: Props) => {
  const dummyList = Array.from({ length: colomNumber || 1 });
  return (
    <tr className="animate-pulse">
      {dummyList?.map((_, index) => (
        <td key={index} className="p-2">
          <div className="h-[20px] bg-gray_light rounded"></div>
        </td>
      ))}
    </tr>
  );
};

export default TableRowSkeleton;
