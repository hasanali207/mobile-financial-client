import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Header from '../Components/Header';
import useAdmin from '../Hooks/useAdmin';

const Dashboard = () => {
    const { isAdmin, isModerator, isLoading } = useAdmin();

    if (isLoading) {
        return <progress className="progress w-56"></progress>;
    }

    return (
        <>
            <Header />
            <div className='flex flex-col lg:flex-row w-7xl mx-auto'>
                <div className='w-full lg:w-52 lg:min-h-screen bg-slate-200'>
                    <ul className="menu">
                        {isAdmin ? (
                            <>
                                <li><NavLink to='/dashboard/profile'>Admin Profile</NavLink></li>
                                <li><NavLink to='/dashboard/scholarshiform'>Add Scholarship</NavLink></li>
                            </>
                        ) : isModerator ? (
                            <>
                                <li><NavLink to='/dashboard/profile'>Moderator Profile</NavLink></li>
                                <li><NavLink to='/dashboard/scholarshiform'>Add Scholarship</NavLink></li>
                            </>
                        ) : (
                            <>
                                <li><NavLink to='/dashboard/profile'>My Profile</NavLink></li>
                                <li><NavLink to='/dashboard/sendMoney'>Send Money</NavLink></li>
                                <li><NavLink to='/dashboard/cashout'>Cash Out</NavLink></li>
                                
                            </>
                        )}
                    </ul>
                </div>
                <div className='flex-1 p-6'>
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default Dashboard;
