import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Components/Header'

const Main = () => {
  return (
    <>
        <div>
        <Header></Header>    
        </div> 

        <div>
            <Outlet></Outlet>
        </div>
        Footer
    </>
  )
}

export default Main