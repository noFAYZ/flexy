import React from 'react'
 import { Metadata } from 'next';

  export const metadata: Metadata
  = {
  title: 'deFlexy - Coming Soon',
  description: 'The future is coming soon!'
    };
const Layout = ({
    children,
  }: {
    children: React.ReactNode;
  }) => {

   



  return (
    <div className=' '> 
     
    {children}
    </div>
  )
}

export default Layout;