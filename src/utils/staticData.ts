export const linkList = [
  {
    title: "Dashboard",
    urlLink: "/management/dashboard/admin",
    pathMatch: "dashboard",
    imgUrl: "/icons/dashboard.svg",
    role: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  },
  {
    title: "Enroll Management",
    urlLink: "/management/course/pending-access",
    pathMatch: "management/course",
    imgUrl: "/icons/sidebar/course.svg",
    role: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  },
  {
    title: "Student Management",
    urlLink: "/management/student/list/all",
    pathMatch: "/management/student",
    imgUrl: "/icons/sidebar/student.svg",
    role: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  },
  {
    title: "User Management",
    urlLink: "/management/user",
    pathMatch: "/management/user",
    imgUrl: "/icons/sidebar/support.svg",
    role: [0],
  },
  {
    title: "Package Management",
    urlLink: "/management/package/plan",
    pathMatch: "/management/package",
    imgUrl: "/icons/sidebar/book.svg",
    role: [0],
  },
  {
    title: "Control Management",
    urlLink: "/management/control/catagory",
    pathMatch: "/management/control",
    imgUrl: "/icons/sidebar/role.svg",
    role: [0],
  },
  {
    title: "Roll and Permissions",
    urlLink: "/management/role-permission/add-group",
    pathMatch: "/management/role-permission",
    imgUrl: "/icons/sidebar/role.svg",
    role: [0],
  },
  {
    title: "Book Management",
    urlLink: "/management/book/add",
    pathMatch: "/management/book/",
    imgUrl: "/icons/sidebar/book.svg",
    role: [0],
  },
  {
    title: "Support Management",
    urlLink: "/management/support/pending",
    pathMatch: "/management/support",
    imgUrl: "/icons/sidebar/support.svg",
    role: [0, 2],
  },
  {
    title: "Support Summary",
    urlLink: "/management/support-summary",
    pathMatch: "/management/support-summary",
    imgUrl: "/icons/sidebar/support.svg",
    role: [0, 2],
  },
];

export const customStyles = {
  control: (provided: any) => ({
    ...provided,
    backgroundColor: "#247B54", // Set background color of the control to green
    color: "white", // Set text color to white
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: "white", // Set background color of the menu to green
    color: "white", // Ensure text color is white for contrast
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "orange"
      : state.isFocused
      ? "darkorange"
      : "white", // Different shades of green for different states
    color: "black", // Set text color to white
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: "white", // Set the color of the selected value text to white
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: "white", // Set placeholder text color to white
  }),
};

export const customStylesFollowUp = {
  control: (provided: any) => ({
    ...provided,
    backgroundColor: "#f2f2f2", // Set background color of the control to green
    color: "black", // Set text color to white
    fontSize: "13px",
    borderRadius: "8px",
    maxHeight: "15px",
  }),

  menu: (provided: any) => ({
    ...provided,
    backgroundColor: "white", // Set background color of the menu to green
    color: "white", // Ensure text color is white for contrast
  }),

  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "orange"
      : state.isFocused
      ? "darkorange"
      : "white", // Different shades of green for different states
    color: "black", // Set text color to white
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: "black", // Set the color of the selected value text to white
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: "black", // Set placeholder text color to white
  }),
};

export const semesterList = [
  {
    label: "1st",
    value: 1,
  },
  {
    label: "2nd",
    value: 2,
  },
  ,
  {
    label: "3rd",
    value: 3,
  },
  {
    label: "4th",
    value: 4,
  },
  {
    label: "5th",
    value: 5,
  },
  {
    label: "6th",
    value: 6,
  },
  {
    label: "7th",
    value: 7,
  },
  {
    label: "8th",
    value: 8,
  },
];

export const paymentList = [
  {
    label: "Marchent",
    value: "Marchent",
  },
  {
    label: "Bkash",
    value: "Bkash",
  },
  {
    label: "Rocket",
    value: "Rocket",
  },
  {
    label: "Nagad",
    value: "Nagad",
  },
  {
    label: "Marchent",
    value: "Marchent",
  },
  {
    label: "Cash Hand",
    value: "Cash Hand",
  },
  {
    label: "Apps",
    value: "Apps",
  },
  {
    label: "Upay",
    value: "Upay",
  },
];

export const semesterLabel = (value: any) => {
  if (value === 1) {
    return "1st";
  }
  if (value === 2) {
    return "2nd";
  }
  if (value === 3) {
    return "3rd";
  }
  if (value === 4) {
    return "4th";
  }
  if (value === 5) {
    return "5th";
  }
  if (value === 6) {
    return "6th";
  }
  if (value === 7) {
    return "7th";
  }
  if (value === 8) {
    return "8th";
  } else {
    return "Not Add";
  }
};

export const monthLabel = (value: any) => {
  if (value === 1) {
    return "Jan";
  }
  if (value === 2) {
    return "Feb";
  }
  if (value === 3) {
    return "Mar";
  }
  if (value === 4) {
    return "Apr";
  }
  if (value === 5) {
    return "May";
  }
  if (value === 6) {
    return "Jun";
  }
  if (value === 7) {
    return "July";
  }
  if (value === 8) {
    return "Aug";
  }
  if (value === 9) {
    return "Sept";
  }
  if (value === 10) {
    return "Oct";
  }
  if (value === 11) {
    return "Nov";
  }
  if (value === 12) {
    return "Dec";
  } else {
    return "Not Add";
  }
};
export const dataset = [
  {
    london: 59,
    paris: 57,
    newYork: 86,
    seoul: 21,
    month: "Jan",
  },
  {
    london: 50,
    paris: 52,
    newYork: 78,
    seoul: 28,
    month: "Feb",
  },
  {
    london: 47,
    paris: 53,
    newYork: 106,
    seoul: 41,
    month: "Mar",
  },
  {
    london: 54,
    paris: 56,
    newYork: 92,
    seoul: 73,
    month: "Apr",
  },
  {
    london: 57,
    paris: 69,
    newYork: 92,
    seoul: 99,
    month: "May",
  },
  {
    london: 60,
    paris: 63,
    newYork: 103,
    seoul: 144,
    month: "June",
  },
  {
    london: 59,
    paris: 60,
    newYork: 105,
    seoul: 319,
    month: "July",
  },
  {
    london: 65,
    paris: 60,
    newYork: 106,
    seoul: 249,
    month: "Aug",
  },
  {
    london: 51,
    paris: 51,
    newYork: 95,
    seoul: 131,
    month: "Sept",
  },
  {
    london: 60,
    paris: 65,
    newYork: 97,
    seoul: 55,
    month: "Oct",
  },
  {
    london: 67,
    paris: 64,
    newYork: 76,
    seoul: 48,
    month: "Nov",
  },
  {
    london: 61,
    paris: 70,
    newYork: 103,
    seoul: 25,
    month: "Dec",
  },
];

export const dayLabel = (value: any) => {
  if (value === 0) {
    return "Saturday";
  }
  if (value === 1) {
    return "Sunday";
  }
  if (value === 2) {
    return "Monday";
  }
  if (value === 3) {
    return "Tuseday";
  }
  if (value === 4) {
    return "Ewdnesday";
  }
  if (value === 5) {
    return "Thursday";
  }
  if (value === 6) {
    return "Friday";
  } else {
    return "Not Add";
  }
};

export function profitCalculation(
  previousMonthSold: any,
  currentMonthSold: any
) {
  if (previousMonthSold > 0) {
    const difference =
      (currentMonthSold - previousMonthSold) / previousMonthSold;
    const parcentageDifference = difference * 100;
    return Number(parcentageDifference.toFixed(1));
  } else {
    return Number(100).toFixed(1);
  }
}

export const roleList = [
  { value: 0, label: "SUPER ADMIN" },
  { value: 1, label: "STUDENT" },
  { value: 2, label: "SUPPORT TEACHER" },
  { value: 3, label: "MANAGER" },
  { value: 4, label: "MARKETER" },
  { value: 5, label: "CONTENT WRITER" },
  { value: 6, label: "VvalueEO EDITOR" },
  { value: 7, label: "SOFTWARE ENGINEER" },
  { value: 8, label: "COMPUTER OPERATOR" },
  { value: 9, label: "COURSE TEACHER" },
  { value: 10, label: "HR" },
];

export const monthList = [
  { label: "January", value: 1 },
  { label: "February", value: 2 },
  { label: "March", value: 3 },
  { label: "April", value: 4 },
  { label: "May", value: 5 },
  { label: "Jun", value: 6 },
  { label: "July", value: 7 },
  { label: "August", value: 8 },
  { label: "September", value: 9 },
  { label: "October", value: 10 },
  { label: "November", value: 11 },
  { label: "December", value: 12 },
];

const data = new Date();
const currentYear = data.getFullYear();
export const yearList = [
  { label: currentYear - 2, value: currentYear - 2 },
  { label: currentYear - 2, value: currentYear - 2 },
  { label: currentYear - 1, value: currentYear - 1 },
  { label: currentYear, value: currentYear },
];

export const roleArray = [
  "SUPER ADMIN",
  "STUDENT",
  "SUPPORT TEACHER",
  "MANAGER",
  "MARKETER",
  "CONTENT WRITER",
  "VIDEO EDITOR",
  "SOFTWARE ENGINEER",
  "COMPUTER OPERATOR",
  "COURSE TEACHER",
  "HR",
];

export const getCurrentMonthLabel = () => {
  const currentData = new Date();
  const getMonthNumber = currentData.getMonth();
  const getMonthLabel = monthLabel(getMonthNumber + 1);
  return { label: getMonthLabel, value: getMonthNumber + 1 };
};

export const getCurrentYearLabel = () => {
  const currentData = new Date();
  const getYearNumber = currentData.getFullYear();

  return { label: getYearNumber, value: getYearNumber };
};

export const anlyticsCategoryList = [
  "Job",
  "DUET",
  "Department",
  "Polytechnic",
  "Session",
  "Semester",
];

export const userSaleShowList = ["Daily Sales", "Monthly Sales"];
