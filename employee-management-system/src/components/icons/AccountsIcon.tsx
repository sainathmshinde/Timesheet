import { SvgIcon, SvgIconProps } from "@mui/material";

const AccountsIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18.9583 7.04167L7.04167 18.9583M9.20833 11.375V7.04167M7.04167 9.20833H11.375M8.45 22.75H17.55C19.3702 22.75 20.2802 22.75 20.9755 22.3958C21.587 22.0842 22.0842 21.587 22.3958 20.9755C22.75 20.2802 22.75 19.3702 22.75 17.55V8.45C22.75 6.62983 22.75 5.71974 22.3958 5.02453C22.0842 4.413 21.587 3.91582 20.9755 3.60423C20.2802 3.25 19.3702 3.25 17.55 3.25H8.45C6.62983 3.25 5.71974 3.25 5.02453 3.60423C4.413 3.91582 3.91582 4.413 3.60423 5.02453C3.25 5.71974 3.25 6.62983 3.25 8.45V17.55C3.25 19.3702 3.25 20.2802 3.60423 20.9755C3.91582 21.587 4.413 22.0842 5.02453 22.3958C5.71974 22.75 6.62983 22.75 8.45 22.75Z"
          stroke="#2D2D2D"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.625 16.7916H18.9583"
          stroke="#1FDCD1"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SvgIcon>
  );
};

export default AccountsIcon;
