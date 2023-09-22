import { UserButton } from '@clerk/nextjs'
import React from 'react'
import ThemeSwitcher from '../ThemeSwitcher'
import Logo from '../Logo'

const Navbar = () => {
  return (
    <nav className='flex justify-between items-center w-full py-4 px-10'>
        <Logo />
        <div className='flex items-center gap-5'>
            <UserButton afterSignOutUrl='/' />
            <ThemeSwitcher />
        </div>
    </nav>
  )
}

export default Navbar