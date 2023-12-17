import React from "react";
import cn from "src/utilities/ClassMerge";

export const Right = ({
  fill = "fill-gray-4",
  activeFill = "fill-gray-white",
  active = false,
  size = "xs",
}) => {
  switch (size) {
    case "xxs":
      return (
        <svg
          width="4"
          height="7"
          viewBox="0 0 4 7"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={"flex-shrink-0"}
        >
          <path
            d="M0 5.7112L2.47233 3.23887L0 0.761134L0.761134 0L4 3.23887L0.761134 6.47773L0 5.7112Z"
            className={active ? activeFill : fill}
          />
        </svg>
      );
    case "xs":
      return (
        <svg
          width="4"
          height="8"
          viewBox="0 0 4 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={"flex-shrink-0"}
        >
          <path
            d="M0 6.66628L2.47233 4.19394L0 1.71621L0.761134 0.955078L4 4.19394L0.761134 7.43281L0 6.66628Z"
            className={active ? activeFill : fill}
          />
        </svg>
      );
    case "sm":
      return (
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.29492 10.58L6.87492 6L2.29492 1.41L3.70492 0L9.70492 6L3.70492 12L2.29492 10.58Z"
            fill="#B1B3BC"
          />
        </svg>
      );
  }
};

export const Up = ({
  fill = "fill-gray-4",
  activeFill = "fill-gray-white",
  active = false,
  size = "xs",
}) => {
  switch (size) {
    case "xxs":
      return (
        <svg
          width="7"
          height="4"
          viewBox="0 0 7 4"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={"flex-shrink-0"}
        >
          <path
            d="M5.7112 4L3.23887 1.52767L0.761134 4L0 3.23887L3.23887 0L6.47773 3.23887L5.7112 4Z"
            className={active ? activeFill : fill}
          />
        </svg>
      );
    case "xs":
      return (
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={"flex-shrink-0"}
        >
          <path
            d="M10.58 9.70508L6 5.12508L1.41 9.70508L0 8.29508L6 2.29508L12 8.29508L10.58 9.70508Z"
            className={active ? activeFill : fill}
          />
        </svg>
      );
    case "sm":
      return (
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={"flex-shrink-0"}
        >
          <path
            d="M10.58 9.70496L6 5.12496L1.41 9.70496L0 8.29496L6 2.29496L12 8.29496L10.58 9.70496Z"
            className={active ? activeFill : fill}
          />
        </svg>
      );
  }
};
export const Left = ({
  fill = "fill-gray-4",
  activeFill = "fill-gray-white",
  active = false,
  size = "xxs",
}) => {
  switch (size) {
    case "xxs":
      return (
        <svg
          aria-label="Left"
          xmlns="http://www.w3.org/2000/svg"
          width="4"
          height="8"
          viewBox="0 0 4 8"
          fill="none"
          className={"flex-shrink-0"}
        >
          <path
            d="M4 1.52757L1.52767 3.9999L4 6.47764L3.23887 7.23877L0 3.9999L3.23887 0.761037L4 1.52757Z"
            className={active ? activeFill : fill}
          />
        </svg>
      );
    case "sm":
      return (
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.70508 1.42L5.12508 6L9.70508 10.59L8.29508 12L2.29508 6L8.29508 0L9.70508 1.42Z"
            fill="#B1B3BC"
          />
        </svg>
      );
  }
};

export const Select = ({
  fill = "fill-gray-4",
  activeFill = "fill-gray-4",
  active = false,
  size = "xs",
}) => {
  switch (size) {
    case "xs":
      return (
        <svg
          width="8"
          height="5"
          viewBox="0 0 8 5"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={"flex-shrink-0"}
        >
          <path
            d="M0 0.955078L4 4.95508L8 0.955078H0Z"
            className={active ? activeFill : fill}
          />
        </svg>
      );
  }
};

export const Delete = ({
  fill = "fill-gray-4 hover:fill-error",
  activeFill = "fill-error",
  active = false,
  size = "sm",
}) => {
  switch (size) {
    case "sm":
      return (
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={"flex-shrink-0"}
        >
          <path
            d="M4.03125 0V0.666667H0.75V2H1.40625V10.6667C1.40625 11.0203 1.54453 11.3594 1.79067 11.6095C2.03681 11.8595 2.37065 12 2.71875 12H9.28125C9.62935 12 9.96319 11.8595 10.2093 11.6095C10.4555 11.3594 10.5938 11.0203 10.5938 10.6667V2H11.25V0.666667H7.96875V0H4.03125ZM4.03125 3.33333H5.34375V9.33333H4.03125V3.33333ZM6.65625 3.33333H7.96875V9.33333H6.65625V3.33333Z"
            className={active ? activeFill : fill}
          />
        </svg>
      );
  }
};
export const Check = ({
  fill = "fill-gray-4",
  activeFill = "fill-gray-white",
  active = false,
  size = "sm",
}) => {
  switch (size) {
    case "sm":
      return (
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2.3692L3.77143 10.5978L0 6.82634L0.966857 5.85949L3.77143 8.6572L11.0331 1.40234L12 2.3692Z"
            fill="#F9FAFC"
          />
        </svg>
      );
    case "xl":
      return (
        <svg
          width="48"
          height="49"
          viewBox="0 0 48 49"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={"flex-shrink-0"}
        >
          <path
            d="M48 10.3874L15.0857 43.3017L0 28.216L3.86743 24.3486L15.0857 35.5394L44.1326 6.52002L48 10.3874Z"
            className={active ? activeFill : fill}
          />
        </svg>
      );
  }
};
export const Cross = ({
  fill = "fill-gray-4",
  activeFill = "fill-gray-white",
  active = false,
  size = "sm",
}) => {
  switch (size) {
    case "sm":
      return (
        <svg
          width="12"
          height="13"
          viewBox="0 0 12 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={"flex-shrink-0"}
        >
          <path
            d="M10.6004 3.23712L9.67382 2.31055L6.00039 5.98397L2.32696 2.31055L1.40039 3.23712L5.07382 6.91055L1.40039 10.584L2.32696 11.5105L6.00039 7.83712L9.67382 11.5105L10.6004 10.584L6.92696 6.91055L10.6004 3.23712Z"
            className={active ? activeFill : fill}
          />
        </svg>
      );
  }
};
export const Rocket = ({
  fill = "fill-gray-4",
  activeFill = "fill-gray-white",
  active = false,
  size = "sm",
}) => {
  switch (size) {
    case "sm":
      return (
        <svg
          width="12"
          height="13"
          viewBox="0 0 12 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={"flex-shrink-0"}
        >
          <path
            d="M6.72836 12.9106L5.75952 10.6342C6.69269 10.2894 7.56643 9.82582 8.37478 9.28494L6.72836 12.9106ZM2.27647 7.15112L0 6.18229L3.6257 4.53586C3.08482 5.34421 2.62121 6.21795 2.27647 7.15112ZM11.7687 1.14196C11.7687 1.14196 8.82651 -0.118712 5.46233 3.24606C4.16065 4.54775 3.38201 5.9802 2.87679 7.23434C2.71036 7.68012 2.82329 8.16751 3.1502 8.50036L4.41623 9.76044C4.74313 10.0933 5.23052 10.2003 5.67631 10.0339C6.94828 9.54647 8.3629 8.75 9.66458 7.44831C13.0288 4.08413 11.7687 1.14196 11.7687 1.14196ZM7.56643 5.34421C7.10281 4.8806 7.10281 4.12574 7.56643 3.66213C8.03004 3.19851 8.7849 3.19851 9.24852 3.66213C9.70619 4.12574 9.71213 4.8806 9.24852 5.34421C8.7849 5.80783 8.03004 5.80783 7.56643 5.34421ZM2.63309 12.7977L4.79663 10.6342C4.59454 10.5807 4.3984 10.4915 4.22008 10.3667L1.79502 12.7977H2.63309ZM0.112932 12.7977H0.951005L3.78619 9.96847L2.94217 9.1304L0.112932 11.9596V12.7977ZM0.112932 11.1156L2.54394 8.69056C2.41912 8.51225 2.32996 8.32205 2.27647 8.11402L0.112932 10.2776V11.1156Z"
            className={active ? activeFill : fill}
          />
        </svg>
      );
  }
};
export const Careers = ({
  fill = "fill-primary",
  activeFill = "fill-gray-white",
  active = false,
  size = "sm",
}) => {
  switch (size) {
    case "sm":
      return (
        <svg
          width="12"
          height="13"
          viewBox="0 0 12 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={"flex-shrink-0"}
        >
          <path
            d="M0 6.15307V7.66822H9.09091L4.92424 11.8349L6 12.9106L12 6.91064L6 0.910645L4.92424 1.9864L9.09091 6.15307H0Z"
            className={active ? activeFill : fill}
          />
        </svg>
      );
  }
};
export const Pencil = ({
  fill = "fill-gray-4",
  activeFill = "fill-gray-white",
  active = false,
  size = "sm",
}) => {
  switch (size) {
    case "sm":
      return (
        <svg
          width="12"
          height="13"
          viewBox="0 0 12 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={"flex-shrink-0"}
        >
          <path
            d="M11.805 3.60527C12.065 3.34531 12.065 2.91203 11.805 2.6654L10.2452 1.10562C9.99861 0.845654 9.56534 0.845654 9.30537 1.10562L8.07888 2.32545L10.5785 4.8251M0 10.411V12.9106H2.49965L9.87196 5.53167L7.37231 3.03202L0 10.411Z"
            className={active ? activeFill : fill}
          />
        </svg>
      );
  }
};
// className={active ? activeFill : fill} />
export const Quality = ({
  fill = "fill-gray-4",
  activeFill = "fill-gray-white",
  active = false,
  size = "md",
}) => {
  switch (size) {
    case "md":
      return (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={"flex-shrink-0"}
        >
          <path
            d="M0.799805 16.9106V5.71064H3.9998V16.9106H0.799805ZM6.3998 16.9106V0.910645H9.5998V16.9106H6.3998ZM11.9998 16.9106V10.5106H15.1998V16.9106H11.9998Z"
            className={active ? activeFill : fill}
          />
        </svg>
      );
    case "lg":
      return (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={"flex-shrink-0"}
        >
          <path
            d="M0.799805 16.9106V5.71064H3.9998V16.9106H0.799805ZM6.3998 16.9106V0.910645H9.5998V16.9106H6.3998ZM11.9998 16.9106V10.5106H15.1998V16.9106H11.9998Z"
            className={active ? activeFill : fill}
          />
        </svg>
      );
  }
};
// className={active ? activeFill : fill} />
export const EnterKey = ({
  fill = "fill-gray-4",
  activeFill = "fill-gray-white",
  active = false,
  size = "md",
}) => {
  switch (size) {
    case "md":
      return (
        <div
          className={
            "flex-col w-[16px] h-[16px] justify-center items-center gap-[10px] rounded-sm bg-gray-2 shadow-key border border-solid " +
            (active ? "border-gray-white" : "border-gray-3")
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="8"
            height="8"
            viewBox="0 0 8 8"
            fill="none"
          >
            <path
              d="M7.65706 0V2.97143C7.65706 4.61257 6.32677 5.94286 4.68563 5.94286H2.09363L3.5062 7.35543L2.85706 8L0.342773 5.48571L2.85706 2.97143L3.50163 3.616L2.09363 5.02857H4.68563C5.82849 5.02857 6.74277 4.11429 6.74277 2.97143V0H7.65706Z"
              className={active ? activeFill : fill}
            />
          </svg>
        </div>
      );
    case "lg":
      return (
        <div
          className={
            "flex-col w-[24px] h-[24px] justify-center items-center gap-[10px] rounded-sm bg-gray-2 shadow-key border border-solid " +
            (active ? "border-gray-white" : "border-gray-3")
          }
        >
          <svg
            width="8"
            height="9"
            viewBox="0 0 8 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={"flex-shrink-0"}
          >
            <path
              d="M7.65706 0.910645V3.88207C7.65706 5.52322 6.32677 6.8535 4.68563 6.8535H2.09363L3.5062 8.26607L2.85706 8.91064L0.342773 6.39636L2.85706 3.88207L3.50163 4.52664L2.09363 5.93922H4.68563C5.82849 5.93922 6.74277 5.02493 6.74277 3.88207V0.910645H7.65706Z"
              className={active ? activeFill : fill}
            />
          </svg>
        </div>
      );
  }
};

// className={active ? activeFill : fill} />
export const User = ({
  fill = "fill-gray-4",
  activeFill = "fill-gray-white",
  active = false,
  size = "md",
}) => {
  switch (size) {
    case "md":
      return (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 0C9.06087 0 10.0783 0.421427 10.8284 1.17157C11.5786 1.92172 12 2.93913 12 4C12 5.06087 11.5786 6.07828 10.8284 6.82843C10.0783 7.57857 9.06087 8 8 8C6.93913 8 5.92172 7.57857 5.17157 6.82843C4.42143 6.07828 4 5.06087 4 4C4 2.93913 4.42143 1.92172 5.17157 1.17157C5.92172 0.421427 6.93913 0 8 0ZM8 10C12.42 10 16 11.79 16 14V16H0V14C0 11.79 3.58 10 8 10Z"
            fill="#B1B3BC"
          />
        </svg>
      );
  }
};
// className={active ? activeFill : fill} />
export const Search = ({
  fill = "fill-gray-4",
  activeFill = "fill-gray-white",
  active = false,
  size = "md",
}) => {
  switch (size) {
    case "sm":
      return (
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={"flex-shrink-0"}
        >
          <path
            d="M4.45714 0C5.63925 0 6.77294 0.46959 7.60882 1.30547C8.4447 2.14134 8.91429 3.27504 8.91429 4.45714C8.91429 5.56114 8.50971 6.576 7.84457 7.35771L8.02971 7.54286H8.57143L12 10.9714L10.9714 12L7.54286 8.57143V8.02971L7.35771 7.84457C6.576 8.50971 5.56114 8.91429 4.45714 8.91429C3.27504 8.91429 2.14134 8.4447 1.30547 7.60882C0.46959 6.77294 0 5.63925 0 4.45714C0 3.27504 0.46959 2.14134 1.30547 1.30547C2.14134 0.46959 3.27504 0 4.45714 0ZM4.45714 1.37143C2.74286 1.37143 1.37143 2.74286 1.37143 4.45714C1.37143 6.17143 2.74286 7.54286 4.45714 7.54286C6.17143 7.54286 7.54286 6.17143 7.54286 4.45714C7.54286 2.74286 6.17143 1.37143 4.45714 1.37143Z"
            className={active ? activeFill : fill}
          />
        </svg>
      );
    case "md":
      return (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={"flex-shrink-0"}
        >
          <path
            d="M5.94286 0.910645C7.519 0.910645 9.03059 1.53676 10.1451 2.65127C11.2596 3.76577 11.8857 5.27736 11.8857 6.8535C11.8857 8.3255 11.3463 9.67864 10.4594 10.7209L10.7063 10.9678H11.4286L16 15.5392L14.6286 16.9106L10.0571 12.3392V11.6169L9.81029 11.3701C8.768 12.2569 7.41486 12.7964 5.94286 12.7964C4.36671 12.7964 2.85512 12.1702 1.74062 11.0557C0.62612 9.94123 0 8.42965 0 6.8535C0 5.27736 0.62612 3.76577 1.74062 2.65127C2.85512 1.53676 4.36671 0.910645 5.94286 0.910645ZM5.94286 2.73922C3.65714 2.73922 1.82857 4.56779 1.82857 6.8535C1.82857 9.13922 3.65714 10.9678 5.94286 10.9678C8.22857 10.9678 10.0571 9.13922 10.0571 6.8535C10.0571 4.56779 8.22857 2.73922 5.94286 2.73922Z"
            className={active ? activeFill : fill}
          />
        </svg>
      );
  }
};
// className={active ? activeFill : fill} />
export const Send = ({
  fill = "fill-gray-4",
  activeFill = "fill-gray-white",
  active = false,
  size = "md",
}) => {
  switch (size) {
    case "md":
      return (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={"flex-shrink-0"}
        >
          <path
            d="M0.848189 6.95556C0.327871 7.17396 0.00491217 7.56275 3.21904e-05 8.11315C-0.0033278 8.49795 0.25635 9.01476 0.776668 9.22596C0.990988 9.31316 4.00018 9.71795 4.00018 9.71795C4.00018 9.71795 4.79666 12.2355 5.08369 13.1203C5.16681 13.3763 5.21418 13.5019 5.39657 13.6691C5.70601 13.9523 6.22913 13.8636 6.45537 13.6364C7.05393 13.0364 8.00001 12.1107 8.00001 12.1107L8.39816 12.4347C8.39816 12.4347 10.1662 13.8451 11.1327 14.5091C11.7018 14.9003 12.0967 15.3083 12.7372 15.3107C13.0634 15.3123 13.5867 15.1499 13.9326 14.7539C14.1612 14.4923 14.3078 14.0739 14.3645 13.6987C14.4935 12.8467 16.0064 3.63397 16 3.31157C15.9897 2.79717 15.557 2.50757 15.1973 2.51077C14.9714 2.51317 14.7853 2.57878 14.371 2.70518C11.1667 3.68357 1.06043 6.86676 0.848189 6.95556ZM12.8 4.91076C12.8 4.91076 8.5776 8.58596 6.89033 10.2772C6.34977 10.8188 6.31161 11.7483 6.31161 11.7483L5.43946 8.95794L12.8 4.91076Z"
            className={active ? activeFill : fill}
          />
        </svg>
      );
  }
};
// className={active ? activeFill : fill} />
export const Attachment = ({
  fill = "fill-gray-4",
  activeFill = "fill-gray-white",
  active = false,
  size = "md",
}) => {
  switch (size) {
    case "md":
      return (
        <svg
          width="15"
          height="16"
          viewBox="0 0 15 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={"flex-shrink-0"}
        >
          <path
            d="M13.5549 7.51535L7.92939 13.1409C6.39823 14.6721 4.10189 14.8529 2.54077 13.2917C1.00961 11.7606 1.20861 9.54237 2.76973 7.98125L9.09345 1.65753C10.0613 0.689696 11.6194 0.689696 12.5872 1.65753C13.5551 2.62537 13.5551 4.18349 12.5872 5.15133L6.15249 11.5861C5.6701 12.0685 4.88798 12.0685 4.40559 11.5861C3.9232 11.1037 3.9232 10.3216 4.40559 9.83918L10.1422 4.10259"
            stroke="#B1B3BC"
            stroke-width="1.5"
            stroke-linecap="square"
            className={active ? activeFill : fill}
          />
        </svg>
      );
  }
};
// className={active ? activeFill : fill} />
export const Copy = ({
  fill = "fill-gray-4",
  activeFill = "fill-gray-white",
  active = false,
  size = "md",
}) => {
  switch (size) {
    case "md":
      return (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={"flex-shrink-0"}
        >
          <path
            d="M13.4545 15.4561H5.45446V5.27428H13.4545M13.4545 3.81974H5.45446C5.06869 3.81974 4.69872 3.97298 4.42594 4.24576C4.15316 4.51854 3.99991 4.88851 3.99991 5.27428V15.4561C3.99991 15.8419 4.15316 16.2118 4.42594 16.4846C4.69872 16.7574 5.06869 16.9106 5.45446 16.9106H13.4545C13.8402 16.9106 14.2102 16.7574 14.483 16.4846C14.7558 16.2118 14.909 15.8419 14.909 15.4561V5.27428C14.909 4.88851 14.7558 4.51854 14.483 4.24576C14.2102 3.97298 13.8402 3.81974 13.4545 3.81974ZM11.2726 0.910645H2.54537C2.1596 0.910645 1.78963 1.06389 1.51685 1.33667C1.24407 1.60945 1.09082 1.97942 1.09082 2.36519V12.547H2.54537V2.36519H11.2726V0.910645Z"
            className={active ? activeFill : fill}
          />
        </svg>
      );
  }
};
// className={active ? activeFill : fill} />
export const Hamburger = ({
  fill = "fill-gray-4",
  activeFill = "fill-gray-white",
  active = false,
  size = "md",
}) => {
  switch (size) {
    case "md":
      return (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={"flex-shrink-0"}
        >
          <path
            d="M0 2.91064H16V4.91064H0V2.91064ZM0 7.91064H16V9.91064H0V7.91064ZM0 12.9106H16V14.9106H0V12.9106Z"
            className={active ? activeFill : fill}
          />
        </svg>
      );
  }
};
// className={active ? activeFill : fill} />
export const Terminate = ({
  fill = "fill-gray-4",
  activeFill = "fill-gray-white",
  active = false,
  size = "md",
}) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={"flex-shrink-0"}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 16C10.1217 16 12.1566 15.1571 13.6569 13.6569C15.1571 12.1566 16 10.1217 16 8C16 5.87827 15.1571 3.84344 13.6569 2.34315C12.1566 0.842855 10.1217 0 8 0C5.87827 0 3.84344 0.842855 2.34315 2.34315C0.842855 3.84344 0 5.87827 0 8C0 10.1217 0.842855 12.1566 2.34315 13.6569C3.84344 15.1571 5.87827 16 8 16ZM6 5C5.73478 5 5.48043 5.10536 5.29289 5.29289C5.10536 5.48043 5 5.73478 5 6V10C5 10.2652 5.10536 10.5196 5.29289 10.7071C5.48043 10.8946 5.73478 11 6 11H10C10.2652 11 10.5196 10.8946 10.7071 10.7071C10.8946 10.5196 11 10.2652 11 10V6C11 5.73478 10.8946 5.48043 10.7071 5.29289C10.5196 5.10536 10.2652 5 10 5H6Z"
        className={active ? activeFill : fill}
      />
    </svg>
  );
};
export const Logo = ({
  fill = "fill-gray-4",
  activeFill = "fill-gray-white",
  active = false,
  size = "md",
}) => {
  return (
    <svg
      width="19"
      height="20"
      viewBox="0 0 19 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={"flex-shrink-0"}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M9.07513 1.1863C9.21663 1.07722 9.39144 1.01009 9.56624 1.01009C9.83261 1.01009 10.0823 1.12756 10.2405 1.33734L15.0101 7.4964V12.4136L16.4335 13.8401C16.7582 14.1673 16.7582 14.7043 16.4335 15.0316C16.1089 15.3588 15.5762 15.3588 15.2515 15.0316L13.3453 13.1016V8.07539L8.92529 2.36944V2.36105C8.64228 2.00024 8.70887 1.4716 9.07513 1.1863ZM18.976 14.4133C18.8344 14.3778 18.7003 14.3042 18.5894 14.1925L16.9163 12.5059C16.7249 12.3129 16.6416 12.0528 16.6749 11.8094V6.88385H16.6499L11.8553 0.691225C11.7282 0.529117 11.6716 0.333133 11.6803 0.140562C11.134 0.0481292 10.5726 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20C13.9387 20 17.3456 17.7229 18.976 14.4133Z"
        fill="#F9FAFC"
      />
    </svg>
  );
};
export const LogoSubtract = ({
  fill = "fill-gray-4",
  activeFill = "fill-gray-white",
  active = false,
  size = "md",
}) => {
  return (
    <svg
      width="334"
      height="203"
      viewBox="0 0 334 203"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={"flex-shrink-0"}
    >
      <mask
        id="path-1-inside-1_5607_10334"
        fill="white"
        className={"flex-shrink-0"}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M191.575 20.2001C188.079 20.2001 184.583 21.5427 181.753 23.7244C174.427 29.4303 173.096 40.0031 178.756 47.2194V47.3872L267.157 161.506V203H0.272043C0.257365 202.002 0.25 201.002 0.25 200C0.25 89.5431 89.793 0 200.25 0C211.702 0 222.93 0.962567 233.856 2.81121C233.682 6.66212 234.814 10.5812 237.357 13.8229L333.249 137.675H333.748V203H300.452V149.926L205.06 26.7452C201.897 22.5496 196.902 20.2001 191.575 20.2001Z"
        />
      </mask>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M191.575 20.2001C188.079 20.2001 184.583 21.5427 181.753 23.7244C174.427 29.4303 173.096 40.0031 178.756 47.2194V47.3872L267.157 161.506V203H0.272043C0.257365 202.002 0.25 201.002 0.25 200C0.25 89.5431 89.793 0 200.25 0C211.702 0 222.93 0.962567 233.856 2.81121C233.682 6.66212 234.814 10.5812 237.357 13.8229L333.249 137.675H333.748V203H300.452V149.926L205.06 26.7452C201.897 22.5496 196.902 20.2001 191.575 20.2001Z"
        fill="black"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M191.575 20.2001C188.079 20.2001 184.583 21.5427 181.753 23.7244C174.427 29.4303 173.096 40.0031 178.756 47.2194V47.3872L267.157 161.506V203H0.272043C0.257365 202.002 0.25 201.002 0.25 200C0.25 89.5431 89.793 0 200.25 0C211.702 0 222.93 0.962567 233.856 2.81121C233.682 6.66212 234.814 10.5812 237.357 13.8229L333.249 137.675H333.748V203H300.452V149.926L205.06 26.7452C201.897 22.5496 196.902 20.2001 191.575 20.2001Z"
        fill="url(#paint0_linear_5607_10334)"
      />
      <path
        d="M181.753 23.7244L181.142 22.9324L181.138 22.9355L181.753 23.7244ZM178.756 47.2194H179.756V46.874L179.543 46.6022L178.756 47.2194ZM178.756 47.3872H177.756V47.7293L177.965 47.9996L178.756 47.3872ZM267.157 161.506H268.157V161.164L267.947 160.894L267.157 161.506ZM267.157 203V204H268.157V203H267.157ZM0.272043 203L-0.727849 203.015L-0.713361 204H0.272043V203ZM233.856 2.81121L234.855 2.85626L234.895 1.97276L234.023 1.82522L233.856 2.81121ZM237.357 13.8229L238.147 13.2107L238.144 13.2057L237.357 13.8229ZM333.249 137.675L332.458 138.288L332.759 138.675H333.249V137.675ZM333.748 137.675H334.748V136.675H333.748V137.675ZM333.748 203V204H334.748V203H333.748ZM300.452 203H299.452V204H300.452V203ZM300.452 149.926H301.452V149.584L301.243 149.314L300.452 149.926ZM205.06 26.7452L204.261 27.3472L204.269 27.3574L205.06 26.7452ZM182.363 24.5164C185.044 22.45 188.33 21.2001 191.575 21.2001V19.2001C187.828 19.2001 184.122 20.6353 181.142 22.9324L182.363 24.5164ZM179.543 46.6022C174.229 39.8281 175.472 29.8842 182.367 24.5133L181.138 22.9355C173.383 28.9764 171.962 40.1781 177.969 47.8366L179.543 46.6022ZM179.756 47.3872V47.2194H177.756V47.3872H179.756ZM267.947 160.894L179.546 46.7748L177.965 47.9996L266.366 162.118L267.947 160.894ZM268.157 203V161.506H266.157V203H268.157ZM0.272043 204H267.157V202H0.272043V204ZM-0.75 200C-0.75 201.007 -0.742599 202.012 -0.727849 203.015L1.27193 202.985C1.25733 201.992 1.25 200.997 1.25 200H-0.75ZM200.25 -1C89.2408 -1 -0.75 88.9908 -0.75 200H1.25C1.25 90.0953 90.3453 1 200.25 1V-1ZM234.023 1.82522C223.042 -0.0327073 211.758 -1 200.25 -1V1C211.646 1 222.818 1.95784 233.689 3.7972L234.023 1.82522ZM238.144 13.2057C235.756 10.1624 234.691 6.48137 234.855 2.85626L232.857 2.76616C232.673 6.84287 233.872 10.9999 236.57 14.44L238.144 13.2057ZM334.04 137.063L238.147 13.2107L236.566 14.4351L332.458 138.288L334.04 137.063ZM333.748 136.675H333.249V138.675H333.748V136.675ZM334.748 203V137.675H332.748V203H334.748ZM300.452 204H333.748V202H300.452V204ZM299.452 149.926V203H301.452V149.926H299.452ZM204.269 27.3574L299.662 150.539L301.243 149.314L205.85 26.1329L204.269 27.3574ZM191.575 21.2001C196.609 21.2001 201.299 23.4184 204.261 27.3472L205.858 26.1432C202.494 21.6808 197.195 19.2001 191.575 19.2001V21.2001Z"
        fill="url(#paint1_linear_5607_10334)"
        mask="url(#path-1-inside-1_5607_10334)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_5607_10334"
          x1="166.999"
          y1="0"
          x2="166.999"
          y2="203"
          gradientUnits="userSpaceOnUse"
          className={"flex-shrink-0"}
        >
          <stop stopColor="#C0C5E4" stopOpacity="0.157" />
          <stop offset="0.5" stopColor="#BDC8FF" stopOpacity="0.09" />
          <stop offset="1" stopColor="#36313C" stopOpacity="0.08" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_5607_10334"
          x1="0.25"
          y1="101.5"
          x2="333.748"
          y2="101.5"
          gradientUnits="userSpaceOnUse"
          className={"flex-shrink-0"}
        >
          <stop stopColor="white" stopOpacity="0" />
          <stop stopOpacity="0.2" />
          <stop offset="0.5" stopColor="#8F8F8F" stopOpacity="0.67" />
          <stop offset="1" stopOpacity="0.04" />
        </linearGradient>
      </defs>
    </svg>
  );
};
// className={active ? activeFill : fill} />
export const File = ({
  fill = "fill-primary",
  activeFill = "fill-primary",
  active = false,
  size = "lg",
}) => {
  switch (size) {
    case "lg":
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={"flex-shrink-0"}
        >
          <path
            d="M13.2004 8.4V1.8L19.8004 8.4M4.80039 0C3.46839 0 2.40039 1.068 2.40039 2.4V21.6C2.40039 22.2365 2.65325 22.847 3.10333 23.2971C3.55342 23.7471 4.16387 24 4.80039 24H19.2004C19.8369 24 20.4474 23.7471 20.8974 23.2971C21.3475 22.847 21.6004 22.2365 21.6004 21.6V7.2L14.4004 0H4.80039Z"
            className={active ? activeFill : fill}
          />
        </svg>
      );
  }
};
// className={"flex-shrink-0"}>
// className={active ? activeFill : fill} />
export const Link = ({
  fill = "fill-primary",
  activeFill = "fill-primary",
  active = false,
  size = "lg",
}) => {
  switch (size) {
    case "lg":
      return (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={"flex-shrink-0"}
        >
          <path
            d="M13.5549 7.6047L7.92939 13.2303C6.39823 14.7614 4.10189 14.9422 2.54077 13.3811C1.00961 11.8499 1.20861 9.63172 2.76973 8.0706L9.09345 1.74689C10.0613 0.779052 11.6194 0.779051 12.5872 1.74689C13.5551 2.71472 13.5551 4.27285 12.5872 5.24068L6.15249 11.6754C5.6701 12.1578 4.88798 12.1578 4.40559 11.6754C3.9232 11.193 3.9232 10.4109 4.40559 9.92854L10.1422 4.19194"
            stroke="#B1B3BC"
            strokeWidth="1.5"
            strokeLinecap="square"
          />
        </svg>
      );
  }
};
// className={"flex-shrink-0"}>
// className={active ? activeFill : fill} />
export const Down = ({
  fill = "fill-gray-4",
  activeFill = "fill-gray-white",
  active = false,
  size = "xxs",
}) => {
  switch (size) {
    case "xxs":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="7"
          height="4"
          viewBox="0 0 7 4"
          fill="none"
          className={"flex-shrink-0"}
        >
          <path
            d="M0.766338 0L3.23867 2.47233L5.71641 0L6.47754 0.761134L3.23867 4L-0.000193596 0.761134L0.766338 0Z"
            className={active ? activeFill : fill}
          />
        </svg>
      );
    case "sm":
      return (
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={"flex-shrink-0"}
        >
          <path
            d="M1.42 2.29504L6 6.87504L10.59 2.29504L12 3.70504L6 9.70504L0 3.70504L1.42 2.29504Z"
            className={active ? activeFill : fill}
          />
        </svg>
      );
  }
};
// className={"flex-shrink-0"}>
// className={active ? activeFill : fill} />
export const Success = ({
  fill = "fill-success",
  activeFill = "fill-success",
  active = false,
  size = "xxs",
}) => {
  switch (size) {
    case "xxs":
      return (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 0C3.584 0 0 3.584 0 8C0 12.416 3.584 16 8 16C12.416 16 16 12.416 16 8C16 3.584 12.416 0 8 0ZM6.4 12L2.4 8L3.528 6.872L6.4 9.736L12.472 3.664L13.6 4.8L6.4 12Z"
            className={active ? activeFill : fill}
          />
        </svg>
      );
  }
};

export const Building = ({
  fill = "fill-gray-4",
  activeFill = "fill-gray-white",
  active = false,
  size = "md",
}) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.77734 0C2.22506 0 1.77734 0.447715 1.77734 1V15C1.77734 15.5523 2.22506 16 2.77734 16H6.11068C6.66296 16 7.11068 15.5523 7.11068 15V13.7778C7.11068 13.2869 7.50865 12.8889 7.99957 12.8889C8.49049 12.8889 8.88845 13.2869 8.88845 13.7778V15C8.88845 15.5523 9.33617 16 9.88846 16H13.2218C13.7741 16 14.2218 15.5523 14.2218 15V1C14.2218 0.447715 13.7741 0 13.2218 0H2.77734ZM3.55512 2.66667C3.55512 2.17575 3.95309 1.77778 4.44401 1.77778C4.93493 1.77778 5.3329 2.17575 5.3329 2.66667C5.3329 3.15759 4.93493 3.55556 4.44401 3.55556C3.95309 3.55556 3.55512 3.15759 3.55512 2.66667ZM7.11068 2.66667C7.11068 2.17575 7.50865 1.77778 7.99957 1.77778C8.49049 1.77778 8.88845 2.17575 8.88845 2.66667C8.88845 3.15759 8.49049 3.55556 7.99957 3.55556C7.50865 3.55556 7.11068 3.15759 7.11068 2.66667ZM10.6662 2.66667C10.6662 2.17575 11.0642 1.77778 11.5551 1.77778C12.046 1.77778 12.444 2.17575 12.444 2.66667C12.444 3.15759 12.046 3.55556 11.5551 3.55556C11.0642 3.55556 10.6662 3.15759 10.6662 2.66667ZM3.55512 6.22222C3.55512 5.7313 3.95309 5.33333 4.44401 5.33333C4.93493 5.33333 5.3329 5.7313 5.3329 6.22222C5.3329 6.71314 4.93493 7.11111 4.44401 7.11111C3.95309 7.11111 3.55512 6.71314 3.55512 6.22222ZM7.11068 6.22222C7.11068 5.7313 7.50865 5.33333 7.99957 5.33333C8.49049 5.33333 8.88845 5.7313 8.88845 6.22222C8.88845 6.71314 8.49049 7.11111 7.99957 7.11111C7.50865 7.11111 7.11068 6.71314 7.11068 6.22222ZM10.6662 6.22222C10.6662 5.7313 11.0642 5.33333 11.5551 5.33333C12.046 5.33333 12.444 5.7313 12.444 6.22222C12.444 6.71314 12.046 7.11111 11.5551 7.11111C11.0642 7.11111 10.6662 6.71314 10.6662 6.22222ZM3.55512 9.77778C3.55512 9.28686 3.95309 8.88889 4.44401 8.88889C4.93493 8.88889 5.3329 9.28686 5.3329 9.77778C5.3329 10.2687 4.93493 10.6667 4.44401 10.6667C3.95309 10.6667 3.55512 10.2687 3.55512 9.77778ZM7.11068 9.77778C7.11068 9.28686 7.50865 8.88889 7.99957 8.88889C8.49049 8.88889 8.88845 9.28686 8.88845 9.77778C8.88845 10.2687 8.49049 10.6667 7.99957 10.6667C7.50865 10.6667 7.11068 10.2687 7.11068 9.77778ZM10.6662 9.77778C10.6662 9.28686 11.0642 8.88889 11.5551 8.88889C12.046 8.88889 12.444 9.28686 12.444 9.77778C12.444 10.2687 12.046 10.6667 11.5551 10.6667C11.0642 10.6667 10.6662 10.2687 10.6662 9.77778ZM3.55512 13.3333C3.55512 12.8424 3.95309 12.4444 4.44401 12.4444C4.93493 12.4444 5.3329 12.8424 5.3329 13.3333C5.3329 13.8243 4.93493 14.2222 4.44401 14.2222C3.95309 14.2222 3.55512 13.8243 3.55512 13.3333ZM10.6662 13.3333C10.6662 12.8424 11.0642 12.4444 11.5551 12.4444C12.046 12.4444 12.444 12.8424 12.444 13.3333C12.444 13.8243 12.046 14.2222 11.5551 14.2222C11.0642 14.2222 10.6662 13.8243 10.6662 13.3333Z"
        fill="#B1B3BC"
      />
    </svg>
  );
};

export const Regenerate = ({
  fill = "fill-gray-4",
  activeFill = "fill-gray-white",
  active = false,
  size = "sm",
}) => {
  switch (size) {
    case "sm":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
        >
          <path
            d="M10.2375 1.7625C9.15 0.675 7.6575 0 6 0C4.4087 0 2.88258 0.632141 1.75736 1.75736C0.632141 2.88258 0 4.4087 0 6C0 7.5913 0.632141 9.11742 1.75736 10.2426C2.88258 11.3679 4.4087 12 6 12C8.7975 12 11.13 10.0875 11.7975 7.5H10.2375C9.6225 9.2475 7.9575 10.5 6 10.5C4.80653 10.5 3.66193 10.0259 2.81802 9.18198C1.97411 8.33807 1.5 7.19347 1.5 6C1.5 4.80653 1.97411 3.66193 2.81802 2.81802C3.66193 1.97411 4.80653 1.5 6 1.5C7.245 1.5 8.355 2.0175 9.165 2.835L6.75 5.25H12V0L10.2375 1.7625Z"
            className={active ? activeFill : fill}
          />
        </svg>
      );
  }
};

export const Stop = ({
  fill = "fill-gray-4",
  activeFill = "fill-gray-white",
  active = false,
  size = "sm",
}) => {
  switch (size) {
    case "sm":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6 12C9.31373 12 12 9.31373 12 6C12 2.68629 9.31373 0 6 0C2.68629 0 0 2.68629 0 6C0 9.31373 2.68629 12 6 12ZM8.25 3.75H3.75V8.25H8.25V3.75Z"
            className={active ? activeFill : fill}
          />
        </svg>
      );
  }
};

// className={"flex-shrink-0"}>
// className={active ? activeFill : fill} />
export const Dots = ({
  fill = "fill-success",
  activeFill = "fill-success",
  active = false,
  size = "sm",
}) => {
  switch (size) {
    case "sm":
      return (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={"flex-shrink-0"}>
          <path d="M9 6C9 5.60218 9.15804 5.22064 9.43934 4.93934C9.72064 4.65804 10.1022 4.5 10.5 4.5C10.8978 4.5 11.2794 4.65804 11.5607 4.93934C11.842 5.22064 12 5.60218 12 6C12 6.39782 11.842 6.77936 11.5607 7.06066C11.2794 7.34196 10.8978 7.5 10.5 7.5C10.1022 7.5 9.72064 7.34196 9.43934 7.06066C9.15804 6.77936 9 6.39782 9 6ZM4.5 6C4.5 5.60218 4.65804 5.22064 4.93934 4.93934C5.22064 4.65804 5.60218 4.5 6 4.5C6.39782 4.5 6.77936 4.65804 7.06066 4.93934C7.34196 5.22064 7.5 5.60218 7.5 6C7.5 6.39782 7.34196 6.77936 7.06066 7.06066C6.77936 7.34196 6.39782 7.5 6 7.5C5.60218 7.5 5.22064 7.34196 4.93934 7.06066C4.65804 6.77936 4.5 6.39782 4.5 6ZM0 6C0 5.60218 0.158035 5.22064 0.43934 4.93934C0.720644 4.65804 1.10218 4.5 1.5 4.5C1.89782 4.5 2.27936 4.65804 2.56066 4.93934C2.84196 5.22064 3 5.60218 3 6C3 6.39782 2.84196 6.77936 2.56066 7.06066C2.27936 7.34196 1.89782 7.5 1.5 7.5C1.10218 7.5 0.720644 7.34196 0.43934 7.06066C0.158035 6.77936 0 6.39782 0 6Z" className={active ? activeFill : fill} />
        </svg>

      );
  }
};
export const OpenAI = ({
  fill = "fill-gray-4",
  activeFill = "fill-gray-white",
  active = false,
  size = "md",
}) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.2829 9.82105C22.5512 9.01293 22.644 8.15684 22.5551 7.30999C22.4661 6.46314 22.1975 5.64501 21.7672 4.91026C21.1291 3.79969 20.1549 2.92042 18.9849 2.39923C17.815 1.87803 16.5097 1.74183 15.2574 2.01027C14.5459 1.21883 13.6387 0.628545 12.6268 0.298687C11.615 -0.0311716 10.5342 -0.0889847 9.49297 0.131054C8.45174 0.351092 7.48673 0.841235 6.69486 1.55225C5.903 2.26327 5.31217 3.17014 4.98171 4.18176C4.14737 4.35285 3.35917 4.70005 2.66977 5.20015C1.98036 5.70026 1.40565 6.34175 0.984018 7.08176C0.339054 8.19048 0.0634012 9.47558 0.196911 10.7513C0.33042 12.027 0.866174 13.2272 1.72672 14.1783C1.45738 14.9861 1.36364 15.842 1.45177 16.6889C1.53989 17.5358 1.80785 18.354 2.23771 19.089C2.87655 20.2 3.85163 21.0795 5.02242 21.6007C6.1932 22.1219 7.49924 22.2579 8.7523 21.9891C9.31756 22.6257 10.0121 23.1343 10.7896 23.481C11.5671 23.8278 12.4096 24.0047 13.2609 23.9999C14.5445 24.0011 15.7953 23.5943 16.8327 22.8384C17.8702 22.0824 18.6405 21.0164 19.0327 19.7941C19.8669 19.6227 20.655 19.2754 21.3444 18.7753C22.0337 18.2752 22.6085 17.6339 23.0304 16.894C23.6677 15.7869 23.9386 14.5067 23.8043 13.2363C23.6701 11.9659 23.1375 10.7705 22.2829 9.82105ZM13.2609 22.4291C12.2096 22.4308 11.1913 22.0623 10.3845 21.3883L10.5264 21.3079L15.3047 18.5497C15.4236 18.48 15.5223 18.3805 15.5912 18.261C15.66 18.1416 15.6966 18.0063 15.6974 17.8684V11.1315L17.7174 12.3001C17.7274 12.3052 17.736 12.3125 17.7426 12.3216C17.7492 12.3306 17.7536 12.3411 17.7554 12.3521V17.9347C17.7528 19.1259 17.2785 20.2677 16.4362 21.11C15.5938 21.9523 14.4521 22.4266 13.2609 22.4291ZM3.60021 18.3037C3.07298 17.3933 2.88368 16.3262 3.06561 15.29L3.20761 15.3752L7.9906 18.1334C8.10894 18.2029 8.24368 18.2395 8.3809 18.2395C8.51811 18.2395 8.65285 18.2029 8.7712 18.1334L14.614 14.7649V17.0973C14.6134 17.1094 14.6102 17.1212 14.6044 17.1319C14.5987 17.1425 14.5906 17.1517 14.5808 17.1588L9.74099 19.9501C8.70812 20.5451 7.48135 20.7059 6.33001 20.3973C5.17868 20.0886 4.19689 19.3356 3.60021 18.3037ZM2.34181 7.89555C2.8727 6.97932 3.71064 6.28049 4.70731 5.92276V11.5999C4.70551 11.7371 4.74055 11.8722 4.80878 11.9912C4.87701 12.1102 4.97593 12.2087 5.09521 12.2764L10.9096 15.6307L8.88949 16.7992C8.87856 16.805 8.86637 16.8081 8.85399 16.8081C8.84162 16.8081 8.82943 16.805 8.81849 16.7992L3.98821 14.0127C2.95727 13.4152 2.20516 12.4334 1.89658 11.2824C1.588 10.1315 1.7481 8.90512 2.34181 7.87195V7.89555ZM18.9381 11.7513L13.1048 8.36395L15.1202 7.19995C15.1311 7.19415 15.1433 7.19111 15.1557 7.19111C15.1681 7.19111 15.1802 7.19415 15.1912 7.19995L20.0215 9.99125C20.76 10.4174 21.3621 11.0449 21.7574 11.8003C22.1527 12.5558 22.325 13.4082 22.2541 14.2579C22.1831 15.1077 21.8719 15.9197 21.3568 16.5992C20.8417 17.2787 20.1439 17.7976 19.345 18.0954V12.4182C19.3408 12.2813 19.3011 12.1478 19.2297 12.0309C19.1583 11.914 19.0579 11.8177 18.9381 11.7513ZM20.9488 8.72825L20.8068 8.64305L16.0333 5.86126C15.9142 5.79138 15.7786 5.75454 15.6406 5.75454C15.5025 5.75454 15.367 5.79138 15.2479 5.86126L9.40999 9.22965V6.89736C9.40875 6.8855 9.41073 6.87352 9.41573 6.8627C9.42073 6.85187 9.42856 6.8426 9.43839 6.83586L14.2687 4.04926C15.009 3.62278 15.8554 3.4159 16.709 3.45282C17.5626 3.48974 18.388 3.76893 19.0887 4.25775C19.7894 4.74656 20.3365 5.42478 20.6659 6.21309C20.9953 7.0014 21.0935 7.86721 20.9489 8.70925L20.9488 8.72825ZM8.3075 12.8629L6.2875 11.6991C6.2774 11.6931 6.26875 11.6848 6.26219 11.675C6.25562 11.6652 6.25129 11.6541 6.2495 11.6424V6.07416C6.25061 5.21993 6.49488 4.38368 6.95375 3.66316C7.41262 2.94265 8.06712 2.36766 8.84074 2.00541C9.61435 1.64316 10.4751 1.50863 11.3224 1.61755C12.1696 1.72647 12.9683 2.07433 13.6252 2.62047L13.4832 2.70097L8.705 5.45896C8.58607 5.52871 8.48733 5.62819 8.41848 5.74764C8.34964 5.86709 8.31304 6.00239 8.3123 6.14026L8.3075 12.8629ZM9.40509 10.4975L12.0071 8.99775L14.614 10.4975V13.4969L12.0166 14.9966L9.40989 13.4969L9.40509 10.4975Z"
        fill="#05050A"
      />
    </svg>
  );
};

export const Anthropic = ({
  fill = "fill-gray-4",
  activeFill = "fill-gray-white",
  active = false,
  size = "md",
}) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.54088 4L0 20H3.6478L4.98113 16.6329H11.8239L13.1572 20H16.8051L10.2641 4H6.54088ZM6.16352 13.6836L8.40252 8.05529L10.6415 13.6836H6.16352ZM13.8868 4L20.4277 20H24L17.4591 4H13.8868Z"
        fill="#05050A"
      />
    </svg>
  );
};

export const Labs = ({
  fill = "fill-gray-4",
  activeFill = "fill-gray-white",
  active = false,
  size = "md",
}) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.7341 12.2144C21.0013 12.2896 21.252 12.371 21.4861 12.4588C21.7049 12.5385 21.9117 12.6482 22.1005 12.7848C22.2742 12.9127 22.4176 13.0775 22.5203 13.2674C22.6322 13.4929 22.686 13.7428 22.6772 13.9944C22.6875 14.3109 22.6137 14.6245 22.4638 14.9033C22.3211 15.1504 22.1185 15.3574 21.8748 15.5051C21.6064 15.6666 21.3112 15.779 21.0036 15.8372C20.6545 15.9057 20.2997 15.9393 19.9441 15.9374C19.0833 15.9374 18.4043 15.7494 17.9072 15.3733C17.4097 14.9973 17.2617 14.4582 17.2617 13.7561H19.0417C19.0417 14.0739 19.1317 14.3016 19.3112 14.4393C19.5135 14.5843 19.7584 14.6571 20.0071 14.6462C20.2055 14.6547 20.4027 14.6093 20.5773 14.5146C20.6503 14.4697 20.7091 14.4056 20.748 14.3293C20.7864 14.2529 20.8033 14.1674 20.7968 14.0821C20.8018 13.9797 20.7683 13.8791 20.7026 13.8001C20.6207 13.7152 20.5227 13.647 20.4142 13.5995C20.252 13.5244 20.0844 13.4616 19.9129 13.4114C19.708 13.3487 19.4635 13.2714 19.1798 13.1796C18.9291 13.1043 18.6907 13.0228 18.4651 12.9352C18.2536 12.855 18.0533 12.7475 17.8695 12.6154C17.6984 12.4905 17.5593 12.3274 17.4624 12.1391C17.3544 11.9123 17.3028 11.6629 17.3117 11.4119C17.3117 10.7852 17.552 10.3214 18.0325 10.0205C18.5131 9.71971 19.1628 9.56916 19.9817 9.56889C20.37 9.5624 20.7568 9.61526 21.1289 9.72564C21.4269 9.81301 21.7041 9.96012 21.9436 10.158C22.1524 10.3357 22.3173 10.5587 22.4265 10.81C22.5353 11.0633 22.591 11.3364 22.5895 11.6122H20.6964C20.7099 11.4001 20.6399 11.1911 20.5023 11.0293C20.4227 10.9553 20.3289 10.8987 20.2262 10.8631C20.1236 10.8275 20.0148 10.8137 19.9068 10.8225C19.7303 10.8182 19.5565 10.8638 19.4054 10.9541C19.3358 10.9962 19.2797 11.0563 19.242 11.1282C19.2044 11.1999 19.1871 11.2806 19.1921 11.3615C19.1886 11.4611 19.2247 11.558 19.2924 11.6311C19.377 11.7143 19.4773 11.7803 19.5869 11.8254C19.7441 11.894 19.9052 11.9526 20.0698 12.0009C20.2616 12.0598 20.4831 12.1309 20.7341 12.2144Z"
        fill="#D63864"
      />
      <path
        d="M12.3302 15.7747H10.4121V7H12.3302V10.5972C12.4124 10.4546 12.5136 10.3239 12.6311 10.2086C12.761 10.0797 12.9086 9.97002 13.0695 9.88277C13.2384 9.79014 13.4171 9.71653 13.6023 9.66332C13.7918 9.60888 13.988 9.58146 14.1852 9.58189C14.5971 9.5772 15.0053 9.66054 15.3824 9.82632C15.7356 9.98186 16.0536 10.2079 16.3161 10.4905C16.5818 10.7813 16.7863 11.1223 16.9182 11.4935C17.2019 12.3094 17.2019 13.1973 16.9182 14.0132C16.7863 14.3843 16.5818 14.7254 16.3161 15.0161C16.0536 15.2988 15.7356 15.5248 15.3824 15.6804C15.0053 15.8461 14.5971 15.9294 14.1852 15.9248C13.988 15.9252 13.7918 15.8978 13.6023 15.8433C13.418 15.7907 13.2395 15.7195 13.0695 15.6308C12.9091 15.5479 12.7615 15.4424 12.6311 15.3174C12.5105 15.2026 12.4089 15.0694 12.3302 14.9226V15.7747ZM13.7844 14.2954C13.9836 14.2975 14.1808 14.2548 14.3611 14.1701C14.532 14.0901 14.6855 13.9773 14.8128 13.838C14.9411 13.6952 15.0411 13.5292 15.1074 13.349C15.1787 13.1586 15.2147 12.9569 15.2137 12.7536C15.2166 12.3572 15.0738 11.9735 14.8125 11.6755C14.6865 11.5331 14.5329 11.4179 14.3608 11.337C14.1806 11.2523 13.9836 11.2092 13.7844 11.2111C13.5792 11.2085 13.3759 11.2513 13.189 11.3363C13.0146 11.416 12.8588 11.5313 12.7315 11.6748C12.4702 11.9729 12.3274 12.3565 12.3304 12.7529C12.3293 12.9562 12.3652 13.158 12.4366 13.3483C12.5028 13.5286 12.6028 13.6946 12.7313 13.8373C12.8599 13.9776 13.0155 14.0906 13.1888 14.1694C13.3756 14.2548 13.579 14.2978 13.7844 14.2954Z"
        fill="#D63864"
      />
      <path
        d="M9.99956 9.72786V15.7702H8.08162V14.9176C8.00292 15.0643 7.90135 15.1976 7.78071 15.3124C7.65176 15.4363 7.50624 15.5417 7.34831 15.6257C7.179 15.7158 7.0003 15.787 6.81549 15.8383C6.62795 15.8919 6.43388 15.9193 6.23885 15.9197C5.82694 15.9244 5.4188 15.8411 5.04169 15.6753C4.68841 15.5198 4.37066 15.2938 4.10781 15.0111C3.84219 14.7203 3.63758 14.3793 3.50606 14.0081C3.22194 13.1922 3.22194 12.3043 3.50606 11.4884C3.63758 11.1172 3.84219 10.7762 4.10781 10.4855C4.37066 10.2028 4.68841 9.97676 5.04169 9.82125C5.41892 9.6556 5.82717 9.57245 6.23912 9.57735C6.43415 9.5778 6.62822 9.6052 6.81576 9.65878C7.00145 9.71053 7.18034 9.7842 7.34858 9.87824C7.5069 9.96663 7.65238 10.0763 7.78098 10.2041C7.8985 10.3193 7.99973 10.4501 8.08185 10.5927V9.72786H9.99956ZM6.64003 14.2909C6.84333 14.2941 7.04471 14.2512 7.22917 14.1657C7.40006 14.0857 7.55353 13.9728 7.68083 13.8336C7.8092 13.6908 7.90919 13.5248 7.97547 13.3446C8.04679 13.1543 8.08281 12.9525 8.08174 12.7492C8.08466 12.3528 7.94187 11.9691 7.68056 11.6711C7.55465 11.5287 7.40094 11.4135 7.2289 11.3326C7.04347 11.25 6.84275 11.2073 6.63976 11.2073C6.43676 11.2073 6.23604 11.25 6.05062 11.3326C5.87861 11.4135 5.72491 11.5287 5.59896 11.6711C5.33776 11.9692 5.19505 12.3529 5.19789 12.7492C5.1967 12.9525 5.23272 13.1543 5.3042 13.3446C5.37044 13.5248 5.47036 13.6908 5.59869 13.8336C5.72602 13.9728 5.8795 14.0856 6.05035 14.1657C6.23496 14.2513 6.43653 14.2942 6.64003 14.2909Z"
        fill="#D63864"
      />
      <path d="M1 7H2.91771V15.7747H1V7Z" fill="#D63864" />
    </svg>
  );
};

export const Cohere = ({
  fill = "fill-gray-4",
  activeFill = "fill-gray-white",
  active = false,
  size = "md",
}) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8.304 14.016C8.864 14.016 9.984 13.988 11.552 13.344C13.372 12.588 16.956 11.244 19.56 9.844C21.38 8.864 22.164 7.576 22.164 5.84C22.164 3.46 20.232 1.5 17.824 1.5H7.744C4.3 1.5 1.5 4.3 1.5 7.744C1.5 11.188 4.132 14.016 8.304 14.016Z"
        fill="#40584E"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10.0117 18.2999C10.0117 16.6199 11.0197 15.0799 12.5877 14.4359L15.7517 13.1199C18.9717 11.8039 22.4997 14.1559 22.4997 17.6279C22.4997 20.3159 20.3157 22.4999 17.6277 22.4999H14.1837C11.8877 22.4999 10.0117 20.6239 10.0117 18.2999Z"
        fill="#C791DD"
      />
      <path
        d="M5.112 14.8281C3.124 14.8281 1.5 16.4521 1.5 18.4401V18.9161C1.5 20.8761 3.124 22.5001 5.112 22.5001C7.1 22.5001 8.724 20.8761 8.724 18.8881V18.4121C8.696 16.4521 7.1 14.8281 5.112 14.8281Z"
        fill="#EE7F62"
      />
    </svg>
  );
};

export const Google = ({
  fill = "fill-gray-4",
  activeFill = "fill-gray-white",
  active = false,
  size = "md",
}) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.2912 12.2514C22.2912 11.5423 22.2225 10.8103 22.1082 10.124H12.2031V14.173H17.8762C17.6475 15.4769 16.8926 16.6206 15.7717 17.3526L19.1572 19.9833C21.1474 18.1304 22.2912 15.4311 22.2912 12.2514Z"
        fill="#4285F4"
      />
      <path
        d="M12.2031 22.5C15.0397 22.5 17.4187 21.5621 19.1572 19.9609L15.7717 17.3531C14.8338 17.9936 13.6214 18.3596 12.2031 18.3596C9.45808 18.3596 7.14767 16.5067 6.30128 14.0361L2.82422 16.7126C4.6085 20.2582 8.22281 22.5 12.2031 22.5Z"
        fill="#0F9D58"
      />
      <path
        d="M6.30122 14.0134C5.86658 12.7096 5.86658 11.2913 6.30122 9.98738L2.82416 7.28809C1.33726 10.2619 1.33726 13.7618 2.82416 16.7127L6.30122 14.0134Z"
        fill="#F4B400"
      />
      <path
        d="M12.2031 5.66372C13.69 5.64084 15.154 6.21273 16.2292 7.24212L19.2259 4.22257C17.3272 2.43829 14.8109 1.47752 12.2031 1.5004C8.22281 1.5004 4.6085 3.74219 2.82422 7.28787L6.30128 9.98717C7.14767 7.49375 9.45808 5.66372 12.2031 5.66372Z"
        fill="#DB4437"
      />
    </svg>
  );
};
