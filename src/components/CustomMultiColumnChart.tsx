import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { dataset } from "@/utils/staticData";

const chartSetting = {
  yAxis: [
    {
      label: "rainfall (mm)",
      labelFontSize: 14, // Increase font size for better visibility
      labelPadding: 40, // Increase padding to space it away from the axis
    },
  ],

  height: 300,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: "translate(-30px, 0)", // Adjust transform for better positioning
      fontSize: "14px", // Increase font size
    },
    [`.${axisClasses.bottom} .${axisClasses.label}`]: {
      fontSize: "14px", // Increase font size for the x-axis labels
    },
    [`.${axisClasses.bottom} .${axisClasses.tickLabel}`]: {
      transform: "translate(0, 5px)", // Adjust spacing for tick labels if needed
    },
  },
};

const valueFormatter = (value: number | null) => `${value}mm`;

export default function CustomMultColumnChart() {
  return (
    <div style={{ width: "100%", maxWidth: "100%", height: "auto" }}>
      <BarChart
        dataset={dataset}
        xAxis={[
          {
            scaleType: "band",
            dataKey: "month",
            label: "Month",
            labelFontSize: 14,
          },
        ]}
        series={[
          { dataKey: "london", label: "London", valueFormatter },
          { dataKey: "paris", label: "Paris", valueFormatter },
          { dataKey: "newYork", label: "New York", valueFormatter },
          { dataKey: "seoul", label: "Seoul", valueFormatter },
        ]}
        {...chartSetting}
      />
    </div>
  );
}
