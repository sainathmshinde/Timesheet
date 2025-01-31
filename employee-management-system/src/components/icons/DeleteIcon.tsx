import { SvgIcon, SvgIconProps } from "@mui/material";

const DeleteIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <svg
        width="22"
        height="24"
        viewBox="0 0 22 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.3333 5.49996V4.63329C15.3333 3.41985 15.3333 2.81312 15.0972 2.34965C14.8895 1.94196 14.558 1.6105 14.1503 1.40278C13.6869 1.16663 13.0801 1.16663 11.8667 1.16663H10.1333C8.91989 1.16663 8.31316 1.16663 7.84969 1.40278C7.442 1.6105 7.11054 1.94196 6.90282 2.34965C6.66667 2.81312 6.66667 3.41985 6.66667 4.63329V5.49996M1.25 5.49996H20.75M18.5833 5.49996V17.6333C18.5833 19.4535 18.5833 20.3635 18.2291 21.0588C17.9175 21.6703 17.4204 22.1675 16.8088 22.479C16.1136 22.8333 15.2036 22.8333 13.3833 22.8333H8.61667C6.79649 22.8333 5.88641 22.8333 5.1912 22.479C4.57967 22.1675 4.08248 21.6703 3.7709 21.0588C3.41667 20.3635 3.41667 19.4535 3.41667 17.6333V5.49996"
          stroke="#2D2D2D"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.8335 11.4583V16.8749M13.1668 11.4583V16.8749"
          stroke="#1FDCD1"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SvgIcon>
  );
};

export default DeleteIcon;
