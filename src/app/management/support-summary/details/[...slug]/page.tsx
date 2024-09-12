import SupportSummaryDetails from "@/components/supports/SupportSummaryDetails";
import React, { useContext, useEffect } from "react";

type Props = {};

const page = ({ params }: { params: { slug: string } }) => {
  return (
    <div>
      <SupportSummaryDetails />
    </div>
  );
};

export default page;
