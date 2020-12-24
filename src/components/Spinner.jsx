import React from "react";
import { colors } from "../utils/colors";

export const Spinner = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    style={{
      margin: "auto",
      background: "none",
      display: "block",
      shapeRendering: "auto",
    }}
    width="3.125rem"
    height="3.125rem"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
  >
    <circle
      cx="45"
      cy="45"
      r="20"
      strokeWidth="8"
      stroke={colors.veryLightCyan}
      strokeDasharray="47.12388980384689 47.12388980384689"
      fill="none"
      strokeLinecap="round"
    >
      <animateTransform
        attributeName="transform"
        type="rotate"
        repeatCount="indefinite"
        dur="1s"
        keyTimes="0;1"
        values="0 45 45;360 45 45"
      />
    </circle>
  </svg>
);
