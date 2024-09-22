import React from 'react'
import ActiveLink from './ActiveLink'
function Header() {
  return (
    <div >
        <nav className='flex p-3  gap-5 items-center h-10 text-sm bg-opacity-10 backdrop-blur-lg font-medium text-zinc-400 fixed top-0 w-full'>
            <div>
                <h1 className='hover:underline'>


                    <ActiveLink href="/dashboard">Tasks</ActiveLink>
                </h1>
            </div>

            <div>
                <h1 className='hover:underline '>
                    <ActiveLink href="/kanban">Kanban Board</ActiveLink>
                </h1>

            </div>
        </nav>

    </div>



  )
}

export default Header