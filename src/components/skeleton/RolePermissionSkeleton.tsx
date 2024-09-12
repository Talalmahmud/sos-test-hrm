import React from "react";

type Props = {};

const RolePermissionSkeleton = (props: Props) => {
  return (
    <tr className="animate-pulse">
      <td className="p-2">
        <div className="h-[20px] bg-gray_light rounded"></div>
      </td>
      <td className="p-2">
        <div className="h-[20px] bg-gray_light rounded"></div>
      </td>
      <td className="p-2">
        <div className="h-[20px] bg-gray_light rounded"></div>
      </td>
    </tr>
  );
};

export default RolePermissionSkeleton;
