import { SvgIcon, SvgIconProps } from "@mui/material";

const CheckIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.8 13.2L14.85 6.15L13.5 4.8L7.8 10.5L5.4 8.1L4.05 9.45L7.8 13.2Z"
          fill="#1FDCD1"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SvgIcon>
  );
};

export default CheckIcon;
