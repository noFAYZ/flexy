import { ChatLayout } from '@/components/chat/chat-layout'
import React from 'react'
import { cookies } from "next/headers";
import ChatSidebarNav from '@/components/sidebar/chat-sidebar'


const page = () => {

    const layout = cookies().get("react-resizable-panels:layout");
    const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
  


  return (
    <div className='flex lg:px-12 md:px-8  pb-10'>  
    <div className='flex flex-col w-[35%] px-4'>   <ChatSidebarNav />

    </div>
 
    <div className="z-10 border rounded-xl w-full text-sm lg:flex h-[35rem]">
        <ChatLayout defaultLayout={defaultLayout} navCollapsedSize={8} />
    </div>

    <div className='flex flex-col w-[33%] px-4'>   <ChatSidebarNav />

    </div>
  
  </div>
  )
}

export default page