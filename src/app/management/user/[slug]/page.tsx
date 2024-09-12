import React from "react";
import UserDetails from "../../../../components/user/UserDetails";

type Props = {};

const Page = ({ params }: { params: { slug: string } }) => {
  return (
    <div>
      <UserDetails userId={params.slug} />
    </div>
  );
};

export default Page;
