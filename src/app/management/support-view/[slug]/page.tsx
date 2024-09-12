import SupportViewDetails from "@/components/supports/SupportViewDetails";
import React from "react";

type Props = {};

const page = ({ params }: { params: { slug: string } }) => {
  return (
    <div>
      <SupportViewDetails supportId={params.slug} supportStatus={""} />
    </div>
  );
};

export default page;
