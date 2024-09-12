import UpdateForm from "@/components/user/UpdateForm";
import React from "react";

type Props = {};

const Page = ({ params }: { params: { slug: string } }) => {
  return (
    <>
      <UpdateForm userId={params.slug} />
    </>
  );
};

export default Page;
