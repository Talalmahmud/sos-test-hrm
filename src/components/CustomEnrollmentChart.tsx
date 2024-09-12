import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";

const valueFormatter = (value: any) => `${value}`;

type Props = {
  dataset: any;
  title: any;
};

const CustomTick = (props: any) => {
  const { x, y, payload } = props;
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={8}
        textAnchor="middle"
        fill="#666"
        transform="rotate(0)"
        style={{ fontSize: "10px", fontWeight: "bold" }}
      >
        {payload.value}
      </text>
    </g>
  );
};

const CustomEnrollmentChart = ({ dataset, title }: Props) => (
  <div className="w-full flex  flex-col items-center justify-center gap-2 my-4">
    <p className="font-bold text-[16px]">{title}</p>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={dataset}>
        <XAxis dataKey="day" interval={0} tick={<CustomTick />} />
        <YAxis tick={{ fontSize: "10px" }} />
        <Tooltip formatter={valueFormatter} />
        <Bar dataKey="enroll" fill="#f56642">
          <LabelList
            dataKey="enroll"
            position="top"
            style={{ fontSize: "8px" }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default CustomEnrollmentChart;
