import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { ArrowDown } from "src/components/icons/icons";
import React, { useState } from "react";
import cn from "src/utilities/ClassMerge";
import { DropDownMenu } from "src/components/Dialogs/DropDownMenu/DropDownMenu";
import { logout } from "src/store/actions";

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
const mapDispatchToProps = {
  logout,
};
const ProfileMenu = ({ logout, user }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const initials = user?.first_name ? user?.first_name[0] : "Err";
  const trigger = (
    <button
      className={cn(
        "outline-none flex justify-center items-center p-xxxs gap-xxs rounded-sm border border-solid hover:border-gray-3 hover:bg-gray-2 hover:cursor-pointer",
        open ? "bg-gray-2 border-gray-3 " : "border-gray-black"
      )}
      onClick={() => setOpen(!open)}
    >
      <AvatarPrimitive.Root className="rounded-full inline-flex items-center justify-center align-middle w-[24px] h-[24px] ">
        {/* <AvatarPrimitive.Image
        className="w-full h-full object-cover rounded-full"
        src="https://images.unsplash1.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80"
        alt="Pedro Duarte"
      /> */}
        <AvatarPrimitive.Fallback
          className="flex w-full h-full p-[10px] items-center justify-center rounded-full bg-avatar text-clip text-gray-white caption"
          delayMs={100}
        >
          {initials}
        </AvatarPrimitive.Fallback>
      </AvatarPrimitive.Root>
      <ArrowDown
        className={cn(
          "fill-gray-4 transition-transform duration-[250] ease-in ",
          open && "rotate-180 "
        )}
      />
    </button>
  );

  const menuItemsWithUser = [
    {
      type: "user",
      first_name: "John",
      last_name: "Doe",
      email: "john.doe@example.com",
    },
    {
      name: "View API keys",
      action: () => navigate("/api-keys"),
    },
    {
      name: "View organization",
      action: () => navigate("/organization"),
    },
    {
      name: "Help",
      action: () => navigate("/help"),
    },
    {
      name: "Log out",
      action: () => logout(),
    },
    {
      name: "Admin",
      action: () => navigate("/admin"),
    }, // assuming menuitems is an array of other menu items
  ];

  const renderedItems = menuItemsWithUser.map((item, index) => {
    if (item.type === "user") {
      return (
        <React.Fragment key={index}>
          <DropdownMenuPrimitive.Item disabled asChild>
            <div className="flex-col px-xs py-xxs items-start gap-xxxs">
              <p className="text-sm-md text-gray-white">{`${user?.first_name} ${user?.last_name}`}</p>
              <p className="text-sm-regular text-gray-4">{user?.email}</p>
            </div>
          </DropdownMenuPrimitive.Item>
          <DropdownMenuPrimitive.Separator className="h-[1px] bg-gray-3 w-full" />
        </React.Fragment>
      );
    } else {
      return (
        <DropdownMenuPrimitive.Item key={index} asChild>
          <div
            className="flex px-xs py-xxs items-center gap-xxs flex-1 rounded-sm hover:bg-gray-3 hover:cursor-pointer text-gray-white outline-none self-stretch"
            onClick={item.action}
          >
            <span className="text-sm-regular text-gray-white">{item.name}</span>
          </div>
        </DropdownMenuPrimitive.Item>
      );
    }
  });

  return (
    <DropDownMenu
      trigger={trigger}
      items={renderedItems}
      open={open}
      setOpen={setOpen}
      side="bottom"
      sideOffset={10}
      align="end"
      alignOffset={0}
    />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileMenu);
