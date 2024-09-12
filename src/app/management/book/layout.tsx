import SubLayout from "@/components/SubLayout";
import React from "react";

const menuList = [
  {
    title: "Add Book",
    pageLink: "/management/book/add",
    pathMatch: "/management/book/add",
    role: [0],
  },

  {
    title: "Book Sale",
    pageLink: "/management/book/sale",
    pathMatch: "/management/book/sale",
    role: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  },
  {
    title: "Pending Sale",
    pageLink: "/management/book/processing",
    pathMatch: "/management/book/processing",
    role: [0],
  },
  {
    title: "Sale Summary",
    pageLink: "/management/book/summary",
    pathMatch: "/management/book/summary",
    role: [0],
  },
];
type Props = {
  children: React.ReactNode;
};

const BookLayout = ({ children }: Props) => {
  return (
    <div>
      <SubLayout
        itemList={menuList}
        boxWidth={364}
        grridSize={menuList.length - 1}
      />
      <div className=" "> {children}</div>
    </div>
  );
};

export default BookLayout;
