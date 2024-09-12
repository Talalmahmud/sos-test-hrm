import Student from "@/components/student/Student";
import MyStudent from "@/components/student/my/MyStudent";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <MyStudent />
    </div>
  );
};

export default page;
