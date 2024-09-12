"use client";

import React, { forwardRef, useState } from "react";
import DatePicker from "react-datepicker";
import Button from "./Button";

type Props = {
  showMonthYear: boolean;
  setToggleCalendar: any;
  startDate: any;
  setStartDate: any;
};

const Calendar = ({
  showMonthYear,
  setToggleCalendar,
  startDate,
  setStartDate,
}: Props) => {
  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => {
        setToggleCalendar(false);
        date !== null && setStartDate(date);
      }}
      showMonthYearPicker={showMonthYear}
      inline
    />
  );
};

export default Calendar;
