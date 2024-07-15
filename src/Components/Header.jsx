import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <header className="p-4 bg-gray-800 text-gray-100">
	<div className="container flex justify-between h-16 mx-auto">
		<a rel="noopener noreferrer" href="#" aria-label="Back to homepage" className="flex items-center p-2">
			
		</a>
		<ul className="items-stretch hidden space-x-3 lg:flex">
			<li className="flex">
				<NavLink to={'/register'} rel="noopener noreferrer" href="#" className="flex items-center px-4 -mb-1 border-b-2 dark:border- text-violet-400 border-violet-400">Dashboard</NavLink>
			</li>
			<li className="flex">
				<a rel="noopener noreferrer" href="#" className="flex items-center px-4 -mb-1 border-b-2 dark:border-">Link</a>
			</li>
			<li className="flex">
				<a rel="noopener noreferrer" href="#" className="flex items-center px-4 -mb-1 border-b-2 dark:border-">Link</a>
			</li>
			<li className="flex">
				<a rel="noopener noreferrer" href="#" className="flex items-center px-4 -mb-1 border-b-2 dark:border-">Link</a>
			</li>
		</ul>
		<div className="items-center flex-shrink-0 hidden lg:flex">
			
			<NavLink to={'/login'} ><button className="self-center px-8 py-3 rounded">Sign in</button></NavLink>
			<NavLink to={'/register'} ><button className="self-center px-8 py-3 font-semibold rounded bg-violet-400 text-gray-900">Sign up</button></NavLink>
		</div>
		<button className="p-4 lg:hidden">
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-gray-100">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
			</svg>
		</button>
	</div>
</header>
  )
}

export default Header