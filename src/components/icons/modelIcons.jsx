import React from "react";
const OpenAi = ({ fill = "fill-gray-white" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M14.7459 6.54738C14.9248 6.00863 14.9867 5.43791 14.9274 4.87334C14.8681 4.30877 14.689 3.76335 14.4021 3.27352C13.9767 2.53313 13.3273 1.94695 12.5473 1.59949C11.7673 1.25202 10.8971 1.16122 10.0622 1.34018C9.58791 0.812559 8.98309 0.419031 8.30854 0.199125C7.63399 -0.0207811 6.91345 -0.0593233 6.21929 0.0873693C5.52513 0.234062 4.88179 0.560825 4.35388 1.03484C3.82597 1.50885 3.43208 2.11343 3.21177 2.78785C2.65555 2.90191 2.13008 3.13337 1.67047 3.46678C1.21087 3.80018 0.827724 4.22784 0.546638 4.72118C0.116662 5.46033 -0.0671077 6.31707 0.0218989 7.16754C0.110905 8.01801 0.468076 8.81814 1.04177 9.45225C0.862215 9.99074 0.799721 10.5614 0.858471 11.1259C0.917221 11.6905 1.09586 12.2361 1.38244 12.726C1.80833 13.4667 2.45838 14.053 3.23891 14.4005C4.01944 14.7479 4.89013 14.8386 5.7255 14.6594C6.10235 15.0838 6.56539 15.4229 7.08371 15.6541C7.60203 15.8852 8.16371 16.0032 8.73124 16C9.587 16.0008 10.4209 15.7296 11.1125 15.2256C11.8041 14.7217 12.3177 14.011 12.5791 13.1961C13.1353 13.0819 13.6607 12.8503 14.1202 12.5169C14.5798 12.1835 14.963 11.7559 15.2442 11.2627C15.6691 10.5247 15.8497 9.67113 15.7602 8.82422C15.6707 7.97731 15.3157 7.18032 14.7459 6.54738ZM8.73124 14.9528C8.03038 14.9539 7.35151 14.7082 6.81364 14.2589L6.90824 14.2053L10.0938 12.3665C10.1731 12.32 10.2389 12.2537 10.2848 12.1741C10.3307 12.0944 10.3551 12.0042 10.3556 11.9123V7.42105L11.7022 8.20012C11.7089 8.20349 11.7147 8.20839 11.7191 8.21441C11.7235 8.22044 11.7264 8.22742 11.7276 8.23478V11.9565C11.7259 12.7507 11.4097 13.5118 10.8481 14.0734C10.2865 14.6349 9.52539 14.9511 8.73124 14.9528ZM2.29077 12.2025C1.93929 11.5956 1.81309 10.8842 1.93437 10.1934L2.02904 10.2502L5.2177 12.089C5.2966 12.1353 5.38643 12.1597 5.4779 12.1597C5.56938 12.1597 5.65921 12.1353 5.7381 12.089L9.6333 9.84332V11.3982C9.63294 11.4063 9.63076 11.4142 9.62693 11.4213C9.62309 11.4284 9.61771 11.4345 9.61117 11.4392L6.38464 13.3001C5.69606 13.6968 4.8782 13.804 4.11064 13.5982C3.34309 13.3924 2.68856 12.8905 2.29077 12.2025ZM1.45184 5.26372C1.80576 4.6529 2.36439 4.187 3.02884 3.94852V7.73332C3.02764 7.82475 3.051 7.91484 3.09649 7.99417C3.14198 8.07349 3.20792 8.13916 3.28744 8.18432L7.1637 10.4205L5.81697 11.1995C5.80968 11.2034 5.80156 11.2054 5.7933 11.2054C5.78505 11.2054 5.77693 11.2034 5.76964 11.1995L2.54944 9.34185C1.86215 8.94346 1.36074 8.28894 1.15502 7.52163C0.949294 6.75433 1.05603 5.93676 1.45184 5.24798V5.26372ZM12.516 7.83425L8.62717 5.57598L9.97077 4.79998C9.97806 4.79611 9.98619 4.79409 9.99444 4.79409C10.0027 4.79409 10.0108 4.79611 10.0181 4.79998L13.2383 6.66085C13.7307 6.94495 14.1321 7.36326 14.3956 7.86692C14.6592 8.37059 14.774 8.93884 14.7267 9.50532C14.6794 10.0718 14.472 10.6131 14.1286 11.0661C13.7851 11.5191 13.32 11.8651 12.7873 12.0637V8.27885C12.7845 8.18757 12.758 8.09858 12.7105 8.02062C12.6629 7.94266 12.5959 7.87848 12.516 7.83425ZM13.8565 5.81885L13.7618 5.76205L10.5795 3.90752C10.5001 3.86093 10.4097 3.83637 10.3177 3.83637C10.2257 3.83637 10.1353 3.86093 10.0559 3.90752L6.16397 6.15312V4.59825C6.16314 4.59034 6.16446 4.58236 6.1678 4.57515C6.17113 4.56793 6.17635 4.56175 6.1829 4.55725L9.4031 2.69952C9.89665 2.41519 10.4609 2.27728 11.03 2.30189C11.599 2.3265 12.1493 2.51263 12.6165 2.83851C13.0836 3.16438 13.4483 3.61653 13.6679 4.14207C13.8875 4.66761 13.953 5.24482 13.8566 5.80618L13.8565 5.81885ZM5.42897 8.57532L4.0823 7.79945C4.07557 7.79539 4.06981 7.7899 4.06543 7.78337C4.06105 7.77684 4.05816 7.76942 4.05697 7.76165V4.04945C4.05771 3.47997 4.22056 2.92246 4.52647 2.44212C4.83239 1.96177 5.26872 1.57844 5.78447 1.33694C6.30021 1.09544 6.87404 1.00576 7.43888 1.07837C8.00372 1.15098 8.53621 1.38289 8.9741 1.74698L8.87944 1.80065L5.69397 3.63932C5.61469 3.68582 5.54886 3.75214 5.50296 3.83177C5.45706 3.9114 5.43267 4.0016 5.43217 4.09352L5.42897 8.57532ZM6.16071 6.99838L7.89537 5.99852L9.6333 6.99838V8.99798L7.9017 9.99778L6.16391 8.99798L6.16071 6.99838Z"
        className={fill}
      />
    </svg>
  );
};

const Ai21 = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="16"
      viewBox="0 0 17 16"
      fill="none"
    >
      <rect x="0.333984" width="16" height="16" rx="4" fill="#F9FAFC" />
      <path d="M1 4.6665H2.27847V10.5163H1V4.6665Z" fill="#E91E63" />
      <path
        d="M7.00036 6.48524V10.5135H5.72173V9.94506C5.66926 10.0429 5.60155 10.1317 5.52112 10.2083C5.43516 10.2909 5.33814 10.3611 5.23286 10.4171C5.11998 10.4772 5.00085 10.5247 4.87764 10.5589C4.75262 10.5946 4.62324 10.6129 4.49322 10.6131C4.21861 10.6163 3.94652 10.5607 3.69511 10.4502C3.45959 10.3465 3.24776 10.1959 3.07252 10.0074C2.89544 9.81352 2.75904 9.58619 2.67136 9.33872C2.48194 8.79479 2.48194 8.20286 2.67136 7.65892C2.75904 7.41146 2.89544 7.18412 3.07252 6.99032C3.24776 6.80186 3.45959 6.65117 3.69511 6.5475C3.9466 6.43707 4.21876 6.38164 4.4934 6.3849C4.62342 6.3852 4.7528 6.40347 4.87782 6.43919C5.00162 6.47369 5.12088 6.5228 5.23304 6.5855C5.33858 6.64442 5.43557 6.71752 5.5213 6.80272C5.59965 6.87952 5.66714 6.96672 5.72188 7.06179V6.48524H7.00036ZM4.76067 9.52725C4.8962 9.52939 5.03046 9.50079 5.15343 9.44379C5.26736 9.39045 5.36967 9.31519 5.45454 9.22239C5.54012 9.12719 5.60678 9.01652 5.65096 8.89639C5.69851 8.76952 5.72252 8.63499 5.72181 8.49945C5.72376 8.23519 5.62856 7.97939 5.45436 7.78072C5.37042 7.68579 5.26794 7.60899 5.15325 7.55506C5.02963 7.49999 4.89582 7.47152 4.76049 7.47152C4.62516 7.47152 4.49134 7.49999 4.36773 7.55506C4.25306 7.60899 4.15059 7.68579 4.06662 7.78072C3.89249 7.97946 3.79735 8.23525 3.79924 8.49945C3.79845 8.63499 3.82246 8.76952 3.87012 8.89639C3.91428 9.01652 3.98089 9.12719 4.06644 9.22239C4.15133 9.31519 4.25365 9.39039 4.36755 9.44379C4.49062 9.50085 4.625 9.52945 4.76067 9.52725Z"
        fill="#E91E63"
      />
      <path
        d="M8.55412 10.5163H7.27539V4.6665H8.55412V7.06464C8.60892 6.96957 8.67639 6.88244 8.75472 6.80557C8.84132 6.71964 8.93972 6.64652 9.04699 6.58835C9.15959 6.5266 9.27872 6.47752 9.40219 6.44205C9.52852 6.40576 9.65932 6.38748 9.79079 6.38776C10.0654 6.38464 10.3375 6.4402 10.5889 6.55072C10.8244 6.65441 11.0364 6.8051 11.2114 6.9935C11.3885 7.18737 11.5249 7.4147 11.6128 7.66217C11.8019 8.2061 11.8019 8.79804 11.6128 9.34197C11.5249 9.58937 11.3885 9.81677 11.2114 10.0106C11.0364 10.199 10.8244 10.3497 10.5889 10.4534C10.3375 10.5639 10.0654 10.6194 9.79079 10.6164C9.65932 10.6166 9.52852 10.5984 9.40219 10.562C9.27932 10.527 9.16032 10.4795 9.04699 10.4204C8.94006 10.3651 8.84166 10.2948 8.75472 10.2114C8.67432 10.1349 8.60659 10.0461 8.55412 9.94824V10.5163ZM9.52359 9.5301C9.65639 9.5315 9.78786 9.50304 9.90806 9.44657C10.022 9.39324 10.1243 9.31804 10.2092 9.22517C10.2947 9.12997 10.3614 9.0193 10.4056 8.89917C10.4531 8.77224 10.4771 8.63777 10.4765 8.50224C10.4784 8.23797 10.3832 7.98217 10.209 7.7835C10.125 7.68857 10.0226 7.61177 9.90786 7.55784C9.78772 7.50137 9.65639 7.47264 9.52359 7.4739C9.38679 7.47217 9.25126 7.5007 9.12666 7.55737C9.01039 7.6105 8.90652 7.68737 8.82166 7.78304C8.64746 7.98177 8.55226 8.2375 8.55426 8.50177C8.55352 8.6373 8.57746 8.77184 8.62506 8.8987C8.66919 9.0189 8.73586 9.12957 8.82152 9.2247C8.90726 9.31824 9.01099 9.39357 9.12652 9.4461C9.25106 9.50304 9.38666 9.5317 9.52359 9.5301Z"
        fill="#E91E63"
      />
      <path
        d="M14.1567 8.14295C14.3349 8.19309 14.502 8.24735 14.6581 8.30589C14.8039 8.35902 14.9418 8.43215 15.0677 8.52322C15.1835 8.60849 15.2791 8.71835 15.3475 8.84495C15.4221 8.99529 15.458 9.16189 15.4521 9.32962C15.459 9.54062 15.4098 9.74969 15.3099 9.93555C15.2147 10.1003 15.0797 10.2383 14.9172 10.3368C14.7383 10.4444 14.5415 10.5194 14.3364 10.5582C14.1037 10.6038 13.8671 10.6262 13.6301 10.625C13.0562 10.625 12.6035 10.4996 12.2721 10.2489C11.9405 9.99822 11.8418 9.63882 11.8418 9.17075H13.0285C13.0285 9.38262 13.0885 9.53442 13.2081 9.62622C13.343 9.72289 13.5063 9.77142 13.6721 9.76415C13.8043 9.76982 13.9358 9.73955 14.0522 9.67642C14.1009 9.64649 14.1401 9.60375 14.166 9.55289C14.1916 9.50195 14.2029 9.44495 14.1985 9.38809C14.2019 9.31982 14.1795 9.25275 14.1357 9.20009C14.0811 9.14349 14.0158 9.09802 13.9435 9.06635C13.8353 9.01629 13.7236 8.97442 13.6093 8.94095C13.4727 8.89915 13.3097 8.84762 13.1205 8.78642C12.9534 8.73622 12.7945 8.68189 12.6441 8.62349C12.5031 8.57002 12.3695 8.49835 12.247 8.41029C12.1329 8.32702 12.0402 8.21829 11.9756 8.09275C11.9036 7.94155 11.8692 7.77529 11.8751 7.60795C11.8751 7.19015 12.0353 6.88095 12.3557 6.68035C12.6761 6.47981 13.1092 6.37944 13.6551 6.37926C13.914 6.37493 14.1719 6.41017 14.4199 6.48376C14.6186 6.54201 14.8034 6.64008 14.9631 6.77202C15.1023 6.89049 15.2122 7.03915 15.285 7.20669C15.3575 7.37555 15.3947 7.55762 15.3937 7.74149H14.1316C14.1406 7.60009 14.0939 7.46075 14.0022 7.35289C13.9491 7.30355 13.8866 7.26582 13.8181 7.24209C13.7497 7.21835 13.6772 7.20915 13.6052 7.21502C13.4875 7.21215 13.3717 7.24255 13.2709 7.30275C13.2245 7.33082 13.1871 7.37089 13.162 7.41882C13.1369 7.46662 13.1254 7.52042 13.1287 7.57435C13.1264 7.64075 13.1505 7.70535 13.1956 7.75409C13.252 7.80955 13.3189 7.85355 13.3919 7.88362C13.4967 7.92935 13.6041 7.96842 13.7139 8.00062C13.8417 8.03989 13.9894 8.08729 14.1567 8.14295Z"
        fill="#E91E63"
      />
    </svg>
  );
};

export const ModelIcon = (model) => {
  switch (model) {
    case "openai":
      return OpenAi;
    case "ai21":
      return Ai21;
  }
};