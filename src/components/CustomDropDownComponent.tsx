import React from "react";
import { components, DropdownIndicatorProps } from "react-select";

const CustomDropdownIndicator: React.FC<DropdownIndicatorProps<any>> = (
  props
) => {
  return (
    <components.DropdownIndicator {...props}>
      <div>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="vuesax/bold/arrow-down">
            <g id="arrow-down">
              <path
                id="Vector"
                d="M17.9207 8.17969H11.6907H6.08072C5.12072 8.17969 4.64073 9.33969 5.32073 10.0197L10.5007 15.1997C11.3307 16.0297 12.6807 16.0297 13.5107 15.1997L15.4807 13.2297L18.6907 10.0197C19.3607 9.33969 18.8807 8.17969 17.9207 8.17969Z"
                fill="#171717"
              />
            </g>
          </g>
        </svg>
      </div>
    </components.DropdownIndicator>
  );
};

export default CustomDropdownIndicator;
