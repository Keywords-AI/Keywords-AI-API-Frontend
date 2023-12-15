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
        <svg width="7" height="4" viewBox="0 0 7 4" fill="none" xmlns="http://www.w3.org/2000/svg" className={"flex-shrink-0"}>
          <path d="M5.7112 4L3.23887 1.52767L0.761134 4L0 3.23887L3.23887 0L6.47773 3.23887L5.7112 4Z" className={active ? activeFill : fill} />
        </svg>


      );
    case "xs":
      return (
        < svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={"flex-shrink-0"}>
          <path d="M10.58 9.70508L6 5.12508L1.41 9.70508L0 8.29508L6 2.29508L12 8.29508L10.58 9.70508Z" className={active ? activeFill : fill} />
        </svg >

      );
    case "sm":
      return (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={"flex-shrink-0"}>
          <path d="M1.42 2.29504L6 6.87504L10.59 2.29504L12 3.70504L6 9.70504L0 3.70504L1.42 2.29504Z" className={active ? activeFill : fill} />
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
          height="13"
          viewBox="0 0 12 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={"flex-shrink-0"}
        >
          <path
            d="M12 3.27985L3.77143 11.5084L0 7.73699L0.966857 6.77013L3.77143 9.56785L11.0331 2.31299L12 3.27985Z"
            className={active ? activeFill : fill}
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
          className={"flex-shrink-0"}
        >
          <path
            d="M8 14.6706C6 14.6706 4.232 13.6466 3.2 12.1106C3.224 10.5106 6.4 9.63064 8 9.63064C9.6 9.63064 12.776 10.5106 12.8 12.1106C11.768 13.6466 10 14.6706 8 14.6706ZM8 3.31064C8.63652 3.31064 9.24697 3.5635 9.69706 4.01359C10.1471 4.46368 10.4 5.07412 10.4 5.71064C10.4 6.34716 10.1471 6.95761 9.69706 7.4077C9.24697 7.85779 8.63652 8.11064 8 8.11064C7.36348 8.11064 6.75303 7.85779 6.30294 7.4077C5.85286 6.95761 5.6 6.34716 5.6 5.71064C5.6 5.07412 5.85286 4.46368 6.30294 4.01359C6.75303 3.5635 7.36348 3.31064 8 3.31064ZM8 0.910645C6.94943 0.910645 5.90914 1.11757 4.93853 1.51961C3.96793 1.92165 3.08601 2.51092 2.34315 3.25379C0.842855 4.75408 0 6.78891 0 8.91064C0 11.0324 0.842855 13.0672 2.34315 14.5675C3.08601 15.3104 3.96793 15.8996 4.93853 16.3017C5.90914 16.7037 6.94943 16.9106 8 16.9106C10.1217 16.9106 12.1566 16.0678 13.6569 14.5675C15.1571 13.0672 16 11.0324 16 8.91064C16 4.48664 12.4 0.910645 8 0.910645Z"
            fill="#F9FAFC"
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
            stroke-width="1.5"
            stroke-linecap="square"
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
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={"flex-shrink-0"}>
          <path d="M10.58 9.70496L6 5.12496L1.41 9.70496L0 8.29496L6 2.29496L12 8.29496L10.58 9.70496Z" className={active ? activeFill : fill} />
        </svg >

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
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 0C3.584 0 0 3.584 0 8C0 12.416 3.584 16 8 16C12.416 16 16 12.416 16 8C16 3.584 12.416 0 8 0ZM6.4 12L2.4 8L3.528 6.872L6.4 9.736L12.472 3.664L13.6 4.8L6.4 12Z" className={active ? activeFill : fill} />
        </svg>

      );
  }
};
