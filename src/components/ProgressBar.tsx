"use client";
import React, { useState } from "react";
import "./circular.css";

type Props = {
  pValue: number;

  size: number;
};
export default function ProgressBar({ pValue, size }: Props) {
  const [progress, setProgress] = useState(10);
  const radius = size / 2 - 10; // 10px padding
  const strokeWidth = 6;

  // Calculate the stroke dash array and offset for the circular progress
  const strokeDasharray = Math.PI * 2 * radius;
  const strokeDashoffset = strokeDasharray - (pValue / 100) * strokeDasharray;

  return (
    <div
      className="circular-progress-container"
      style={{ width: size, height: size }}
    >
      <svg
        className="circular-progress"
        width={size}
        height={size}
        style={{ transform: "rotate(-90deg)" }}
      >
        <circle
          className="background-circle"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <circle
          className="progress-circle"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
      <div className="percentage-text" style={{ fontSize: size / 6 }}>
        {pValue}%
      </div>
    </div>
  );
}
