import React from 'react'
import { DropDownMenu } from 'src/components/Dialogs'
import { Button } from 'src/components/Buttons'
import  * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'

export const Select = () => {
    const [bookmarksChecked, setBookmarksChecked] = React.useState(true);
    const [urlsChecked, setUrlsChecked] = React.useState(false);
    const [person, setPerson] = React.useState('pedro');

    return (
        <DropDownMenu
            key={index}
            side="left"
            sideOffset={0}
            align="start"
            trigger={
                <button className="flex items-center gap-xxs py-xxs px-xs rounded-sm outline-none self-stretch border border-solid border-transparent hover:border-gray-3 hover:bg-gray-2 ">
                    <div className="flex w-[16px] justify-center items-center gap-[10px]">
                        {current[index].icon}
                    </div>
                    <div className="flex justify-center items-center ">
                        <p className="text-sm-md text-gray-4">
                            {current[index].name}
                        </p>
                    </div>
                </button>
            }
            open={item.open}
            setOpen={item.setOpen}
            items={
                <React.Fragment>
                    {item.options.map((option, index) => (
                        <DropdownMenuPrimitive.Item key={index} asChild>
                            <div
                                className="flex items-center gap-xxs py-xxs px-xs rounded-sm hover:bg-gray-3 hover:cursor-pointer  outline-none self-stretch group"
                                onClick={() => option.action()}
                            >
                                <div className="flex w-[16px] justify-center items-center gap-[10px]">
                                    {React.createElement(option.icon, {
                                        fill: "fill-gray-4  group-data-[highlighted]:fill-gray-white",
                                    })}
                                </div>

                                <p className="text-sm-regular text-gray-4 group-hover:text-gray-white">
                                    {option.name}
                                </p>
                            </div>
                        </DropdownMenuPrimitive.Item>
                    ))}
                </React.Fragment>
            }
        />
    );
};