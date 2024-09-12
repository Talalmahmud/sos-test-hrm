import { AuthContext } from "@/components/ContextProvider";
import SupportDetails from "@/components/supports/SupportDetails";

import React, { useContext, useEffect } from "react";

type Props = {};

const page = ({ params }: { params: { slug: string } }) => {
  
  return (
    <div>
      <SupportDetails supportId={params.slug[0]} supportStatus={params.slug[1]}  />
    </div>
  );
};

export default page;
