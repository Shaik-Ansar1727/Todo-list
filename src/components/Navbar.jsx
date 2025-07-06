import React from 'react'

const Navbar = () => {
  return (
    <div className='flex justify-between  bg-[#f0f0f2] p-2.5'>
        <span className='font-bold '> Task</span>
      <ul className='list-none flex gap-5 justify-end '>
        <li className=''>Home</li>
      <li>About</li>
      <li>contact</li>
      </ul>
    </div>
  )
}

export default Navbar
