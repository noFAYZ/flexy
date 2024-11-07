import React from 'react'

const UserLayout = ({
    children,
  }: {
    children: React.ReactNode;
  }) => {
  return (
    <div className='px-4 flex container justify-center  pb-10'> {children}</div>
  )
}

export default UserLayout;