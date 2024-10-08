import React from 'react'

const UserLayout = ({
    children,
  }: {
    children: React.ReactNode;
  }) => {
  return (
    <div className='flex lg:px-48 md:px-24 justify-center  pb-10'> {children}</div>
  )
}

export default UserLayout;