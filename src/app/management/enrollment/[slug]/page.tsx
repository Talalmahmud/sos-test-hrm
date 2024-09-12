import Enrollment from "@/components/enrollment/Enrollment";
import React from "react";

type Props = {};

const page = ({ params }: { params: { slug: string } }) => {
  return (
    <div>
      <Enrollment  enrollId={params.slug}/>
    </div>
  );
};

export default page;
