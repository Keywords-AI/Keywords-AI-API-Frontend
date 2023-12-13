import React from 'react'
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import cn from 'src/utilities/ClassMerge';

export default function AvatarButton({ first_name, onClick = () => { }, size = "w-[24px] h-[24px]" }) {
  const initials = first_name ? first_name[0] : "Err";
  return (
    <AvatarPrimitive.Root
      onClick={onClick}
      className={cn("rounded-full inline-flex items-center justify-center align-middle flex-shrink-0",
        size
      )}>
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
  )
}
