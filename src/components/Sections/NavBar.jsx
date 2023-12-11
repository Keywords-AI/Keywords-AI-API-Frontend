import * as Toolbar from "@radix-ui/react-toolbar";
import { Button } from "src/components/Buttons/Button";
import { useLocation, useNavigate } from "react-router-dom";
import cn from "src/utilities/ClassMerge";
import { ProfileMenu } from "src/components/Dialogs";
import React from "react";
const Logo = ({ fill = "fill-gray-4" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="19"
      height="20"
      viewBox="0 0 19 20"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.07513 1.18646C9.21663 1.07738 9.39144 1.01025 9.56624 1.01025C9.83261 1.01025 10.0823 1.12772 10.2405 1.3375L15.0101 7.49656V12.4137L16.4335 13.8402C16.7582 14.1675 16.7582 14.7045 16.4335 15.0318C16.1089 15.359 15.5762 15.359 15.2515 15.0318L13.3453 13.1018V8.07555L8.92529 2.36961V2.36121C8.64228 2.0004 8.70887 1.47176 9.07513 1.18646ZM18.9759 14.4134C18.8344 14.378 18.7003 14.3044 18.5894 14.1926L16.9163 12.506C16.7249 12.313 16.6416 12.0529 16.6749 11.8096V6.88401H16.6499L11.8553 0.691388C11.7281 0.529234 11.6716 0.333186 11.6803 0.140563C11.134 0.0481296 10.5726 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20C13.9387 20 17.3455 17.7229 18.9759 14.4134Z"
        className={fill}
      />
    </svg>
  );
};

const concateTextName = (pageName) => {
  return (
    "text-sm " +
    (location.pathname == `/platform/${pageName}`
      ? "text-gray-white"
      : "text-gray-4")
  );
};
export const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const generateButton = (text, pageName, index) => {
    let modifiedPageName = pageName;
    if (!pageName) {
      modifiedPageName = text.toLowerCase().split(" ").join("-");
    }
    return (
      <Button
        key={index}
        text={text}
        variant="header"
        arrow={false}
        onClick={() => navigate(`/platform/${modifiedPageName}`)}
        textClassName={cn(concateTextName(modifiedPageName))}
      />
    );
  };
  const buttons = [
    { text: "Documentation", pageName: "doc" },
    { text: "Examples", pageName: "examples" },
    { text: "Playground", pageName: "playground" },
    { text: "Chatbot", pageName: "chatbot" },
    { text: "API Keys", pageName: "api-keys" },
  ];
  return (
    <Toolbar.Root className="flex px-lg py-xxs justify-center items-center border-b-[1px] border-gray-3 bg-gray-black w-full">
      <div className="w-full flex justify-between">
        <div
          aria-label="logo and navigation"
          className="flex items-center gap-md self-stretch"
        >
          <div className="flex items-center gap-xxs self-stretch">
            <Logo />
          </div>
          <div className="flex items-center gap-xs">
            {buttons.map((button, index) =>
              generateButton(button.text, button.pageName, index)
            )}
          </div>
        </div>
        <div aria-label="profile" className="flex items-center gap-xs">
          <Button
            text="Beta feedback"
            variant="header"
            arrow={false}
            onClick={() => navigate("/feedback")}
            textClassName={"text-sm text-gray-4"}
          />
          <ProfileMenu />
        </div>
      </div>
    </Toolbar.Root>
  );
};
