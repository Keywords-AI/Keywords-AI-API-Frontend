import React from "react";


export const Edit = () => {
    return (
        <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.305 2.69463C12.565 2.43466 12.565 2.00139 12.305 1.75476L10.7452 0.194973C10.4986 -0.064991 10.0653 -0.064991 9.80537 0.194973L8.57888 1.4148L11.0785 3.91446M0.5 9.50035V12H2.99965L10.372 4.62103L7.87231 2.12137L0.5 9.50035Z" fill="#B1B3BC" />
        </svg>


    )
}

export const Delete = ({fill="fill-gray-4"}) => {
    const [hover, setHover] = React.useState(false);

    return (
        <svg 
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.03125 0V0.666667H0.75V2H1.40625V10.6667C1.40625 11.0203 1.54453 11.3594 1.79067 11.6095C2.03681 11.8595 2.37065 12 2.71875 12H9.28125C9.62935 12 9.96319 11.8595 10.2093 11.6095C10.4555 11.3594 10.5938 11.0203 10.5938 10.6667V2H11.25V0.666667H7.96875V0H4.03125ZM4.03125 3.33333H5.34375V9.33333H4.03125V3.33333ZM6.65625 3.33333H7.96875V9.33333H6.65625V3.33333Z" 
            className={hover? "fill-error":fill} 
            />
        </svg>
    )
}
export const Tick = ({fill="fill-gray-4"}) => {
    return (
        <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 1.36896L3.77143 9.59753L0 5.8261L0.966857 4.85924L3.77143 7.65696L11.0331 0.4021L12 1.36896Z" className={fill} />
        </svg>

    )
}
export const Cross = ({fill="fill-gray-4"}) => {
    return (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.0008 1.32647L9.07421 0.399902L5.40078 4.07333L1.72735 0.399902L0.800781 1.32647L4.47421 4.9999L0.800781 8.67333L1.72735 9.5999L5.40078 5.92647L9.07421 9.5999L10.0008 8.67333L6.32735 4.9999L10.0008 1.32647Z" className={fill} />
        </svg>


    )
}

